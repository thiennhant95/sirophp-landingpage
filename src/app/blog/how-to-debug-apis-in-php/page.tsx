import type { Metadata } from 'next';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'How to Debug APIs in PHP: Complete Guide (Trace, Replay, CLI)',
  description: 'Learn the complete workflow for debugging PHP APIs in production using request tracing, replay functionality, and CLI testing tools.',
  keywords: [
    'debug api php',
    'php api debugging',
    'trace api request php',
    'replay api request php',
    'cli api testing php',
    'php debugging tools',
    'api error handling php',
  ],
  alternates: {
    canonical: 'https://sirophp.com/blog/how-to-debug-apis-in-php',
  },
  openGraph: {
    title: 'How to Debug APIs in PHP: Complete Guide (Trace, Replay, CLI) | SiroPHP',
    description: 'Learn the complete workflow for debugging PHP APIs in production using request tracing, replay functionality, and CLI testing tools.',
    type: 'article',
    publishedTime: '2026-01-15',
    url: 'https://sirophp.com/blog/how-to-debug-apis-in-php',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Debug APIs in PHP: Complete Guide (Trace, Replay, CLI) | SiroPHP',
    description: 'Learn the complete workflow for debugging PHP APIs in production using request tracing, replay, and CLI testing.',
    images: ['/opengraph-image.png'],
  },
};

export default function Article1() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Debug APIs in PHP: Complete Guide (Trace, Replay, CLI)',
    description: 'Learn the complete workflow for debugging PHP APIs in production using request tracing, replay functionality, and CLI testing tools.',
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
    datePublished: '2026-01-15',
    dateModified: '2026-01-15',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://sirophp.com/blog/how-to-debug-apis-in-php',
    },
    keywords: 'debug api php, php api debugging, trace api request, replay api request, cli api testing',
    articleSection: 'Tutorial',
    wordCount: '1600',
  };

  return (
    <main className="min-h-screen bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {/* Article Header */}
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
              How to Debug APIs in PHP: Complete Guide (Trace, Replay, CLI)
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 text-gray-400 text-sm mb-12">
              <span>January 15, 2026</span>
              <span>•</span>
              <span>8 min read</span>
              <span>•</span>
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400">
                Tutorial
              </span>
            </div>
          </FadeIn>

          {/* Introduction */}
          <FadeIn>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Debugging APIs in PHP doesn't have to be a nightmare. Whether you're dealing with a 
                <strong className="text-white"> 500 Internal Server Error</strong> or an unexpected 
                response payload, the right debugging workflow can save you hours of frustration.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                <strong className="text-white">SiroPHP is a lightweight PHP API framework</strong> designed 
                specifically for developers who need to debug production APIs quickly. With built-in 
                request tracing, replay functionality, and CLI testing tools, you can fix bugs in minutes 
                instead of hours.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                In this complete guide, you'll learn how to debug PHP APIs in production using three 
                powerful techniques: <strong className="text-white">request tracing</strong>, 
                <strong className="text-white"> request replay</strong>, and 
                <strong className="text-white"> CLI testing</strong>. By the end, you'll have a 
                battle-tested workflow for fixing API bugs fast.
              </p>

              {/* Table of Contents */}
              <div className="p-6 rounded-xl border border-white/10 bg-white/5 mb-12">
                <h2 className="text-xl font-bold text-white mb-4">Table of Contents</h2>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#understand-the-problem" className="hover:text-cyan-400 transition-colors">1. Understand the Problem</a></li>
                  <li><a href="#request-tracing" className="hover:text-cyan-400 transition-colors">2. Request Tracing: Find What Went Wrong</a></li>
                  <li><a href="#request-replay" className="hover:text-cyan-400 transition-colors">3. Request Replay: Reproduce Instantly</a></li>
                  <li><a href="#cli-testing" className="hover:text-cyan-400 transition-colors">4. CLI Testing: Verify Your Fix</a></li>
                  <li><a href="#best-practices" className="hover:text-cyan-400 transition-colors">5. Best Practices for API Debugging</a></li>
                </ul>
              </div>

              {/* Section 1 */}
              <h2 id="understand-the-problem" className="text-3xl font-bold text-white mb-4">
                1. Understand the Problem
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Before you can debug an API, you need to understand what's happening. Common PHP API 
                issues include:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 mb-8 ml-4">
                <li><strong className="text-white">500 errors</strong> - Server-side exceptions or syntax errors</li>
                <li><strong className="text-white">404 errors</strong> - Route not found or misconfigured</li>
                <li><strong className="text-white">401/403 errors</strong> - Authentication or authorization failures</li>
                <li><strong className="text-white">Unexpected payloads</strong> - Data transformation issues</li>
                <li><strong className="text-white">Timeout errors</strong> - Slow database queries or external API calls</li>
              </ul>

              {/* Section 2 */}
              <h2 id="request-tracing" className="text-3xl font-bold text-white mb-4">
                2. Request Tracing: Find What Went Wrong
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Request tracing is your first line of defense. Every API request should have a unique 
                trace ID that follows it through your entire application stack.
              </p>
              <p className="text-gray-400 leading-relaxed mb-4">
                When an error occurs, you can extract the trace ID from the response headers and use 
                it to find:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 mb-6 ml-4">
                <li>Complete request/response cycle</li>
                <li>Database queries executed</li>
                <li>External API calls made</li>
                <li>Error stack traces</li>
                <li>Timing information for each step</li>
              </ul>

              <div className="p-6 rounded-xl border border-white/10 bg-black/50 mb-8">
                <pre className="font-mono text-sm text-cyan-400 whitespace-pre overflow-x-auto">
{`# Extract trace ID from error response
curl -v https://api.yoursite.com/users

# Look for header:
X-Request-ID: siro_abc123def456

# View full trace
php siro log:trace siro_abc123def456`}
                </pre>
              </div>

              {/* Section 3 */}
              <h2 id="request-replay" className="text-3xl font-bold text-white mb-4">
                3. Request Replay: Reproduce Instantly
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Here's where it gets powerful. Instead of trying to manually reproduce the bug (which 
                often fails), you can <strong className="text-white">replay the exact request</strong> 
                that caused the error.
              </p>
              <p className="text-gray-400 leading-relaxed mb-4">
                Request replay captures:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 mb-6 ml-4">
                <li>Exact request payload and headers</li>
                <li>Authentication state</li>
                <li>Environment variables</li>
                <li>Database state at the time of request</li>
              </ul>

              <div className="p-6 rounded-xl border border-white/10 bg-black/50 mb-8">
                <pre className="font-mono text-sm text-cyan-400 whitespace-pre overflow-x-auto">
{`# Replay the exact request that failed
php siro log:replay siro_abc123def456

# Output:
Replaying request: POST /api/users
Status: 200 OK (after fix applied)
Response: {"id": 123, "name": "John Doe"}

Debugging time: 3 minutes ✓`}
                </pre>
              </div>

              {/* Section 4 */}
              <h2 id="cli-testing" className="text-3xl font-bold text-white mb-4">
                4. CLI Testing: Verify Your Fix
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                After applying your fix, you need to verify it works. CLI testing lets you test API 
                endpoints directly from your terminal without leaving your workflow.
              </p>

              <div className="p-6 rounded-xl border border-white/10 bg-black/50 mb-8">
                <pre className="font-mono text-sm text-cyan-400 whitespace-pre overflow-x-auto">
{`# Test endpoint with auto-authentication
php siro api:test POST /api/users \
  --data '{"name":"Jane","email":"jane@test.com"}'

# Output:
✓ POST /api/users
✓ Status: 201 Created
✓ Response time: 45ms
✓ Validation passed
✓ User created successfully`}
                </pre>
              </div>

              <p className="text-gray-400 leading-relaxed mb-8">
                The best part? CLI testing includes automatic authentication, so you don't need to 
                manually handle tokens or sessions.
              </p>

              {/* Section 5 */}
              <h2 id="best-practices" className="text-3xl font-bold text-white mb-4">
                5. Best Practices for API Debugging
              </h2>
              <div className="space-y-6 mb-12">
                <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                  <h3 className="text-lg font-semibold text-white mb-2">✓ Always Enable Request Tracing</h3>
                  <p className="text-gray-400 text-sm">
                    Every request should have a trace ID. This is non-negotiable for production debugging.
                  </p>
                </div>
                <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                  <h3 className="text-lg font-semibold text-white mb-2">✓ Log Before You Fix</h3>
                  <p className="text-gray-400 text-sm">
                    Capture the error state before applying any changes. You'll thank yourself later.
                  </p>
                </div>
                <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                  <h3 className="text-lg font-semibold text-white mb-2">✓ Replay, Don't Guess</h3>
                  <p className="text-gray-400 text-sm">
                    Never try to manually reproduce bugs. Use request replay for exact reproduction.
                  </p>
                </div>
                <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                  <h3 className="text-lg font-semibold text-white mb-2">✓ Test in CLI First</h3>
                  <p className="text-gray-400 text-sm">
                    Verify fixes with CLI testing before deploying to production.
                  </p>
                </div>
              </div>

              {/* Conclusion */}
              <div className="p-8 rounded-xl border border-cyan-400/30 bg-cyan-500/5 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Conclusion</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Debugging APIs in PHP doesn't have to be slow and painful. With the right tools—
                  <strong className="text-white"> request tracing</strong>, 
                  <strong className="text-white"> request replay</strong>, and 
                  <strong className="text-white"> CLI testing</strong>—you can go from bug to fix 
                  in minutes instead of hours.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  The key is having a systematic workflow that eliminates guesswork and gives you 
                  exact reproduction every time. That's what makes the difference between junior and 
                  senior developers when debugging production issues.
                </p>
              </div>

              {/* CTA */}
              <div className="text-center p-8 rounded-xl border border-white/10 bg-white/5">
                <h3 className="text-xl font-bold text-white mb-4">
                  Ready to Debug Faster?
                </h3>
                <p className="text-gray-400 mb-6">
                  Start using SiroPHP's debugging tools in your next project
                </p>
                <Link
                  href="https://github.com/SiroSoft/SiroPHP"
                  className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  Get Started with SiroPHP →
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </article>
    </main>
  );
}
