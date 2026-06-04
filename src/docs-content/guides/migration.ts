
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
    "id": "v0-33-v0-34-current",
    "text": "v0.33 → v0.34 (Current)"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "composer update sirosoft/core:^0.34\r"
  },
  {
    "type": "h3",
    "id": "breaking",
    "text": "⚠ Breaking Changes"
  },
  {
    "type": "ul",
    "items": [
      "**Database::connection()** now returns raw PDO directly. Use `DB::table()` for the QueryBuilder instead.",
      "**API Response Contract v1**: All responses now use standardized envelope format — update any custom response formatting.",
      "**CSRF token rotation**: Tokens are invalidated after use — update frontend to expect new token header."
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
      "**API Versioning**: middleware `version` added to `/api` group",
      "**ETag**: middleware `etag` auto-returns `304 Not Modified`",
      "**Metrics**: GET `/metrics` endpoint (OpenMetrics format)",
      "**Auth caching**: User DB query cached per request"
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
