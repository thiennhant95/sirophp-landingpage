
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "SiroPHP Quick Start Guide",
    description: "Build a production-ready API in 5 minutes",
    category: "guide",
    order: 0,
    icon: "📚",
  },
  content: [
  {
    "type": "p",
    "text": "Build a production-ready API in 5 minutes"
  },
  {
    "type": "h2",
    "id": "installation-30-seconds",
    "text": "🚀 Installation (30 seconds)"
  },
  {
    "type": "h3",
    "id": "option-1-create-new-project-recommended",
    "text": "Option 1: Create New Project (Recommended)"
  },
  {
    "type": "p",
    "text": "Windows:"
  },
  {
    "type": "code",
    "lang": "powershell",
    "code": "iwr https://sirophp.com/downloads/install.ps1 -UseBasicParsing | iex\r"
  },
  {
    "type": "p",
    "text": "Linux/macOS:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "curl -sS https://sirophp.com/downloads/install.sh | bash\r"
  },
  {
    "type": "p",
    "text": "Visit: http://localhost:8080"
  },
  {
    "type": "h3",
    "id": "option-2-add-to-existing-project",
    "text": "Option 2: Add to Existing Project"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "composer require sirosoft/core\r"
  },
  {
    "type": "note",
    "variant": "info",
    "text": "**New in v0.35.0**: Packages auto-register CLI commands and service providers. Just `composer require vendor/package` — no manual configuration needed."
  },
  {
    "type": "h2",
    "id": "package-ecosystem",
    "text": "🧩 Package Ecosystem"
  },
  {
    "type": "p",
    "text": "SiroPHP v0.35.0+ auto-discovers CLI commands and service providers from any installed Composer package."
  },
  {
    "type": "h3",
    "id": "how-package-registration-works",
    "text": "How Package Registration Works"
  },
  {
    "type": "p",
    "text": "When you run composer require vendor/package, if that package has an extra.siro section in its composer.json:"
  },
  {
    "type": "p",
    "text": "Commands — automatically appear in php siro list:"
  },
  {
    "type": "code",
    "lang": "json",
    "code": "{\r\n    \"extra\": {\r\n        \"siro\": {\r\n            \"commands\": {\r\n                \"my:command\": {\r\n                    \"handler\": \"Vendor\\\\Package\\\\MyCommand\",\r\n                    \"desc\": \"Description\"\r\n                }\r\n            }\r\n        }\r\n    }\r\n}\r"
  },
  {
    "type": "p",
    "text": "Service providers — automatically registered at boot time:"
  },
  {
    "type": "code",
    "lang": "json",
    "code": "{\r\n    \"extra\": {\r\n        \"siro\": {\r\n            \"providers\": [\r\n                \"Vendor\\\\Package\\\\ServiceProvider\"\r\n            ]\r\n        }\r\n    }\r\n}\r"
  },
  {
    "type": "h3",
    "id": "example-install-a-package-use-instantly",
    "text": "Example: Install a Package, Use Instantly"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "composer require vendor/siro-package\r\nphp siro list               # New commands appear immediately\r\nphp siro my:command          # Run package command\r"
  },
  {
    "type": "p",
    "text": "No files to edit, no cache to clear. Just composer require and go."
  },
  {
    "type": "h2",
    "id": "5-minute-tutorial",
    "text": "📋 5-Minute Tutorial"
  },
  {
    "type": "h3",
    "id": "step-1-setup-database-1-minute",
    "text": "Step 1: Setup Database (1 minute)"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Edit .env file\r\nDB_CONNECTION=sqlite\r\n# or\r\nDB_CONNECTION=mysql\r\nDB_HOST=127.0.0.1\r\nDB_DATABASE=myapp\r\nDB_USERNAME=root\r\nDB_PASSWORD=secret\r\n\r\n# Run migrations\r\nphp siro migrate\r"
  },
  {
    "type": "h3",
    "id": "step-2-generate-authentication-1-minute",
    "text": "Step 2: Generate Authentication (1 minute)"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro make:auth\r\nphp siro migrate\r"
  },
  {
    "type": "p",
    "text": "Generated endpoints:"
  },
  {
    "type": "ul",
    "items": [
      "`POST /api/auth/register` - User registration",
      "`POST /api/auth/login` - Login and get JWT tokens",
      "`POST /api/auth/refresh` - Refresh access token",
      "`POST /api/auth/logout` - Logout",
      "`GET /api/auth/me` - Get current user profile"
    ]
  },
  {
    "type": "h3",
    "id": "step-3-create-your-first-resource-1-minute",
    "text": "Step 3: Create Your First Resource (1 minute)"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro make:crud products\r\nphp siro migrate\r"
  },
  {
    "type": "p",
    "text": "Generated files:"
  },
  {
    "type": "ul",
    "items": [
      "✅ `app/Models/Product.php` - Model with fillable fields",
      "✅ `database/migrations/*_create_products_table.php` - Migration",
      "✅ `app/Controllers/ProductController.php` - Full CRUD controller",
      "✅ `app/Resources/ProductResource.php` - Resource transformer",
      "✅ Routes auto-injected in `routes/api.php`",
      "✅ `tests/Feature/ProductTest.php` - Integration tests"
    ]
  },
  {
    "type": "h3",
    "id": "step-4-test-your-api-1-minute",
    "text": "Step 4: Test Your API (1 minute)"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Register a user\r\nphp siro api:test POST /api/auth/register \\\r\n  name=\"John Doe\" \\\r\n  email=\"john@example.com\" \\\r\n  password=\"secret123\" \\\r\n  password_confirmation=\"secret123\"\r\n\r\n# Login and save token\r\nphp siro api:test POST /api/auth/login \\\r\n  email=\"john@example.com\" \\\r\n  password=\"secret123\" \\\r\n  --as=user\r\n\r\n# Create a product (auto uses saved token)\r\nphp siro api:test POST /api/products \\\r\n  name=\"Laptop\" \\\r\n  price=\"999.99\" \\\r\n  --as=user\r\n\r\n# List products\r\nphp siro api:test GET /api/products --as=user\r"
  },
  {
    "type": "h3",
    "id": "step-5-generate-api-documentation-1-minute",
    "text": "Step 5: Generate API Documentation (1 minute)"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro make:openapi --with-swagger\r"
  },
  {
    "type": "p",
    "text": "Visit Swagger UI: http://localhost:8080/docs.html"
  },
  {
    "type": "p",
    "text": "Done! You now have a production-ready API with:"
  },
  {
    "type": "ul",
    "items": [
      "✅ JWT authentication",
      "✅ Full CRUD for products",
      "✅ API documentation",
      "✅ Tests",
      "✅ Validation",
      "✅ Error handling"
    ]
  },
  {
    "type": "h2",
    "id": "next-steps",
    "text": "🎯 Next Steps"
  },
  {
    "type": "h3",
    "id": "add-relationships",
    "text": "Add Relationships"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// app/Models/Product.php\r\npublic function category(): BelongsTo\r\n{\r\n    return $this->belongsTo(Category::class);\r\n}\r\n\r\npublic function reviews(): HasMany\r\n{\r\n    return $this->hasMany(Review::class);\r\n}\r\n\r\n// Usage with eager loading\r\n$products = Product::with('category', 'reviews')->paginate(20);\r"
  },
  {
    "type": "h3",
    "id": "add-custom-validation",
    "text": "Add Custom Validation"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// app/Controllers/ProductController.php\r\npublic function store(Request $request)\r\n{\r\n    $validated = $request->validate([\r\n        'name' => 'required|string|max:255',\r\n        'price' => 'required|numeric|min:0',\r\n        'category_id' => 'required|exists:categories,id',\r\n        'sku' => 'required|unique:products,sku',\r\n    ]);\r\n    \r\n    $product = Product::create($validated);\r\n    \r\n    return Response::created(new ProductResource($product));\r\n}\r"
  },
  {
    "type": "h3",
    "id": "add-middleware",
    "text": "Add Middleware"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// routes/api.php\r\nRoute::post('/products', [ProductController::class, 'store'])\r\n    ->middleware(['auth:user,admin'])  // Require authentication\r\n    ->throttle(10, 1);  // Rate limit: 10 requests per minute\r"
  },
  {
    "type": "h3",
    "id": "queue-heavy-operations",
    "text": "Queue Heavy Operations"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Instead of sending email synchronously\r\nMail::to($user)->subject('Order Created')->html($html)->queue();\r\n\r\n// Process queue\r\nphp siro queue:work\r"
  },
  {
    "type": "h3",
    "id": "development",
    "text": "Development"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro serve              # Start dev server\r\nphp siro live               # Dev server with auto-reload\r\nphp siro route:list         # List all routes\r\nphp siro test               # Run all tests\r"
  },
  {
    "type": "h3",
    "id": "code-generation",
    "text": "Code Generation"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro make:model User\r\nphp siro make:controller UserController\r\nphp siro make:migration create_users_table\r\nphp siro make:resource UserResource\r\nphp siro make:test UserApi\r\nphp siro make:factory User\r\nphp siro make:job SendEmail\r\nphp siro make:mail WelcomeMail\r\nphp siro make:event UserCreated\r"
  },
  {
    "type": "h3",
    "id": "database",
    "text": "Database"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro migrate            # Run migrations\r\nphp siro migrate:rollback   # Rollback last migration\r\nphp siro db:seed            # Run seeders\r\nphp siro db:show users      # Inspect table\r"
  },
  {
    "type": "h3",
    "id": "debugging",
    "text": "Debugging"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro log:trace <id>     # View trace details\r\nphp siro log:replay <id>    # Replay request\r\nphp siro slow               # Show slow requests\r\nphp siro api:test GET /api/users  # Test endpoint\r"
  },
  {
    "type": "h3",
    "id": "performance",
    "text": "Performance"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro benchmark          # Run benchmarks\r\nphp siro config:cache       # Cache configuration\r\nphp siro optimize           # Optimize for production\r\nphp siro env:check          # Validate environment\r"
  },
  {
    "type": "h3",
    "id": "deployment",
    "text": "Deployment"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro deploy             # Deploy application\r\nphp siro down               # Enable maintenance mode\r\nphp siro up                 # Disable maintenance mode\r\nphp siro storage:link       # Create storage symlink\r"
  },
  {
    "type": "h2",
    "id": "common-tasks",
    "text": "🔍 Common Tasks"
  },
  {
    "type": "h3",
    "id": "add-file-upload",
    "text": "Add File Upload"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Controller\r\n$file = $request->file('avatar');\r\n$path = $file->store('avatars');\r\n\r\nreturn Response::json([\r\n    'url' => Storage::url($path),\r\n]);\r"
  },
  {
    "type": "h3",
    "id": "add-pagination",
    "text": "Add Pagination"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Controller\r\n$products = Product::paginate(20, $page);\r\n\r\nreturn Response::json([\r\n    'data' => ProductResource::collection($products['data']),\r\n    'meta' => $products['meta'],\r\n]);\r"
  },
  {
    "type": "h3",
    "id": "add-search-filter",
    "text": "Add Search/Filter"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Controller\r\n$query = Product::query();\r\n\r\nif ($request->has('category_id')) {\r\n    $query->where('category_id', $request->int('category_id'));\r\n}\r\n\r\nif ($request->has('search')) {\r\n    $query->where('name', 'LIKE', '%' . $request->string('search') . '%');\r\n}\r\n\r\n$products = $query->paginate(20);\r"
  },
  {
    "type": "h3",
    "id": "add-soft-deletes",
    "text": "Add Soft Deletes"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Model\r\nuse Siro\\Core\\DB\\SoftDeletes;\r\n\r\nclass Product extends Model\r\n{\r\n    use SoftDeletes;\r\n}\r\n\r\n// Controller\r\nProduct::withTrashed()->get();  // Include deleted\r\nProduct::onlyTrashed()->get();  // Only deleted\r\n$product->restore();             // Restore deleted\r"
  },
  {
    "type": "h2",
    "id": "troubleshooting",
    "text": "🛠️ Troubleshooting"
  },
  {
    "type": "h3",
    "id": "problem-class-not-found",
    "text": "Problem: \"Class not found\""
  },
  {
    "type": "p",
    "text": "Solution:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "composer dump-autoload\r"
  },
  {
    "type": "h3",
    "id": "problem-migration-failed",
    "text": "Problem: \"Migration failed\""
  },
  {
    "type": "p",
    "text": "Solution:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro migrate:rollback\r\n# Fix migration file\r\nphp siro migrate\r"
  },
  {
    "type": "h3",
    "id": "problem-token-expired",
    "text": "Problem: \"Token expired\""
  },
  {
    "type": "p",
    "text": "Solution:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Refresh token\r\nphp siro api:test POST /api/auth/refresh --as=user\r"
  },
  {
    "type": "h3",
    "id": "problem-route-not-found",
    "text": "Problem: \"Route not found\""
  },
  {
    "type": "p",
    "text": "Solution:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Check routes\r\nphp siro route:list\r\n\r\n# Clear cache\r\nrm storage/cache/routes.php\r"
  },
  {
    "type": "h2",
    "id": "learn-more",
    "text": "📖 Learn More"
  },
  {
    "type": "ul",
    "items": [
      "**[Architecture Guide](../ARCHITECTURE.md)** - Understand design decisions",
      "**[Security Guide](../SECURITY.md)** - Security best practices",
      "**[Performance Guide](../PERFORMANCE.md)** - Optimization tips",
      "**[API Reference](../api/)** - Detailed API documentation",
      "**[Examples](../examples/)** - Real-world code samples"
    ]
  },
  {
    "type": "h2",
    "id": "pro-tips",
    "text": "💡 Pro Tips"
  },
  {
    "type": "ol",
    "items": [
      "**Use `make:crud` for rapid development** - Generates full CRUD in 2 seconds",
      "**Enable config caching in production** - `php siro config:cache`",
      "**Use eager loading to prevent N+1 queries** - `Model::with('relation')`",
      "**Queue heavy operations** - Don't block HTTP requests",
      "**Monitor slow requests** - `php siro slow`",
      "**Write tests early** - `php siro make:test ProductApi`",
      "**Generate API docs automatically** - `php siro make:openapi`",
      "**Use trace IDs for debugging** - Every response includes `X-Siro-Trace-Id`"
    ]
  },
  {
    "type": "p",
    "text": "Happy coding! 🚀"
  },
  {
    "type": "p",
    "text": "For questions, visit: https://github.com/SiroSoft/SiroPHP/discussions"
  }
],
}
