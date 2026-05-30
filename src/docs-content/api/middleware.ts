
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Middleware API Reference",
    description: "Middleware provides a pipeline for processing HTTP requests before they reach your controllers. Each middleware can inspect, modify, or reject requests.",
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
    "text": "Middleware provides a pipeline for processing HTTP requests before they reach your controllers. Each middleware can inspect, modify, or reject requests."
  },
  {
    "type": "h2",
    "id": "built-in-middleware",
    "text": "Built-in Middleware"
  },
  {
    "type": "table",
    "headers": [
      "Middleware",
      "Class",
      "Purpose"
    ],
    "rows": [
      [
        "Auth",
        "`AuthMiddleware`",
        "JWT authentication, role-based access"
      ],
      [
        "CORS",
        "`CorsMiddleware`",
        "Cross-Origin Resource Sharing headers"
      ],
      [
        "CSP",
        "`CspMiddleware`",
        "Content-Security-Policy headers"
      ],
      [
        "CSRF",
        "`CsrfMiddleware`",
        "CSRF token validation"
      ],
      [
        "ETag",
        "`EtagMiddleware`",
        "HTTP ETag caching"
      ],
      [
        "JSON",
        "`JsonMiddleware`",
        "JSON content-type enforcement"
      ],
      [
        "Metrics",
        "`MetricsMiddleware`",
        "Prometheus metrics collection"
      ],
      [
        "Audit",
        "`AuditMiddleware`",
        "Request/response audit logging"
      ],
      [
        "Throttle",
        "`ThrottleMiddleware`",
        "Rate limiting"
      ],
      [
        "Idempotency",
        "`IdempotencyMiddleware`",
        "Idempotency key support"
      ],
      [
        "Version",
        "`VersionMiddleware`",
        "API version routing"
      ],
      [
        "SecurityHeaders",
        "`SecurityHeadersMiddleware`",
        "Security headers (HSTS, etc.)"
      ]
    ]
  },
  {
    "type": "h2",
    "id": "usage",
    "text": "Usage"
  },
  {
    "type": "h3",
    "id": "apply-to-routes",
    "text": "Apply to Routes"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$router->get('/api/users', [UserController::class, 'index'])\r\n    ->middleware(['auth', 'throttle:60,1']);\r\n\r\n$router->post('/api/products', [ProductController::class, 'store'])\r\n    ->middleware(['auth:admin', 'json']);\r"
  },
  {
    "type": "h3",
    "id": "apply-to-groups",
    "text": "Apply to Groups"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$router->group('/api', ['auth', 'cors', 'version'], function (Router $r) {\r\n    $r->resource('products', ProductController::class);\r\n    $r->resource('orders', OrderController::class);\r\n});\r"
  },
  {
    "type": "h2",
    "id": "creating-custom-middleware",
    "text": "Creating Custom Middleware"
  },
  {
    "type": "h3",
    "id": "1-generate",
    "text": "1. Generate"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro make:middleware LogRequest\r"
  },
  {
    "type": "h3",
    "id": "2-implement",
    "text": "2. Implement"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "<?php\r\n\r\ndeclare(strict_types=1);\r\n\r\nnamespace App\\Middleware;\r\n\r\nuse Siro\\Core\\Request;\r\nuse Siro\\Core\\Response;\r\n\r\nfinal class LogRequestMiddleware\r\n{\r\n    public function handle(Request $request, callable $next): Response\r\n    {\r\n        // Before controller\r\n        $start = microtime(true);\r\n\r\n        $response = $next($request);\r\n\r\n        // After controller\r\n        $duration = (microtime(true) - $start) * 1000;\r\n        Logger::info(\"{$request->method()} {$request->path()} — {$duration}ms\");\r\n\r\n        return $response;\r\n    }\r\n}\r"
  },
  {
    "type": "h3",
    "id": "3-register",
    "text": "3. Register"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// routes/api.php\r\n$router->get('/api/users', [UserController::class, 'index'])\r\n    ->middleware([LogRequestMiddleware::class]);\r"
  },
  {
    "type": "h2",
    "id": "middleware-with-parameters",
    "text": "Middleware with Parameters"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "class ThrottleMiddleware\r\n{\r\n    public function handle(Request $request, callable $next, int $maxAttempts, int $decayMinutes): Response\r\n    {\r\n        // $maxAttempts = 60, $decayMinutes = 1\r\n        return $next($request);\r\n    }\r\n}\r\n\r\n// Usage: middleware name followed by colon-separated params\r\n->middleware(['throttle:60,1']);\r"
  },
  {
    "type": "h2",
    "id": "auth-middleware-built-in",
    "text": "Auth Middleware (Built-in)"
  },
  {
    "type": "h3",
    "id": "basic-auth",
    "text": "Basic Auth"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "->middleware(['auth']);\r"
  },
  {
    "type": "p",
    "text": "Validates JWT token from Authorization: Bearer <token> header. Sets user on request."
  },
  {
    "type": "h3",
    "id": "role-based-auth",
    "text": "Role-Based Auth"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Require admin role\r\n->middleware(['auth:admin']);\r\n\r\n// Multiple roles allowed\r\n->middleware(['auth:admin,moderator']);\r"
  },
  {
    "type": "h3",
    "id": "auth-flow",
    "text": "Auth Flow"
  },
  {
    "type": "ol",
    "items": [
      "Extract Bearer token from `Authorization` header",
      "Decode and verify JWT signature + expiry",
      "Validate `token_version` matches database (supports revocation)",
      "Check user is active (`status = 1`)",
      "Set user data on request via `$request->setUser()`",
      "Return 401 for invalid/expired tokens, 403 for inactive accounts"
    ]
  },
  {
    "type": "h2",
    "id": "middleware-pipeline-order",
    "text": "Middleware Pipeline Order"
  },
  {
    "type": "p",
    "text": "Middleware executes in the order they are defined:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$router->group('/api', [\r\n    SecurityHeadersMiddleware::class,  // 1st — set headers\r\n    CorsMiddleware::class,             // 2nd — CORS\r\n    'version',                          // 3rd — API version\r\n    'etag',                             // 4th — ETag check\r\n    'metrics',                          // 5th — start metrics timer\r\n    'audit',                            // 6th — audit log\r\n], function (Router $r) {\r\n    $r->post('/auth/login', [AuthController::class, 'login'])\r\n        ->middleware(['json', 'throttle:60,1']); // 7th, 8th\r\n});\r"
  }
],
}
