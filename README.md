# Shubham Joshi Portfolio

Personal portfolio site for Shubham Joshi, an MS Business Analytics and AI candidate at Johns Hopkins University. The site presents case studies across explainable ML, healthcare analytics consulting, AI product engineering, data science, and client-facing communication.

Live site: https://portfolio-production-9040.up.railway.app/

## What is included

- Static portfolio built with plain `index.html`, `styles.css`, and `script.js`.
- Responsive warm/night theme with a persistent theme toggle.
- Hero, metrics band, case studies, built products, about, core capabilities, and contact sections.
- Downloadable resume at `assets/Shubham_Joshi_Resume.pdf`.
- Recruiter-facing AI assistant that answers questions about Shubham's portfolio.
- FastAPI backend for the assistant, reverse-proxied behind the same Railway service.
- Caddy static server with `/api/*` routed to the backend.
- Docker-based deployment for Railway.

## Portfolio sections

The main page includes these anchored sections:

- `#home`: hero, profile card, resume/email CTAs, and top metrics.
- `#work`: selected case studies and built products.
- `#home-credit-case-study`: responsible AI credit risk modeling.
- `#cms-case-study`: ACHP / CMS Medicare Advantage consulting analysis.
- `#fridgechef-case-study`: deployed consumer AI product with multi-provider LLM routing.
- `#rxcheck-case-study`: pharmacist-facing drug interaction tracker with bounded LLM explanation.
- `#about`: background, experience, languages, teaching, and consulting context.
- `#skills`: six core capability cards.
- `#contact`: availability, links, and closing pitch.

## Tech stack

Frontend:

- HTML
- CSS
- Vanilla JavaScript
- Hand-coded SVG visuals and diagrams
- Local assets in `assets/` and `Images/`

Backend:

- FastAPI
- Uvicorn
- Anthropic Python SDK
- In-memory IP rate limiter
- Server-Sent Events streaming

Deployment:

- Docker
- Caddy
- Railway

## AI portfolio assistant

The assistant is a small, grounded chat panel for recruiters and visitors. It is designed to answer only questions about Shubham's published portfolio materials.

Key behavior:

- Answers only from `backend/corpus.md`.
- Refuses off-topic questions.
- Refuses sensitive questions and redirects users to email Shubham directly.
- Streams responses token-by-token using SSE.
- Returns source section IDs for every answer so the frontend can render "View this on the site" links.
- Uses a simple 10-message-per-IP-per-hour rate limit.
- Does not use a vector database or embeddings because the portfolio corpus is small enough to fit directly in the system prompt.
- Does not persist chat history across page loads.

Model:

```text
claude-haiku-4-5-20251001
```

Assistant source files:

```text
backend/main.py          FastAPI app, /api/ask endpoint, SSE streaming
backend/prompt.py        Behavior rules plus corpus loading
backend/corpus.md        The assistant's source-of-truth knowledge base
backend/rate_limit.py    In-memory sliding-window IP rate limiter
backend/requirements.txt Python dependencies
```

Frontend assistant files:

```text
index.html   Chat panel markup
styles.css   Chat panel styling, warm/night theme support
script.js    Toggle behavior, SSE parsing, source chips, smooth scroll
```

## API endpoints

Health check:

```http
GET /api/health
```

Returns:

```json
{"status": "ok"}
```

Ask endpoint:

```http
POST /api/ask
Content-Type: application/json

{"question":"Tell me about RxCheck"}
```

Response type:

```text
text/event-stream
```

Streaming events:

```text
data: {"type":"token","value":"..."}
data: {"type":"done","sources":["rxcheck-case-study","work"]}
```

Rate limit response:

```json
{
  "error": "rate_limited",
  "message": "You've hit the message limit for this hour. Try again later or reach Shubham directly at shubhamjoshipro.mail@gmail.com."
}
```

## Environment variables

Required for the assistant:

```bash
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

Notes:

- Do not commit a real `.env` file.
- Use `.env.example` as the template.
- On Railway, set `ANTHROPIC_API_KEY` in the service Variables tab.
- Railway provides `PORT` automatically. Caddy binds to `:{$PORT:8080}`.

## Local development

Static-only preview:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173
```

This is useful for checking layout and styling, but the AI assistant will not work unless the FastAPI backend is also running.

Full local preview with Docker:

```bash
docker build -t shubham-portfolio .
docker run --env-file .env -p 8080:8080 shubham-portfolio
```

Then open:

```text
http://127.0.0.1:8080
```

## Deployment architecture

The production Railway service runs both Caddy and FastAPI in one container:

```text
Browser
  |
  v
Caddy on Railway $PORT
  |-- /                 static portfolio files from /srv
  |-- /assets/*         resume and image assets
  |-- /Images/*         project screenshots
  |-- /api/*            reverse proxy to 127.0.0.1:8000
        |
        v
      FastAPI / Uvicorn
```

Process startup is managed by `start.sh`:

- Starts `uvicorn backend.main:app` on `127.0.0.1:8000`.
- Starts Caddy with `Caddyfile`.
- Exits if either process dies.

## Railway deploy

The repo is configured for Railway through the root `Dockerfile`.

Deploy from GitHub:

1. Push changes to GitHub.
2. Railway builds from the root `Dockerfile`.
3. Railway serves the app through Caddy.
4. Add `ANTHROPIC_API_KEY` in Railway Variables for the assistant.

Manual CLI deploy:

```bash
railway up --service <service-id> --detach --ci --message "Deploy message"
```

Current production URL:

```text
https://portfolio-production-9040.up.railway.app/
```

## Updating portfolio content

Common edits:

- Page copy: edit `index.html`.
- Visual design and responsive layout: edit `styles.css`.
- Theme toggle, reveal behavior, and chat UI behavior: edit `script.js`.
- Resume PDF: replace `assets/Shubham_Joshi_Resume.pdf` while keeping the same filename.
- Assistant facts: edit `backend/corpus.md`.
- Assistant behavior rules: edit `backend/prompt.py`.

When changing assistant facts, update `backend/corpus.md` instead of editing the prompt rules. The corpus is the source of truth for what the assistant is allowed to say.

## Important implementation details

- The assistant uses same-origin checks. In production, the browser calls `/api/ask` on the same domain.
- Source IDs are restricted to known page anchors in `backend/main.py`.
- The backend strips the model's final `[SOURCES: ...]` marker before streaming the final visible response.
- Source chips in the frontend smooth-scroll to the matching section and briefly flash the section.
- Chat panel state is kept lightweight and does not persist transcripts.
- No API key is stored in the repo.
- No vector database, external analytics, cookies, or tracking are used.

## File map

```text
.
|-- index.html
|-- styles.css
|-- script.js
|-- Dockerfile
|-- Caddyfile
|-- start.sh
|-- .env.example
|-- assets/
|   |-- Shubham_Joshi_Resume.pdf
|   |-- fridgechef-ui.png
|   |-- headshot-portrait.jpeg
|   |-- nimbus-ui.png
|   |-- rxcheck-ui.png
|   `-- tableau-dashboard.png
|-- Images/
`-- backend/
    |-- __init__.py
    |-- main.py
    |-- prompt.py
    |-- corpus.md
    |-- rate_limit.py
    `-- requirements.txt
```

## Maintenance checklist

Before pushing:

```bash
git diff --check
git status --short
```

For assistant changes:

- Confirm `ANTHROPIC_API_KEY` is set locally or in Railway.
- Test `/api/health`.
- Ask one normal portfolio question.
- Ask one off-topic question and confirm it refuses.
- Click a source chip and confirm it scrolls to the right section.

For visual changes:

- Check desktop width.
- Check tablet width.
- Check mobile width.
- Check warm mode.
- Check night mode.
