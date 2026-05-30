
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Http API Reference",
    description: "Zero-dependency HTTP client for making outbound requests (GET, POST, PUT, PATCH, DELETE) via cURL.",
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
    "text": "Zero-dependency HTTP client for making outbound requests (GET, POST, PUT, PATCH, DELETE) via cURL."
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\Http;\r"
  },
  {
    "type": "h2",
    "id": "quick-start",
    "text": "Quick Start"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// GET\r\n$response = Http::get('https://api.github.com/repos/SiroSoft/SiroPHP');\r\n\r\n// POST with JSON\r\n$response = Http::post('https://api.example.com/orders', [\r\n    'json' => ['product_id' => 1, 'quantity' => 2],\r\n]);\r\n\r\n// Status\r\n$response->status();       // 200\r\n$response->ok();           // true (status 2xx)\r\n$response->failed();       // false\r\n\r\n// Body\r\n$response->body();         // Raw string\r\n$response->json();         // Parsed array\r\n\r\n// Headers\r\n$response->header('content-type');  // 'application/json'\r\n$response->headers();               // all headers\r"
  },
  {
    "type": "h2",
    "id": "methods",
    "text": "Methods"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// GET\r\n$response = Http::get('https://api.example.com/users', [\r\n    'query' => ['page' => 1, 'per_page' => 20],\r\n]);\r\n\r\n// POST\r\n$response = Http::post('https://api.example.com/orders', [\r\n    'json' => ['product_id' => 1, 'quantity' => 2],\r\n]);\r\n\r\n// PUT\r\n$response = Http::put('https://api.example.com/orders/1', [\r\n    'json' => ['status' => 'shipped'],\r\n]);\r\n\r\n// PATCH\r\n$response = Http::patch('https://api.example.com/orders/1', [\r\n    'json' => ['status' => 'shipped'],\r\n]);\r\n\r\n// DELETE\r\n$response = Http::delete('https://api.example.com/orders/1');\r"
  },
  {
    "type": "h2",
    "id": "configuration",
    "text": "Configuration"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Timeout (default: 30s)\r\nHttp::timeout(10);\r\n\r\n// SSL verification\r\nHttp::verify(true);   // Default\r\nHttp::verify(false);  // Skip SSL (dev only)\r\n\r\n// Default headers for all requests\r\nHttp::withHeaders([\r\n    'Authorization' => 'Bearer ' . $token,\r\n    'User-Agent' => 'Siro-App/1.0',\r\n]);\r"
  },
  {
    "type": "h2",
    "id": "response-object",
    "text": "Response Object"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$response = Http::get('https://api.github.com/repos/SiroSoft/SiroPHP');\r\n\r\n$response->status();        // int: 200\r\n$response->body();          // string: raw response\r\n$response->json();          // array|null: parsed JSON\r\n$response->ok();            // bool: status 2xx\r\n$response->failed();        // bool: status 4xx or 5xx\r\n$response->header('key');   // string|null: single header\r\n$response->headers();       // array: all headers\r"
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
        "`get(string $url, array $options)`",
        "GET request"
      ],
      [
        "`post(string $url, array $options)`",
        "POST request"
      ],
      [
        "`put(string $url, array $options)`",
        "PUT request"
      ],
      [
        "`patch(string $url, array $options)`",
        "PATCH request"
      ],
      [
        "`delete(string $url, array $options)`",
        "DELETE request"
      ],
      [
        "`timeout(int $seconds)`",
        "Set timeout"
      ],
      [
        "`verify(bool $verify)`",
        "Toggle SSL verification"
      ],
      [
        "`withHeaders(array $headers)`",
        "Set default headers"
      ],
      [
        "`status()`",
        "Response status code"
      ],
      [
        "`body()`",
        "Response body string"
      ],
      [
        "`json()`",
        "Response parsed as JSON"
      ],
      [
        "`ok()`",
        "Check if 2xx"
      ],
      [
        "`failed()`",
        "Check if 4xx or 5xx"
      ],
      [
        "`header(string $key)`",
        "Get response header"
      ],
      [
        "`headers()`",
        "Get all response headers"
      ]
    ]
  }
],
}
