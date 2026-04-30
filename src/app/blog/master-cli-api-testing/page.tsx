import type { Metadata } from 'next';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'Master CLI API Testing: The Complete Developer Guide | Siro PHP',
  description: 'Learn how to test APIs efficiently from the command line. Auto-authentication, request history, automation scripts, and keyboard-driven workflows.',
  keywords: [
    'cli api testing php',
    'terminal api testing',
    'php api test cli',
    'api testing automation',
    'sirophp cli testing',
    'command line api testing',
    'api testing workflow',
  ],
};

export default function Article4() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Master CLI API Testing: The Complete Developer Guide',
    description: 'Learn how to test APIs efficiently from the command line. Auto-authentication, request history, automation scripts, and keyboard-driven workflows.',
    image: 'https://sirophp.com/og-image.png',
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
        url: 'https://sirophp.com/logo.png',
      },
    },
    datePublished: '2026-02-05',
    dateModified: '2026-02-05',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://sirophp.com/blog/master-cli-api-testing',
    },
    keywords: 'cli api testing, terminal api testing, php api testing, api testing automation',
    articleSection: 'Tutorial',
    wordCount: '1800',
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
              Master CLI API Testing: The Complete Developer Guide
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 text-gray-400 text-sm mb-12">
              <span>February 5, 2026</span>
              <span>•</span>
              <span>9 min read</span>
              <span>•</span>
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400">
                Tutorial
              </span>
            </div>

            {/* Introduction */}
            <p className="text-gray-400 leading-relaxed mb-6">
              As a backend developer, you spend most of your time in the terminal. You build APIs, 
              run migrations, check logs, and deploy services—all from the command line. So why 
              switch to a GUI tool just to test your endpoints?
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              <strong className="text-white">CLI-based API testing</strong> keeps you in your 
              natural workflow. No context switching. No mouse dependency. Just fast, efficient, 
              keyboard-driven testing that integrates seamlessly with your development process.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              <strong className="text-white">SiroPHP is an API-first PHP framework</strong> that 
              includes native CLI testing tools. With features like auto-authentication, request 
              history, and automation scripts, you can test APIs faster than ever before.
            </p>

            {/* Table of Contents */}
            <div className="p-6 rounded-xl border border-white/10 bg-white/5 mb-12">
              <h2 className="text-xl font-bold text-white mb-4">Table of Contents</h2>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#why-cli" className="hover:text-cyan-400 transition-colors">1. Why Test APIs from CLI?</a></li>
                <li><a href="#basic-testing" className="hover:text-cyan-400 transition-colors">2. Basic CLI Testing Commands</a></li>
                <li><a href="#auto-auth" className="hover:text-cyan-400 transition-colors">3. Auto-Authentication (Game Changer)</a></li>
                <li><a href="#request-history" className="hover:text-cyan-400 transition-colors">4. Request History & Reusability</a></li>
                <li><a href="#automation" className="hover:text-cyan-400 transition-colors">5. Automation & Scripting</a></li>
                <li><a href="#advanced-tips" className="hover:text-cyan-400 transition-colors">6. Advanced Tips & Best Practices</a></li>
              </ul>
            </div>

            {/* Section 1 */}
            <h2 id="why-cli" className="text-3xl font-bold text-white mb-4">
              1. Why Test APIs from CLI?
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Backend developers live in the terminal. It's where we feel most productive. CLI-based 
              API testing respects this workflow by keeping everything in one place.
            </p>
            
            <h3 className="text-2xl font-semibold text-white mb-3 mt-8">Benefits of CLI Testing:</h3>
            <ul className="list-disc list-inside text-gray-400 space-y-2 mb-6 ml-4">
              <li><strong className="text-white">No context switching</strong> - Stay in your terminal</li>
              <li><strong className="text-white">Keyboard-driven</strong> - Faster than clicking through UI</li>
              <li><strong className="text-white">Scriptable</strong> - Automate repetitive tests</li>
              <li><strong className="text-white">Version control friendly</strong> - Save test commands in git</li>
              <li><strong className="text-white">CI/CD integration</strong> - Easy to run in pipelines</li>
              <li><strong className="text-white">Lightweight</strong> - No heavy GUI application</li>
            </ul>

            <div className="p-6 rounded-xl border border-cyan-500/20 bg-cyan-500/5 mb-8">
              <p className="text-cyan-300 text-sm">
                💡 <strong>Pro Tip:</strong> If you're already comfortable with curl or httpie, 
                CLI testing will feel natural. SiroPHP makes it even easier with auto-authentication 
                and built-in helpers.
              </p>
            </div>

            {/* Section 2 */}
            <h2 id="basic-testing" className="text-3xl font-bold text-white mb-4">
              2. Basic CLI Testing Commands
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Testing an API endpoint from the command line is straightforward. Here are the essential 
              commands you'll use daily.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3">GET Requests</h3>
            <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`# Simple GET request
php siro api:test GET /api/users

# With query parameters
php siro api:test GET /api/users?page=2&limit=10

# With custom headers
php siro api:test GET /api/data --header="X-API-Key: abc123"`}
              </pre>
            </div>

            <h3 className="text-2xl font-semibold text-white mb-3">POST Requests</h3>
            <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`# POST with data
php siro api:test POST /api/users name="John Doe" email="john@example.com"

# POST with JSON body
php siro api:test POST /api/products \
  name="Laptop" \
  price=999 \
  category="electronics"`}
              </pre>
            </div>

            <h3 className="text-2xl font-semibold text-white mb-3">PUT/PATCH/DELETE</h3>
            <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`# Update resource
php siro api:test PUT /api/users/123 name="Jane Doe"

# Partial update
php siro api:test PATCH /api/users/123 email="jane@example.com"

# Delete resource
php siro api:test DELETE /api/users/123`}
              </pre>
            </div>

            {/* Section 3 */}
            <h2 id="auto-auth" className="text-3xl font-bold text-white mb-4">
              3. Auto-Authentication (Game Changer)
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              One of the biggest pain points in API testing is managing authentication tokens. 
              Traditional workflows require you to:
            </p>
            <ol className="list-decimal list-inside text-gray-400 space-y-2 mb-6 ml-4">
              <li>Login manually</li>
              <li>Copy the token from response</li>
              <li>Paste it into every subsequent request</li>
              <li>Repeat when token expires</li>
            </ol>
            <p className="text-gray-400 leading-relaxed mb-6">
              <strong className="text-white">SiroPHP eliminates this friction</strong> with 
              auto-authentication. Login once, and the token is saved automatically for future requests.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3">How It Works</h3>
            <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`# Step 1: Login and save token as "admin"
php siro api:test POST /auth/login \
  email=admin@example.com \
  password=secret123 \
  --as=admin

# Output:
✓ Login successful
✓ Token saved as "admin"

# Step 2: Use saved token automatically
php siro api:test GET /api/users --as=admin
php siro api:test POST /api/products name="Phone" --as=admin
php siro api:test DELETE /api/users/456 --as=admin

# All requests above automatically include the saved token!`}
              </pre>
            </div>

            <h3 className="text-2xl font-semibold text-white mb-3">Multiple User Sessions</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              You can maintain multiple authenticated sessions simultaneously—perfect for testing 
              role-based access control.
            </p>
            <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`# Login as different users
php siro api:test POST /auth/login email=admin@test.com password=pass --as=admin
php siro api:test POST /auth/login email=user@test.com password=pass --as=user
php siro api:test POST /auth/login email=mod@test.com password=pass --as=moderator

# Test with different roles
php siro api:test GET /admin/dashboard --as=admin       # ✓ Access granted
php siro api:test GET /admin/dashboard --as=user        # ✗ Access denied
php siro api:test GET /admin/dashboard --as=moderator   # ✓ Access granted`}
              </pre>
            </div>

            <div className="p-6 rounded-xl border border-purple-500/20 bg-purple-500/5 mb-8">
              <p className="text-purple-300 text-sm">
                ⚡ <strong>Time Saved:</strong> Auto-authentication saves ~2-3 minutes per testing 
                session. Over a week, that's 1-2 hours of productivity regained.
              </p>
            </div>

            {/* Section 4 */}
            <h2 id="request-history" className="text-3xl font-bold text-white mb-4">
              4. Request History & Reusability
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              CLI testing isn't just about running commands—it's about building a reusable testing 
              workflow. SiroPHP tracks your request history and lets you save frequently used commands.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3">View Request History</h3>
            <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`# Show last 20 requests
php siro api:test --history

# Output:
[2026-02-05 14:32:15] GET    /api/users          --as=admin  (200 OK, 45ms)
[2026-02-05 14:31:42] POST   /api/products       --as=admin  (201 Created, 67ms)
[2026-02-05 14:30:18] GET    /api/orders         --as=user   (200 OK, 38ms)
[2026-02-05 14:29:55] POST   /auth/login         --as=admin  (200 OK, 120ms)`}
              </pre>
            </div>

            <h3 className="text-2xl font-semibold text-white mb-3">Save & Reuse Commands</h3>
            <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`# Save a complex request
php siro api:test POST /api/orders \
  user_id=123 \
  product_id=456 \
  quantity=2 \
  --save=create-order

# Reuse anytime
php siro api:test --run=create-order

# Update saved command
php siro api:test POST /api/orders \
  user_id=123 \
  product_id=789 \
  quantity=1 \
  --save=create-order --overwrite`}
              </pre>
            </div>

            {/* Section 5 */}
            <h2 id="automation" className="text-3xl font-bold text-white mb-4">
              5. Automation & Scripting
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              The real power of CLI testing emerges when you automate repetitive workflows. Create 
              test scripts, integrate with CI/CD, and build comprehensive test suites.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3">Test Script Example</h3>
            <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`#!/bin/bash
# test-api.sh - Automated API test suite

echo "🧪 Running API Test Suite..."

# Login
echo "→ Logging in..."
php siro api:test POST /auth/login \
  email=test@example.com \
  password=test123 \
  --as=testuser

# Test CRUD operations
echo "→ Testing user creation..."
php siro api:test POST /api/users \
  name="Test User" \
  email="testuser@example.com" \
  --as=testuser

echo "→ Testing user retrieval..."
php siro api:test GET /api/users --as=testuser

echo "→ Testing user update..."
php siro api:test PUT /api/users/1 \
  name="Updated Name" \
  --as=testuser

echo "→ Testing user deletion..."
php siro api:test DELETE /api/users/1 --as=testuser

echo "✅ All tests passed!"`}
              </pre>
            </div>

            <h3 className="text-2xl font-semibold text-white mb-3">CI/CD Integration</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              Integrate CLI tests into your deployment pipeline to catch issues before they reach production.
            </p>
            <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`# .github/workflows/test.yml
name: API Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.2'
      
      - name: Install dependencies
        run: composer install
      
      - name: Start server
        run: php siro serve &
      
      - name: Run API tests
        run: bash test-api.sh`}
              </pre>
            </div>

            {/* Section 6 */}
            <h2 id="advanced-tips" className="text-3xl font-bold text-white mb-4">
              6. Advanced Tips & Best Practices
            </h2>

            <h3 className="text-2xl font-semibold text-white mb-3">Tip 1: Use Environment Variables</h3>
            <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`# Set base URL in .env
API_BASE_URL=http://localhost:8080

# Use in tests
php siro api:test GET /api/users --base=$API_BASE_URL`}
              </pre>
            </div>

            <h3 className="text-2xl font-semibold text-white mb-3">Tip 2: Chain Commands</h3>
            <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`# Run multiple tests in sequence
php siro api:test GET /api/users --as=admin && \
php siro api:test GET /api/products --as=admin && \
php siro api:test GET /api/orders --as=admin`}
              </pre>
            </div>

            <h3 className="text-2xl font-semibold text-white mb-3">Tip 3: Custom Response Formatting</h3>
            <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`# Pretty-print JSON response
php siro api:test GET /api/users --as=admin | jq

# Extract specific field
php siro api:test GET /api/users/1 --as=admin | jq '.data.email'`}
              </pre>
            </div>

            <h3 className="text-2xl font-semibold text-white mb-3">Tip 4: Performance Testing</h3>
            <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`# Measure response time
time php siro api:test GET /api/users --as=admin

# Run load test (using parallel)
seq 1 100 | parallel -j 10 php siro api:test GET /api/users --as=admin`}
              </pre>
            </div>

            {/* Conclusion */}
            <h2 className="text-3xl font-bold text-white mb-4 mt-12">Conclusion</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              CLI-based API testing isn't just about avoiding GUI tools—it's about embracing a 
              workflow that aligns with how backend developers naturally work. By keeping everything 
              in the terminal, you reduce context switching, increase speed, and enable automation.
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              With SiroPHP's built-in CLI testing tools, you get:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 mb-8 ml-4">
              <li>Auto-authentication (no more manual token management)</li>
              <li>Request history and reusability</li>
              <li>Automation-friendly commands</li>
              <li>Seamless integration with your existing workflow</li>
            </ul>
            <p className="text-gray-400 leading-relaxed mb-8">
              Start testing APIs from your terminal today. Your future self will thank you for the 
              time saved and the improved productivity.
            </p>

            {/* CTA */}
            <div className="p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Try CLI Testing?
              </h3>
              <p className="text-gray-400 mb-6">
                Install SiroPHP and experience keyboard-driven API testing
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/#get-started"
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  Get Started →
                </Link>
                <Link
                  href="/docs/cli-commands"
                  className="px-8 py-3 border border-white/20 text-gray-300 hover:text-white font-semibold rounded-lg hover:border-white/40 transition-all"
                >
                  View CLI Docs
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </article>
    </main>
  );
}
