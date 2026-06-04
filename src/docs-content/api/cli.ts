
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "CLI Command Reference",
    description: "Siro ships with **91 CLI commands**. Every task — from project creation to production debugging — is done from the terminal. No GUI tools needed.",
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
    "text": "Siro ships with **91 CLI commands**. Every task — from project creation to production debugging — is done from the terminal. No GUI tools needed."
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro                    # Core workflow overview\r\nphp siro list               # All commands grouped\r\nphp siro list --raw         # Raw command list (for tab completion)\r\nphp siro list --json        # JSON format (for tooling)\r\nphp siro <cmd> --help       # Details + options\r\nphp siro --version          # Show version\r"
  },
  {
    "type": "h2",
    "id": "tab-completion",
    "text": "Tab Completion"
  },
  {
    "type": "p",
    "text": "Type faster. Press Tab to autocomplete commands."
  },
  {
    "type": "h3",
    "id": "bash",
    "text": "Bash"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Add to ~/.bashrc\r\nsource /path/to/siro-completion.bash\r"
  },
  {
    "type": "h3",
    "id": "zsh",
    "text": "Zsh"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Add to ~/.zshrc\r\nsource /path/to/siro-completion.zsh\r"
  },
  {
    "type": "h3",
    "id": "how-it-works",
    "text": "How it works"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro mak + Tab → php siro make:crud\r\nphp siro mig + Tab → php siro migrate\r\nphp siro log: + Tab → log:tail, log:trace, log:replay, ...\r"
  },
  {
    "type": "h2",
    "id": "getting-started",
    "text": "Getting Started"
  },
  {
    "type": "p",
    "text": "Turn a blank terminal into a running API in 1 command:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro new my-api && cd my-api && php siro serve\r"
  },
  {
    "type": "p",
    "text": "Or with Composer:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "composer create-project sirosoft/api my-app\r\ncd my-app && php siro key:generate && php siro serve\r"
  },
  {
    "type": "h2",
    "id": "make-code-generators-26",
    "text": "make:* — Code Generators (26)"
  },
  {
    "type": "p",
    "text": "Scaffold code instantly. No boilerplate."
  },
  {
    "type": "table",
    "headers": [
      "Command",
      "Description"
    ],
    "rows": [
      [
        "`make:crud <name>`",
        "**Full CRUD** — controller, model, migration, routes, tests (`--simple`, `--seed`)"
      ],
      [
        "`make:auth`",
        "**Auth system** — JWT register, login, refresh, logout, forgot/reset password"
      ],
      [
        "`make:model <name>`",
        "Model with fillable, casts, table name"
      ],
      [
        "`make:controller <name>`",
        "Controller class"
      ],
      [
        "`make:migration <name>`",
        "Migration file"
      ],
      [
        "`make:service <name>`",
        "Service class (business logic layer)"
      ],
      [
        "`make:repository <name>`",
        "Repository class (data access layer)"
      ],
      [
        "`make:resource <name>`",
        "API resource transformer"
      ],
      [
        "`make:request <name>`",
        "FormRequest class (validation + authorization)"
      ],
      [
        "`make:middleware <name>`",
        "Middleware class"
      ],
      [
        "`make:observer <name>`",
        "Model observer class (lifecycle hooks)"
      ],
      [
        "`make:rule <name>`",
        "Custom validation rule class"
      ],
      [
        "`make:event <name>`",
        "Event class"
      ],
      [
        "`make:listener <name>`",
        "Event listener"
      ],
      [
        "`make:job <name>`",
        "Queue job"
      ],
      [
        "`make:mail <name>`",
        "Mail class"
      ],
      [
        "`make:test <name>`",
        "PHPUnit test"
      ],
      [
        "`make:factory <name>`",
        "Model factory"
      ],
      [
        "`make:seeder <name>`",
        "Database seeder"
      ],
      [
        "`make:openapi`",
        "**OpenAPI 3.0.3 spec** — auto-generated from routes + validation + resources (`--with-swagger`)"
      ],
      [
        "`make:postman`",
        "**Postman collection** — folder structure, auto-login, response examples (`--flow=crud`)"
      ],
      [
        "`make:lang <locale> <file>`",
        "Language file for i18n"
      ],
      [
        "`make:queue-table`",
        "Jobs table migration"
      ],
      [
        "`make:idempotency-table`",
        "Idempotency table migration"
      ],
      [
        "`make:apikey-table`",
        "API keys table migration"
      ],
      [
        "`make:apikey <name>`",
        "Generate API key with scopes"
      ]
    ]
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro make:crud products              # 6 files, instantly working\r\nphp siro make:crud orders --seed         # CRUD + database seeder\r\nphp siro make:auth                        # Full auth scaffolding\r\nphp siro make:openapi --with-swagger      # OpenAPI + Swagger UI\r\nphp siro make:postman                     # Postman collection\r\nphp siro make:apikey \"Mobile App\" read,write 365\r"
  },
  {
    "type": "note",
    "variant": "info",
    "text": "**Killer feature**: `make:openapi` and `make:postman` read your code dynamically — routes, validation rules, resources, auth middleware — and export full OpenAPI 3.0.3 spec / Postman collection. Zero annotation, zero config."
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro make:openapi --with-swagger   # → docs/openapi.json + public/docs.html\r\nphp siro make:postman                  # → public/postman_collection.json\r"
  },
  {
    "type": "h2",
    "id": "db-database-6",
    "text": "db:* — Database (6)"
  },
  {
    "type": "p",
    "text": "Manage schema and data without SQL clients."
  },
  {
    "type": "table",
    "headers": [
      "Command",
      "Description"
    ],
    "rows": [
      [
        "`migrate`",
        "Run all pending migrations"
      ],
      [
        "`migrate:rollback`",
        "Rollback last batch (`--step=N`)"
      ],
      [
        "`migrate:status`",
        "Show migration status (`--pending`)"
      ],
      [
        "`migrate:fresh`",
        "Drop all tables and re-migrate (`--seed`)"
      ],
      [
        "`db:seed`",
        "Run database seeders"
      ],
      [
        "`db:show <table>`",
        "Inspect table schema (`--schema`)"
      ]
    ]
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro migrate                          # Apply pending migrations\r\nphp siro migrate:rollback --step=2        # Rollback 2 batches\r\nphp siro migrate:status --pending         # Show only pending\r\nphp siro migrate:fresh --seed             # Reset + seed data\r\nphp siro db:show users                    # Table structure\r"
  },
  {
    "type": "h2",
    "id": "test-testing-5",
    "text": "test:* — Testing (5)"
  },
  {
    "type": "p",
    "text": "Test endpoints, run suites, regression tests — all from CLI."
  },
  {
    "type": "table",
    "headers": [
      "Command",
      "Description"
    ],
    "rows": [
      [
        "`test`",
        "Run PHPUnit tests (`--filter`, `--suite`, `--coverage`)"
      ],
      [
        "`test:run`",
        "Run test with detailed output (`--watch`, `--stop-on-failure`)"
      ],
      [
        "`test:regression`",
        "Replay all traces, detect response changes (`--limit=N`)"
      ],
      [
        "`api:test` (alias: `t`)",
        "Quick API test from CLI (no Postman needed)"
      ]
    ]
  },
  {
    "type": "h3",
    "id": "api-test-no-postman",
    "text": "API test — no Postman"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Login + auto-save token\r\nphp siro t POST /api/auth/login email=admin@test.com password=secret --as=admin\r\n\r\n# All subsequent requests auto-attach token\r\nphp siro t GET /api/products --as=admin\r\nphp siro t POST /api/products name=Laptop price=999 --as=admin\r\n\r\n# Load test\r\nphp siro t GET /api/products --as=admin --loop=100\r\n\r\n# Run automated tests\r\nphp siro test --filter=Product\r\nphp siro test --coverage\r"
  },
  {
    "type": "h2",
    "id": "log-debug-observability-12",
    "text": "log:* — Debug & Observability (12)"
  },
  {
    "type": "p",
    "text": "Killer feature — trace every request, replay any failure."
  },
  {
    "type": "table",
    "headers": [
      "Command",
      "Description"
    ],
    "rows": [
      [
        "`log:trace <id>`",
        "View full trace (headers, SQL, timing, N+1)"
      ],
      [
        "`trace:list`",
        "List all traces with filters (`--status`, `--method`, `--ip`, `--path`, `--since`, `--slow`)"
      ],
      [
        "`log:replay <id>`",
        "**Replay exact request** (`--edit`, `--diff`, `--force`, `--test`)"
      ],
      [
        "`replay <id>`",
        "Quick replay shortcut"
      ],
      [
        "`log:export <id>`",
        "Export trace to JSON / Postman format (`--status=500`, `--format=json`)"
      ],
      [
        "`log:tail`",
        "Tail logs in real-time (`--type`, `--lines`)"
      ],
      [
        "`log:slow`",
        "Show slow requests (`--limit`, `--min`)"
      ],
      [
        "`log:stats`",
        "Request statistics (`--days=N`)"
      ],
      [
        "`log:top`",
        "Top slowest endpoints"
      ],
      [
        "`log:cleanup`",
        "Clean old logs (`--days=N`, `--dry-run`)"
      ],
      [
        "`api:why <method> <path>`",
        "**Why did a request fail?** — trace any API call (`--id`, `--edit`, `--fix`, `--diff`, `--force`)"
      ],
      [
        "`db:why <table> <id>`",
        "Why is this DB row in this state? — trace all queries affecting a row"
      ]
    ]
  },
  {
    "type": "h3",
    "id": "trace-search-find-without-trace-id",
    "text": "Trace search — find without trace ID"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro log:trace --path=/api/orders --status=500 --since=1h\r\nphp siro log:trace --ip=203.0.113.42 --error=\"Division by zero\"\r\nphp siro log:trace --method=POST --slow --limit=10\r"
  },
  {
    "type": "h3",
    "id": "replay-the-real-moat",
    "text": "Replay — the real moat"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro log:replay a1b2c3d4                # Dry-run (safe)\r\nphp siro log:replay a1b2c3d4 --edit         # Edit body before replay\r\nphp siro log:replay a1b2c3d4 --diff         # Before/after comparison\r\nphp siro log:replay a1b2c3d4 --force        # Execute (verify fix)\r\nphp siro log:replay a1b2c3d4 --set user_id=42  # Override field\r\nphp siro log:replay a1b2c3d4 --format=curl  # Export as curl\r\nphp siro log:replay a1b2c3d4 --https        # Use HTTPS\r"
  },
  {
    "type": "h2",
    "id": "cache-optimize-4",
    "text": "cache:* — Optimize (4)"
  },
  {
    "type": "p",
    "text": "Prepare for production — cache everything."
  },
  {
    "type": "table",
    "headers": [
      "Command",
      "Description"
    ],
    "rows": [
      [
        "`optimize`",
        "**Full optimization** — config + routes + autoloader"
      ],
      [
        "`config:cache`",
        "Cache config (HMAC-signed)"
      ],
      [
        "`config:clear`",
        "Clear config cache"
      ],
      [
        "`env:cache`",
        "Cache environment (sensitive keys excluded)"
      ]
    ]
  },
  {
    "type": "h2",
    "id": "queue-background-jobs-4",
    "text": "queue:* — Background Jobs (4)"
  },
  {
    "type": "p",
    "text": "Process jobs, retry failures, monitor status."
  },
  {
    "type": "table",
    "headers": [
      "Command",
      "Description"
    ],
    "rows": [
      [
        "`queue:work`",
        "Process jobs (`--daemon`, `--queue`, `--workers=N`)"
      ],
      [
        "`queue:status`",
        "Show queue status and failed jobs"
      ],
      [
        "`queue:flush`",
        "Clear all failed jobs"
      ]
    ]
  },
  {
    "type": "h2",
    "id": "serve-server-4",
    "text": "serve:* — Server (4)"
  },
  {
    "type": "p",
    "text": "Start dev or production server."
  },
  {
    "type": "table",
    "headers": [
      "Command",
      "Description"
    ],
    "rows": [
      [
        "`serve`",
        "Dev server (`--port=8080`, `--host`)"
      ],
      [
        "`live`",
        "Dev server with auto-reload (`--port=9090`)"
      ],
      [
        "`start`",
        "Interactive onboarding wizard"
      ],
      [
        "`frankenphp:serve`",
        "Production FrankenPHP (`--docker`, `--port=80`)"
      ]
    ]
  },
  {
    "type": "h2",
    "id": "system-system-17",
    "text": "system:* — System (17)"
  },
  {
    "type": "table",
    "headers": [
      "Command",
      "Description"
    ],
    "rows": [
      [
        "`key:generate`",
        "Generate JWT secret (32+ bytes)"
      ],
      [
        "`doctor`",
        "System health check (`--prod`)"
      ],
      [
        "`route:list`",
        "List all routes with middleware"
      ],
      [
        "`route:search <keyword>`",
        "Search routes by path or handler name"
      ],
      [
        "`route:rules`",
        "Extract validation rules from all routes"
      ],
      [
        "`deploy`",
        "Deploy application (`--init`)"
      ],
      [
        "`down`",
        "Enable maintenance mode (`--message`, `--retry`, `--allow=ip`)"
      ],
      [
        "`up`",
        "Disable maintenance mode"
      ],
      [
        "`storage:link`",
        "Create public storage symlink"
      ],
      [
        "`tinker`",
        "Interactive PHP REPL (like Laravel tinker)"
      ],
      [
        "`fix`",
        "Watch code changes and auto-replay"
      ],
      [
        "`rate:status`",
        "Rate limiter status dashboard"
      ],
      [
        "`env:check`",
        "Validate environment configuration"
      ],
      [
        "`env:switch <env>`",
        "Switch between environments"
      ],
      [
        "`benchmark`",
        "Run performance benchmarks (`--iterations=N`, `--json`)"
      ],
      [
        "`schedule:run`",
        "Run scheduled tasks"
      ],
      [
        "`new:project <name>`",
        "Scaffold a new Siro project from template"
      ]
    ]
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro doctor --prod                     # Pre-deployment check\r\nphp siro route:list                         # All routes\r\nphp siro route:search user                  # Find user-related routes\r\nphp siro key:generate                       # Fresh JWT secret\r\nphp siro tinker                             # PHP REPL\r"
  },
  {
    "type": "h2",
    "id": "alias-system",
    "text": "Alias System"
  },
  {
    "type": "p",
    "text": "Commands that you type every day get shorthands:"
  },
  {
    "type": "table",
    "headers": [
      "Alias",
      "Full Command"
    ],
    "rows": [
      [
        "`php siro why`",
        "`php siro debug:last`"
      ],
      [
        "`php siro slow`",
        "`php siro log:slow`"
      ],
      [
        "`php siro t`",
        "`php siro api:test`"
      ],
      [
        "`php siro traces`",
        "`php siro trace:list`"
      ],
      [
        "`php siro replay`",
        "`php siro log:replay`"
      ]
    ]
  },
  {
    "type": "h2",
    "id": "cli-workflow-from-zero-to-production",
    "text": "CLI Workflow — From Zero to Production"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# ── 1. Create ──────────────────────────────────────\r\ncomposer create-project sirosoft/api my-app\r\ncd my-app\r\nphp siro key:generate\r\nphp siro env:check\r\n\r\n# ── 2. Develop ─────────────────────────────────────\r\nphp siro make:auth\r\nphp siro make:crud Product\r\nphp siro make:crud Order\r\nphp siro migrate\r\n\r\n# ── 3. Test ─────────────────────────────────────────\r\nphp siro t POST /api/auth/login ... --as=user\r\nphp siro t GET /api/products --as=user\r\nphp siro t POST /api/orders ... --as=user --loop=50\r\n\r\n# ── 4. Export docs ──────────────────────────────────\r\nphp siro make:openapi --with-swagger\r\nphp siro make:postman\r\n\r\n# ── 5. Deploy ───────────────────────────────────────\r\nphp siro doctor --prod\r\nphp siro optimize\r\ndocker compose up -d\r"
  },
  {
    "type": "p",
    "text": "Commands used: 0 Third-party tools needed: 0 Time to production-ready API: ~5 minutes"
  }
],
}
