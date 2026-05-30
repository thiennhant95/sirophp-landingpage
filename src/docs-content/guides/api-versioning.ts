
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "API Versioning Guide",
    description: "SiroPHP supports API versioning through the `VersionMiddleware`. You can maintain multiple API versions simultaneously, allowing clients to migrate at their own",
    category: "guide",
    order: 0,
    icon: "📚",
  },
  content: [
  {
    "type": "h2",
    "id": "overview",
    "text": "Overview"
  },
  {
    "type": "p",
    "text": "SiroPHP supports API versioning through the VersionMiddleware. You can maintain multiple API versions simultaneously, allowing clients to migrate at their own pace."
  },
  {
    "type": "h2",
    "id": "route-prefix-versioning",
    "text": "Route Prefix Versioning"
  },
  {
    "type": "p",
    "text": "Register versioned route prefixes:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\Middleware\\VersionMiddleware;\r\n\r\n// Register version-to-prefix mappings\r\nVersionMiddleware::register(1, '/api/v1');\r\nVersionMiddleware::register(2, '/api/v2');\r\n\r\n// In routes/api.php, the 'version' middleware is already applied\r\n// to the /api group. Routes will be accessible under:\r\n//   /api/v1/products (version 1)\r\n//   /api/v2/products (version 2)\r"
  },
  {
    "type": "p",
    "text": "Routes registered after VersionMiddleware::register() are automatically duplicated under the versioned prefix."
  },
  {
    "type": "h3",
    "id": "defining-version-specific-routes",
    "text": "Defining Version-Specific Routes"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Both endpoints accessible at /api/v1/products and /api/v2/products\r\n$router->resource('products', ProductController::class, ['auth']);\r\n\r\n// Create separate controllers for each version:\r\n// v1: /api/v1/orders\r\n// v2: /api/v2/orders (with new fields)\r\n\r\n// Or use the same controller with conditional logic\r"
  },
  {
    "type": "h2",
    "id": "header-based-versioning",
    "text": "Header-Based Versioning"
  },
  {
    "type": "p",
    "text": "Clients can specify the version via the Accept header:"
  },
  {
    "type": "code",
    "code": "Accept: application/vnd.siro.v1+json\r\nAccept: application/vnd.siro.v2+json\r"
  },
  {
    "type": "p",
    "text": "The middleware reads the header and routes to the appropriate version."
  },
  {
    "type": "h2",
    "id": "accessing-in-controllers",
    "text": "Accessing in Controllers"
  },
  {
    "type": "p",
    "text": "Access request metadata to implement version-aware logic:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "public function index(Request $request): Response\r\n{\r\n    // Check version from URL or header\r\n    $path = $request->path();\r\n    if (str_contains($path, '/v2/')) {\r\n        // Return v2 response format\r\n    }\r\n\r\n    // Default v1 response\r\n}\r"
  },
  {
    "type": "h2",
    "id": "middleware-registration",
    "text": "Middleware Registration"
  },
  {
    "type": "p",
    "text": "The version middleware is registered alongside other middleware in TestCase::createApp() or the application bootstrap:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Router::setMiddlewareAliases([\r\n    'auth' => \\App\\Middleware\\AuthMiddleware::class,\r\n    'throttle' => \\Siro\\Core\\Middleware\\ThrottleMiddleware::class,\r\n    'cors' => \\Siro\\Core\\Middleware\\CorsMiddleware::class,\r\n    'json' => \\Siro\\Core\\Middleware\\JsonMiddleware::class,\r\n    'version' => \\Siro\\Core\\Middleware\\VersionMiddleware::class,\r\n    'etag' => \\Siro\\Core\\Middleware\\EtagMiddleware::class,\r\n    'metrics' => \\Siro\\Core\\Middleware\\MetricsMiddleware::class,\r\n]);\r"
  },
  {
    "type": "h2",
    "id": "best-practices",
    "text": "Best Practices"
  },
  {
    "type": "ul",
    "items": [
      "Define all version mappings at the start of `routes/api.php` before any routes.",
      "Maintain backward compatibility within a major version — only add fields, don't remove them.",
      "Deprecate old versions gradually: announce deprecation in response headers, then remove when usage drops to zero.",
      "Use a sunset policy (e.g. support each version for at least 6 months after replacement is stable).",
      "Version your database schema logically — don't create separate databases per API version."
    ]
  }
],
}
