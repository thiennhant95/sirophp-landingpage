import type { Metadata } from 'next';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'PHP API Testing from Terminal: The Complete CLI Guide',
  description: 'Master CLI-based API testing in PHP. Learn how to test endpoints, automate workflows, and debug without leaving your terminal.',
  keywords: [
    'cli api testing php',
    'php api testing terminal',
    'test api php cli',
    'php curl api testing',
    'automated api testing php',
    'terminal api testing',
    'php rest api testing',
  ],
  alternates: {
    canonical: 'https://sirophp.com/blog/php-api-testing-from-terminal',
  },
  openGraph: {
    title: 'PHP API Testing from Terminal: The Complete CLI Guide | SiroPHP',
    description: 'Master CLI-based API testing in PHP. Learn how to test endpoints, automate workflows, and debug without leaving your terminal.',
    type: 'article',
    publishedTime: '2026-01-22',
    url: 'https://sirophp.com/blog/php-api-testing-from-terminal',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PHP API Testing from Terminal: The Complete CLI Guide | SiroPHP',
    description: 'Master CLI-based API testing in PHP. Learn how to test endpoints and debug without leaving your terminal.',
    images: ['/opengraph-image.png'],
  },
};

export default function Article2() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'PHP API Testing from Terminal: The Complete CLI Guide',
    description: 'Master CLI-based API testing in PHP. Learn how to test endpoints, automate workflows, and debug without leaving your terminal.',
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
    datePublished: '2026-01-22',
    dateModified: '2026-01-22',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://sirophp.com/blog/php-api-testing-from-terminal',
    },
    keywords: 'cli api testing php, php api testing terminal, test api php cli, automated api testing php',
    articleSection: 'Guide',
    wordCount: '1400',
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
            <nav className="mb-8 text-sm">
              <Link href="/blog" className="text-gray-400 hover:text-cyan-400 transition-colors">
                Blog
              </Link>
              <span className="mx-2 text-gray-600">/</span>
              <span className="text-gray-500">Guide</span>
            </nav>

            <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              PHP API Testing from Terminal: The Complete CLI Guide
            </h1>

            <div className="flex items-center gap-4 text-gray-400 text-sm mb-12">
              <span>January 22, 2026</span>
              <span>•</span>
              <span>6 min read</span>
              <span>•</span>
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400">
                Guide
              </span>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Testing APIs shouldn&apos;t require switching between your editor, browser, and Postman. 
                With <strong className="text-white">CLI-based API testing</strong>, you can test, 
                debug, and automate your PHP APIs without ever leaving your terminal.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                <strong className="text-white">SiroPHP is a lightweight PHP API framework</strong> that 
                includes native CLI testing tools. Unlike traditional PHP frameworks that require external 
                tools like Postman, SiroPHP lets you test endpoints directly from your terminal with 
                auto-authentication and instant feedback.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                This guide covers everything you need to know about testing PHP APIs from the command 
                line, from basic endpoint testing to advanced automation workflows.
              </p>

              <div className="p-6 rounded-xl border border-white/10 bg-white/5 mb-12">
                <h2 className="text-xl font-bold text-white mb-4">Table of Contents</h2>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#why-cli" className="hover:text-cyan-400 transition-colors">1. Why Test APIs from CLI?</a></li>
                  <li><a href="#basic-testing" className="hover:text-cyan-400 transition-colors">2. Basic CLI API Testing</a></li>
                  <li><a href="#advanced-testing" className="hover:text-cyan-400 transition-colors">3. Advanced Testing Techniques</a></li>
                  <li><a href="#automation" className="hover:text-cyan-400 transition-colors">4. Automating API Tests</a></li>
                  <li><a href="#best-practices" className="hover:text-cyan-400 transition-colors">5. Best Practices</a></li>
                </ul>
              </div>

              <h2 id="why-cli" className="text-3xl font-bold text-white mb-4">
                1. Why Test APIs from CLI?
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                CLI testing offers several advantages over GUI tools:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                  <h3 className="text-lg font-semibold text-white mb-2">⚡ Faster Workflow</h3>
                  <p className="text-gray-400 text-sm">
                    No context switching. Stay in your terminal and test instantly.
                  </p>
                </div>
                <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                  <h3 className="text-lg font-semibold text-white mb-2">🔄 Repeatable</h3>
                  <p className="text-gray-400 text-sm">
                    Scripts can be version-controlled and shared with your team.
                  </p>
                </div>
                <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                  <h3 className="text-lg font-semibold text-white mb-2">🚀 Automatable</h3>
                  <p className="text-gray-400 text-sm">
                    Integrate with CI/CD pipelines for automated testing.
                  </p>
                </div>
                <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                  <h3 className="text-lg font-semibold text-white mb-2">📜 Scriptable</h3>
                  <p className="text-gray-400 text-sm">
                    Chain tests together and create complex testing workflows.
                  </p>
                </div>
              </div>

              <h2 id="basic-testing" className="text-3xl font-bold text-white mb-4">
                2. Basic CLI API Testing
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Let&apos;s start with the basics. Here&apos;s how to test common API operations from your terminal:
              </p>

              <h3 className="text-2xl font-semibold text-white mb-3">GET Request</h3>
              <div className="p-6 rounded-xl border border-white/10 bg-black/50 mb-6">
                <pre className="font-mono text-sm text-cyan-400 whitespace-pre overflow-x-auto">
{`# Test GET endpoint
php siro api:test GET /api/users

# Output:
✓ GET /api/users
✓ Status: 200 OK
✓ Response time: 52ms
✓ Returned 15 users`}
                </pre>
              </div>

              <h3 className="text-2xl font-semibold text-white mb-3">POST Request</h3>
              <div className="p-6 rounded-xl border border-white/10 bg-black/50 mb-6">
                <pre className="font-mono text-sm text-cyan-400 whitespace-pre overflow-x-auto">
{`# Test POST endpoint with data
php siro api:test POST /api/users \
  --data '{"name":"John","email":"john@example.com"}'

# Output:
✓ POST /api/users
✓ Status: 201 Created
✓ Response time: 89ms
✓ User ID: 42
✓ Validation passed`}
                </pre>
              </div>

              <h3 className="text-2xl font-semibold text-white mb-3">PUT/PATCH Request</h3>
              <div className="p-6 rounded-xl border border-white/10 bg-black/50 mb-6">
                <pre className="font-mono text-sm text-cyan-400 whitespace-pre overflow-x-auto">
{`# Update user
php siro api:test PUT /api/users/42 \
  --data '{"name":"John Updated"}'

# Output:
✓ PUT /api/users/42
✓ Status: 200 OK
✓ User updated successfully`}
                </pre>
              </div>

              <h2 id="advanced-testing" className="text-3xl font-bold text-white mb-4">
                3. Advanced Testing Techniques
              </h2>

              <h3 className="text-2xl font-semibold text-white mb-3">Authentication Testing</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                CLI testing automatically handles authentication, but you can also test auth flows:
              </p>
              <div className="p-6 rounded-xl border border-white/10 bg-black/50 mb-6">
                <pre className="font-mono text-sm text-cyan-400 whitespace-pre overflow-x-auto">
{`# Test protected endpoint (auto-auth)
php siro api:test GET /api/users/42/profile

# Test with specific token
php siro api:test GET /api/admin/users \
  --token "your_jwt_token_here"

# Test authentication failure
php siro api:test GET /api/users \
  --no-auth

# Output:
✓ Status: 401 Unauthorized
✓ Error: Authentication required`}
                </pre>
              </div>

              <h3 className="text-2xl font-semibold text-white mb-3">Header Testing</h3>
              <div className="p-6 rounded-xl border border-white/10 bg-black/50 mb-6">
                <pre className="font-mono text-sm text-cyan-400 whitespace-pre overflow-x-auto">
{`# Test with custom headers
php siro api:test POST /api/upload \
  --header "Content-Type: multipart/form-data" \
  --header "X-Custom-Header: value"

# Output:
✓ Custom headers sent successfully
✓ Server responded: 200 OK`}
                </pre>
              </div>

              <h2 id="automation" className="text-3xl font-bold text-white mb-4">
                4. Automating API Tests
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Create test suites that run multiple tests in sequence:
              </p>

              <div className="p-6 rounded-xl border border-white/10 bg-black/50 mb-6">
                <pre className="font-mono text-sm text-cyan-400 whitespace-pre overflow-x-auto">
{`# Create a test suite file: tests/api-suite.sh

#!/bin/bash
echo "Running API Test Suite..."

# Test user creation
php siro api:test POST /api/users \
  --data '{"name":"Test User","email":"test@example.com"}'

# Test user retrieval
php siro api:test GET /api/users/42

# Test user update
php siro api:test PUT /api/users/42 \
  --data '{"name":"Updated User"}'

# Test user deletion
php siro api:test DELETE /api/users/42

echo "All tests passed!"`}
                </pre>
              </div>

              <p className="text-gray-400 leading-relaxed mb-8">
                Run the entire suite with one command:
              </p>
              <div className="p-6 rounded-xl border border-white/10 bg-black/50 mb-6">
                <pre className="font-mono text-sm text-green-400 whitespace-pre overflow-x-auto">
{`bash tests/api-suite.sh

# Output:
Running API Test Suite...
✓ POST /api/users - 201 Created (89ms)
✓ GET /api/users/42 - 200 OK (45ms)
✓ PUT /api/users/42 - 200 OK (67ms)
✓ DELETE /api/users/42 - 204 No Content (52ms)
All tests passed! ✓`}
                </pre>
              </div>

              <h2 id="best-practices" className="text-3xl font-bold text-white mb-4">
                5. Best Practices
              </h2>
              <div className="space-y-6 mb-12">
                <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                  <h3 className="text-lg font-semibold text-white mb-2">✓ Use Descriptive Test Names</h3>
                  <p className="text-gray-400 text-sm">
                    Name your tests clearly so you know what they&apos;re testing at a glance.
                  </p>
                </div>
                <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                  <h3 className="text-lg font-semibold text-white mb-2">✓ Test Edge Cases</h3>
                  <p className="text-gray-400 text-sm">
                    Don&apos;t just test happy paths. Test invalid data, missing fields, and error scenarios.
                  </p>
                </div>
                <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                  <h3 className="text-lg font-semibold text-white mb-2">✓ Integrate with CI/CD</h3>
                  <p className="text-gray-400 text-sm">
                    Run your CLI tests automatically on every deployment.
                  </p>
                </div>
                <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                  <h3 className="text-lg font-semibold text-white mb-2">✓ Version Control Your Tests</h3>
                  <p className="text-gray-400 text-sm">
                    Keep test scripts in your repository alongside your code.
                  </p>
                </div>
              </div>

              <div className="p-8 rounded-xl border border-cyan-400/30 bg-cyan-500/5 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Conclusion</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  CLI-based API testing is a game-changer for PHP developers. It eliminates context 
                  switching, enables automation, and keeps your testing workflow fast and efficient.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Whether you&apos;re testing a single endpoint or running a full test suite, the terminal 
                  gives you the power and flexibility to test APIs the way professional developers do.
                </p>
              </div>

              <div className="text-center p-8 rounded-xl border border-white/10 bg-white/5">
                <h3 className="text-xl font-bold text-white mb-4">
                  Want to Test Faster?
                </h3>
                <p className="text-gray-400 mb-6">
                  SiroPHP includes built-in CLI testing tools out of the box
                </p>
                <Link
                  href="https://github.com/SiroSoft/SiroPHP"
                  className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  Try SiroPHP CLI Testing →
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </article>
    </main>
  );
}
