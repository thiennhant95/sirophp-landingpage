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
      'php siro start',
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
      'php siro migrate',
    ],
    note: (
      <>
        Generated files:
        <span className="text-gray-300"> app/Models/Product.php, app/Controllers/ProductController.php, database/migrations/..., routes/api.php (5 routes), tests/Feature/...</span>
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
    ],
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
      'php siro replay a1b2c3d4',
      'php siro fix',
      'php siro log:trace a1b2c3d4',
      'php siro log:slow --limit=10',
    ],
    note: 'Every response includes X-Siro-Trace-Id. No guessing. No log diving.',
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
      'php siro doctor --prod',
    ],
    note: 'Credentials auto-[REDACTED]. Dry-run by default in production. Replay lock prevents accidental writes.',
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
    nextId: 'real-examples',
    nextTitle: 'Real Examples',
  },
  {
    id: 'real-examples',
    num: '08',
    title: 'Real Examples',
    desc: 'Copy-paste working code. No theory.',
    commands: [
      'php siro make:auth',
      'php siro make:crud orders',
      'php siro make:service Payment',
      'php siro make:job SendWelcomeEmail',
      'php siro make:test ProductApi',
    ],
  },
]
