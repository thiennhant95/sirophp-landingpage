
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
    "id": "v0-22-v0-23-current",
    "text": "v0.22 → v0.23 (Current)"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "composer update sirosoft/core:^0.23\r"
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
    "id": "v0-16-v0-22",
    "text": "v0.16 → v0.22"
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
