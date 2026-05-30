
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Response API Reference",
    description: "The Response object represents the HTTP response sent back to the client. It provides static factory methods for common response patterns.",
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
    "text": "The Response object represents the HTTP response sent back to the client. It provides static factory methods for common response patterns."
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\Response;\r"
  },
  {
    "type": "h2",
    "id": "success-responses",
    "text": "Success Responses"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// 200 OK\r\nResponse::success($data, 'Operation successful');\r\n\r\n// 201 Created\r\nResponse::created($data, 'Resource created');\r\n\r\n// 204 No Content\r\nResponse::noContent();\r\n\r\n// Paginated response\r\nResponse::paginated(\r\n    UserResource::collection($users['data']),\r\n    $users['meta'],\r\n    'Users retrieved'\r\n);\r"
  },
  {
    "type": "h3",
    "id": "response-format",
    "text": "Response Format"
  },
  {
    "type": "code",
    "lang": "json",
    "code": "{\r\n    \"success\": true,\r\n    \"message\": \"Operation successful\",\r\n    \"data\": { \"id\": 1, \"name\": \"John\" },\r\n    \"meta\": { \"page\": 1, \"per_page\": 20, \"total\": 50, \"last_page\": 3 }\r\n}\r"
  },
  {
    "type": "h2",
    "id": "error-responses",
    "text": "Error Responses"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// 400 Bad Request\r\nResponse::error('Validation failed', 400);\r\n\r\n// 401 Unauthorized\r\nResponse::error('Invalid credentials', 401);\r\n\r\n// 403 Forbidden\r\nResponse::error('Forbidden', 403);\r\n\r\n// 404 Not Found\r\nResponse::error('Resource not found', 404);\r\n\r\n// 422 Validation Error (with field errors)\r\nResponse::error('Validation failed', 422, [\r\n    'email' => ['Email has already been taken'],\r\n    'name' => ['Name is required'],\r\n]);\r\n\r\n// 429 Too Many Requests\r\nResponse::error('Too many attempts', 429);\r\n\r\n// 500 Internal Server Error\r\nResponse::error('Internal server error', 500);\r"
  },
  {
    "type": "h3",
    "id": "error-format",
    "text": "Error Format"
  },
  {
    "type": "code",
    "lang": "json",
    "code": "{\r\n    \"success\": false,\r\n    \"message\": \"Validation failed\",\r\n    \"errors\": { \"email\": [\"Email has already been taken\"] }\r\n}\r"
  },
  {
    "type": "h2",
    "id": "raw-responses",
    "text": "Raw Responses"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Raw string\r\nResponse::raw('<html><body>OK</body></html>', 'text/html');\r\n\r\n// JSON from array\r\nResponse::json(['custom' => 'format']);\r\n\r\n// No content\r\nResponse::noContent();  // 204\r"
  },
  {
    "type": "h2",
    "id": "headers-status",
    "text": "Headers & Status"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Custom status\r\n$response = Response::success($data, 'OK');\r\n$response->setStatusCode(201);\r\n\r\n// Headers\r\n$response->setHeader('X-Custom', 'value');\r\n$response->setHeader('X-RateLimit-Remaining', '50');\r"
  },
  {
    "type": "h2",
    "id": "controller-helper-methods",
    "text": "Controller Helper Methods"
  },
  {
    "type": "p",
    "text": "When using the Controller base class:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "class ProductController extends Controller\r\n{\r\n    public function index(): Response\r\n    {\r\n        return $this->success($data, 'OK');\r\n    }\r\n\r\n    public function store(): Response\r\n    {\r\n        return $this->created($resource, 'Created');\r\n    }\r\n\r\n    public function show(): Response\r\n    {\r\n        return $this->success($resource, 'Fetched');\r\n    }\r\n\r\n    public function update(): Response\r\n    {\r\n        return $this->success($resource, 'Updated');\r\n    }\r\n\r\n    public function delete(): Response\r\n    {\r\n        return $this->noContent();\r\n    }\r\n\r\n    public function error(string $message, int $code, array $errors = []): Response\r\n    {\r\n        return Response::error($message, $code, $errors);\r\n    }\r\n\r\n    public function paginated(array $data, array $meta, string $message): Response\r\n    {\r\n        return Response::paginated($data, $meta, $message);\r\n    }\r\n}\r"
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
      "Status",
      "Description"
    ],
    "rows": [
      [
        "`success(mixed $data, string $message)`",
        "200",
        "Success response"
      ],
      [
        "`created(mixed $data, string $message)`",
        "201",
        "Resource created"
      ],
      [
        "`noContent()`",
        "204",
        "No content"
      ],
      [
        "`paginated(array $data, array $meta, string $message)`",
        "200",
        "Paginated list"
      ],
      [
        "`error(string $message, int $code, array $errors)`",
        "*",
        "Error response"
      ],
      [
        "`raw(string $content, string $contentType)`",
        "200",
        "Raw text response"
      ],
      [
        "`json(array $data)`",
        "200",
        "Custom JSON"
      ],
      [
        "`setStatusCode(int $code)`",
        "—",
        "Set HTTP status"
      ],
      [
        "`setHeader(string $key, string $value)`",
        "—",
        "Set response header"
      ],
      [
        "`send()`",
        "—",
        "Send response to client"
      ]
    ]
  }
],
}
