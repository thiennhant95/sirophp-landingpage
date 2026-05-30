
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Database Guide",
    description: "Database settings are defined in `.env` and loaded via `config/database.php`.",
    category: "guide",
    order: 0,
    icon: "📚",
  },
  content: [
  {
    "type": "h2",
    "id": "configuration",
    "text": "Configuration"
  },
  {
    "type": "p",
    "text": "Database settings are defined in .env and loaded via config/database.php."
  },
  {
    "type": "code",
    "lang": "env",
    "code": "# SQLite (development/testing)\r\nDB_CONNECTION=sqlite\r\nDB_DATABASE=storage/database.sqlite\r\n\r\n# MySQL (production)\r\nDB_CONNECTION=mysql\r\nDB_HOST=127.0.0.1\r\nDB_PORT=3306\r\nDB_DATABASE=siro\r\nDB_USERNAME=root\r\nDB_PASSWORD=\r\n\r\n# PostgreSQL\r\nDB_CONNECTION=pgsql\r\nDB_HOST=127.0.0.1\r\nDB_PORT=5432\r\nDB_DATABASE=siro\r\nDB_USERNAME=postgres\r\nDB_PASSWORD=\r\n\r\n# Optional\r\nDB_CHARSET=utf8mb4\r\nDB_SLOW_QUERY_THRESHOLD=100  # ms\r"
  },
  {
    "type": "p",
    "text": "Config file loads driver with auto-detected default ports (MySQL=3306, PostgreSQL=5432, SQLite=0)."
  },
  {
    "type": "h2",
    "id": "migrations",
    "text": "Migrations"
  },
  {
    "type": "p",
    "text": "Migrations go in database/migrations/ with timestamp-prefixed filenames."
  },
  {
    "type": "code",
    "lang": "php",
    "code": "<?php\r\nuse Siro\\Core\\Schema;\r\nuse Siro\\Core\\DB\\Blueprint;\r\n\r\nreturn new class {\r\n    public function up(): void\r\n    {\r\n        Schema::create('products', function (Blueprint $t) {\r\n            $t->id();\r\n            $t->string('name', 200);\r\n            $t->text('description')->nullable();\r\n            $t->decimal('price', 10, 2)->default(0);\r\n            $t->integer('stock')->default(0);\r\n            $t->string('category', 100)->nullable();\r\n            $t->string('status', 20)->default('active');\r\n            $t->timestamps();\r\n        });\r\n    }\r\n\r\n    public function down(): void\r\n    {\r\n        Schema::drop('products');\r\n    }\r\n};\r"
  },
  {
    "type": "h3",
    "id": "blueprint-column-types",
    "text": "Blueprint Column Types"
  },
  {
    "type": "table",
    "headers": [
      "Method",
      "Description"
    ],
    "rows": [
      [
        "`$t->id()`",
        "Auto-increment BIGINT primary key"
      ],
      [
        "`$t->increments('col')`",
        "Auto-increment INT primary key"
      ],
      [
        "`$t->foreignId('col')`",
        "VARCHAR(36) column for UUID foreign keys"
      ],
      [
        "`$t->string('col', length)`",
        "VARCHAR column"
      ],
      [
        "`$t->text('col')`",
        "TEXT column"
      ],
      [
        "`$t->integer('col')`",
        "INT column"
      ],
      [
        "`$t->smallint('col')`",
        "SMALLINT / TINYINT(1) column"
      ],
      [
        "`$t->bigint('col')`",
        "BIGINT column (unsigned by default)"
      ],
      [
        "`$t->decimal('col', precision, scale)`",
        "DECIMAL column"
      ],
      [
        "`$t->float('col', precision)`",
        "FLOAT column"
      ],
      [
        "`$t->boolean('col')`",
        "TINYINT(1) / BOOLEAN column"
      ],
      [
        "`$t->date('col')`",
        "DATE column"
      ],
      [
        "`$t->datetime('col')`",
        "DATETIME / TIMESTAMP column"
      ],
      [
        "`$t->timestamp('col')`",
        "TIMESTAMP column"
      ],
      [
        "`$t->json('col')`",
        "JSON / JSONB column"
      ],
      [
        "`$t->timestamps()`",
        "Adds created_at, updated_at"
      ],
      [
        "`$t->softDeletes('col')`",
        "Adds nullable deleted_at TIMESTAMP"
      ],
      [
        "`$t->rememberToken()`",
        "Adds nullable remember_token VARCHAR(100)"
      ]
    ]
  },
  {
    "type": "h3",
    "id": "indexes-constraints",
    "text": "Indexes & Constraints"
  },
  {
    "type": "table",
    "headers": [
      "Method",
      "Description"
    ],
    "rows": [
      [
        "`$t->primary(['order_id', 'product_id'])`",
        "Composite PRIMARY KEY"
      ],
      [
        "`$t->index('email')`",
        "Add index"
      ],
      [
        "`$t->unique('slug')`",
        "Add unique index"
      ],
      [
        "`$t->foreign('user_id')->constrained('users')`",
        "Foreign key constraint"
      ],
      [
        "`$t->dropIndex('idx_email')`",
        "Drop index (ALTER TABLE)"
      ],
      [
        "`$t->dropUnique('uq_users_slug')`",
        "Drop unique index (ALTER TABLE)"
      ],
      [
        "`$t->dropForeign('fk_name')`",
        "Drop foreign key (ALTER TABLE)"
      ]
    ]
  },
  {
    "type": "h3",
    "id": "column-modifiers",
    "text": "Column Modifiers"
  },
  {
    "type": "table",
    "headers": [
      "Modifier",
      "Description"
    ],
    "rows": [
      [
        "`->nullable()`",
        "Allow NULL values"
      ],
      [
        "`->default('pending')`",
        "Default value (string, int, float, boolean)"
      ],
      [
        "`->default(false)`",
        "Boolean → `DEFAULT 0` / `DEFAULT 1`"
      ],
      [
        "`->useCurrent()`",
        "`DEFAULT CURRENT_TIMESTAMP`"
      ],
      [
        "`->after('col')`",
        "Position AFTER column (ALTER TABLE, MySQL/MariaDB)"
      ]
    ]
  },
  {
    "type": "table",
    "headers": [
      "Method",
      "Returns",
      "Description"
    ],
    "rows": [
      [
        "`Schema::hasTable('users')`",
        "`bool`",
        "Check if a table exists"
      ],
      [
        "`Schema::hasColumn('users', 'email')`",
        "`bool`",
        "Check if a column exists"
      ],
      [
        "`Schema::getColumnListing('users')`",
        "`string[]`",
        "Get all column names in a table"
      ]
    ]
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$columns = Schema::getColumnListing('users');\r\n// ['id', 'name', 'email', ...]\r\n\r\nif (Schema::hasColumn('users', 'email')) {\r\n    echo 'email column exists';\r\n}\r"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$t->string('email')->unique();\r\n$t->text('bio')->nullable();\r\n$t->integer('views')->default(0);\r\n$t->boolean('active')->default(false);\r\n$t->string('status', 20)->default('pending')->after('name');\r"
  },
  {
    "type": "h3",
    "id": "running-migrations",
    "text": "Running Migrations"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro migrate             # Run pending migrations\r\nphp siro migrate:rollback    # Rollback last batch\r\nphp siro migrate:status      # Show migration status\r\nphp siro db:show users       # Inspect table structure\r"
  },
  {
    "type": "h2",
    "id": "query-builder",
    "text": "Query Builder"
  },
  {
    "type": "p",
    "text": "Access via DB::table() or the Database class."
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\DB;\r\nuse Siro\\Core\\Database;\r\n\r\n// Raw queries with PDO\r\n$rows = Database::select('SELECT * FROM users WHERE status = :status', ['status' => 1]);\r\n\r\n$affected = Database::execute(\r\n    'UPDATE users SET name = :name WHERE id = :id',\r\n    ['name' => 'John', 'id' => 1]\r\n);\r\n\r\n// Fetch single row\r\n$user = Database::first('SELECT * FROM users WHERE email = :email', ['email' => 'a@b.com']);\r\n\r\n// Transactions\r\nDatabase::transaction(function () {\r\n    Database::execute('INSERT INTO logs ...');\r\n    Database::execute('UPDATE users ...');\r\n});\r\n// Auto-rolls back on exception\r\n\r\n// Query Builder\r\n$users = DB::table('users')\r\n    ->where('status', '=', 1)\r\n    ->where('role', '=', 'admin')\r\n    ->orderBy('created_at', 'DESC')\r\n    ->limit(10)\r\n    ->get();\r\n\r\n// Joins\r\n$posts = DB::table('posts')\r\n    ->join('users', 'posts.user_id', '=', 'users.id')\r\n    ->where('posts.status', '=', 'published')\r\n    ->get(['posts.*', 'users.name as author']);\r\n\r\n// Pagination\r\n$results = DB::table('products')\r\n    ->where('status', '=', 'active')\r\n    ->paginate(perPage: 15, page: 1);\r\n// Returns items + meta {page, per_page, total, last_page}\r\n\r\n// Cursor pagination\r\n$cursor = DB::table('users')->orderBy('id')->cursor();\r\nforeach ($cursor as $row) {\r\n    // Process one row at a time (memory efficient)\r\n}\r\n\r\n### Joins with Table Aliases\r\n\r"
  },
  {
    "type": "p",
    "text": "// Simple join with alias $data = DB::table('orders as o') ->leftJoin('users as u', 'o.user_id', '=', 'u.id') ->where('o.status', '=', 'active') ->get(['o.*', 'u.name as customer']);"
  },
  {
    "type": "code",
    "code": "\r\n### Closure Joins (Complex Conditions)\r\n\r\nUse a Closure for joins with multiple conditions or WHERE clauses:\r\n\r"
  },
  {
    "type": "p",
    "text": "DB::table('users') ->leftJoin('orders', function (JoinClause $join) { $join->on('users.id', '=', 'orders.user_id'); $join->where('orders.status', '=', 'active'); $join->orOn('orders.priority', '=', 'high'); }) ->get();"
  },
  {
    "type": "code",
    "code": "\r\nSupported methods inside the Closure:\r\n- `$join->on('a', '=', 'b')` — AND condition\r\n- `$join->orOn('a', '=', 'b')` — OR condition\r\n- `$join->where('col', '=', 'val')` — filtered join condition\r"
  },
  {
    "type": "h2",
    "id": "model-orm",
    "text": "Model ORM"
  },
  {
    "type": "p",
    "text": "Models extend Siro\\Core\\Model and map to database tables."
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\Model;\r\n\r\nfinal class Product extends Model\r\n{\r\n    protected string $table = 'products';\r\n\r\n    protected array $fillable = ['name', 'price', 'stock', 'category', 'status'];\r\n\r\n    protected array $hidden = ['internal_code'];\r\n\r\n    protected array $casts = [\r\n        'id' => 'int',\r\n        'price' => 'float',\r\n        'stock' => 'int',\r\n    ];\r\n}\r"
  },
  {
    "type": "h3",
    "id": "crud-operations",
    "text": "CRUD Operations"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Create\r\n$product = Product::create([\r\n    'name' => 'Laptop',\r\n    'price' => 1500.00,\r\n    'stock' => 100,\r\n]);\r\n\r\n// Read\r\n$product = Product::find(1);\r\n$products = Product::where('status', '=', 'active')->get();\r\n$first = Product::where('sku', '=', 'LAP-001')->first();\r\n\r\n// Update\r\n$product = Product::find(1);\r\n$product->name = 'Updated Laptop';\r\n$product->save();\r\n\r\n// Delete\r\n$product = Product::find(1);\r\n$product->delete();\r"
  },
  {
    "type": "h3",
    "id": "relationships",
    "text": "Relationships"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "class User extends Model\r\n{\r\n    protected string $table = 'users';\r\n\r\n    public function posts()\r\n    {\r\n        return $this->hasMany(Post::class, 'user_id');\r\n    }\r\n}\r\n\r\nclass Post extends Model\r\n{\r\n    protected string $table = 'posts';\r\n\r\n    public function user()\r\n    {\r\n        return $this->belongsTo(User::class, 'user_id');\r\n    }\r\n}\r"
  },
  {
    "type": "h3",
    "id": "eager-loading",
    "text": "Eager Loading"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Load posts for all users in 2 queries (N+1 prevention)\r\n$users = User::with('posts')->where('status', '=', 1)->get();\r\n\r\nforeach ($users as $user) {\r\n    // $user->posts is already loaded\r\n}\r"
  },
  {
    "type": "h3",
    "id": "soft-deletes",
    "text": "Soft Deletes"
  },
  {
    "type": "p",
    "text": "Soft delete support is built in — add a deleted_at column to your table:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Schema::create('users', function (Blueprint $t) {\r\n    $t->id();\r\n    // ... other columns\r\n    $t->datetime('deleted_at')->nullable();\r\n    $t->timestamps();\r\n});\r"
  },
  {
    "type": "p",
    "text": "Models automatically exclude soft-deleted records and provide:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Include soft-deleted\r\n$users = User::withTrashed()->get();\r\n\r\n// Only soft-deleted\r\n$trashed = User::onlyTrashed()->get();\r\n\r\n// Restore\r\n$user = User::withTrashed()->find(1);\r\n$user->restore();\r\n\r\n// Force delete\r\n$user->forceDelete();\r"
  },
  {
    "type": "h2",
    "id": "seeding-and-factories",
    "text": "Seeding and Factories"
  },
  {
    "type": "h3",
    "id": "factories",
    "text": "Factories"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro make:factory User\r"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "final class UserFactory\r\n{\r\n    public static function new(): self\r\n    {\r\n        return new self();\r\n    }\r\n\r\n    public function count(int $count): self\r\n    {\r\n        $this->count = max(1, $count);\r\n        return $this;\r\n    }\r\n\r\n    public function with(array $data): self\r\n    {\r\n        $this->overrides = $data;\r\n        return $this;\r\n    }\r\n\r\n    public function definition(): array\r\n    {\r\n        return [\r\n            'name' => 'User_' . bin2hex(random_bytes(4)),\r\n            'email' => 'user_' . bin2hex(random_bytes(4)) . '@example.com',\r\n            'password' => password_hash('password', PASSWORD_BCRYPT),\r\n            'status' => 1,\r\n            'created_at' => date('Y-m-d H:i:s'),\r\n        ];\r\n    }\r\n\r\n    public function create(): User|array\r\n    {\r\n        return User::create(array_merge($this->definition(), $this->overrides));\r\n    }\r\n}\r\n\r\n// Usage\r\n$user = UserFactory::new()->create();\r\n$users = UserFactory::new()->count(10)->create();\r\n$admin = UserFactory::new()->with(['role' => 'admin'])->create();\r"
  },
  {
    "type": "h3",
    "id": "seeders",
    "text": "Seeders"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro db:seed\r"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// database/seeds/DatabaseSeeder.php\r\nfinal class DatabaseSeeder\r\n{\r\n    public array $calls = [\r\n        UserSeeder::class,\r\n    ];\r\n\r\n    public function run(): void\r\n    {\r\n        foreach ($this->calls as $class) {\r\n            $seeder = new $class();\r\n            $seeder->run();\r\n        }\r\n    }\r\n}\r"
  },
  {
    "type": "h2",
    "id": "raw-queries",
    "text": "Raw Queries"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\DB;\r\n\r\n// Get raw PDO connection\r\n$pdo = DB::connection();              // or Database::connection()\r\n$pdo = DB::connection('mysql_read');  // named connection\r\n\r\n// Raw SELECT\r\n$users = DB::select('SELECT * FROM users WHERE id = ?', [1]);\r\n\r\n// Raw EXECUTE (INSERT/UPDATE/DELETE)\r\n$affected = DB::execute('UPDATE users SET name = ? WHERE id = ?', ['John', 1]);\r\n\r\n// Get driver name\r\n$driver = $pdo->getAttribute(\\PDO::ATTR_DRIVER_NAME);\r\n// Returns 'mysql', 'pgsql', 'sqlite'\r"
  },
  {
    "type": "h2",
    "id": "best-practices",
    "text": "Best Practices"
  },
  {
    "type": "ul",
    "items": [
      "Use SQLite for development/testing, MySQL/PostgreSQL for production.",
      "Always use parameterized queries with named placeholders (`:param`).",
      "Wrap bulk operations in `Database::transaction()` for atomicity.",
      "Use eager loading to avoid N+1 query problems.",
      "Set `DB_SLOW_QUERY_THRESHOLD` to identify slow queries in logs.",
      "Keep migrations immutable once deployed — create new migrations to alter tables."
    ]
  }
],
}
