import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Debug PHP APIs in 5 Seconds — No Xdebug, No dd(), No Setup",
    description: "SiroPHP's CLI debug workflow lets you trace, replay, and fix production API bugs in seconds. Zero config. Zero dependencies.",
    category: "guide",
    order: 0,
    icon: "🐛",
  },
  content: [
  {
    "type": "h2",
    "id": "traditional-debug-hell",
    "text": "The Traditional PHP Debug Experience"
  },
  {
    "type": "p",
    "text": "We've all been there. An API endpoint returns 500 in production. You fire up the browser, hit refresh, check the logs — nothing. Time to sprinkle dd()/var_dump() across your controller, refresh again, still nothing because the request body or auth state doesn't match. You spend 20 minutes trying to reproduce the exact conditions."
  },
  {
    "type": "p",
    "text": "Xdebug? Great tool — once you spend an hour configuring php.ini, IDE settings, and debugging protocols. Except it doesn't work on production. And on staging, the data is different."
  },
  {
    "type": "p",
    "text": "The traditional PHP debug loop looks like this:"
  },
  {
    "type": "code",
    "code": "1. Add dd($var) or var_dump() to code\r\n2. Reproduce the request manually in Postman/cURL\r\n3. .. wait .. check output\r\n4. Remove dump statements\r\n5. Repeat from step 1\r\n\r\nAverage time per bug: 15-45 minutes"
  },
  {
    "type": "h2",
    "id": "sirophp-5-second-debug",
    "text": "The SiroPHP 5-Second Debug Workflow"
  },
  {
    "type": "p",
    "text": "SiroPHP eliminates the guesswork. Every request is automatically traced with a unique ID. When something breaks, you don't reproduce — you replay."
  },
  {
    "type": "h3",
    "id": "step-1",
    "text": "Step 1: Identify the failing request"
  },
  {
    "type": "p",
    "text": "Your customer says \"I got an error.\" No trace ID. No problem."
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "$ php siro log:trace --status=500 --since=10m\r\n\r\n Found 3 failed requests in the last 10 minutes:\r\n\r\n  1. POST /api/orders 500 — 2m ago — siro_a1b2c3\r\n  2. POST /api/orders 500 — 5m ago — siro_d4e5f6\r\n  3. GET /api/users 500 — 8m ago — siro_g7h8i9\r\n\r\n Pick the one that matches: php siro log:trace siro_a1b2c3"
  },
  {
    "type": "h3",
    "id": "step-2",
    "text": "Step 2: Inspect the full trace"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "$ php siro log:trace siro_a1b2c3\r\n\r\n  Trace: siro_a1b2c3\r\n  Method: POST\r\n  Path: /api/orders\r\n  Status: 500\r\n  Duration: 1,234ms\r\n  Memory: 6.2 MB\r\n\r\n  SQL Queries:\r\n    1. SELECT * FROM products WHERE id = ?  — 2ms\r\n    2. INSERT INTO orders (...) VALUES (...) — 1,200ms ← timeout on stock_decrement trigger!\r\n\r\n  Middleware Timeline:\r\n    auth        ✓  0.5ms\r\n    throttle    ✓  0.2ms\r\n    cors        ✓  0.1ms\r\n    db          ✓  0.3ms\r\n\r\n  N+1 Detection: None\r\n\r\n  Exception: PDOException \"SQLSTATE[HY000]: General error: 1205 Lock wait timeout\"\r\n  at app/Models/Order.php:42 — Order::create()"
  },
  {
    "type": "h3",
    "id": "step-3",
    "text": "Step 3: Fix the code"
  },
  {
    "type": "p",
    "text": "Open the file, fix the issue (e.g., increase lock timeout or optimize the trigger). No dump statements needed — you already have the full context."
  },
  {
    "type": "h3",
    "id": "step-4",
    "text": "Step 4: Replay with --diff to verify"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "$ php siro log:replay siro_a1b2c3 --diff\r\n\r\n  Replaying: POST /api/orders (dry-run — no side effects)\r\n\r\n  ┌──────────────────────┬──────────────────────┐\r\n  │ Before (failed)      │ After (with fix)      │\r\n  ├──────────────────────┼──────────────────────┤\r\n  │ Status: 500          │ Status: 201 Created   │\r\n  │ Duration: 1,234ms    │ Duration: 45ms        │\r\n  │ Lock wait timeout    │ Order created         │\r\n  └──────────────────────┴──────────────────────┘\r\n\r\n  ✓ Fix verified in 3 seconds"
  },
  {
    "type": "h3",
    "id": "step-5",
    "text": "Step 5: Generate a regression test (optional)"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "$ php siro log:replay siro_a1b2c3 --test\r\n\r\n  Generated: tests/regression/2026-06-05-post-orders-500-test.php\r\n\r\n  Run it: vendor/bin/phpunit tests/regression/"
  },
  {
    "type": "p",
    "text": "Total time from incident to fix: under 5 seconds for the replay + diff cycle. No Postman. No browser. No dd()."
  },
  {
    "type": "h2",
    "id": "cli-command-reference",
    "text": "91 Commands at Your Fingertips"
  },
  {
    "type": "p",
    "text": "SiroPHP ships with 91 CLI commands covering debug, testing, code generation, database, and production operations. Here's the complete reference:"
  },
  {
    "type": "h3",
    "id": "debug-trace-commands",
    "text": "Debug & Trace"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Last request analysis\r\nphp siro why\r\n\r\n# Trace a specific endpoint\r\nphp siro api:why POST /orders\r\n\r\n# Search traces\r\nphp siro log:trace --path=/api/orders\r\nphp siro log:trace --status=500\r\nphp siro log:trace --ip=203.0.113.42\r\nphp siro log:trace --error=\"Division by zero\"\r\nphp siro log:trace --since=30m --limit=20\r\n\r\n# View trace details\r\nphp siro log:trace siro_a1b2c3\r\n\r\n# Replay\r\nphp siro log:replay siro_a1b2c3          # dry-run\r\nphp siro log:replay siro_a1b2c3 --diff   # before/after\r\nphp siro log:replay siro_a1b2c3 --force  # with side effects\r\nphp siro log:replay siro_a1b2c3 --edit   # modify body before replay\r\nphp siro log:replay siro_a1b2c3 --test   # generate regression test\r\n\r\n# Log management\r\nphp siro log:tail\r\nphp siro log:slow --min=500\r\nphp siro log:stats --days=7\r\nphp siro log:top\r\nphp siro log:cleanup --days=14\r\nphp siro log:export siro_a1b2c3\r\n\r\n# Health\r\nphp siro doctor\r\nphp siro doctor --prod\r\n\r\n# Interactive REPL\r\nphp siro tinker\r\n\r\n# Benchmark\r\nphp siro benchmark"
  },
  {
    "type": "h3",
    "id": "test-commands",
    "text": "Testing & QA"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Run tests\r\nphp siro test\r\nphp siro test:fuzz\r\nphp siro test:chaos\r\nphp siro test:property\r\nphp siro test:unit\r\nphp siro test:integration\r\nphp siro test:feature\r\nphp siro test:edge-case\r\nphp siro test:cli\r\n\r\n# Coverage & quality\r\nphp siro test:coverage\r\nphp siro test:mutate\r\nphp siro test:type-coverage\r\nphp siro lint:check\r\nphp siro lint:fix\r\nphp siro phpstan\r\n\r\n# API testing\r\nphp siro api:test GET /api/users\r\nphp siro api:test POST /api/orders --data '{\"product\": 1}'\r\nphp siro api:smoke\r\nphp siro api:validate-spec"
  },
  {
    "type": "h3",
    "id": "app-gen-commands",
    "text": "Application & Code Generation"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Generate code\r\nphp siro make:controller UserController\r\nphp siro make:model Product\r\nphp siro make:migration create_orders_table\r\nphp siro make:middleware AuthMiddleware\r\nphp siro make:validator CreateOrderValidator\r\nphp siro make:event OrderCreated\r\nphp siro make:listener SendOrderConfirmation\r\nphp siro make:mail WelcomeEmail\r\nphp siro make:command ImportProducts\r\nphp siro make:resource UserResource\r\nphp siro make:test UserApiTest\r\nphp siro make:factory OrderFactory\r\nphp siro make:seeder ProductSeeder\r\nphp siro make:policy OrderPolicy\r\nphp siro make:observer UserObserver\r\nphp siro make:scope ActiveProductsScope\r\nphp siro make:cast MoneyCast\r\nphp siro make:rule ValidOrderStatus\r\nphp siro make:channel OrderChannel\r\nphp siro make:notification OrderShipped\r\nphp siro make:form-request CreateOrderRequest\r\nphp siro make:collection UserCollection\r\nphp siro make:exception InsufficientStockException\r\nphp siro make:helper StringHelper\r\n\r\n# Database\r\nphp siro db:migrate\r\nphp siro db:rollback\r\nphp siro db:seed\r\nphp siro db:reset\r\nphp siro db:refresh\r\nphp siro db:wipe\r\nphp siro db:status\r\nphp siro db:monitor\r\nphp siro db:backup\r\nphp siro db:restore"
  },
  {
    "type": "h3",
    "id": "prod-commands",
    "text": "Production Operations"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Deploy\r\nphp siro deploy:check\r\nphp siro deploy:env\r\nphp siro deploy:migrate\r\nphp siro deploy:optimize\r\nphp siro deploy:health\r\n\r\n# Security\r\nphp siro security:check\r\nphp siro security:audit\r\nphp siro security:scan\r\nphp siro security:keys:generate\r\nphp siro env:check\r\n\r\n# Monitoring\r\nphp siro monitor:routes\r\nphp siro monitor:cache\r\nphp siro monitor:queue\r\nphp siro monitor:scheduler\r\nphp siro monitor:events\r\nphp siro monitor:logins\r\n\r\n# Maintenance\r\nphp siro cache:clear\r\nphp siro config:cache\r\nphp siro route:cache\r\nphp siro route:list\r\nphp siro schedule:run\r\nphp siro queue:work\r\nphp siro queue:restart\r\nphp siro storage:link\r\nphp siro storage:cleanup\r\nphp siro app:version\r\nphp siro app:info"
  },
  {
    "type": "note",
    "variant": "tip",
    "title": "Fastest path to production debugging",
    "text": "Run `php siro why` immediately after a failed request. It shows you the route, SQL queries, middleware timeline, exception, N+1 detection, and a suggested fix — in one command. 5 seconds, zero setup."
  },
  {
    "type": "h2",
    "id": "no-xdebug-no-dd",
    "text": "No Xdebug. No dd(). No Setup."
  },
  {
    "type": "p",
    "text": "SiroPHP's debug system works out of the box:"
  },
  {
    "type": "ul",
    "items": [
      "Zero configuration — tracing is enabled by default",
      "Zero external dependencies — no Xdebug, no Sentry, no DataDog",
      "Works in production — no performance impact (tracing is async)",
      "Works in staging, CI, and local dev — same workflow everywhere",
      "No browser needed — everything from the terminal"
    ]
  },
  {
    "type": "p",
    "text": "Every request gets an X-Siro-Trace-Id header. You capture it from the error response and replay the exact request that failed — including auth state, headers, body, and even the database state at the time of the error."
  },
  {
    "type": "h2",
    "id": "try-it",
    "text": "Try It Yourself"
  },
  {
    "type": "p",
    "text": "Create a new SiroPHP API project and see the debug workflow in action:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "composer create-project sirosoft/api my-api\r\ncd my-api\r\nphp siro serve\r\n\r\n# In another terminal:\r\ncurl -X POST http://localhost:8080/api/orders \\\r\n  -H \"Content-Type: application/json\" \\\r\n  -d '{\"product_id\": 999, \"quantity\": 1}'\r\n\r\n# Debug the failure:\r\nphp siro why"
  },
  {
    "type": "p",
    "text": "That's it. One framework. 91 commands. 5-second debug cycles. No setup required."
  }
  ],
}
