from __future__ import annotations

import json
import logging
import os
import re
from typing import Iterable

from anthropic import Anthropic
from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse, StreamingResponse
from pydantic import BaseModel

from backend.prompt import get_system_prompt
from backend.rate_limit import SlidingWindowRateLimiter


load_dotenv()

logger = logging.getLogger("portfolio-assistant")
logging.basicConfig(level=logging.INFO)

MODEL_NAME = "claude-haiku-4-5-20251001"
SOURCE_MARKER = "[SOURCES:"
TAIL_BUFFER = 80
ALLOWED_SOURCES = {
    "home",
    "work",
    "home-credit-case-study",
    "cms-case-study",
    "fridgechef-case-study",
    "rxcheck-case-study",
    "about",
    "skills",
    "contact",
}

app = FastAPI()
limiter = SlidingWindowRateLimiter(limit=10, window_seconds=60 * 60)
system_prompt = get_system_prompt()


class AskPayload(BaseModel):
    question: str


def get_client() -> Anthropic:
    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        raise RuntimeError("ANTHROPIC_API_KEY is not configured")
    return Anthropic(api_key=api_key)


def get_client_ip(request: Request) -> str:
    forwarded_for = request.headers.get("x-forwarded-for")
    if forwarded_for:
        return forwarded_for.split(",")[0].strip()
    if request.client and request.client.host:
        return request.client.host
    return "unknown"


def is_same_origin(request: Request) -> bool:
    origin = request.headers.get("origin")
    host = request.headers.get("host")
    if not origin or not host:
        return True
    allowed_origins = {f"http://{host}", f"https://{host}"}
    return origin in allowed_origins


def parse_sources(raw_text: str) -> list[str]:
    match = re.search(r"\[SOURCES:\s*([^\]]+)\]\s*$", raw_text.strip())
    if not match:
        return ["contact"]

    ordered_sources: list[str] = []
    for item in match.group(1).split(","):
        source = item.strip()
        if source in ALLOWED_SOURCES and source not in ordered_sources:
            ordered_sources.append(source)

    return ordered_sources[:3] or ["contact"]


def sse_event(payload: dict[str, object]) -> bytes:
    return f"data: {json.dumps(payload, ensure_ascii=False)}\n\n".encode("utf-8")


def stream_answer(question: str) -> Iterable[bytes]:
    pending = ""
    source_mode = False

    try:
        client = get_client()

        with client.messages.stream(
            model=MODEL_NAME,
            max_tokens=800,
            system=system_prompt,
            messages=[{"role": "user", "content": question}],
        ) as stream:
            for text in stream.text_stream:
                pending += text

                if source_mode:
                    continue

                marker_index = pending.find(SOURCE_MARKER)
                if marker_index != -1:
                    visible = pending[:marker_index]
                    if visible:
                        yield sse_event({"type": "token", "value": visible})
                    pending = pending[marker_index:]
                    source_mode = True
                    continue

                if len(pending) > TAIL_BUFFER:
                    flush_upto = len(pending) - TAIL_BUFFER
                    visible = pending[:flush_upto]
                    if visible:
                        yield sse_event({"type": "token", "value": visible})
                    pending = pending[flush_upto:]

        sources = parse_sources(pending)

        if not source_mode and pending:
            yield sse_event({"type": "token", "value": pending})

        yield sse_event({"type": "done", "sources": sources})

    except Exception:
        logger.exception("Anthropic streaming failed")
        yield sse_event(
            {
                "type": "error",
                "message": "Something went wrong. Please try again, or email Shubham directly.",
            }
        )


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/ask")
def ask(request: Request, payload: AskPayload):
    if not is_same_origin(request):
        return JSONResponse(
            status_code=403,
            content={
                "error": "forbidden_origin",
                "message": "This assistant only accepts requests from the portfolio site itself.",
            },
        )

    question = payload.question.strip()
    if not question:
        return JSONResponse(
            status_code=400,
            content={
                "error": "invalid_question",
                "message": "Please enter a question about Shubham's portfolio.",
            },
        )

    rate_limit = limiter.check(get_client_ip(request))
    if not rate_limit.allowed:
        return JSONResponse(
            status_code=429,
            content={
                "error": "rate_limited",
                "message": "You've hit the message limit for this hour. Try again later or reach Shubham directly at shubhamjoshipro.mail@gmail.com.",
            },
            headers={"Retry-After": str(rate_limit.retry_after_seconds)},
        )

    return StreamingResponse(
        stream_answer(question),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )
