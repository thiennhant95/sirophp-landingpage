
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Migration Guide",
    description: "No breaking changes. All v0.x versions are backward compatible.",
    category: "guide",
    order: 0,
    icon: "📚",
  },
  content: [
  {
    "type": "p",
    "text": "No breaking changes. All v0.x versions are backward compatible."
  },
  {
    "type": "h2",
    "id": "v0-35-v0-40-0-current",
    "text": "v0.35.x → v0.40.0 (Current)"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "composer update sirosoft/core\r\n# hoặc với skeleton project:\r\ncomposer require sirosoft/api:^0.40.0"
  },
  {
    "type": "h2",
    "id": "v0-34-v0-35-0",
    "text": "v0.34 → v0.35.0"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "composer update sirosoft/core:^0.35.0\r"
  },
  {
    "type": "h3",
    "id": "breaking",
    "text": "⚠ Breaking Changes"
  },
  {
    "type": "ul",
    "items": [
      "**Database::connection()** now returns raw PDO directly. Use `DB::table()` for the QueryBuilder instead."
    ]
  },
  {
    "type": "h3",
    "id": "new-opt-in",
    "text": "New (opt-in)"
  },
  {
    "type": "ul",
    "items": [
      "**Redis queue driver** — set `QUEUE_DRIVER=redis`",
      "**Mercure/WebSocket integration** — real-time SSE via Mercure hub",
      "**Rate limiter Redis driver** — shared Redis connection via CacheInstance",
      "**Email verification flow** — `POST /api/auth/verify-email/resend`",
      "**Validation nesting** — `items.*.product_id` syntax",
      "**Debug workflow demo** — `php siro demo`"
    ]
  },
  {
    "type": "h2",
    "id": "v0-22-v0-23",
    "text": "v0.22 → v0.23"
  },
  {
    "type": "ul",
    "items": [
      "DELETE returns 204 (not 200)",
      "Headers are case-insensitive",
      "New CLI: `api:test`, `replay`, `why`, `log:trace`"
    ]
  },
  {
    "type": "h2",
    "id": "upgrading",
    "text": "Upgrading"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "composer update sirosoft/core\r\nphp vendor/bin/phpunit\r\nphp siro config:clear\r"
  }
],
}
