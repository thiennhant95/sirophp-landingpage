
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Resource API Reference",
    description: "Resources transform your models/arrays into consistent JSON API responses. One resource = one shape of data.",
    category: "api",
    order: 0,
    icon: "⚙️",
  },
  content: [
  {
    "type": "h2",
    "id": "overview",
    "text": "Overview"
  },
  {
    "type": "p",
    "text": "Resources transform your models/arrays into consistent JSON API responses. One resource = one shape of data."
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use App\\Resources\\UserResource;\r"
  },
  {
    "type": "h2",
    "id": "quick-start",
    "text": "Quick Start"
  },
  {
    "type": "h3",
    "id": "generate",
    "text": "Generate"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro make:resource UserResource\r"
  },
  {
    "type": "h3",
    "id": "define",
    "text": "Define"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "final class UserResource extends Resource\r\n{\r\n    public function toArray(): array\r\n    {\r\n        return [\r\n            'id' => $this->data['id'],\r\n            'name' => $this->data['name'],\r\n            'email' => $this->data['email'],\r\n            'created_at' => $this->data['created_at'],\r\n        ];\r\n    }\r\n}\r"
  },
  {
    "type": "h3",
    "id": "use",
    "text": "Use"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Single resource\r\nreturn UserResource::make($userData);\r\n\r\n// Collection\r\nreturn UserResource::collection($usersList);\r\n\r\n// Collection with field filter\r\nreturn UserResource::collectionOf($usersList, ['id', 'name']);\r"
  },
  {
    "type": "h2",
    "id": "why-resources",
    "text": "Why Resources?"
  },
  {
    "type": "p",
    "text": "Before (raw data leaks everything):"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "return $userData;\r\n// Returns: id, name, email, password, token_version, verification_token, ...\r"
  },
  {
    "type": "p",
    "text": "After (Resource controls the shape):"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "return UserResource::make($userData);\r\n// Returns: id, name, email, created_at\r"
  },
  {
    "type": "p",
    "text": "Never accidentally expose password, token_version, or internal fields again."
  },
  {
    "type": "h2",
    "id": "hiding-sensitive-fields",
    "text": "Hiding Sensitive Fields"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "public function toArray(): array\r\n{\r\n    // Only return what the API consumer needs\r\n    return [\r\n        'id' => $this->data['id'],\r\n        'name' => htmlspecialchars($this->data['name'] ?? '', ENT_QUOTES | ENT_HTML5, 'UTF-8'),\r\n        'email' => $this->data['email'],\r\n    ];\r\n    // Everything else is excluded from response\r\n}\r"
  },
  {
    "type": "h2",
    "id": "relationships",
    "text": "Relationships"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "final class OrderResource extends Resource\r\n{\r\n    public function toArray(): array\r\n    {\r\n        return [\r\n            'id' => $this->data['id'],\r\n            'total' => (float) ($this->data['total'] ?? 0),\r\n            'status' => $this->data['status'] ?? 'pending',\r\n            'items' => $this->data['items'] ?? [],\r\n            // Nested resource\r\n            'user' => UserResource::make($this->data['user'] ?? []),\r\n        ];\r\n    }\r\n}\r"
  },
  {
    "type": "h2",
    "id": "xss-protection",
    "text": "XSS Protection"
  },
  {
    "type": "p",
    "text": "Always escape user-generated strings:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "public function toArray(): array\r\n{\r\n    return [\r\n        'name' => is_string($this->data['name'] ?? null)\r\n            ? htmlspecialchars($this->data['name'], ENT_QUOTES | ENT_HTML5, 'UTF-8')\r\n            : ($this->data['name'] ?? null),\r\n    ];\r\n}\r"
  },
  {
    "type": "h2",
    "id": "available-methods",
    "text": "Available Methods"
  },
  {
    "type": "table",
    "headers": [
      "Method",
      "Description"
    ],
    "rows": [
      [
        "`collection(array $items)`",
        "Transform list of items"
      ],
      [
        "`collectionOf(array $items, array $fields)`",
        "Transform list with field filter"
      ],
      [
        "`toArray()`",
        "Define the output shape (override this)"
      ]
    ]
  }
],
}
