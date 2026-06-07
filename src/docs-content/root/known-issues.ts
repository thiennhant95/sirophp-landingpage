
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Known Issues & Limitations",
    description: "| Issue | Severity | Workaround |",
    category: "root",
    order: 0,
    icon: "📄",
  },
  content: [
  {
    "type": "h2",
    "id": "v0-35-known-issues",
    "text": "v0.35 Known Issues"
  },
  {
    "type": "h3",
    "id": "database",
    "text": "Database"
  },
  {
    "type": "table",
    "headers": [
      "Issue",
      "Severity",
      "Workaround"
    ],
    "rows": [
      [
        "No transaction rollback in CLI",
        "Low",
        "Use `DB::transaction()` manually"
      ],
      [
        "SQLite foreign keys off by default",
        "Medium",
        "Enable with `PRAGMA foreign_keys = ON`"
      ],
      [
        "No partial rollback for specific migration",
        "Low",
        "`migrate:rollback --step=N` or `migrate:fresh` (v0.34.0)"
      ]
    ]
  },
  {
    "type": "h3",
    "id": "auth",
    "text": "Auth"
  },
  {
    "type": "table",
    "headers": [
      "Issue",
      "Severity",
      "Workaround"
    ],
    "rows": [
      [
        "No OAuth2/Passport support",
        "Low",
        "Use API Key auth for external devs"
      ],
      [
        "No multi-tenancy",
        "Medium",
        "Implement in application layer"
      ],
      [
        "No 2FA built-in",
        "Low",
        "Add manually or use third-party"
      ]
    ]
  },
  {
    "type": "h3",
    "id": "file-upload-storage",
    "text": "File Upload / Storage"
  },
  {
    "type": "table",
    "headers": [
      "Issue",
      "Severity",
      "Workaround"
    ],
    "rows": [
      [
        "No chunked upload",
        "Medium",
        "Handle in frontend"
      ],
      [
        "S3 driver basic (no multipart)",
        "Low",
        "Use local storage for files >100MB"
      ]
    ]
  },
  {
    "type": "h3",
    "id": "queue-jobs",
    "text": "Queue/Jobs"
  },
  {
    "type": "table",
    "headers": [
      "Issue",
      "Severity",
      "Workaround"
    ],
    "rows": [
      [
        "Queue only DB-based (Redis driver planned for v1.0)",
        "Low",
        "Use database queue with retries"
      ],
      [
        "No job retry UI",
        "Low",
        "Check `failed_jobs` table manually"
      ]
    ]
  },
  {
    "type": "h2",
    "id": "architecture-limitations",
    "text": "Architecture Limitations"
  },
  {
    "type": "p",
    "text": "By design, not bugs:"
  },
  {
    "type": "table",
    "headers": [
      "Limitation",
      "Why",
      "Workaround"
    ],
    "rows": [
      [
        "No admin panel",
        "API-only",
        "Build with any frontend"
      ],
      [
        "No WebSocket",
        "HTTP-only",
        "Use polling or Pusher"
      ],
      [
        "No GraphQL",
        "REST-first",
        "OpenAPI covers most needs"
      ],
      [
        "No web debug bar",
        "CLI-first",
        "`log:trace`, `replay`, `why`"
      ]
    ]
  },
  {
    "type": "h2",
    "id": "reporting-issues",
    "text": "Reporting Issues"
  },
  {
    "type": "ol",
    "items": [
      "https://github.com/SiroSoft/SiroPHP/issues",
      "Include: PHP version, Siro version, reproduction steps"
    ]
  }
],
}
