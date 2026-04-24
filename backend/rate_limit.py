from __future__ import annotations

from collections import defaultdict, deque
from dataclasses import dataclass
from threading import Lock
from time import time


@dataclass(frozen=True)
class RateLimitResult:
    allowed: bool
    retry_after_seconds: int


class SlidingWindowRateLimiter:
    def __init__(self, limit: int, window_seconds: int) -> None:
        self.limit = limit
        self.window_seconds = window_seconds
        self._buckets: dict[str, deque[float]] = defaultdict(deque)
        self._lock = Lock()

    def check(self, key: str) -> RateLimitResult:
        now = time()
        window_start = now - self.window_seconds

        with self._lock:
            bucket = self._buckets[key]

            while bucket and bucket[0] < window_start:
                bucket.popleft()

            if len(bucket) >= self.limit:
                retry_after = max(1, int(bucket[0] + self.window_seconds - now))
                return RateLimitResult(allowed=False, retry_after_seconds=retry_after)

            bucket.append(now)
            return RateLimitResult(allowed=True, retry_after_seconds=0)
