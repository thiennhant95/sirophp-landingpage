
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Developer Workflow",
    description: "From installation to production — one continuous flow, no breaks.",
    category: "root",
    order: 0,
    icon: "📄",
  },
  content: [
  {
    "type": "note",
    "variant": "info",
    "text": "From installation to production — one continuous flow, no breaks.\r  **🔁 Replay Debug** · **⚡ 1-command CRUD** · **🔒 OWASP Top 10** · **🧪 19K tests**\r  **🛠️ From zero to production — CLI only. No PhpStorm, no Postman, no Sequel Ace, no Jenkins.**\r Every task in this workflow is done with `php siro <command>`. Zero third-party tools required.\r  No other framework — PHP, Node, Go, Rust, Python, Ruby — has all five."
  },
  {
    "type": "h2",
    "id": "table-of-contents",
    "text": "Table of Contents"
  },
  {
    "type": "ol",
    "items": [
      "[Install & Run](#1-install--run)",
      "[Connect Database](#2-connect-database)",
      "[Build Features](#3-build-features)",
      "[Manual Testing](#4-manual-testing)",
      "[Write Automated Tests](#5-write-automated-tests)",
      "[Debug Errors](#6-debug-errors)",
      "[Deploy](#7-deploy)"
    ]
  },
  {
    "type": "note",
    "variant": "info",
    "text": "**Everything in this workflow is done from the terminal. Zero GUI tools needed.**\r \r | Task | Without Siro | With Siro |\r |------|-------------|-----------|\r | Create project | `composer create-project` | `composer create-project sirosoft/api` ✅ |\r | Generate JWT secret | Open random generator website | `php siro key:generate` ✅ |\r | Create database | Open Sequel Ace / phpMyAdmin | `php siro migrate` ✅ |\r | Build CRUD API | Write 6 files manually | `php siro make:crud` ✅ |\r | Test endpoints | Open Postman | `php siro t` ✅ |\r | Debug production | ssh → grep log → guess | `php siro log:replay` ✅ |\r | Deploy | Config Nginx + CI | `php siro deploy` / `docker compose up` ✅ |\r \r **CLI from A to Z. No third-party tools. No GUI. No context switching.**"
  },
  {
    "type": "h2",
    "id": "1-install-run",
    "text": "1. Install & Run"
  },
  {
    "type": "h3",
    "id": "requirements",
    "text": "Requirements"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php -v                        # PHP 8.2+\r\nphp -m | grep -E \"pdo|json|mbstring\"  # Required extensions\r\ncomposer -V                   # Composer\r"
  },
  {
    "type": "h3",
    "id": "create-project",
    "text": "Create Project"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "composer create-project sirosoft/api my-app\r\ncd my-app\r"
  },
  {
    "type": "h3",
    "id": "configure",
    "text": "Configure"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Auto-generate JWT secret\r\nphp siro key:generate\r\n\r\n# Validate environment\r\nphp siro env:check\r"
  },
  {
    "type": "h3",
    "id": "run",
    "text": "Run"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro serve\r\n# 👉 http://localhost:8080\r"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "curl http://localhost:8080\r\n# {\"success\":true,\"message\":\"Welcome to Siro API\",\"data\":{...}}\r"
  },
  {
    "type": "h3",
    "id": "directory-structure",
    "text": "Directory Structure"
  },
  {
    "type": "code",
    "code": "my-app/\r\n├── app/\r\n│   ├── Controllers/    # Handle requests\r\n│   ├── Models/         # ORM models\r\n│   ├── Services/       # Business logic\r\n│   ├── Repositories/   # Database access\r\n│   └── Resources/      # JSON transformation\r\n├── config/             # Config files\r\n├── database/\r\n│   └── migrations/     # Database migrations\r\n├── routes/\r\n│   └── api.php         # Route definitions\r\n├── tests/              # Test files\r\n└── storage/            # Logs, cache, sessions\r"
  },
  {
    "type": "h2",
    "id": "2-connect-database",
    "text": "2. Connect Database"
  },
  {
    "type": "h3",
    "id": "choose-driver",
    "text": "Choose Driver"
  },
  {
    "type": "p",
    "text": "SQLite by default — works immediately, no server needed."
  },
  {
    "type": "code",
    "lang": "env",
    "code": "# .env — SQLite (development)\r\nDB_CONNECTION=sqlite\r\nDB_DATABASE=storage/database.sqlite\r"
  },
  {
    "type": "p",
    "text": "Or MySQL:"
  },
  {
    "type": "code",
    "lang": "env",
    "code": "DB_CONNECTION=mysql\r\nDB_HOST=127.0.0.1\r\nDB_PORT=3306\r\nDB_DATABASE=my_app\r\nDB_USERNAME=root\r\nDB_PASSWORD=secret\r"
  },
  {
    "type": "h3",
    "id": "create-database",
    "text": "Create Database"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# SQLite — auto-created, nothing to do\r\n# MySQL — create database first:\r\nmysql -u root -p -e \"CREATE DATABASE my_app CHARACTER SET utf8mb4\"\r"
  },
  {
    "type": "h3",
    "id": "run-migrations",
    "text": "Run Migrations"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro migrate\r\n# ✅ Migration table created successfully.\r\n# ✅ 2026_04_27_110100_create_users_table ........................... 25ms\r\n# ✅ 2026_05_04_000000_create_products_table ........................ 18ms\r\n# ✅ 13 migrations, 0 failures\r"
  },
  {
    "type": "h3",
    "id": "verify-connection",
    "text": "Verify Connection"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro db:show users\r\n# Table users: id, name, email, password, status, created_at, updated_at\r"
  },
  {
    "type": "h2",
    "id": "3-build-features",
    "text": "3. Build Features"
  },
  {
    "type": "note",
    "variant": "info",
    "text": "**⚡ Killer Feature #1 — 1-command CRUD**\r Laravel: `php artisan make:model -mcr Product` + manually write Controller, Service, Resource, Test\r **Siro: `php siro make:crud products`** — 6 files, zero config, instantly working."
  },
  {
    "type": "h3",
    "id": "3a-generate-auth-login-register",
    "text": "3a. Generate Auth (login, register)"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro make:auth\r\nphp siro migrate\r"
  },
  {
    "type": "p",
    "text": "6 endpoints, ready to use:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "POST /api/auth/register       # Register\r\nPOST /api/auth/login          # Login → JWT\r\nPOST /api/auth/refresh        # Refresh token\r\nPOST /api/auth/logout         # Logout\r\nPOST /api/auth/forgot-password\r\nPOST /api/auth/reset-password\r\nGET  /api/auth/me             # Profile\r"
  },
  {
    "type": "h3",
    "id": "3b-generate-crud-one-command",
    "text": "3b. Generate CRUD (one command)"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro make:crud products\r\nphp siro migrate\r"
  },
  {
    "type": "p",
    "text": "1 command generates 6 files:"
  },
  {
    "type": "table",
    "headers": [
      "File",
      "Purpose"
    ],
    "rows": [
      [
        "`app/Models/Product.php`",
        "Model + fillable + casts"
      ],
      [
        "`app/Controllers/ProductController.php`",
        "CRUD controller"
      ],
      [
        "`app/Resources/ProductResource.php`",
        "JSON transformer"
      ],
      [
        "`database/migrations/..._create_products_table.php`",
        "Migration"
      ],
      [
        "`routes/api.php`",
        "5 routes auto-injected"
      ],
      [
        "`tests/Feature/ProductTest.php`",
        "CRUD test"
      ]
    ]
  },
  {
    "type": "p",
    "text": "API available immediately:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "GET    /api/products          # List (paginated)\r\nPOST   /api/products          # Create\r\nGET    /api/products/{id}     # Detail\r\nPUT    /api/products/{id}     # Update\r\nDELETE /api/products/{id}     # Delete\r"
  },
  {
    "type": "h3",
    "id": "3c-add-service-repository",
    "text": "3c. Add Service + Repository"
  },
  {
    "type": "p",
    "text": "For complex business logic:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro make:service ProductService\r\nphp siro make:repository ProductRepository\r"
  },
  {
    "type": "h3",
    "id": "3d-add-relationships",
    "text": "3d. Add Relationships"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// app/Models/Product.php\r\npublic function category(): BelongsTo\r\n{\r\n    return $this->belongsTo(Category::class);\r\n}\r\n\r\npublic function reviews(): HasMany\r\n{\r\n    return $this->hasMany(Review::class);\r\n}\r\n\r\n// Use with eager loading\r\n$products = Product::with('category', 'reviews')->paginate(20);\r\n// 3 queries instead of N+1\r"
  },
  {
    "type": "h3",
    "id": "3e-validation",
    "text": "3e. Validation"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// In controller\r\n$validated = $request->validate([\r\n    'name' => 'required|string|max:255|unique:products,name',\r\n    'price' => 'required|numeric|min:0',\r\n    'category_id' => 'required|exists:categories,id',\r\n    'description' => 'string|max:10000',\r\n]);\r"
  },
  {
    "type": "h3",
    "id": "3f-middleware-access-control",
    "text": "3f. Middleware (Access Control)"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// routes/api.php\r\n$router->resource('products', ProductController::class)\r\n    ->middleware(['auth', 'throttle:60,1']);\r\n\r\n// Role-based access\r\n$router->put('/api/users/{id}', [UserController::class, 'update'])\r\n    ->middleware(['auth:admin']);\r"
  },
  {
    "type": "h2",
    "id": "4-manual-testing",
    "text": "4. Manual Testing"
  },
  {
    "type": "p",
    "text": "No Postman needed. Test directly from your terminal."
  },
  {
    "type": "note",
    "variant": "info",
    "text": "**⚡ Killer Feature #2 — CLI API Testing (no Postman)**\r Other frameworks: open Postman/Insomnia, enter URL, set headers, type body, copy token...\r **Siro: `php siro t`** — one command, token auto-saved."
  },
  {
    "type": "h3",
    "id": "4a-register-login",
    "text": "4a. Register + Login"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Register\r\nphp siro t POST /api/auth/register \\\r\n    name=\"John\" email=\"john@test.com\" password=\"secret123\"\r\n\r\n# Login (token auto-saved with --as)\r\nphp siro t POST /api/auth/login \\\r\n    email=\"john@test.com\" password=\"secret123\" --as=user\r"
  },
  {
    "type": "h3",
    "id": "4b-test-endpoints",
    "text": "4b. Test Endpoints"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Product CRUD (token auto-attached from --as)\r\nphp siro t GET /api/products --as=user\r\nphp siro t POST /api/products name=\"Laptop\" price=999 --as=user\r\nphp siro t GET /api/products/1 --as=user\r\nphp siro t DELETE /api/products/1 --as=admin\r"
  },
  {
    "type": "h3",
    "id": "4c-load-test",
    "text": "4c. Load Test"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro t GET /api/products --as=user --loop=100\r\n# Runs 100 requests, shows response times\r"
  },
  {
    "type": "h3",
    "id": "4d-list-routes",
    "text": "4d. List Routes"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro route:list\r\n# GET  /api/products         → index\r\n# POST /api/products         → store\r\n# GET  /api/products/{id}    → show\r\n# PUT  /api/products/{id}    → update\r"
  },
  {
    "type": "h2",
    "id": "5-write-automated-tests",
    "text": "5. Write Automated Tests"
  },
  {
    "type": "note",
    "variant": "info",
    "text": "**⚡ Killer Feature #2 (continued) — Testing without Postman, auto-generated tests**\r Other frameworks: manually write tests, use Postman for API testing, configure separate HTTP client.\r **Siro: `php siro make:crud` auto-generates CRUD tests, `php siro t` for CLI testing, `php siro test` runs everything.**\r From manual testing → automated tests → coverage — all in the terminal, never leave your editor."
  },
  {
    "type": "h3",
    "id": "5a-generate-test",
    "text": "5a. Generate Test"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro make:test ProductApi\r"
  },
  {
    "type": "h3",
    "id": "5b-write-test",
    "text": "5b. Write Test"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// tests/Feature/ProductApiTest.php\r\nclass ProductApiTest extends TestCase\r\n{\r\n    public function test_can_list_products(): void\r\n    {\r\n        $response = $this->get('/api/products');\r\n        $this->assertSame(200, $response->statusCode());\r\n    }\r\n\r\n    public function test_can_create_product(): void\r\n    {\r\n        $headers = $this->authenticate();\r\n\r\n        $response = $this->post('/api/products', [\r\n            'name' => 'Test Product',\r\n            'price' => 99.99,\r\n        ], $headers);\r\n\r\n        $this->assertSame(201, $response->statusCode());\r\n        $json = $response->json();\r\n        $this->assertSame('Test Product', $json['data']['name']);\r\n    }\r\n\r\n    public function test_validation_fails_without_name(): void\r\n    {\r\n        $headers = $this->authenticate();\r\n\r\n        $response = $this->post('/api/products', [\r\n            'price' => 99.99,\r\n        ], $headers);\r\n\r\n        $this->assertSame(422, $response->statusCode());\r\n    }\r\n\r\n    public function test_unauthenticated_user_cannot_create(): void\r\n    {\r\n        $response = $this->post('/api/products', [\r\n            'name' => 'Test',\r\n            'price' => 99.99,\r\n        ]);\r\n        // No token sent → 401\r\n        $this->assertSame(401, $response->statusCode());\r\n    }\r\n}\r"
  },
  {
    "type": "h3",
    "id": "5c-run-tests",
    "text": "5c. Run Tests"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# All tests\r\nphp siro test\r\n\r\n# Filter by name\r\nphp siro test --filter=Product\r\n\r\n# With coverage\r\nphp siro test --coverage\r\n\r\n# Sample output\r\n# PHPUnit 11.5.50\r\n# Tests: 462, Assertions: 783, 0 failures\r"
  },
  {
    "type": "h2",
    "id": "5d-export-api-docs-swagger-postman",
    "text": "5d. Export API Docs (Swagger + Postman)"
  },
  {
    "type": "p",
    "text": "Code xong → export spec ngay. Không cần viết annotation."
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Export OpenAPI 3.0.3 spec (27 endpoints, auto-detected)\r\nphp siro make:openapi --with-swagger\r\n# → docs/openapi.json\r\n# → public/openapi.json    (public URL)\r\n# → public/docs.html       (Swagger UI)\r\n\r\n# Export Postman collection (folder structure, auto-login)\r\nphp siro make:postman\r\n# → docs/postman/collection.json\r\n# → public/postman_collection.json\r"
  },
  {
    "type": "p",
    "text": "Mở Swagger UI trên trình duyệt:"
  },
  {
    "type": "code",
    "code": "http://localhost:8080/docs.html\r"
  },
  {
    "type": "p",
    "text": "Hoặc import vào Postman:"
  },
  {
    "type": "code",
    "code": "http://localhost:8080/postman_collection.json\r"
  },
  {
    "type": "p",
    "text": "Mọi thứ đều dynamic — thêm API mới, export lại là spec tự cập nhật:"
  },
  {
    "type": "table",
    "headers": [
      "Thành phần",
      "Cơ chế"
    ],
    "rows": [
      [
        "**Routes**",
        "Tự động đọc từ app — thêm route là xuất hiện"
      ],
      [
        "**Request body**",
        "Parse từ `$this->validate([...])` trong Controller"
      ],
      [
        "**Response body**",
        "Parse từ `Resource::toArray()`"
      ],
      [
        "**Tags/Folders**",
        "Từ tên Controller (`ProductController` → `Products`)"
      ],
      [
        "**Auth**",
        "Tự động detect middleware `auth` → bearerAuth"
      ],
      [
        "**Postman auth**",
        "Pre-request script auto-login, tự động gắn token"
      ]
    ]
  },
  {
    "type": "h2",
    "id": "6-debug-errors",
    "text": "6. Debug Errors"
  },
  {
    "type": "h3",
    "id": "6a-auto-trace-every-request",
    "text": "6a. Auto Trace (every request)"
  },
  {
    "type": "p",
    "text": "Every response includes a trace header:"
  },
  {
    "type": "code",
    "lang": "http",
    "code": "X-Siro-Trace-Id: siro_a1b2c3d4e5\r"
  },
  {
    "type": "h3",
    "id": "6b-find-traces",
    "text": "6b. Find Traces"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Most recent trace\r\nphp siro why\r\n\r\n# Trace by ID\r\nphp siro log:trace siro_a1b2c3d4e5\r\n\r\n# Search without trace ID (only know the broken endpoint)\r\nphp siro log:trace --path=/api/orders --status=500 --since=1h\r\n\r\n# Search by IP (customer says \"my order failed\")\r\nphp siro log:trace --ip=203.0.113.42 --error=\"SQL\"\r"
  },
  {
    "type": "h3",
    "id": "6c-inspect-trace",
    "text": "6c. Inspect Trace"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro log:trace siro_a1b2c3d4e5\r\n# Output:\r\n#   Route:    POST /api/orders\r\n#   Status:   500\r\n#   Duration: 2.3s\r\n#   Timeline:\r\n#     AuthMiddleware             [3ms]\r\n#     SELECT * FROM products…   [200ms]\r\n#     SELECT * FROM orders…     [1.8s] ← SLOW\r\n#   Exception: PDOException: SQLSTATE[HY000]\r\n#   N+1 Detected: Order::products (50×)\r"
  },
  {
    "type": "note",
    "variant": "info",
    "text": "**⚡ Killer Feature #3 — Request Replay (THE REAL MOAT)**\r Laravel/Symfony/Rails/FastAPI/Express/Gin: send logs → \"let me reproduce it manually\"\r **Siro: `php siro log:replay`** — one command to replay the exact production request.\r Search trace → Inspect → Edit → Diff → Verify. All in terminal. No manual reproduction needed."
  },
  {
    "type": "h3",
    "id": "6d-replay-request",
    "text": "6d. Replay Request"
  },
  {
    "type": "p",
    "text": "No manual reproduction. Replay the exact failed request:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Dry-run (safe, default in production)\r\nphp siro log:replay siro_a1b2c3d4e5\r\n\r\n# Edit body before replay\r\nphp siro log:replay siro_a1b2c3d4e5 --edit\r\n\r\n# Compare before/after fix\r\nphp siro log:replay siro_a1b2c3d4e5 --diff\r\n\r\n# Execute for real\r\nphp siro log:replay siro_a1b2c3d4e5 --force\r"
  },
  {
    "type": "h3",
    "id": "6e-complete-debug-flow",
    "text": "6e. Complete Debug Flow"
  },
  {
    "type": "code",
    "code": "1. Customer reports \"order failed\"                    ← No trace ID\r\n2. php siro log:trace --path=/api/orders --status=500 --since=1h\r\n3. php siro log:trace siro_a1b2c3                      ← See full context\r\n4. php siro log:replay siro_a1b2c3 --edit              ← Edit + test fix\r\n5. php siro log:replay siro_a1b2c3 --diff              ← Compare results\r\n6. php siro log:replay siro_a1b2c3 --force              ← Verify fix\r"
  },
  {
    "type": "p",
    "text": "No other framework has this flow."
  },
  {
    "type": "h3",
    "id": "6f-other-debug-commands",
    "text": "6f. Other Debug Commands"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro log:tail              # Real-time log streaming\r\nphp siro log:slow              # Slow requests\r\nphp siro log:stats             # Request statistics\r\nphp siro tinker                # Interactive PHP REPL\r"
  },
  {
    "type": "h2",
    "id": "7-deploy",
    "text": "7. Deploy"
  },
  {
    "type": "note",
    "variant": "info",
    "text": "**⚡ Killer Feature #4 — Zero dependency runtime + Security built-in**\r Other frameworks: ~60-200 dependencies (composer install takes 2 minutes, audit finds 10 vulnerabilities).\r **Siro: 0 dependencies.** `composer install` in 5 seconds, `composer audit` = 0 vulnerabilities.\r OWASP Top 10 mitigated from the start — CSP, CORS, CSRF, SQLi (100% prepared statements), XSS."
  },
  {
    "type": "h3",
    "id": "7a-pre-deploy-checks",
    "text": "7a. Pre-Deploy Checks"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Comprehensive health check\r\nphp siro doctor --prod\r\n\r\n# Optimize for production\r\nphp siro optimize\r\n# → env cached\r\n# → config cached (HMAC-signed)\r\n# → routes cached\r\n# → autoloader optimized\r"
  },
  {
    "type": "h3",
    "id": "7b-production-checklist",
    "text": "7b. Production Checklist"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# 1. Environment\r\nAPP_ENV=production\r\nAPP_DEBUG=false\r\n\r\n# 2. Strong JWT secret (>= 32 chars)\r\nphp siro key:generate\r\n\r\n# 3. Database migrated\r\nphp siro migrate\r\n\r\n# 4. Optimize\r\nphp siro optimize\r"
  },
  {
    "type": "h3",
    "id": "7c-docker-frankenphp",
    "text": "7c. Docker (FrankenPHP)"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Production (FrankenPHP — multi-worker, HTTP/2, HTTP/3, auto HTTPS)\r\ndocker compose up -d\r\n\r\n# Verify\r\ncurl https://yourdomain.com/health/live\r\n# {\"success\":true,\"data\":{\"status\":\"alive\"}}\r"
  },
  {
    "type": "h3",
    "id": "7d-manual-deploy",
    "text": "7d. Manual Deploy"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro deploy\r\n# 1. Run tests\r\n# 2. Optimize\r\n# 3. Deploy via Git/rsync\r\n# 4. Restart services\r"
  },
  {
    "type": "h2",
    "id": "the-cli-way-a-to-z",
    "text": "🛠️ The CLI Way — A to Z"
  },
  {
    "type": "code",
    "code": "composer create-project sirosoft/api my-app   # 1. Install\r\ncd my-app\r\nphp siro key:generate                          # 2. Secret\r\nphp siro env:check                             # 3. Validate\r\nphp siro make:auth                             # 4. Auth\r\nphp siro make:crud Product                     # 5. CRUD\r\nphp siro migrate                               # 6. Database\r\nphp siro t POST /api/auth/login ... --as=user  # 7. Test\r\nphp siro t GET /api/products --as=user         # 8. Verify\r\nphp siro test                                  # 9. Automated tests\r\nphp siro doctor --prod                         # 10. Pre-deploy\r\nphp siro optimize                              # 11. Optimize\r\ndocker compose up -d                           # 12. Deploy\r"
  },
  {
    "type": "p",
    "text": "12 commands. Zero GUI. Zero third-party. From zero to production."
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Bonus: Export API docs for frontend team\r\nphp siro make:openapi --with-swagger                # 13. OpenAPI spec\r\nphp siro make:postman                                # 14. Postman collection\r"
  },
  {
    "type": "p",
    "text": "14 commands. Full API documentation — zero manual writing."
  },
  {
    "type": "h2",
    "id": "comparison-siro-vs-other-frameworks",
    "text": "Comparison: Siro vs Other Frameworks"
  },
  {
    "type": "table",
    "headers": [
      "Step",
      "Other Frameworks",
      "Siro"
    ],
    "rows": [
      [
        "**Install**",
        "`composer install` ~200 deps, 2 min",
        "**0 deps, 5 seconds**"
      ],
      [
        "**Auth**",
        "Configure JWT for an hour",
        "**`php siro make:auth`**"
      ],
      [
        "**CRUD**",
        "Write Controller + Model + Migration + Test manually",
        "**`php siro make:crud`**"
      ],
      [
        "**API testing**",
        "Open Postman, config headers, type body",
        "**`php siro t`** — one command"
      ],
      [
        "**Debug production**",
        "Send logs → reproduce manually",
        "**`php siro log:replay`** — exact replay"
      ],
      [
        "**Security**",
        "Configure each layer yourself",
        "**OWASP Top 10 mitigated by default**"
      ],
      [
        "**Boot time**",
        "50-80ms (Laravel)",
        "**~1ms**"
      ],
      [
        "**Deploy config**",
        "Nginx + PHP-FPM + manual config",
        "**`docker compose up -d`** FrankenPHP"
      ]
    ]
  }
],
}
