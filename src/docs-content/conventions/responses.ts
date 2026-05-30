
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Siro API Response Contract v1",
    description: "Every API response follows this envelope:",
    category: "convention",
    order: 0,
    icon: "📝",
  },
  content: [
  {
    "type": "h2",
    "id": "standard-envelope",
    "text": "Standard Envelope"
  },
  {
    "type": "p",
    "text": "Every API response follows this envelope:"
  },
  {
    "type": "code",
    "lang": "json",
    "code": "{\r\n  \"success\": true | false,\r\n  \"message\": \"Human-readable message\",\r\n  \"data\": { ... } | [ ... ] | null,\r\n  \"meta\": { ... }\r\n}\r"
  },
  {
    "type": "ul",
    "items": [
      "`success`: Always present. `true` for 2xx, `false` for 4xx/5xx.",
      "`message`: Human-readable summary. Never null.",
      "`data`: Response payload. `null` for empty results, deletions, or errors.",
      "`meta`: Metadata (pagination, timestamps). `{}` when empty."
    ]
  },
  {
    "type": "h2",
    "id": "1-success-response",
    "text": "1. Success Response"
  },
  {
    "type": "p",
    "text": "HTTP 200"
  },
  {
    "type": "code",
    "lang": "json",
    "code": "{\r\n  \"success\": true,\r\n  \"message\": \"Products list\",\r\n  \"data\": { ... },\r\n  \"meta\": {\r\n    \"timestamp\": \"2026-05-29T12:00:00+00:00\"\r\n  }\r\n}\r"
  },
  {
    "type": "p",
    "text": "Schema: #/components/schemas/SuccessResponse"
  },
  {
    "type": "code",
    "lang": "yaml",
    "code": "SuccessResponse:\r\n  type: object\r\n  properties:\r\n    success:\r\n      type: boolean\r\n      example: true\r\n    message:\r\n      type: string\r\n      example: Operation successful\r\n    data: {}\r\n    meta:\r\n      type: object\r\n      properties:\r\n        timestamp:\r\n          type: string\r\n          format: date-time\r"
  },
  {
    "type": "h2",
    "id": "2-error-response",
    "text": "2. Error Response"
  },
  {
    "type": "p",
    "text": "HTTP 400 / 401 / 403 / 404 / 500"
  },
  {
    "type": "code",
    "lang": "json",
    "code": "{\r\n  \"success\": false,\r\n  \"message\": \"Product not found\"\r\n}\r"
  },
  {
    "type": "p",
    "text": "Schema: #/components/schemas/ErrorResponse"
  },
  {
    "type": "code",
    "lang": "yaml",
    "code": "ErrorResponse:\r\n  type: object\r\n  properties:\r\n    success:\r\n      type: boolean\r\n      example: false\r\n    message:\r\n      type: string\r\n      example: Not found\r"
  },
  {
    "type": "h2",
    "id": "3-validation-error-response",
    "text": "3. Validation Error Response"
  },
  {
    "type": "p",
    "text": "HTTP 422"
  },
  {
    "type": "code",
    "lang": "json",
    "code": "{\r\n  \"success\": false,\r\n  \"message\": \"Validation failed\",\r\n  \"errors\": {\r\n    \"email\": [\"The email field is required.\"],\r\n    \"password\": [\"The password must be at least 8 characters.\"]\r\n  }\r\n}\r"
  },
  {
    "type": "p",
    "text": "Schema: #/components/schemas/ValidationErrorResponse"
  },
  {
    "type": "code",
    "lang": "yaml",
    "code": "ValidationErrorResponse:\r\n  type: object\r\n  properties:\r\n    success:\r\n      type: boolean\r\n      example: false\r\n    message:\r\n      type: string\r\n      example: Validation failed\r\n    errors:\r\n      type: object\r\n      additionalProperties:\r\n        type: array\r\n        items:\r\n          type: string\r"
  },
  {
    "type": "h2",
    "id": "4-pagination-response",
    "text": "4. Pagination Response"
  },
  {
    "type": "p",
    "text": "HTTP 200 — List endpoints"
  },
  {
    "type": "code",
    "lang": "json",
    "code": "{\r\n  \"success\": true,\r\n  \"message\": \"Products list\",\r\n  \"data\": [ ... ],\r\n  \"meta\": {\r\n    \"page\": 1,\r\n    \"per_page\": 20,\r\n    \"total\": 100,\r\n    \"last_page\": 5,\r\n    \"timestamp\": \"2026-05-29T12:00:00+00:00\"\r\n  }\r\n}\r"
  },
  {
    "type": "p",
    "text": "Schema: #/components/schemas/PaginatedResponse Meta Schema: #/components/schemas/PaginationMeta"
  },
  {
    "type": "code",
    "lang": "yaml",
    "code": "PaginationMeta:\r\n  type: object\r\n  properties:\r\n    page:\r\n      type: integer\r\n      example: 1\r\n    per_page:\r\n      type: integer\r\n      example: 20\r\n    total:\r\n      type: integer\r\n      example: 100\r\n    last_page:\r\n      type: integer\r\n      example: 5\r\n    timestamp:\r\n      type: string\r\n      format: date-time\r"
  },
  {
    "type": "h2",
    "id": "5-auth-response",
    "text": "5. Auth Response"
  },
  {
    "type": "p",
    "text": "HTTP 200 (login) / HTTP 201 (register)"
  },
  {
    "type": "code",
    "lang": "json",
    "code": "{\r\n  \"success\": true,\r\n  \"message\": \"Login successful\",\r\n  \"data\": {\r\n    \"token\": \"eyJ...\",\r\n    \"refresh_token\": \"def...\",\r\n    \"token_type\": \"Bearer\",\r\n    \"expires_in\": 3600,\r\n    \"user\": {\r\n      \"id\": 1,\r\n      \"name\": \"John Doe\",\r\n      \"email\": \"user@example.com\"\r\n    }\r\n  },\r\n  \"meta\": {\r\n    \"timestamp\": \"2026-05-29T12:00:00+00:00\"\r\n  }\r\n}\r"
  },
  {
    "type": "p",
    "text": "Schema: #/components/schemas/AuthTokenResponse"
  },
  {
    "type": "code",
    "lang": "yaml",
    "code": "AuthTokenResponse:\r\n  type: object\r\n  properties:\r\n    success:\r\n      type: boolean\r\n      example: true\r\n    message:\r\n      type: string\r\n      example: Login successful\r\n    data:\r\n      type: object\r\n      properties:\r\n        token:\r\n          type: string\r\n          example: eyJ...\r\n        refresh_token:\r\n          type: string\r\n          example: eyJ...\r\n        token_type:\r\n          type: string\r\n          example: Bearer\r\n        expires_in:\r\n          type: integer\r\n          example: 3600\r\n        user:\r\n          $ref: '#/components/schemas/User'\r"
  },
  {
    "type": "h2",
    "id": "6-upload-response",
    "text": "6. Upload Response"
  },
  {
    "type": "p",
    "text": "HTTP 201"
  },
  {
    "type": "code",
    "lang": "json",
    "code": "{\r\n  \"success\": true,\r\n  \"message\": \"Avatar uploaded\",\r\n  \"data\": {\r\n    \"path\": \"avatars/abc123.jpg\",\r\n    \"url\": \"avatars/abc123.jpg\",\r\n    \"original_name\": \"profile.jpg\",\r\n    \"size\": 204800,\r\n    \"mime\": \"image/jpeg\"\r\n  },\r\n  \"meta\": {\r\n    \"timestamp\": \"2026-05-29T12:00:00+00:00\"\r\n  }\r\n}\r"
  },
  {
    "type": "p",
    "text": "Schema: #/components/schemas/UploadResponse"
  },
  {
    "type": "code",
    "lang": "yaml",
    "code": "UploadResponse:\r\n  type: object\r\n  properties:\r\n    success:\r\n      type: boolean\r\n      example: true\r\n    message:\r\n      type: string\r\n      example: File uploaded\r\n    data:\r\n      type: object\r\n      properties:\r\n        path:\r\n          type: string\r\n          example: avatars/abc123.jpg\r\n        url:\r\n          type: string\r\n          example: avatars/abc123.jpg\r\n        original_name:\r\n          type: string\r\n          example: profile.jpg\r\n        size:\r\n          type: integer\r\n          example: 204800\r\n        mime:\r\n          type: string\r\n          example: image/jpeg\r"
  },
  {
    "type": "h2",
    "id": "7-created-response",
    "text": "7. Created Response"
  },
  {
    "type": "p",
    "text": "HTTP 201"
  },
  {
    "type": "code",
    "lang": "json",
    "code": "{\r\n  \"success\": true,\r\n  \"message\": \"Product created\",\r\n  \"data\": { ... },\r\n  \"meta\": {\r\n    \"timestamp\": \"2026-05-29T12:00:00+00:00\"\r\n  }\r\n}\r"
  },
  {
    "type": "p",
    "text": "Same schema as SuccessResponse. HTTP status 201 instead of 200."
  },
  {
    "type": "h2",
    "id": "8-no-content-response",
    "text": "8. No Content Response"
  },
  {
    "type": "p",
    "text": "HTTP 204 — Delete endpoints"
  },
  {
    "type": "p",
    "text": "No body. Empty response with 204 No Content status."
  },
  {
    "type": "h2",
    "id": "quick-reference",
    "text": "Quick Reference"
  },
  {
    "type": "table",
    "headers": [
      "Scenario",
      "HTTP Status",
      "`success`",
      "`data`",
      "`meta`",
      "`errors`"
    ],
    "rows": [
      [
        "List",
        "200",
        "true",
        "`[...]`",
        "`{page, per_page, total, last_page, timestamp}`",
        "—"
      ],
      [
        "Detail",
        "200",
        "true",
        "`{...}`",
        "`{timestamp}`",
        "—"
      ],
      [
        "Create",
        "201",
        "true",
        "`{...}`",
        "`{timestamp}`",
        "—"
      ],
      [
        "Update",
        "200",
        "true",
        "`{...}`",
        "`{timestamp}`",
        "—"
      ],
      [
        "Delete",
        "204",
        "—",
        "—",
        "—",
        "—"
      ],
      [
        "Login/Register",
        "200/201",
        "true",
        "`{token, ...}`",
        "`{timestamp}`",
        "—"
      ],
      [
        "Upload",
        "201",
        "true",
        "`{path, url, ...}`",
        "`{timestamp}`",
        "—"
      ],
      [
        "Validation error",
        "422",
        "false",
        "null",
        "—",
        "`{field: [msg]}`"
      ],
      [
        "Not found",
        "404",
        "false",
        "null",
        "—",
        "—"
      ],
      [
        "Auth error",
        "401",
        "false",
        "null",
        "—",
        "—"
      ],
      [
        "Forbidden",
        "403",
        "false",
        "null",
        "—",
        "—"
      ],
      [
        "Server error",
        "500",
        "false",
        "null",
        "—",
        "—"
      ]
    ]
  }
],
}
