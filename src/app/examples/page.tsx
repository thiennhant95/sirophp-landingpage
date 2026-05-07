import type { Metadata } from 'next';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'Code Examples — SiroPHP API Framework',
  description: 'Real code examples for building APIs with SiroPHP. CRUD scaffolding, JWT authentication, request replay, and CLI testing snippets.',
  alternates: { canonical: 'https://sirophp.com/examples' },
  openGraph: {
    title: 'Code Examples — SiroPHP API Framework',
    description: 'Real code examples for building APIs with SiroPHP. CRUD scaffolding, JWT authentication, request replay, and CLI testing snippets.',
    url: 'https://sirophp.com/examples',
    siteName: 'SiroPHP',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Code Examples — SiroPHP API Framework',
    description: 'Real code examples for building APIs with SiroPHP. CRUD scaffolding, JWT authentication, request replay, and CLI testing snippets.',
  },
};

const examples = [
  {
    title: 'CRUD API in 2 Seconds',
    code: `# Generate complete products API
php siro make:crud products

# Files created automatically:
# - Model, Controller, Migration, Routes, Tests

# Start server
php siro serve

# Test it
curl http://localhost:8080/api/products`,
    lang: 'bash',
  },
  {
    title: 'JWT Authentication',
    code: `# Generate full auth system
php siro make:auth

# Available endpoints:
# POST /auth/register
# POST /auth/login
# POST /auth/refresh
# POST /auth/logout
# GET  /auth/me

# Login and save token
php siro api:test POST /auth/login \\
  email=admin@test.com \\
  password=secret \\
  --as=admin`,
    lang: 'bash',
  },
  {
    title: 'Define Routes with Validation',
    code: `// routes/api.php
Route::get('/products', [ProductController::class, 'index']);
Route::post('/products', [ProductController::class, 'store']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::put('/products/{id}', [ProductController::class, 'update']);
Route::delete('/products/{id}', [ProductController::class, 'destroy']);

// With validation middleware
Route::post('/products', [ProductController::class, 'store'])
    ->middleware([AuthMiddleware::class, ThrottleMiddleware::class]);`,
    lang: 'php',
  },
  {
    title: 'Request Validation',
    code: `public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'price' => 'required|numeric|min:0',
        'status' => 'in:active,inactive,pending',
    ]);

    $product = Product::create($validated);
    return Response::json($product, 201);
}`,
    lang: 'php',
  },
  {
    title: 'Debug Production Request',
    code: `# Every response includes X-Siro-Trace-Id
curl -v https://api.example.com/users
# X-Siro-Trace-Id: siro_a1b2c3d4

# Replay exact production request
php siro replay a1b2c3d4

# Fix with watch mode
php siro fix

# Verify fix
php siro replay --diff

# Full trace with SQL queries
php siro log:trace a1b2c3d4`,
    lang: 'bash',
  },
  {
    title: 'Model with Relationships',
    code: `final class Post extends Model
{
    protected string $table = 'posts';

    protected array $fillable = [
        'title', 'body', 'user_id', 'status',
    ];

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class, 'post_id');
    }
}

// Eager load
$post = Post::with('author', 'comments')->find(1);`,
    lang: 'php',
  },
];

export default function ExamplesPage() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <Link href="/" className="text-cyan-400 hover:text-cyan-300 text-sm mb-8 inline-block">&larr; Back to Home</Link>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Code Examples</h1>
          <p className="text-gray-400 text-lg mb-12">Real snippets to get started with SiroPHP fast.</p>
        </FadeIn>
        <div className="space-y-8">
          {examples.map((ex, i) => (
            <FadeIn key={i} delay={i * 50}>
              <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                <h2 className="text-xl font-bold text-white mb-4">{ex.title}</h2>
                <div className="rounded-lg bg-black/50 p-4 overflow-x-auto">
                  <pre className="font-mono text-sm text-cyan-400 whitespace-pre">{ex.code}</pre>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </main>
  );
}
