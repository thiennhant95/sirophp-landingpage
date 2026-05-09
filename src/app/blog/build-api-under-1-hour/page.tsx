import type { Metadata } from 'next';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'Build Your First API in Under 1 Hour with SiroPHP',
  description: 'Stop writing boilerplate code. Learn how to scaffold complete CRUD APIs in seconds with one command. From zero to production-ready API in under an hour.',
  keywords: [
    'php api scaffolding',
    'crud api generator php',
    'build api fast php',
    'php api boilerplate',
    'sirophp scaffolding',
    'rapid api development',
    'php code generation',
  ],
  alternates: {
    canonical: 'https://sirophp.com/blog/build-api-under-1-hour',
  },
  openGraph: {
    title: 'Build Your First API in Under 1 Hour with SiroPHP | SiroPHP',
    description: 'Scaffold complete CRUD APIs in seconds with one command. From zero to production-ready API in under an hour.',
    type: 'article',
    publishedTime: '2026-02-19',
    url: 'https://sirophp.com/blog/build-api-under-1-hour',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Build Your First API in Under 1 Hour with SiroPHP | SiroPHP',
    description: 'Scaffold complete CRUD APIs in seconds. From zero to production-ready API in under an hour.',
    images: ['/opengraph-image.png'],
  },
};

export default function Article6() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Build Your First API in Under 1 Hour with SiroPHP',
    description: 'Stop writing boilerplate code. Learn how to scaffold complete CRUD APIs in seconds with one command. From zero to production-ready API in under an hour.',
    image: 'https://sirophp.com/opengraph-image.png',
    author: {
      '@type': 'Organization',
      name: 'SiroPHP',
      url: 'https://sirophp.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SiroPHP',
      logo: {
        '@type': 'ImageObject',
        url: 'https://sirophp.com/logo',
      },
    },
    datePublished: '2026-02-19',
    dateModified: '2026-02-19',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://sirophp.com/blog/build-api-under-1-hour',
    },
    keywords: 'php api scaffolding, crud generator, rapid api development, php code generation',
    articleSection: 'Tutorial',
    wordCount: '1700',
  };

  return (
    <main className="min-h-screen bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      
      <article className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            {/* Breadcrumb */}
            <nav className="mb-8 text-sm">
              <Link href="/blog" className="text-gray-400 hover:text-cyan-400 transition-colors">
                Blog
              </Link>
              <span className="mx-2 text-gray-600">/</span>
              <span className="text-gray-500">Tutorial</span>
            </nav>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              Build Your First API in Under 1 Hour with SiroPHP
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 text-gray-400 text-sm mb-12">
              <span>February 19, 2026</span>
              <span>•</span>
              <span>8 min read</span>
              <span>•</span>
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400">
                Tutorial
              </span>
            </div>

            {/* Introduction */}
            <p className="text-gray-400 leading-relaxed mb-6">
              How long does it take you to build a simple CRUD API? If you&apos;re like most developers, 
              the answer is probably <strong className="text-white">half a day or more</strong>. You 
              spend hours writing boilerplate code: models, controllers, migrations, routes, 
              validation, tests...
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              What if you could generate all of that in <strong className="text-white">30 seconds</strong>? 
              Not a prototype. Not a skeleton. A fully functional, production-ready API with proper 
              structure, validation, and tests.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              With <strong className="text-white">SiroPHP&apos;s intelligent scaffolding system</strong>, 
              you can. Let me show you how to go from zero to a complete API in under an hour.
            </p>

            {/* Table of Contents */}
            <div className="p-6 rounded-xl border border-white/10 bg-white/5 mb-12">
              <h2 className="text-xl font-bold text-white mb-4">Table of Contents</h2>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#the-problem" className="hover:text-cyan-400 transition-colors">1. The Boilerplate Problem</a></li>
                <li><a href="#quick-start" className="hover:text-cyan-400 transition-colors">2. Quick Start: Install & Setup (5 minutes)</a></li>
                <li><a href="#one-command-crud" className="hover:text-cyan-400 transition-colors">3. One-Command CRUD Generation (30 seconds)</a></li>
                <li><a href="#what-generated" className="hover:text-cyan-400 transition-colors">4. What Gets Generated?</a></li>
                <li><a href="#customize" className="hover:text-cyan-400 transition-colors">5. Customize & Extend</a></li>
                <li><a href="#complete-project" className="hover:text-cyan-400 transition-colors">6. Building a Complete Project in 1 Hour</a></li>
              </ul>
            </div>

            {/* Section 1 */}
            <h2 id="the-problem" className="text-3xl font-bold text-white mb-4">
              1. The Boilerplate Problem
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Every CRUD API follows the same pattern. For a simple &quot;products&quot; resource, you need:
            </p>
            
            <div className="bg-white/5 rounded-xl p-6 mb-8 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Traditional Workflow:</h3>
              <ul className="text-gray-400 space-y-2">
                <li>✏️ Create migration file (5 min)</li>
                <li>✏️ Define schema with columns and indexes (5 min)</li>
                <li>✏️ Create model class (5 min)</li>
                <li>✏️ Add fillable fields, relationships, casts (5 min)</li>
                <li>✏️ Create controller (5 min)</li>
                <li>✏️ Write index, show, store, update, destroy methods (20 min)</li>
                <li>✏️ Add validation rules (10 min)</li>
                <li>✏️ Define routes (5 min)</li>
                <li>✏️ Write API tests (30 min)</li>
                <li>✏️ Test manually with Postman (15 min)</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-gray-400 text-sm">
                  ⏱️ <strong>Total time:</strong> ~1.5 - 2 hours for ONE resource<br/>
                  😫 <strong>Reality:</strong> Most projects have 5-10 resources = 7.5-20 hours
                </p>
              </div>
            </div>

            <p className="text-gray-400 leading-relaxed mb-6">
              This is wasted time. You&apos;re not solving unique problems—you&apos;re writing repetitive 
              code that follows predictable patterns. There&apos;s a better way.
            </p>

            {/* Section 2 */}
            <h2 id="quick-start" className="text-3xl font-bold text-white mb-4">
              2. Quick Start: Install & Setup (5 minutes)
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Let&apos;s start from scratch and build a complete API project.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3">Step 1: Install SiroPHP</h3>
            <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`# Create new project
composer create-project sirosoft/api my-api

# Navigate to project
cd my-api

# Generate app key
php siro key:generate`}
              </pre>
            </div>

            <h3 className="text-2xl font-semibold text-white mb-3">Step 2: Configure Database</h3>
            <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`# Edit .env file
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=my_api_db
DB_USERNAME=root
DB_PASSWORD=

# Run migrations
php siro migrate`}
              </pre>
            </div>

            <h3 className="text-2xl font-semibold text-white mb-3">Step 3: Start Development Server</h3>
            <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`php siro serve

# Server running at http://localhost:8080`}
              </pre>
            </div>

            <div className="p-6 rounded-xl border border-green-500/20 bg-green-500/5 mb-8">
              <p className="text-green-400 text-sm">
                ✅ <strong>Time elapsed:</strong> 5 minutes<br/>
                🎯 <strong>Status:</strong> Project ready, server running
              </p>
            </div>

            {/* Section 3 */}
            <h2 id="one-command-crud" className="text-3xl font-bold text-white mb-4">
              3. One-Command CRUD Generation (30 seconds)
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Here&apos;s where the magic happens. Instead of manually creating files, use the 
              scaffolding command:
            </p>

            <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`# Generate complete CRUD for "products" resource
php siro make:crud products

# Output:
✓ Created: database/migrations/2026_02_19_create_products_table.php
✓ Created: app/Models/Product.php
✓ Created: app/Controllers/ProductController.php
✓ Updated: routes/api.php
✓ Created: tests/ProductApiTest.php

Generated 5 files in 0.3 seconds! 🚀`}
              </pre>
            </div>

            <p className="text-gray-400 leading-relaxed mb-6">
              That&apos;s it. In less than a second, you have a fully functional CRUD API. Let&apos;s see 
              what was generated.
            </p>

            {/* Section 4 */}
            <h2 id="what-generated" className="text-3xl font-bold text-white mb-4">
              4. What Gets Generated?
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              The scaffolding command creates everything you need for a production-ready API:
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3">1. Database Migration</h3>
            <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`// database/migrations/create_products_table.php
Schema::create('products', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->text('description')->nullable();
    $table->decimal('price', 10, 2);
    $table->integer('stock')->default(0);
    $table->boolean('is_active')->default(true);
    $table->timestamps();
    $table->softDeletes();
});`}
              </pre>
            </div>

            <h3 className="text-2xl font-semibold text-white mb-3">2. Model with Relationships</h3>
            <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`// app/Models/Product.php
class Product extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price',
        'stock',
        'is_active',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'stock' => 'integer',
        'is_active' => 'boolean',
    ];

    // Soft deletes enabled by default
    use SoftDeletes;
}`}
              </pre>
            </div>

            <h3 className="text-2xl font-semibold text-white mb-3">3. Controller with Full CRUD</h3>
            <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`// app/Controllers/ProductController.php
class ProductController extends Controller
{
    // GET /api/products - List all products
    public function index(Request $request)
    {
        $products = Product::paginate($request->get('per_page', 20));
        return Response::json($products);
    }

    // GET /api/products/{id} - Get single product
    public function show(int $id)
    {
        $product = Product::findOrFail($id);
        return Response::json($product);
    }

    // POST /api/products - Create product
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
        ]);

        $product = Product::create($validated);
        return Response::json($product, 201);
    }

    // PUT /api/products/{id} - Update product
    public function update(Request $request, int $id)
    {
        $product = Product::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'price' => 'sometimes|numeric|min:0',
        ]);

        $product->update($validated);
        return Response::json($product);
    }

    // DELETE /api/products/{id} - Delete product
    public function destroy(int $id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return Response::json(['message' => 'Deleted']);
    }
}`}
              </pre>
            </div>

            <h3 className="text-2xl font-semibold text-white mb-3">4. Routes Auto-Registered</h3>
            <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`// routes/api.php (automatically updated)
Route::apiResource('products', ProductController::class);

// Generates:
// GET    /api/products           → index
// GET    /api/products/{id}      → show
// POST   /api/products           → store
// PUT    /api/products/{id}      → update
// DELETE /api/products/{id}      → destroy`}
              </pre>
            </div>

            <h3 className="text-2xl font-semibold text-white mb-3">5. API Tests Included</h3>
            <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`// tests/ProductApiTest.php
class ProductApiTest extends TestCase
{
    public function test_can_list_products()
    {
        $response = $this->get('/api/products');
        $response->assertStatus(200);
    }

    public function test_can_create_product()
    {
        $response = $this->post('/api/products', [
            'name' => 'Test Product',
            'price' => 99.99,
            'stock' => 10,
        ]);
        $response->assertStatus(201);
    }

    // More tests included...
}`}
              </pre>
            </div>

            {/* Section 5 */}
            <h2 id="customize" className="text-3xl font-bold text-white mb-4">
              5. Customize & Extend
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              The generated code is just a starting point. Customize it to fit your needs:
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3">Add Custom Fields</h3>
            <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`# Regenerate with custom fields
php siro make:crud products \
  --fields="name:string,description:text,price:decimal,sku:string,category_id:foreign"

# Or edit migration manually and re-run
php siro migrate:fresh`}
              </pre>
            </div>

            <h3 className="text-2xl font-semibold text-white mb-3">Add Relationships</h3>
            <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`// app/Models/Product.php
public function category(): BelongsTo
{
    return $this->belongsTo(Category::class);
}

public function reviews(): HasMany
{
    return $this->hasMany(Review::class);
}

// Use in controller
$products = Product::with('category', 'reviews')->paginate(20);`}
              </pre>
            </div>

            <h3 className="text-2xl font-semibold text-white mb-3">Add Custom Validation</h3>
            <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`// app/Controllers/ProductController.php
$validated = $request->validate([
    'name' => 'required|string|max:255|unique:products,name',
    'price' => 'required|numeric|min:0|max:999999.99',
    'sku' => 'required|string|unique:products,sku|regex:/^[A-Z]{3}-[0-9]{4}$/',
    'stock' => 'required|integer|min:0|max:99999',
]);`}
              </pre>
            </div>

            {/* Section 6 */}
            <h2 id="complete-project" className="text-3xl font-bold text-white mb-4">
              6. Building a Complete Project in 1 Hour
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Let&apos;s build a complete e-commerce API with multiple resources. Here&apos;s the timeline:
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <span className="text-cyan-400 font-bold">0-5m</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Project Setup</h4>
                  <p className="text-gray-400 text-sm">Install, configure database, run initial migration</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <span className="text-purple-400 font-bold">5-10m</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Generate Core Resources</h4>
                  <p className="text-gray-400 text-sm">Products, Categories, Users (3 commands, 30 seconds each)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-pink-500/20 flex items-center justify-center">
                  <span className="text-pink-400 font-bold">10-20m</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Add Relationships</h4>
                  <p className="text-gray-400 text-sm">Product belongsTo Category, User hasMany Orders, etc.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <span className="text-green-400 font-bold">20-35m</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Customize Business Logic</h4>
                  <p className="text-gray-400 text-sm">Add custom validation, filters, search, pagination</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                  <span className="text-yellow-400 font-bold">35-50m</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Testing & Debugging</h4>
                  <p className="text-gray-400 text-sm">Run generated tests, fix issues, test with CLI tools</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <span className="text-blue-400 font-bold">50-60m</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Documentation & Deploy Prep</h4>
                  <p className="text-gray-400 text-sm">Generate API docs, review code, prepare for deployment</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-cyan-500/20 bg-cyan-500/5 mb-8">
              <p className="text-cyan-300">
                🎉 <strong>Result:</strong> Complete e-commerce API with 5+ resources, relationships, 
                authentication, tests, and documentation—in under 1 hour.
              </p>
            </div>

            {/* Conclusion */}
            <h2 className="text-3xl font-bold text-white mb-4 mt-12">Conclusion</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Building APIs shouldn&apos;t be about writing boilerplate code. It should be about solving 
              real business problems. SiroPHP&apos;s scaffolding system eliminates the repetitive work, 
              letting you focus on what matters: your application&apos;s unique features.
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              With one command, you get:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 mb-8 ml-4">
              <li>Database migrations with proper schema</li>
              <li>Models with relationships and soft deletes</li>
              <li>Controllers with full CRUD operations</li>
              <li>Auto-registered routes</li>
              <li>API tests ready to run</li>
              <li>Validation rules included</li>
            </ul>
            <p className="text-gray-400 leading-relaxed mb-8">
              Stop wasting time on boilerplate. Start shipping APIs faster.
            </p>

            {/* CTA */}
            <div className="p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ship APIs Faster with Scaffolding
              </h3>
              <p className="text-gray-400 mb-6">
                Generate production-ready APIs in seconds, not hours
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="https://github.com/SiroSoft/SiroPHP"
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  Try SiroPHP →
                </Link>
                <Link
                  href="https://github.com/SiroSoft/siro-core"
                  className="px-8 py-3 border border-white/20 text-gray-300 hover:text-white font-semibold rounded-lg hover:border-white/40 transition-all"
                >
                  View Core Framework
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </article>
    </main>
  );
}
