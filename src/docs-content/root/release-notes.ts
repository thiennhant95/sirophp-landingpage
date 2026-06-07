
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Release Notes",
    description: "- API Response Contract v1 with standardized envelope format",
    category: "root",
    order: 0,
    icon: "📄",
  },
  content: [
  {
    "type": "h2",
    "id": "v0-35-0-2026-06-07",
    "text": "v0.35.0 (2026-06-07)"
  },
  {
    "type": "ul",
    "items": [
      "Redis-backed rate limiter driver for high-traffic production deployments",
      "Email verification flow with token-based confirmation and resend support",
      "Demo workflow mode for quick prototyping and client presentations",
      "Debug improvements: enhanced trace filtering, replay diff highlighting, structured error output",
      "PHPStan level max: 0 errors across core + skeleton",
      "Full test suite passing: 19K+ core tests, 463 skeleton tests — 0 failures"
    ]
  },
  {
    "type": "h2",
    "id": "v0-34-0-2026-06-04",
    "text": "v0.34.0 (2026-06-04)"
  },
  {
    "type": "ul",
    "items": [
      "Enterprise audit: PHPStan level max — zero errors across source + test suite",
      "19,190 tests passing — 0 failures, 0 skipped",
      "QueryBuilder UPSERT fix: INSERT ON DUPLICATE KEY UPDATE now works correctly",
      "Admin starters CSRF/security hardening applied to Next.js + Nuxt starters",
      "CLI help texts fixed: all command descriptions rendering correctly across terminals",
      "Response Contract v1 finalized — standardized envelope for all API responses"
    ]
  },
  {
    "type": "h2",
    "id": "v0-33-0-2026-06-02",
    "text": "v0.33.0 (2026-06-02)"
  },
  {
    "type": "ul",
    "items": [
      "Security audit: OWASP Top 10 full coverage — 42/42 penetration tests passed",
      "Auth timing attack fix: constant-time comparison for token verification",
      "Session hardening: regenerate ID on privilege escalation",
      "CSRF token rotation: tokens invalidated after use",
      "Rate limiter: sliding window algorithm prevents bypass via reset"
    ]
  },
  {
    "type": "h2",
    "id": "v0-32-0-2026-05-30",
    "text": "v0.32.0 (2026-05-30)"
  },
  {
    "type": "ul",
    "items": [
      "API Response Contract v1 with standardized envelope format",
      "OpenAPI generator now produces spec matching Response Contract",
      "TypeScript types auto-generated from OpenAPI spec",
      "Enterprise admin starters: Next.js 15 + Nuxt 3",
      "3 rounds security audit: 115 issues fixed",
      "Upload helper: `App\\Support\\Uploader` — one-liner file upload",
      "File storage: date-organized (`{type}/YYYY/MM/{uuid}.{ext}`)",
      "PHPStan level max: zero errors across all source",
      "Self-documenting code: PHPDoc on all controllers/services/routes",
      "CONTRIBUTING.md with 6-step module creation guide"
    ]
  },
  {
    "type": "h2",
    "id": "v0-31-0-2026-05-28",
    "text": "v0.31.0 (2026-05-28)"
  },
  {
    "type": "ul",
    "items": [
      "Role constants class (`App\\Role::ADMIN` / `Role::USER`)",
      "Standardized API conventions (pagination, validation, auth, upload)",
      "Model fillable/hidden/casts standardization",
      "Console version constant alignment",
      "Bugfix: CORS header handling for X-Request-Id",
      "Bugfix: refresh token parsing in auth interceptor",
      "Bugfix: multiple file upload edge cases"
    ]
  },
  {
    "type": "h2",
    "id": "v0-30-0-2026-05-25",
    "text": "v0.30.0 (2026-05-25)"
  },
  {
    "type": "ul",
    "items": [
      "Dashboard/stats endpoint with flat response structure",
      "Profile update endpoint with avatar support",
      "Settings endpoints (language, timezone, currency)",
      "Order status update endpoint (PATCH)",
      "Generic file upload endpoint (/api/upload)",
      "MySQL/MariaDB portable installation support",
      "PHP version manager (runtime:install/switch/list)",
      "Improved migration system stability"
    ]
  },
  {
    "type": "h2",
    "id": "v0-29-6-mcp-server-github-release-2026-05-22",
    "text": "v0.29.6 — MCP Server GitHub Release (2026-05-22)"
  },
  {
    "type": "h3",
    "id": "mcp-server",
    "text": "🤖 MCP Server"
  },
  {
    "type": "ul",
    "items": [
      "**MCP Server v0.1.0** published to GitHub: `SiroSoft/siro-mcp-server`",
      "Updated `sirosoft/mcp-server` constraint from `@dev` to `^0.1.0` with VCS repository",
      "Local path repository replaced with GitHub VCS (`https://github.com/SiroSoft/siro-mcp-server.git`)"
    ]
  },
  {
    "type": "h2",
    "id": "v0-29-5-bug-fixes-2026-05-22",
    "text": "v0.29.5 — Bug Fixes (2026-05-22)"
  },
  {
    "type": "h3",
    "id": "bug-fixes",
    "text": "🔧 Bug Fixes"
  },
  {
    "type": "ul",
    "items": [
      "**core v0.29.5**: Updated `sirosoft/core` constraint from `^0.28.1` to `^0.29.5` - `ModelQueryBuilder::__call()` now proxies to parent `QueryBuilder` (e.g. `whereNull`, `whereRaw`, `whereIn`) - `Response::getStatusCode()` alias for Laravel compatibility"
    ]
  },
  {
    "type": "h2",
    "id": "v0-29-4-mcp-server-package-2026-05-22",
    "text": "v0.29.4 — MCP Server Package (2026-05-22)"
  },
  {
    "type": "h3",
    "id": "mcp-server",
    "text": "🤖 MCP Server"
  },
  {
    "type": "ul",
    "items": [
      "**New package**: `sirosoft/mcp-server` — AI Agent MCP server for SiroPHP",
      "**9 MCP tools**: `analyze_project`, `read_documentation`, `execute_cli` (sandboxed), `write_file`, `patch_file` (diff mode), `scaffold_model`, `scaffold_controller`, `scaffold_migration`, `scaffold_resource`",
      "**24 resources** across 3 providers: `siro://docs/*` (14 docs), `siro://app/*` (9 project data), `siro://debug/*` (traces & errors)",
      "**CLI command**: `php siro mcp:serve` — starts JSON-RPC 2.0 server over stdio",
      "**Sandbox security**: 31-command whitelist, blocklist (`tinker`, `shell`, `exec`), destructive gate with `--force`",
      "**Auto-discovery** via `extra.siro.commands` in Composer"
    ]
  },
  {
    "type": "h3",
    "id": "documentation",
    "text": "📚 Documentation"
  },
  {
    "type": "ul",
    "items": [
      "Added complete MCP Server implementation guide"
    ]
  },
  {
    "type": "h2",
    "id": "v0-29-3-schema-inspection-test-coverage-2026-05-22",
    "text": "v0.29.3 — Schema Inspection & Test Coverage (2026-05-22)"
  },
  {
    "type": "h3",
    "id": "testing",
    "text": "🧪 Testing"
  },
  {
    "type": "ul",
    "items": [
      "Added integration tests for `Schema::hasColumn()` and `Schema::getColumnListing()` with SQLite in-memory",
      "Added Blueprint tests for `->after()` modifier across all drivers (MySQL, MariaDB, SQLite, PostgreSQL)",
      "53 unit/integration tests pass in siro-core"
    ]
  },
  {
    "type": "h3",
    "id": "documentation",
    "text": "📚 Documentation"
  },
  {
    "type": "ul",
    "items": [
      "Added **Schema Inspection** section to DATABASE.md — documents `hasTable()`, `hasColumn()`, `getColumnListing()`",
      "Clarified `->after()` modifier: MySQL/MariaDB only, ALTER TABLE only"
    ]
  },
  {
    "type": "h2",
    "id": "v0-29-2-package-auto-discovery-2026-05-22",
    "text": "v0.29.2 — Package Auto-Discovery (2026-05-22)"
  },
  {
    "type": "h3",
    "id": "package-ecosystem",
    "text": "🚀 Package Ecosystem"
  },
  {
    "type": "ul",
    "items": [
      "**`composer require` = instant availability**: Siro-core `v0.29.2` now auto-discovers CLI commands and service providers from installed packages via `extra.siro` in `composer.json`",
      "Packages can register commands (appear in `php siro list`) and HTTP providers (register routes, bindings, etc.) without manual configuration"
    ]
  },
  {
    "type": "h3",
    "id": "package-convention-example",
    "text": "📋 Package Convention Example"
  },
  {
    "type": "code",
    "lang": "json",
    "code": "{\r\n    \"extra\": {\r\n        \"siro\": {\r\n            \"commands\": {\r\n                \"my:command\": {\r\n                    \"handler\": \"Vendor\\\\Package\\\\MyCommand\",\r\n                    \"desc\": \"Description\"\r\n                }\r\n            },\r\n            \"providers\": [\r\n                \"Vendor\\\\Package\\\\ServiceProvider\"\r\n            ]\r\n        }\r\n    }\r\n}\r"
  },
  {
    "type": "h2",
    "id": "v0-28-2-schema-migration-enhancements-2026-05-22",
    "text": "v0.28.2 — Schema & Migration Enhancements (2026-05-22)"
  },
  {
    "type": "h3",
    "id": "migration-system",
    "text": "🏗 Migration System"
  },
  {
    "type": "ul",
    "items": [
      "**`Blueprint::dropIndex()`, `dropUnique()`, `dropForeign()`**: Remove indexes, unique constraints, and foreign keys in ALTER TABLE",
      "**`Blueprint::primary()` for composite keys**: Define composite PRIMARY KEY via `$table->primary(['order_id', 'product_id'])`",
      "**`compileAlter()` full command support**: ALTER TABLE now handles `foreign`, `unique`, `index`, `dropIndex`, `dropForeign` in addition to `addColumn`/`dropColumn`",
      "**`Schema::table()`**: Now executes multiple ALTER statements (not just first)"
    ]
  },
  {
    "type": "h3",
    "id": "bug-fixes",
    "text": "🔧 Bug Fixes"
  },
  {
    "type": "ul",
    "items": [
      "**PRIMARY KEY not compiled**: `compileCreate()` silently dropped `primary` commands — fixed (skips duplicate when column type is `id`)",
      "**DEFAULT false → invalid SQL**: `(string) false` produced empty string — now outputs `DEFAULT 0` / `DEFAULT 1`"
    ]
  },
  {
    "type": "h3",
    "id": "testing",
    "text": "🧪 Testing"
  },
  {
    "type": "ul",
    "items": [
      "28 Schema tests pass, PHPStan Level Max: 0 errors"
    ]
  },
  {
    "type": "h2",
    "id": "v0-28-0-model-enhancement-2026-05-22",
    "text": "v0.28.0 — Model Enhancement (2026-05-22)"
  },
  {
    "type": "h3",
    "id": "new-model-features",
    "text": "✨ New Model Features"
  },
  {
    "type": "ul",
    "items": [
      "**Accessors & Mutators**: Transform attributes automatically when getting (`getNameAttribute()`) or setting (`setEmailAttribute()`)",
      "**Virtual Attributes (Appends)**: Abstract computed fields like `full_name`, `initials` to JSON/array serialization via `$appends` property",
      "**DateTime Auto-Formatting**: `datetime` and `date` casts now return formatted strings instead of DateTime objects, fixing JSON serialization errors",
      "**Appends Getters/Setters**: `getAppends()`, `setAppends()` for runtime manipulation"
    ]
  },
  {
    "type": "h3",
    "id": "documentation",
    "text": "📚 Documentation"
  },
  {
    "type": "ul",
    "items": [
      "Updated `docs/api/Model.md` with comprehensive Accessors, Mutators, Appends, and DateTime formatting examples"
    ]
  },
  {
    "type": "h2",
    "id": "v0-27-0-developer-experience-overhaul-2026-05-20",
    "text": "v0.27.0 — Developer Experience Overhaul (2026-05-20)"
  },
  {
    "type": "h3",
    "id": "security-audit-fixes",
    "text": "🛡️ Security Audit Fixes"
  },
  {
    "type": "ul",
    "items": [
      "**Env cache**: 11 sensitive keys (APP_KEY, JWT_SECRET, MAIL_PASSWORD, etc.) automatically excluded from cache",
      "**CORS**: `.env.siro` default restricted to localhost origins",
      "**IDOR**: User ID ownership checks on Order and Post controllers (index/show/update/delete)",
      "**XSS**: All 6 Resource transformers use `htmlspecialchars()` with ENT_QUOTES | ENT_HTML5",
      "**JWT validation**: Algorithm mismatch detection, no \"none\" bypass possible",
      "**Session fixation**: `Session::regenerate()` called after every login",
      "**Token storage**: Reset/verification tokens hashed with SHA-256 before DB insert",
      "**Log sanitization**: Passwords, tokens, credit cards auto-redacted"
    ]
  },
  {
    "type": "h3",
    "id": "api-reference-documentation-59-files-9-789-lines",
    "text": "📚 API Reference Documentation (59 files, 9,789 lines)"
  },
  {
    "type": "ul",
    "items": [
      "**34 API reference docs**: Container, Request, Response, Router, Middleware, Model, Validation, Encryption, Events, Queue, Mail, Storage, Session, Debug, Testing, CLI, Resource, Collection, Helpers, Pagination, Observers, SoftDeletes, Schedule, Console, FormRequest, Metrics, UploadedFile, Hash, Logger, Str, Url, Http, Config, Lang",
      "**13 detailed guides**: Auth, Database, Testing, Deployment, Caching, Events, FileUpload, I18N, Migration, QueueMail, Validation, APIVersioning",
      "**WORKFLOW.md**: Complete A-to-Z guide from install to production",
      "**All docs in English**, zero Vietnamese"
    ]
  },
  {
    "type": "h3",
    "id": "cli-developer-experience",
    "text": "🖥 CLI & Developer Experience"
  },
  {
    "type": "ul",
    "items": [
      "**Tab completion**: `siro-completion.bash` + `siro-completion.zsh` for Bash and Zsh",
      "**`php siro list --raw`**: Raw command list for completion scripts",
      "**`php siro list --json`**: JSON format for tooling/IDE integration",
      "**`sd()` helper**: Siro Dump — dump variables with name (`dd()` kept as alias)",
      "**CLI colors**: Error in red, success in green, warning in yellow, info in blue (auto-detect terminal)",
      "**`_ide_helper.php`**: Full `@method` annotations for Route, DB, Cache, Event, Logger, Hash, Encrypter, Storage, Session, Str facades",
      "**`.phpstorm.meta.php`**: Container::make() returns correct types in PhpStorm",
      "**JWT error detail**: Debug mode shows specific errors (expired, bad signature, revoked, algorithm mismatch). Production keeps generic \"Invalid or expired token\"",
      "**DB connection error**: Custom exception with configuration troubleshooting hints",
      "**Route 404 \"Did you mean?\"**: Suggests similar routes when debug mode enabled",
      "**`make:observer`**: Generate model observer class",
      "**`make:request`**: Generate FormRequest class with validation rules",
      "**`make:rule`**: Generate custom validation rule class",
      "**Auto timestamps**: Model `$timestamps = true` auto-sets `created_at`/`updated_at` on save"
    ]
  },
  {
    "type": "h3",
    "id": "rest-api-quality",
    "text": "📝 REST API Quality"
  },
  {
    "type": "ul",
    "items": [
      "**Error format**: Errors moved from `meta.errors` to top-level `errors` — standard REST API convention",
      "**`.env.example`**: Template shipped with project",
      "**`favicon.ico` + `robots.txt`**: Routes prevent 404 noise from browser requests"
    ]
  },
  {
    "type": "h3",
    "id": "export-openapi-postman",
    "text": "📦 Export (OpenAPI + Postman)"
  },
  {
    "type": "ul",
    "items": [
      "**operationId**: All 27 endpoints have auto-generated operationIds (`productList`, `authLogin`, ...)",
      "**Dynamic descriptions**: Response descriptions per resource (\"Products list\", \"User created\", \"Password reset\")",
      "**Path param descriptions**: Each path parameter has a description (\"Product ID\")",
      "**PATCH optional**: PATCH request fields are all optional (not required)",
      "**Response examples**: Example values auto-generated from Resource transformers",
      "**Postman folders**: Collection grouped into 8 folders (Auth, Product, Order, User, Category, Tag, Post, General)",
      "**Postman variable syntax**: `{{id}}` instead of `:id` — correct Postman format",
      "**Postman response examples**: Response body auto-generated from Resource files",
      "**Public copy**: `public/openapi.json` and `public/postman_collection.json` automatically updated"
    ]
  },
  {
    "type": "h3",
    "id": "bug-fixes",
    "text": "🐛 Bug Fixes"
  },
  {
    "type": "ul",
    "items": [
      "**Pagination**: Missing docs for built-in pagination",
      "**PostService**: `user_id` field dropped during post creation (IDOR store fix)",
      "**Migration compatibility**: `user_id` column added to base orders/posts table migrations (not just ALTER TABLE)",
      "**PHPStan level max**: All 6 new errors from OpenAPI command fixed"
    ]
  },
  {
    "type": "h2",
    "id": "v0-28-1-migration-querybuilder-enhancements-2026-05-19",
    "text": "v0.28.1 — Migration & QueryBuilder Enhancements (2026-05-19)"
  },
  {
    "type": "h3",
    "id": "migration-system",
    "text": "🏗 Migration System"
  },
  {
    "type": "ul",
    "items": [
      "**`migrate:fresh`**: Drop all tables + re-migrate with `--seed` option",
      "**`migrate:status --pending`**: Show only pending migrations",
      "**`foreignId()`** helper added to Blueprint",
      "File naming standardized to `Y_m_d_His`"
    ]
  },
  {
    "type": "h3",
    "id": "querybuilder",
    "text": "🔧 QueryBuilder"
  },
  {
    "type": "ul",
    "items": [
      "**`groupByRaw()`** / **`havingRaw()`**: Raw SQL functions in GROUP BY, HAVING",
      "**`DB::raw()`**: Raw expression facade for any clause"
    ]
  },
  {
    "type": "h3",
    "id": "cli",
    "text": "🖥 CLI"
  },
  {
    "type": "ul",
    "items": [
      "**`registerCommand()`** / **`registerCommands()`**: Register custom commands from app code",
      "**`env:check`**: MySQL version check (> 8.0 for JSON column support)",
      "**`log:trace`**: 4 new filters — `--ip`, `--path`, `--error`, `--since`"
    ]
  },
  {
    "type": "h3",
    "id": "other",
    "text": "🧰 Other"
  },
  {
    "type": "ul",
    "items": [
      "**`Response::raw()`**: Auto-detect Content-Type (JSON, HTML)",
      "19,496 tests passing (19,034 core + 462 skeleton), 0 failures",
      "PHPStan level max: 0 errors"
    ]
  },
  {
    "type": "h2",
    "id": "v0-28-0-comprehensive-security-audit-2026-05-19",
    "text": "v0.28.0 — Comprehensive Security Audit (2026-05-19)"
  },
  {
    "type": "h3",
    "id": "security-hardening",
    "text": "🛡️ Security Hardening"
  },
  {
    "type": "ul",
    "items": [
      "7 CRITICAL fixes: RCE, SMTP injection, Code injection, SQL compat, HMAC, Listeners, Tests",
      "8 HIGH fixes: SSRF, MITM, Rate limit bypass, JTI blacklist, Redis cleanup, LOCK_EX",
      "**Env system**: 5-tier priority chain (`.env.siro` → `.env` → `.env.{env}` → `.env.local` → `.env.{env}.local`)",
      "**Log Replay**: `--edit`, `--diff`, `--set`, `--dry-run` modes",
      "42/42 penetration tests passed (OWASP Top 10 full coverage)",
      "PHPStan level max: 0 errors | 19,496 tests — 0 failures"
    ]
  },
  {
    "type": "h2",
    "id": "v0-23-0-api-versioning-etag-metrics-2026-05-12",
    "text": "v0.23.0 — API Versioning, ETag, Metrics (2026-05-12)"
  },
  {
    "type": "h3",
    "id": "new",
    "text": "🆕 New"
  },
  {
    "type": "ul",
    "items": [
      "**API Versioning**: `version` middleware on `/api` group",
      "**ETag**: Auto `304 Not Modified` for cached responses",
      "**Metrics**: GET `/metrics` endpoint (OpenMetrics format)",
      "**Auth caching**: User fetched once per request (not per middleware)"
    ]
  },
  {
    "type": "h3",
    "id": "performance",
    "text": "⚡ Performance"
  },
  {
    "type": "ul",
    "items": [
      "sirosoft/core v0.23: sub-1ms boot, 3.1M JSON responses/sec",
      "426 tests passing, 0 failures"
    ]
  },
  {
    "type": "h2",
    "id": "v0-22-0-final-audit-2026-05-11",
    "text": "v0.22.0 — Final Audit (2026-05-11)"
  },
  {
    "type": "ul",
    "items": [
      "All 751 PHPStan baseline errors eliminated",
      "XSS fixes in email templates",
      "All 7 controllers extend Controller base class",
      "BaseRepository + BaseService pattern",
      "427 tests passing"
    ]
  },
  {
    "type": "h2",
    "id": "v0-21-0-server-ready-2026-05-10",
    "text": "v0.21.0 — Server-Ready (2026-05-10)"
  },
  {
    "type": "ul",
    "items": [
      "Production deployment ready",
      "JWT auth with refresh tokens",
      "MySQL/PostgreSQL/SQLite support",
      "CRUD scaffolding with make:crud",
      "872 framework tests + 426 skeleton tests"
    ]
  }
],
}
