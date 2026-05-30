
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Router API Reference",
    description: "The Router handles HTTP request routing to controllers and closures with middleware support.",
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
    "text": "The Router handles HTTP request routing to controllers and closures with middleware support."
  },
  {
    "type": "h2",
    "id": "basic-usage",
    "text": "Basic Usage"
  },
  {
    "type": "h3",
    "id": "define-routes",
    "text": "Define Routes"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\Route;\r\n\r\n// GET request\r\nRoute::get('/users', [UserController::class, 'index']);\r\n\r\n// POST request\r\nRoute::post('/users', [UserController::class, 'store']);\r\n\r\n// PUT request\r\nRoute::put('/users/{id}', [UserController::class, 'update']);\r\n\r\n// DELETE request\r\nRoute::delete('/users/{id}', [UserController::class, 'destroy']);\r\n\r\n// Any HTTP method\r\nRoute::any('/webhook', [WebhookController::class, 'handle']);\r"
  },
  {
    "type": "h3",
    "id": "route-parameters",
    "text": "Route Parameters"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Required parameter\r\nRoute::get('/users/{id}', function ($id) {\r\n    return ['id' => $id];\r\n});\r\n\r\n// Multiple parameters\r\nRoute::get('/posts/{postId}/comments/{commentId}', function ($postId, $commentId) {\r\n    return ['post' => $postId, 'comment' => $commentId];\r\n});\r\n\r\n// Optional parameter\r\nRoute::get('/users/{id?}', function ($id = null) {\r\n    return ['id' => $id ?? 'all'];\r\n});\r"
  },
  {
    "type": "h3",
    "id": "route-constraints",
    "text": "Route Constraints"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Numeric ID only\r\nRoute::get('/users/{id}', [UserController::class, 'show'])\r\n    ->where('id', '/^\\d+$/');\r\n\r\n// UUID format\r\nRoute::get('/posts/{uuid}', [PostController::class, 'show'])\r\n    ->where('uuid', '/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/');\r\n\r\n// Multiple constraints\r\nRoute::get('/users/{id}/posts/{slug}', [UserController::class, 'posts'])\r\n    ->where(['id' => '/^\\d+$/', 'slug' => '/^[a-z0-9-]+$/']);\r"
  },
  {
    "type": "h2",
    "id": "route-groups",
    "text": "Route Groups"
  },
  {
    "type": "h3",
    "id": "group-with-common-prefix",
    "text": "Group with Common Prefix"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Route::group(['prefix' => 'api/v1'], function () {\r\n    Route::get('/users', [V1\\UserController::class, 'index']);\r\n    Route::post('/users', [V1\\UserController::class, 'store']);\r\n});\r\n// → GET /api/v1/users\r\n// → POST /api/v1/users\r"
  },
  {
    "type": "h3",
    "id": "group-with-middleware",
    "text": "Group with Middleware"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Route::group(['middleware' => [AuthMiddleware::class]], function () {\r\n    Route::get('/profile', [UserController::class, 'profile']);\r\n    Route::put('/profile', [UserController::class, 'updateProfile']);\r\n});\r"
  },
  {
    "type": "h3",
    "id": "nested-groups",
    "text": "Nested Groups"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Route::group(['prefix' => 'api'], function () {\r\n    Route::group(['prefix' => 'v1'], function () {\r\n        Route::get('/users', [V1\\UserController::class, 'index']);\r\n    });\r\n    \r\n    Route::group(['prefix' => 'v2'], function () {\r\n        Route::get('/users', [V2\\UserController::class, 'index']);\r\n    });\r\n});\r"
  },
  {
    "type": "h2",
    "id": "middleware",
    "text": "Middleware"
  },
  {
    "type": "h3",
    "id": "single-middleware",
    "text": "Single Middleware"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Route::get('/admin/dashboard', [AdminController::class, 'index'])\r\n    ->middleware([AuthMiddleware::class]);\r"
  },
  {
    "type": "h3",
    "id": "multiple-middleware",
    "text": "Multiple Middleware"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Route::post('/users', [UserController::class, 'store'])\r\n    ->middleware([AuthMiddleware::class, ThrottleMiddleware::class]);\r"
  },
  {
    "type": "h3",
    "id": "role-based-middleware",
    "text": "Role-Based Middleware"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Require admin role\r\nRoute::get('/admin/users', [AdminController::class, 'index'])\r\n    ->middleware(['auth:admin']);\r\n\r\n// Require user or admin role\r\nRoute::post('/posts', [PostController::class, 'store'])\r\n    ->middleware(['auth:user,admin']);\r"
  },
  {
    "type": "h3",
    "id": "global-middleware",
    "text": "Global Middleware"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// In App.php or bootstrap file\r\n$app->middleware([\r\n    CorsMiddleware::class,\r\n    JsonMiddleware::class,\r\n]);\r"
  },
  {
    "type": "h2",
    "id": "rate-limiting",
    "text": "Rate Limiting"
  },
  {
    "type": "h3",
    "id": "throttle-routes",
    "text": "Throttle Routes"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// 5 requests per minute\r\nRoute::post('/auth/login', [AuthController::class, 'login'])\r\n    ->throttle(5, 1);\r\n\r\n// 60 requests per hour\r\nRoute::get('/api/data', [DataController::class, 'index'])\r\n    ->throttle(60, 60);\r\n\r\n// 100 requests per day\r\nRoute::post('/api/upload', [UploadController::class, 'upload'])\r\n    ->throttle(100, 1440);\r"
  },
  {
    "type": "h2",
    "id": "api-versioning",
    "text": "API Versioning"
  },
  {
    "type": "h3",
    "id": "version-groups",
    "text": "Version Groups"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$router->version(1, function ($router) {\r\n    $router->get('/users', [V1\\UserController::class, 'index']);\r\n    $router->post('/posts', [V1\\PostController::class, 'store']);\r\n});\r\n// → GET /api/v1/users\r\n// → POST /api/v1/posts\r\n\r\n$router->version(2, function ($router) {\r\n    $router->get('/users', [V2\\UserController::class, 'index']);\r\n    $router->post('/posts', [V2\\PostController::class, 'store']);\r\n});\r\n// → GET /api/v2/users\r\n// → POST /api/v2/posts\r"
  },
  {
    "type": "h2",
    "id": "route-caching",
    "text": "Route Caching"
  },
  {
    "type": "p",
    "text": "Routes are automatically cached for performance. No manual action needed."
  },
  {
    "type": "p",
    "text": "Cache location: storage/cache/routes.php"
  },
  {
    "type": "p",
    "text": "Clear cache (if needed):"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "rm storage/cache/routes.php\r"
  },
  {
    "type": "h2",
    "id": "listing-routes",
    "text": "Listing Routes"
  },
  {
    "type": "h3",
    "id": "cli-command",
    "text": "CLI Command"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro route:list\r"
  },
  {
    "type": "p",
    "text": "Output:"
  },
  {
    "type": "code",
    "code": "+--------+------------------+------------------------------------------+------------+\r\n| Method | Path             | Handler                                  | Middleware |\r\n+--------+------------------+------------------------------------------+------------+\r\n| GET    | /                | Closure                                  |            |\r\n| GET    | /api/users       | UserController@index                     | auth       |\r\n| POST   | /api/users       | UserController@store                     | auth       |\r\n| PUT    | /api/users/{id}  | UserController@update                    | auth       |\r\n| DELETE | /api/users/{id}  | UserController@destroy                   | auth       |\r\n+--------+------------------+------------------------------------------+------------+\r"
  },
  {
    "type": "h2",
    "id": "advanced-features",
    "text": "Advanced Features"
  },
  {
    "type": "h3",
    "id": "fallback-route",
    "text": "Fallback Route"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Route::fallback(function () {\r\n    return Response::json([\r\n        'error' => 'Route not found'\r\n    ], 404);\r\n});\r"
  },
  {
    "type": "h3",
    "id": "options-handling",
    "text": "OPTIONS Handling"
  },
  {
    "type": "p",
    "text": "Framework automatically handles CORS preflight requests. No configuration needed."
  },
  {
    "type": "h3",
    "id": "route-naming-future",
    "text": "Route Naming (Future)"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Planned feature\r\nRoute::get('/users', [UserController::class, 'index'])->name('users.index');\r\n$url = route('users.index'); // /users\r"
  },
  {
    "type": "h2",
    "id": "error-handling",
    "text": "Error Handling"
  },
  {
    "type": "h3",
    "id": "custom-404-handler",
    "text": "Custom 404 Handler"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Route::fallback(function () {\r\n    return Response::json([\r\n        'success' => false,\r\n        'error' => 'Resource not found',\r\n        'code' => 404\r\n    ], 404);\r\n});\r"
  },
  {
    "type": "h3",
    "id": "method-not-allowed",
    "text": "Method Not Allowed"
  },
  {
    "type": "p",
    "text": "Framework automatically returns 405 status for unsupported methods."
  },
  {
    "type": "h2",
    "id": "best-practices",
    "text": "Best Practices"
  },
  {
    "type": "h3",
    "id": "1-use-controllers-over-closures",
    "text": "1. Use Controllers Over Closures"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// ❌ Bad - inline closure\r\nRoute::get('/users', function () {\r\n    return User::all();\r\n});\r\n\r\n// ✅ Good - controller method\r\nRoute::get('/users', [UserController::class, 'index']);\r"
  },
  {
    "type": "h3",
    "id": "2-group-related-routes",
    "text": "2. Group Related Routes"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Route::group(['prefix' => 'api/v1', 'middleware' => ['auth']], function () {\r\n    Route::get('/users', [UserController::class, 'index']);\r\n    Route::post('/users', [UserController::class, 'store']);\r\n    Route::get('/posts', [PostController::class, 'index']);\r\n    Route::post('/posts', [PostController::class, 'store']);\r\n});\r"
  },
  {
    "type": "h3",
    "id": "3-add-rate-limiting-to-sensitive-endpoints",
    "text": "3. Add Rate Limiting to Sensitive Endpoints"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Route::post('/auth/login', [AuthController::class, 'login'])\r\n    ->throttle(5, 1); // Prevent brute force\r"
  },
  {
    "type": "h3",
    "id": "4-use-route-constraints",
    "text": "4. Use Route Constraints"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Route::get('/users/{id}', [UserController::class, 'show'])\r\n    ->where('id', '/^\\d+$/'); // Only numeric IDs\r"
  },
  {
    "type": "h3",
    "id": "5-document-your-routes",
    "text": "5. Document Your Routes"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "/**\r\n * Get all users\r\n * \r\n * @GET /api/users\r\n * @Middleware auth\r\n * @Response 200 { \"data\": [...] }\r\n */\r\nRoute::get('/users', [UserController::class, 'index']);\r"
  },
  {
    "type": "h2",
    "id": "examples",
    "text": "Examples"
  },
  {
    "type": "h3",
    "id": "restful-resource-routes",
    "text": "RESTful Resource Routes"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Manual RESTful routes\r\nRoute::get('/posts', [PostController::class, 'index']);      // List\r\nRoute::get('/posts/{id}', [PostController::class, 'show']);  // Show\r\nRoute::post('/posts', [PostController::class, 'store']);     // Create\r\nRoute::put('/posts/{id}', [PostController::class, 'update']); // Update\r\nRoute::delete('/posts/{id}', [PostController::class, 'destroy']); // Delete\r\n\r\n// Or use make:crud command\r\n// php siro make:crud posts\r"
  },
  {
    "type": "h3",
    "id": "authentication-routes",
    "text": "Authentication Routes"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Route::group(['prefix' => 'auth'], function () {\r\n    Route::post('/register', [AuthController::class, 'register']);\r\n    Route::post('/login', [AuthController::class, 'login'])\r\n        ->throttle(5, 1);\r\n    Route::post('/logout', [AuthController::class, 'logout'])\r\n        ->middleware(['auth']);\r\n    Route::post('/refresh', [AuthController::class, 'refresh'])\r\n        ->middleware(['auth']);\r\n    Route::get('/me', [AuthController::class, 'me'])\r\n        ->middleware(['auth']);\r\n});\r"
  },
  {
    "type": "h3",
    "id": "webhook-routes",
    "text": "Webhook Routes"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Route::post('/webhooks/stripe', [StripeWebhookController::class, 'handle']);\r\nRoute::post('/webhooks/github', [GithubWebhookController::class, 'handle']);\r"
  },
  {
    "type": "h2",
    "id": "performance-tips",
    "text": "Performance Tips"
  },
  {
    "type": "ol",
    "items": [
      "**Use static routes when possible** - Faster than parameterized routes",
      "**Group routes with common middleware** - Reduces middleware evaluation",
      "**Add constraints to parameters** - Faster route matching",
      "**Avoid too many routes** - Consider versioning or modularization",
      "**Cache is automatic** - No manual intervention needed"
    ]
  },
  {
    "type": "h2",
    "id": "troubleshooting",
    "text": "Troubleshooting"
  },
  {
    "type": "h3",
    "id": "route-not-found",
    "text": "Route Not Found"
  },
  {
    "type": "p",
    "text": "Check:"
  },
  {
    "type": "ol",
    "items": [
      "Route is defined in `routes/api.php` or `routes/web.php`",
      "HTTP method matches (GET vs POST)",
      "URL path is correct (case-sensitive)",
      "No typos in route definition"
    ]
  },
  {
    "type": "h3",
    "id": "middleware-not-running",
    "text": "Middleware Not Running"
  },
  {
    "type": "p",
    "text": "Check:"
  },
  {
    "type": "ol",
    "items": [
      "Middleware class exists and is autoloaded",
      "Middleware implements proper interface",
      "Middleware is added to route or group",
      "Middleware order is correct"
    ]
  },
  {
    "type": "h3",
    "id": "parameter-not-passed",
    "text": "Parameter Not Passed"
  },
  {
    "type": "p",
    "text": "Check:"
  },
  {
    "type": "ol",
    "items": [
      "Parameter name matches in route and handler",
      "Route constraint allows the value",
      "Parameter is required/optional as expected"
    ]
  },
  {
    "type": "h2",
    "id": "see-also",
    "text": "See Also"
  },
  {
    "type": "ul",
    "items": [
      "[Middleware API](Middleware.md) - Built-in middleware reference",
      "[API Versioning Guide](../guides/API_VERSIONING.md) - Version management"
    ]
  }
],
}
