import { NextResponse } from 'next/server'

const posts = [
  { slug: 'how-to-debug-apis-in-php', title: 'How to Debug PHP APIs: From Logs to Request Replay', date: '2026-01-15' },
  { slug: 'php-api-testing-from-terminal', title: 'PHP API Testing From the Terminal', date: '2026-01-22' },
  { slug: 'request-replay-debug-production-bugs', title: 'Request Replay: Debug Production Bugs Without Reproduction', date: '2026-01-29' },
  { slug: 'master-cli-api-testing', title: 'Master CLI API Testing with SiroPHP', date: '2026-02-05' },
  { slug: 'debug-production-bugs-minutes', title: 'Debug Production Bugs in Minutes, Not Hours', date: '2026-02-12' },
  { slug: 'build-api-under-1-hour', title: 'Build a REST API in Under 1 Hour with SiroPHP', date: '2026-02-19' },
  { slug: 'sirophp-vs-laravel-comparison', title: 'SiroPHP vs Laravel: A Practical Comparison for Modern API Development', date: '2026-05-07' },
  { slug: 'sirophp-showcase-live-demo', title: 'SiroPHP Showcase: A Live Full-Stack Demo You Can Click Right Now', date: '2026-08-23' },
]

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export function GET() {
  const items = posts
    .map(
      (p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>https://sirophp.com/blog/${p.slug}</link>
      <guid isPermaLink="true">https://sirophp.com/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
    </item>`
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>SiroPHP Blog</title>
    <link>https://sirophp.com/blog</link>
    <description>Build APIs Fast. Debug Faster — articles on PHP API development, debugging and testing.</description>
    <language>en-us</language>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
