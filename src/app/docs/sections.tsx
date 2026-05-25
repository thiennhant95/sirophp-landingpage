export interface DocSection {
  id: string
  num: string
  title: string
  desc: string
  commands: string[]
  note?: React.ReactNode
  nextId?: string
  nextTitle?: string
}

export const sections: DocSection[] = [
  {
    id: 'quick-start',
    num: '01',
    title: 'Quick Start',
    desc: 'From zero to running in 2 commands.',
    commands: [
      'composer create-project sirosoft/api my-app',
      'cd my-app && php siro key:generate',
      'php siro serve',
    ],
    note: 'Your dev server is live at http://localhost:8080. That\'s it.',
    nextId: 'first-crud',
    nextTitle: 'First CRUD API',
  },
  {
    id: 'first-crud',
    num: '02',
    title: 'First CRUD API',
    desc: 'Scaffold a complete CRUD in 2 seconds.',
    commands: [
      'php siro make:crud products',
      'php siro make:crud products --simple --seed --force',
      'php siro make:crud orders --simple',
      'php siro migrate',
    ],
    note: (
      <>
        Generated files:
        <span className="text-gray-300"> app/Models/Product.php, app/Controllers/ProductController.php, database/migrations/..., routes/api.php (5 routes), tests/Feature/...</span><br/>
        <span className="text-gray-500 text-xs">Flags: --simple (minimal files), --seed (auto seed), --force (overwrite existing)</span>
      </>
    ),
    nextId: 'testing',
    nextTitle: 'Testing APIs',
  },
  {
    id: 'testing',
    num: '03',
    title: 'Testing APIs',
    desc: 'Test endpoints right from your terminal. No Postman needed.',
    commands: [
      'php siro t GET /api/products',
      'php siro t POST /api/products name=Laptop price=999',
      'php siro t POST /api/auth/login email=admin@test.com password=secret --as=admin',
      'php siro t GET /api/products --as=admin --loop=50',
      'php siro make:test ProductApi',
      'php siro make:test ProductApi --from-trace=a1b2c3d4',
      'php siro test',
      'php siro test --filter=Product --coverage',
    ],
    note: (
      <>
        <span className="text-gray-500 text-xs">--from-trace generates a PHPUnit test from a real production trace. Flags: --filter (test name filter), --coverage (code coverage report)</span>
      </>
    ),
    nextId: 'debugging',
    nextTitle: 'Debugging Workflow',
  },
  {
    id: 'debugging',
    num: '04',
    title: 'Debugging Workflow',
    desc: 'The signature Siro workflow. Find and fix bugs in seconds.',
    commands: [
      'php siro why',
      'php siro api:why GET /api/products',
      'php siro db:why abc123 --slow',
      'php siro replay a1b2c3d4',
      'php siro replay a1b2c3d4 --test',
      'php siro replay',
      'php siro fix',
      'php siro log:trace a1b2c3d4',
      'php siro log:slow --limit=10',
    ],
    note: (
      <>
        Every response includes X-Siro-Trace-Id. No guessing. No log diving.<br/>
        <span className="text-gray-500 text-xs">api:why — debug a specific request by METHOD+path. db:why — EXPLAIN query with index suggestions. replay (alias) — replay latest trace. fix — watch mode auto re-tests on save. --test flag generates a regression test from the replay.</span>
      </>
    ),
    nextId: 'production-safety',
    nextTitle: 'Production Safety',
  },
  {
    id: 'production-safety',
    num: '05',
    title: 'Production Safety',
    desc: 'Safe debugging in production. No data leaks.',
    commands: [
      'php siro replay a1b2c3d4 --dry-run',
      'php siro replay a1b2c3d4 --diff',
      'php siro log:export --status=500 --format=json --output=errors.json',
      'php siro log:export --status=500 --format=postman --output=collection.json',
      'php siro doctor --prod',
      'php siro rate:status',
    ],
    note: (
      <>
        Credentials auto-[REDACTED]. Dry-run by default in production. Replay lock prevents accidental writes.<br/>
        <span className="text-gray-500 text-xs">--format=postman exports a Postman collection from traces. doctor --prod checks production readiness. rate:status shows rate limiter state.</span>
      </>
    ),
    nextId: 'openapi',
    nextTitle: 'OpenAPI + Postman',
  },
  {
    id: 'openapi',
    num: '06',
    title: 'OpenAPI + Postman',
    desc: 'API docs generated from your validation rules.',
    commands: [
      'php siro make:openapi --with-swagger',
      'php siro make:postman',
    ],
    note: 'Swagger UI at /api/docs. Postman collection ready to import.',
    nextId: 'deploy',
    nextTitle: 'Deploy',
  },
  {
    id: 'deploy',
    num: '07',
    title: 'Deploy',
    desc: 'Ship to production in one command.',
    commands: [
      'php siro deploy --init',
      'php siro optimize',
      'docker compose up -d',
    ],
    nextId: 'log-management',
    nextTitle: 'Log Management',
  },
  {
    id: 'log-management',
    num: '08',
    title: 'Log Management',
    desc: 'Monitor, analyze, and clean up logs from your terminal.',
    commands: [
      'php siro log:tail -f',
      'php siro log:top --limit=10',
      'php siro log:stats --days=7',
      'php siro log:cleanup --days=30 --dry-run',
      'php siro log:cleanup --days=30',
      'php siro log:replay --test',
      'php siro log:replay --force',
      'php siro debug:health',
    ],
    note: (
      <>
        <span className="text-gray-500 text-xs">log:tail -f tails realtime logs. log:top shows slowest requests. log:stats gives summary. log:cleanup --dry-run previews deletion. log:replay --test generates regression tests from traces. --force bypasses POST safe mode. debug:health checks logging health.</span>
      </>
    ),
    nextId: 'queue-system',
    nextTitle: 'Queue System',
  },
  {
    id: 'queue-system',
    num: '09',
    title: 'Queue System',
    desc: 'Manage background jobs and queues.',
    commands: [
      'php siro queue:work',
      'php siro queue:retry',
      'php siro queue:flush',
      'php siro queue:status',
    ],
    nextId: 'environment',
    nextTitle: 'Environment & Maintenance',
  },
  {
    id: 'environment',
    num: '10',
    title: 'Environment & Maintenance',
    desc: 'Manage env, migrations, routes, and maintenance mode.',
    commands: [
      'php siro env:check',
      'php siro env:switch production',
      'php siro migrate:reset',
      'php siro migrate:refresh --seed',
      'php siro route:list',
      'php siro route:search users',
      'php siro route:rules',
      'php siro down',
      'php siro up',
    ],
    nextId: 'advanced-cli',
    nextTitle: 'Advanced CLI',
  },
  {
    id: 'advanced-cli',
    num: '11',
    title: 'Advanced CLI',
    desc: 'Project scaffolding, trace management, and more.',
    commands: [
      'php siro new my-project',
      'php siro trace:list',
      'php siro traces',
      'php siro make:auth',
      'php siro make:crud orders --seed',
      'php siro make:service Payment',
      'php siro make:job SendWelcomeEmail',
      'php siro make:test ProductApi --from-trace=a1b2c3d4',
    ],
    nextId: 'regression-testing',
    nextTitle: 'Regression Testing',
  },
  {
    id: 'regression-testing',
    num: '12',
    title: 'Regression Testing',
    desc: 'Verify no regressions when deploying fixes.',
    commands: [
      'php siro test:regression --limit=50',
      'php siro test:regression --fail',
      'php siro test:regression --limit=100 --fail',
    ],
    note: (
      <>
        Replays all recorded traces and detects changes in status codes, response structure, or success rates.<br/>
        <span className="text-gray-500 text-xs">--limit=N caps replay count. --fail exits non-zero on any regression (CI-friendly).</span>
      </>
    ),
  },
]
