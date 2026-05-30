
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Request API Reference",
    description: "The Request object represents the incoming HTTP request and provides methods to access input data, headers, files, and authenticated user.",
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
    "text": "The Request object represents the incoming HTTP request and provides methods to access input data, headers, files, and authenticated user."
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\Request;\r\n\r\nclass ProductController\r\n{\r\n    public function store(Request $request): Response\r\n    {\r\n        // Access data\r\n        $name = $request->string('name');\r\n        $price = $request->float('price');\r\n    }\r\n}\r"
  },
  {
    "type": "h2",
    "id": "input-methods",
    "text": "Input Methods"
  },
  {
    "type": "h3",
    "id": "get-input-values",
    "text": "Get Input Values"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// All input as array\r\n$all = $request->all();\r\n\r\n// Single value with type\r\n$name    = $request->string('name');          // string\r\n$price   = $request->float('price');           // float\r\n$age     = $request->int('age');               // int\r\n$active  = $request->bool('active');           // bool\r\n$tags    = $request->array('tags');            // array\r\n$raw     = $request->input('key', 'default');  // mixed\r\n\r\n// Query string only\r\n$page   = $request->queryInt('page', 1);\r\n$search = $request->queryString('search', '');\r\n$filter = $request->query('sort', 'id');\r\n\r\n// Check if key exists\r\nif ($request->has('email')) { ... }\r"
  },
  {
    "type": "h3",
    "id": "nested-input",
    "text": "Nested Input"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Dot notation\r\n$city = $request->input('address.city');\r\n$tags = $request->array('items.*.id');\r"
  },
  {
    "type": "h2",
    "id": "validation",
    "text": "Validation"
  },
  {
    "type": "h3",
    "id": "validate-request",
    "text": "Validate Request"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$validated = $request->validate([\r\n    'email' => 'required|email|max:255',\r\n    'password' => 'required|min:8|max:255',\r\n    'name' => 'required|min:3|max:120',\r\n]);\r\n\r\n// On failure: throws ValidationException → 422 response\r\n// On success: returns validated data array\r"
  },
  {
    "type": "h2",
    "id": "route-parameters",
    "text": "Route Parameters"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// GET /api/products/{id}\r\n$id = $request->param('id');         // string|null\r\n$id = $request->paramInt('id');      // int (0 if missing)\r\n$id = $request->paramString('slug'); // string|null\r"
  },
  {
    "type": "h2",
    "id": "headers",
    "text": "Headers"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$token    = $request->header('Authorization');      // string|null\r\n$ct       = $request->header('Content-Type', 'json'); // with default\r\n$accept   = $request->header('Accept', '*/*');\r\n$userAgent = $request->userAgent();                   // shortcut\r\n$ip       = $request->ip();                           // client IP\r\n$method   = $request->method();                       // GET, POST, ...\r\n$path     = $request->path();                         // /api/products\r"
  },
  {
    "type": "h2",
    "id": "files",
    "text": "Files"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Single file\r\n$file = $request->file('avatar');\r\nif ($file !== null && $file->isValid()) {\r\n    $path = $file->store('avatars');\r\n    $name = $file->getClientOriginalName();\r\n    $size = $file->getSize();\r\n    $mime = $file->getMimeType();\r\n}\r\n\r\n// Multiple files\r\n$files = $request->file('gallery');\r\nforeach ($files as $file) {\r\n    $path = $file->store('gallery');\r\n}\r"
  },
  {
    "type": "h2",
    "id": "authentication",
    "text": "Authentication"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Get authenticated user\r\n$user = $request->user();\r\n$userId = $user['id'] ?? 0;\r\n$role   = $user['role'] ?? 'guest';\r\n\r\n// Check if authenticated\r\nif ($request->user() !== null) { ... }\r\n\r\n// Set user (called by AuthMiddleware)\r\n$request->setUser($userData);\r"
  },
  {
    "type": "h2",
    "id": "request-context",
    "text": "Request Context"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Trace ID for debugging\r\n$traceId = $request->traceId();\r\n\r\n// Request timing\r\n$startTime = $request->server('REQUEST_TIME_FLOAT');\r\n\r\n// Full URL\r\n$url = $request->fullUrl();\r\n\r\n// Scheme\r\n$isHttps = $request->isSecure();\r"
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
      "Returns",
      "Description"
    ],
    "rows": [
      [
        "`all()`",
        "`array`",
        "All input data"
      ],
      [
        "`input(string $key, mixed $default)`",
        "`mixed`",
        "Get input value"
      ],
      [
        "`string(string $key, string $default)`",
        "`string`",
        "Get string value"
      ],
      [
        "`int(string $key, int $default)`",
        "`int`",
        "Get integer value"
      ],
      [
        "`float(string $key, float $default)`",
        "`float`",
        "Get float value"
      ],
      [
        "`bool(string $key, bool $default)`",
        "`bool`",
        "Get boolean value"
      ],
      [
        "`array(string $key, array $default)`",
        "`array`",
        "Get array value"
      ],
      [
        "`query(string $key, string $default)`",
        "`string`",
        "Get query param"
      ],
      [
        "`queryInt(string $key, int $default)`",
        "`int`",
        "Get query param as int"
      ],
      [
        "`queryString(string $key, string $default)`",
        "`string`",
        "Get query param as string"
      ],
      [
        "`has(string $key)`",
        "`bool`",
        "Check if key exists"
      ],
      [
        "`paramInt(string $key)`",
        "`int`",
        "Get route param as int"
      ],
      [
        "`method()`",
        "`string`",
        "HTTP method"
      ],
      [
        "`path()`",
        "`string`",
        "Request path"
      ],
      [
        "`ip()`",
        "`string`",
        "Client IP"
      ],
      [
        "`userAgent()`",
        "`string`",
        "User agent"
      ],
      [
        "`setUser(array $user)`",
        "`void`",
        "Set authenticated user"
      ],
      [
        "`validate(array $rules)`",
        "`array`",
        "Validate and return"
      ],
      [
        "`isSecure()`",
        "`bool`",
        "Check HTTPS"
      ],
      [
        "`fullUrl()`",
        "`string`",
        "Full request URL"
      ]
    ]
  }
],
}
