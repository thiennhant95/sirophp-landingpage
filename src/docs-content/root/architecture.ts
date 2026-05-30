
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Architecture Decision Records (ADR)",
    description: "This document captures the key architectural decisions made in SiroPHP framework development, explaining the \"why\" behind major design choices.",
    category: "root",
    order: 0,
    icon: "📄",
  },
  content: [
  {
    "type": "h2",
    "id": "overview",
    "text": "Overview"
  },
  {
    "type": "p",
    "text": "This document captures the key architectural decisions made in SiroPHP framework development, explaining the \"why\" behind major design choices."
  },
  {
    "type": "h2",
    "id": "adr-001-micro-framework-architecture",
    "text": "ADR-001: Micro-Framework Architecture"
  },
  {
    "type": "p",
    "text": "Date: 2024-01-15 Status: Accepted Context: Need for ultra-fast PHP framework with minimal overhead"
  },
  {
    "type": "h3",
    "id": "decision",
    "text": "Decision"
  },
  {
    "type": "p",
    "text": "Adopt micro-framework architecture with zero external dependencies instead of building on existing frameworks."
  },
  {
    "type": "h3",
    "id": "consequences",
    "text": "Consequences"
  },
  {
    "type": "p",
    "text": "Positive:"
  },
  {
    "type": "ul",
    "items": [
      "Boot time < 1ms vs 50-100ms for Laravel",
      "Memory usage ~2MB vs 80-100MB for Laravel",
      "Complete control over all components",
      "Easy to understand entire codebase in one afternoon"
    ]
  },
  {
    "type": "p",
    "text": "Negative:"
  },
  {
    "type": "ul",
    "items": [
      "Must maintain all components ourselves",
      "Smaller ecosystem compared to established frameworks",
      "More work for common features (must build from scratch)"
    ]
  },
  {
    "type": "h3",
    "id": "alternatives-considered",
    "text": "Alternatives Considered"
  },
  {
    "type": "ol",
    "items": [
      "Build on Laravel - Rejected due to heavy overhead",
      "Use Slim/Symfony components - Rejected due to dependency complexity",
      "Start from scratch - **Selected** for maximum control and performance"
    ]
  },
  {
    "type": "h2",
    "id": "adr-002-dual-package-structure-siro-core-sirosoft-api",
    "text": "ADR-002: Dual-Package Structure (siro-core + sirosoft/api)"
  },
  {
    "type": "p",
    "text": "Date: 2024-02-20 Status: Accepted Context: Need to separate framework engine from application skeleton"
  },
  {
    "type": "h3",
    "id": "decision",
    "text": "Decision"
  },
  {
    "type": "p",
    "text": "Split into two packages:"
  },
  {
    "type": "ul",
    "items": [
      "`sirosoft/core` - Framework engine (Router, Model, DB, Auth, etc.)",
      "`sirosoft/api` - Application skeleton with example code"
    ]
  },
  {
    "type": "h3",
    "id": "consequences",
    "text": "Consequences"
  },
  {
    "type": "p",
    "text": "Positive:"
  },
  {
    "type": "ul",
    "items": [
      "Core can be used independently in existing projects",
      "Clear separation of concerns",
      "Easier versioning and updates",
      "Developers can choose full skeleton or just core"
    ]
  },
  {
    "type": "p",
    "text": "Negative:"
  },
  {
    "type": "ul",
    "items": [
      "More complex release process",
      "Must maintain two repositories",
      "Potential version mismatch issues"
    ]
  },
  {
    "type": "h2",
    "id": "adr-003-final-classes-for-core-components",
    "text": "ADR-003: Final Classes for Core Components"
  },
  {
    "type": "p",
    "text": "Date: 2024-03-10 Status: Accepted Context: Prevent unwanted inheritance and ensure API stability"
  },
  {
    "type": "h3",
    "id": "decision",
    "text": "Decision"
  },
  {
    "type": "p",
    "text": "Mark all core classes as final: Router, Model, Container, Response, Request, etc."
  },
  {
    "type": "h3",
    "id": "rationale",
    "text": "Rationale"
  },
  {
    "type": "ul",
    "items": [
      "Forces composition over inheritance",
      "Prevents breaking changes through subclassing",
      "Makes framework behavior predictable",
      "Encourages extension via middleware/services instead"
    ]
  },
  {
    "type": "h3",
    "id": "examples",
    "text": "Examples"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// ❌ Cannot extend\r\nclass MyRouter extends Router { } // Compilation error\r\n\r\n// ✅ Correct approach\r\n$router->middleware([CustomMiddleware::class]);\r"
  },
  {
    "type": "h2",
    "id": "adr-004-dependency-injection-container-with-autowiring",
    "text": "ADR-004: Dependency Injection Container with Autowiring"
  },
  {
    "type": "p",
    "text": "Date: 2024-03-15 Status: Accepted Context: Need flexible service management without configuration overhead"
  },
  {
    "type": "h3",
    "id": "decision",
    "text": "Decision"
  },
  {
    "type": "p",
    "text": "Implement DI Container with automatic dependency resolution using PHP Reflection."
  },
  {
    "type": "h3",
    "id": "implementation",
    "text": "Implementation"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Automatic resolution\r\nclass UserController {\r\n    public function __construct(\r\n        private UserService $service,\r\n        private Logger $logger\r\n    ) {}\r\n}\r\n\r\n// No manual binding needed - autowired automatically\r\n$controller = Container::getInstance()->make(UserController::class);\r"
  },
  {
    "type": "h3",
    "id": "benefits",
    "text": "Benefits"
  },
  {
    "type": "ul",
    "items": [
      "Zero configuration for most services",
      "Type-safe dependency injection",
      "Easy testing with mock injection",
      "Follows SOLID principles"
    ]
  },
  {
    "type": "h2",
    "id": "adr-005-middleware-pipeline-onion-model",
    "text": "ADR-005: Middleware Pipeline (Onion Model)"
  },
  {
    "type": "p",
    "text": "Date: 2024-03-20 Status: Accepted Context: Need composable request processing"
  },
  {
    "type": "h3",
    "id": "decision",
    "text": "Decision"
  },
  {
    "type": "p",
    "text": "Implement middleware using onion model where each middleware wraps the next."
  },
  {
    "type": "h3",
    "id": "flow",
    "text": "Flow"
  },
  {
    "type": "code",
    "code": "Request → Middleware 1 → Middleware 2 → Handler → Middleware 2 → Middleware 1 → Response\r"
  },
  {
    "type": "h3",
    "id": "example",
    "text": "Example"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Route::post('/users', [UserController::class, 'store'])\r\n    ->middleware([AuthMiddleware::class, ThrottleMiddleware::class]);\r"
  },
  {
    "type": "h3",
    "id": "benefits",
    "text": "Benefits"
  },
  {
    "type": "ul",
    "items": [
      "Each middleware has single responsibility",
      "Easy to add/remove middleware",
      "Clear execution order",
      "Can short-circuit request/response"
    ]
  },
  {
    "type": "h2",
    "id": "adr-006-schema-builder-with-driver-abstraction",
    "text": "ADR-006: Schema Builder with Driver Abstraction"
  },
  {
    "type": "p",
    "text": "Date: 2024-04-05 Status: Accepted Context: Support multiple databases without conditional logic in migrations"
  },
  {
    "type": "h3",
    "id": "decision",
    "text": "Decision"
  },
  {
    "type": "p",
    "text": "Create driver-agnostic Schema Builder that generates appropriate SQL for each database."
  },
  {
    "type": "h3",
    "id": "example",
    "text": "Example"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Schema::create('users', function (Blueprint $table) {\r\n    $table->id();                    // AUTO_INCREMENT / BIGSERIAL / AUTOINCREMENT\r\n    $table->string('email');         // VARCHAR(255)\r\n    $table->boolean('active');       // TINYINT(1) / BOOLEAN / TINYINT(1)\r\n    $table->timestamps();            // created_at, updated_at\r\n});\r"
  },
  {
    "type": "h3",
    "id": "supported-databases",
    "text": "Supported Databases"
  },
  {
    "type": "ul",
    "items": [
      "MySQL/MariaDB",
      "PostgreSQL",
      "SQLite"
    ]
  },
  {
    "type": "h3",
    "id": "benefits",
    "text": "Benefits"
  },
  {
    "type": "ul",
    "items": [
      "Write migration once, run anywhere",
      "No if/else branches for different databases",
      "Easier database switching",
      "Consistent API across drivers"
    ]
  },
  {
    "type": "h2",
    "id": "adr-007-trace-id-system-for-debugging",
    "text": "ADR-007: Trace ID System for Debugging"
  },
  {
    "type": "p",
    "text": "Date: 2024-04-15 Status: Accepted Context: Production debugging is difficult without request correlation"
  },
  {
    "type": "h3",
    "id": "decision",
    "text": "Decision"
  },
  {
    "type": "p",
    "text": "Generate unique trace ID for every request and log complete context."
  },
  {
    "type": "h3",
    "id": "implementation",
    "text": "Implementation"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Every response includes:\r\nX-Siro-Trace-Id: siro_a1b2c3d4e5f6g7h8\r\n\r\n// Logs include:\r\n- Request method, path, headers (sanitized)\r\n- Response status, body\r\n- SQL queries with bindings\r\n- Execution time, memory usage\r"
  },
  {
    "type": "h3",
    "id": "commands",
    "text": "Commands"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro log:trace siro_a1b2c3d4e5f6g7h8  # View details\r\nphp siro log:replay siro_a1b2c3d4e5f6g7h8  # Generate curl command\r\nphp siro log:export --format=json          # Export traces\r"
  },
  {
    "type": "h3",
    "id": "benefits",
    "text": "Benefits"
  },
  {
    "type": "ul",
    "items": [
      "Debug production issues without reproducing locally",
      "Correlate logs across services",
      "Replay exact requests for testing",
      "Audit trail for security incidents"
    ]
  },
  {
    "type": "h2",
    "id": "adr-008-jwt-authentication-with-refresh-tokens",
    "text": "ADR-008: JWT Authentication with Refresh Tokens"
  },
  {
    "type": "p",
    "text": "Date: 2024-02-25 Status: Accepted Context: Stateless authentication needed for API-first architecture"
  },
  {
    "type": "h3",
    "id": "decision",
    "text": "Decision"
  },
  {
    "type": "p",
    "text": "Implement JWT access tokens (short-lived) + refresh tokens (long-lived) with token versioning."
  },
  {
    "type": "h3",
    "id": "token-lifecycle",
    "text": "Token Lifecycle"
  },
  {
    "type": "code",
    "code": "Access Token:  1 hour TTL\r\nRefresh Token: 7 days TTL\r\nToken Version: Incremented on password change/logout\r"
  },
  {
    "type": "h3",
    "id": "security-features",
    "text": "Security Features"
  },
  {
    "type": "ul",
    "items": [
      "RS256 support for asymmetric signing",
      "JTI (JWT ID) for token uniqueness",
      "Token blacklisting via version tracking",
      "Automatic refresh token rotation"
    ]
  },
  {
    "type": "h3",
    "id": "benefits",
    "text": "Benefits"
  },
  {
    "type": "ul",
    "items": [
      "Stateless authentication (no session storage)",
      "Fine-grained token revocation",
      "Support for multiple devices",
      "Industry-standard protocol"
    ]
  },
  {
    "type": "h2",
    "id": "adr-009-mass-assignment-protection-by-default",
    "text": "ADR-009: Mass Assignment Protection by Default"
  },
  {
    "type": "p",
    "text": "Date: 2024-03-25 Status: Accepted Context: Prevent accidental exposure of sensitive fields"
  },
  {
    "type": "h3",
    "id": "decision",
    "text": "Decision"
  },
  {
    "type": "p",
    "text": "Require explicit $fillable array on models; reject mass assignment by default."
  },
  {
    "type": "h3",
    "id": "example",
    "text": "Example"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "class User extends Model {\r\n    protected array $fillable = ['name', 'email'];\r\n    // 'password', 'role', 'is_admin' NOT fillable\r\n}\r\n\r\n// ❌ This will fail silently with warning\r\nUser::create($request->all());\r\n\r\n// ✅ Must explicitly allow fields\r\nUser::create($request->only(['name', 'email']));\r"
  },
  {
    "type": "h3",
    "id": "benefits",
    "text": "Benefits"
  },
  {
    "type": "ul",
    "items": [
      "Prevents mass assignment vulnerabilities",
      "Forces developers to think about allowed fields",
      "Clear intent in code",
      "Runtime warnings during development"
    ]
  },
  {
    "type": "h2",
    "id": "adr-010-zero-dependency-http-client",
    "text": "ADR-010: Zero-Dependency HTTP Client"
  },
  {
    "type": "p",
    "text": "Date: 2024-04-10 Status: Accepted Context: Need to call external APIs without Guzzle overhead"
  },
  {
    "type": "h3",
    "id": "decision",
    "text": "Decision"
  },
  {
    "type": "p",
    "text": "Build lightweight HTTP client using native cURL instead of requiring Guzzle."
  },
  {
    "type": "h3",
    "id": "example",
    "text": "Example"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\Http;\r\n\r\n$response = Http::get('https://api.github.com/users/octocat');\r\n$data = $response->json();\r\n\r\nHttp::post('https://api.example.com/orders', [\r\n    'product' => 'Laptop',\r\n    'quantity' => 2,\r\n]);\r"
  },
  {
    "type": "h3",
    "id": "benefits",
    "text": "Benefits"
  },
  {
    "type": "ul",
    "items": [
      "No additional dependencies",
      "Smaller memory footprint",
      "Faster boot time",
      "Full control over implementation"
    ]
  },
  {
    "type": "h2",
    "id": "adr-011-event-system-with-wildcard-support",
    "text": "ADR-011: Event System with Wildcard Support"
  },
  {
    "type": "p",
    "text": "Date: 2024-04-20 Status: Accepted Context: Need decoupled communication between components"
  },
  {
    "type": "h3",
    "id": "decision",
    "text": "Decision"
  },
  {
    "type": "p",
    "text": "Implement pub/sub event system with wildcard matching and model lifecycle hooks."
  },
  {
    "type": "h3",
    "id": "features",
    "text": "Features"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Wildcard listeners\r\nEvent::on('users.*', function ($user) {\r\n    // Catches users.created, users.updated, users.deleted\r\n});\r\n\r\n// One-time listeners\r\nEvent::once('system.startup', function () {\r\n    // Runs exactly once\r\n});\r\n\r\n// Cancel operations\r\nEvent::on('users.creating', function ($user): bool {\r\n    if ($user->isBanned()) {\r\n        return false; // Cancel creation\r\n    }\r\n    return true;\r\n});\r"
  },
  {
    "type": "h3",
    "id": "model-lifecycle-events",
    "text": "Model Lifecycle Events"
  },
  {
    "type": "code",
    "code": "saving → creating → INSERT → created → saved\r\nsaving → updating → UPDATE → updated → saved\r\ndeleting → DELETE → deleted\r"
  },
  {
    "type": "h3",
    "id": "benefits",
    "text": "Benefits"
  },
  {
    "type": "ul",
    "items": [
      "Loose coupling between components",
      "Easy to add observers",
      "Can cancel operations",
      "Automatic model event firing"
    ]
  },
  {
    "type": "h2",
    "id": "adr-012-file-based-cache-with-redis-fallback",
    "text": "ADR-012: File-Based Cache with Redis Fallback"
  },
  {
    "type": "p",
    "text": "Date: 2024-03-30 Status: Accepted Context: Need caching without requiring Redis for small deployments"
  },
  {
    "type": "h3",
    "id": "decision",
    "text": "Decision"
  },
  {
    "type": "p",
    "text": "Implement dual-driver cache system: file-based (default) with optional Redis support."
  },
  {
    "type": "h3",
    "id": "configuration",
    "text": "Configuration"
  },
  {
    "type": "code",
    "lang": "env",
    "code": "CACHE_DRIVER=file      # Default - no extra setup\r\n# CACHE_DRIVER=redis   # For high-performance needs\r"
  },
  {
    "type": "h3",
    "id": "benefits",
    "text": "Benefits"
  },
  {
    "type": "ul",
    "items": [
      "Works out-of-the-box (no Redis required)",
      "Easy to upgrade to Redis when needed",
      "Same API for both drivers",
      "Perfect for shared hosting"
    ]
  },
  {
    "type": "h2",
    "id": "summary",
    "text": "Summary"
  },
  {
    "type": "p",
    "text": "These decisions shape SiroPHP's identity as a fast, simple, and secure micro-framework. Each decision prioritizes:"
  },
  {
    "type": "ol",
    "items": [
      "**Performance** - Minimal overhead, zero dependencies",
      "**Simplicity** - Easy to understand and use",
      "**Security** - Safe defaults, protection against common vulnerabilities",
      "**Developer Experience** - Powerful CLI tools, clear error messages"
    ]
  },
  {
    "type": "p",
    "text": "For questions or proposals to change these decisions, please open an issue on GitHub."
  }
],
}
