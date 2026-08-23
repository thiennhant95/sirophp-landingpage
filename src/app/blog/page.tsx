import type { Metadata } from 'next';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'Blog - PHP API Development & Debugging Resources',
  description: 'Tutorials, comparisons, and best practices for PHP API development. Learn debugging, CLI testing, request replay, and rapid scaffolding with SiroPHP.',
  keywords: [
    'php api debugging',
    'debug api php tutorial',
    'php api testing guide',
    'trace api requests php',
    'replay api requests php',
    'cli api testing php',
    'sirophp vs laravel',
  ],
  alternates: {
    canonical: 'https://sirophp.com/blog',
  },
  openGraph: {
    title: 'Blog - PHP API Development & Debugging Resources | SiroPHP',
    description: 'Tutorials, comparisons, and best practices for PHP API development. Learn debugging, CLI testing, request replay, and rapid scaffolding.',
    type: 'website',
    url: 'https://sirophp.com/blog',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - PHP API Development & Debugging Resources | SiroPHP',
    description: 'Tutorials, comparisons, and best practices for PHP API development.',
    images: ['/opengraph-image.png'],
  },
};

const blogPosts = [
  {
slug: 'sirophp-showcase-live-demo',
    title: 'SiroPHP Showcase: A Live Full-Stack Demo You Can Click Right Now',
    excerpt: 'Stop reading feature lists. Log into the live SiroPHP Showcase — dashboard CRUD, API explorer, OpenAPI docs and a 14-topic Learn course. Demo login included.',
    date: '2026-08-23',
    readTime: '6 min read',
    tags: ['showcase', 'live demo', 'product', 'full-stack'],
  },
  {
slug: 'sirophp-vs-laravel-comparison',
    title: 'SiroPHP vs Laravel: A Practical Comparison for Modern API Development',
    excerpt: 'Compare SiroPHP and Laravel across 15 dimensions: performance, dependencies, debugging workflow, hosting costs, and when to choose each.',
    date: '2026-05-07',
    readTime: '10 min read',
    category: 'Comparison',
    tags: ['comparison', 'laravel', 'performance', 'architecture'],
    featured: true,
  },
  {
    slug: 'build-api-under-1-hour',
    title: 'Build Your First API in Under 1 Hour with SiroPHP',
    excerpt: 'Stop writing boilerplate code. Learn how to scaffold complete CRUD APIs in seconds with one command. From zero to production-ready API fast.',
    date: '2026-02-19',
    readTime: '8 min read',
    category: 'Tutorial',
    tags: ['scaffolding', 'crud', 'rapid-development', 'productivity'],
  },
  {
    slug: 'debug-production-bugs-minutes',
    title: 'Debug Production API Bugs in Minutes, Not Hours',
    excerpt: 'Stop struggling with unreproducible bugs. Learn how to capture, replay, and fix production API issues instantly with request tracing.',
    date: '2026-02-12',
    readTime: '10 min read',
    category: 'Best Practices',
    tags: ['debugging', 'production', 'trace', 'replay'],
  },
  {
    slug: 'master-cli-api-testing',
    title: 'Master CLI API Testing: The Complete Developer Guide',
    excerpt: 'Learn how to test APIs efficiently from the command line. Auto-authentication, request history, automation scripts, and keyboard-driven workflows.',
    date: '2026-02-05',
    readTime: '9 min read',
    category: 'Tutorial',
    tags: ['cli', 'testing', 'automation', 'workflow'],
  },
  {
    slug: 'how-to-debug-apis-in-php',
    title: 'How to Debug APIs in PHP: Complete Guide (Trace, Replay, CLI)',
    excerpt: 'Learn the complete workflow for debugging PHP APIs in production using request tracing, replay functionality, and CLI testing tools.',
    date: '2026-01-15',
    readTime: '8 min read',
    category: 'Tutorial',
    tags: ['debugging', 'trace', 'replay', 'cli'],
  },
  {
    slug: 'php-api-testing-from-terminal',
    title: 'PHP API Testing from Terminal: The Complete CLI Guide',
    excerpt: 'Master CLI-based API testing in PHP. Learn how to test endpoints, automate workflows, and debug without leaving your terminal.',
    date: '2026-01-22',
    readTime: '6 min read',
    category: 'Guide',
    tags: ['cli', 'testing', 'automation', 'terminal'],
  },
  {
    slug: 'request-replay-debug-production-bugs',
    title: 'Request Replay: Debug Production Bugs Without Reproduction',
    excerpt: 'Discover how request replay technology eliminates the guesswork in debugging. Capture, replay, and fix production API issues instantly.',
    date: '2026-01-29',
    readTime: '7 min read',
    category: 'Best Practices',
    tags: ['replay', 'production', 'debugging', 'workflow'],
  },
];

export default function BlogIndex() {
  const featuredPost = blogPosts.find(p => p.featured);
  const otherPosts = blogPosts.filter(p => !p.featured);

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h1 className="text-5xl sm:text-6xl font-bold mb-6">
                PHP API <span className="gradient-text">Development</span> Resources
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Tutorials, comparisons, and best practices for building and debugging PHP APIs.
                From rapid scaffolding to production debugging.
              </p>
            </div>
          </FadeIn>

          {/* Featured Post */}
          {featuredPost && (
            <FadeIn delay={100}>
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group block p-8 rounded-xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 to-purple-500/5 hover:from-cyan-500/20 hover:to-purple-500/10 transition-all duration-300 mb-12"
              >
                <div className="flex items-start justify-between gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-semibold">
                        {featuredPost.category}
                      </span>
                      <span className="text-cyan-400 text-xs font-medium">Featured</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-gray-400 mb-4 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{featuredPost.date}</span>
                      <span>•</span>
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center text-cyan-400 group-hover:translate-x-1 transition-transform">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </FadeIn>
          )}
        </div>
      </section>

      {/* All Posts Grid */}
      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPosts.map((post, index) => (
              <FadeIn key={post.slug} delay={index * 100}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-cyan-400/30 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="mb-4">
                    <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded bg-white/5 text-gray-400 text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
