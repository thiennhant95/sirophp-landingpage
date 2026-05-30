
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Authentication Guide",
    description: "SiroPHP uses JWT (JSON Web Tokens) for API authentication. The default algorithm is HS256.",
    category: "guide",
    order: 0,
    icon: "📚",
  },
  content: [
  {
    "type": "h2",
    "id": "jwt-authentication-flow",
    "text": "JWT Authentication Flow"
  },
  {
    "type": "p",
    "text": "SiroPHP uses JWT (JSON Web Tokens) for API authentication. The default algorithm is HS256."
  },
  {
    "type": "p",
    "text": "Configuration is in config/jwt.php loaded from .env:"
  },
  {
    "type": "code",
    "lang": "env",
    "code": "JWT_SECRET=your_strong_secret_at_least_32_chars\r\nJWT_TTL=3600              # Access token lifetime (seconds)\r\nJWT_REFRESH_TTL=604800    # Refresh token lifetime (seconds)\r\nJWT_ALGORITHM=HS256       # HS256 or RS256\r"
  },
  {
    "type": "h3",
    "id": "register",
    "text": "Register"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "POST /api/auth/register\r\nContent-Type: application/json\r\n\r\n{\r\n    \"name\": \"John Doe\",\r\n    \"email\": \"john@example.com\",\r\n    \"password\": \"secret123\",\r\n    \"password_confirmation\": \"secret123\"\r\n}\r"
  },
  {
    "type": "p",
    "text": "Response 201:"
  },
  {
    "type": "code",
    "lang": "json",
    "code": "{\r\n    \"success\": true,\r\n    \"message\": \"Register successful\",\r\n    \"data\": {\r\n        \"token\": \"eyJ...\",\r\n        \"refresh_token\": \"eyJ...\",\r\n        \"token_type\": \"Bearer\",\r\n        \"expires_in\": 3600,\r\n        \"user\": { \"id\": 1, \"name\": \"John Doe\", \"email\": \"john@example.com\" }\r\n    }\r\n}\r"
  },
  {
    "type": "h3",
    "id": "login",
    "text": "Login"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "POST /api/auth/login\r\nContent-Type: application/json\r\n\r\n{\r\n    \"email\": \"john@example.com\",\r\n    \"password\": \"secret123\"\r\n}\r"
  },
  {
    "type": "p",
    "text": "Response 200 — same format as register. Returns token pair."
  },
  {
    "type": "p",
    "text": "Rate-limited: throttle:60,1 (60 requests per minute). Account locks after multiple failed attempts (configurable via login_attempts field)."
  },
  {
    "type": "h3",
    "id": "refresh",
    "text": "Refresh"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "POST /api/auth/refresh\r\nContent-Type: application/json\r\n\r\n{\r\n    \"refresh_token\": \"eyJ...\"\r\n}\r"
  },
  {
    "type": "p",
    "text": "Response 200 — returns new token pair. Old refresh token is revoked (rotation)."
  },
  {
    "type": "h3",
    "id": "logout",
    "text": "Logout"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "POST /api/auth/logout\r\nAuthorization: Bearer <token>\r"
  },
  {
    "type": "p",
    "text": "Increments the user's token_version, invalidating all existing tokens."
  },
  {
    "type": "h3",
    "id": "get-current-user",
    "text": "Get Current User"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "GET /api/auth/me\r\nAuthorization: Bearer <token>\r"
  },
  {
    "type": "p",
    "text": "Response 200:"
  },
  {
    "type": "code",
    "lang": "json",
    "code": "{\r\n    \"success\": true,\r\n    \"data\": { \"id\": 1, \"name\": \"John\", \"email\": \"john@example.com\", \"role\": \"user\" }\r\n}\r"
  },
  {
    "type": "h2",
    "id": "middleware",
    "text": "Middleware"
  },
  {
    "type": "h3",
    "id": "auth-middleware",
    "text": "Auth Middleware"
  },
  {
    "type": "p",
    "text": "Protect routes by requiring a valid JWT:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Apply to individual routes\r\n$router->get('/api/users', [UserController::class, 'index'])\r\n    ->middleware(['auth']);\r\n\r\n// Apply to route groups\r\n$router->group('/api', ['auth'], function (Router $router) {\r\n    $router->resource('products', ProductController::class);\r\n});\r\n\r\n// In TestCase, aliases are set:\r\n// 'auth' => \\App\\Middleware\\AuthMiddleware::class\r"
  },
  {
    "type": "p",
    "text": "The middleware:"
  },
  {
    "type": "ol",
    "items": [
      "Extracts Bearer token from `Authorization` header",
      "Decodes and verifies JWT signature and expiry",
      "Validates `token_version` matches database (allows token revocation)",
      "Checks user is active (status = 1)",
      "Sets user data on request via `$request->setUser()`",
      "Returns 401 for invalid/expired tokens, 403 for inactive accounts"
    ]
  },
  {
    "type": "h3",
    "id": "role-based-access",
    "text": "Role-Based Access"
  },
  {
    "type": "p",
    "text": "Pass required roles to the auth middleware:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Route requires 'admin' role\r\n$router->get('/api/admin/users', [AdminController::class, 'index'])\r\n    ->middleware(['auth:admin']);\r\n\r\n// Multiple roles allowed\r\n$router->put('/api/users/{id}', [UserController::class, 'update'])\r\n    ->middleware(['auth:admin,moderator']);\r\n\r\n// Check role in controller\r\n$user = $request->user();\r\n$role = $user['role'] ?? '';\r\nif ($role !== 'admin') {\r\n    return Response::error('Forbidden', 403);\r\n}\r"
  },
  {
    "type": "h3",
    "id": "throttle-middleware",
    "text": "Throttle Middleware"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Throttle: max 60 requests per 1 minute\r\n$router->post('/api/auth/login', [AuthController::class, 'login'])\r\n    ->middleware(['throttle:60,1']);\r\n\r\n// Syntax: throttle:<max_attempts>,<decay_minutes>\r"
  },
  {
    "type": "h2",
    "id": "api-keys",
    "text": "API Keys"
  },
  {
    "type": "p",
    "text": "For machine-to-machine authentication, pass API keys via header:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// In custom middleware\r\n$apiKey = $request->header('x-api-key', '');\r\nif ($apiKey !== $_ENV['API_KEY']) {\r\n    return Response::error('Unauthorized', 401);\r\n}\r"
  },
  {
    "type": "h2",
    "id": "email-verification",
    "text": "Email Verification"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Routes exist for email verification flow\r\nPOST /api/auth/verify-email      # Verify with token\r\nPOST /api/auth/forgot-password   # Request reset link\r\nPOST /api/auth/reset-password    # Reset with token\r"
  },
  {
    "type": "h2",
    "id": "security-best-practices",
    "text": "Security Best Practices"
  },
  {
    "type": "ul",
    "items": [
      "Generate a strong `JWT_SECRET` with `php siro key:generate`.",
      "Use short `JWT_TTL` (15-60 minutes) and longer `JWT_REFRESH_TTL` (7 days).",
      "Always use HTTPS in production.",
      "Store tokens securely on the client (httpOnly cookies for web, secure storage for mobile).",
      "The throttle middleware mitigates brute-force attacks.",
      "Account lockout after failed login attempts is built in."
    ]
  }
],
}
