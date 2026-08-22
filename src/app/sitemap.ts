import { MetadataRoute } from 'next'
import { allGuides } from '@/docs-content/guides'
import { allApiRefs } from '@/docs-content/api'
import { standaloneSlugs } from '@/docs-content/standalone'

const baseUrl = 'https://sirophp.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/docs`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/documentation`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/tutorials`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/examples`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ]

  const docIndexRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/documentation/guides`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/documentation/api`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/documentation/conventions/responses`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/documentation/examples/blog`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/documentation/examples/ecommerce`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ]

  const guideRoutes: MetadataRoute.Sitemap = Object.keys(allGuides).map((slug) => ({
    url: `${baseUrl}/documentation/guides/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const apiRoutes: MetadataRoute.Sitemap = Object.keys(allApiRefs).map((slug) => ({
    url: `${baseUrl}/documentation/api/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const blogPosts = [
  { slug: 'how-to-debug-apis-in-php', date: '2026-01-15' },
  { slug: 'php-api-testing-from-terminal', date: '2026-01-22' },
  { slug: 'request-replay-debug-production-bugs', date: '2026-01-29' },
  { slug: 'master-cli-api-testing', date: '2026-02-05' },
  { slug: 'debug-production-bugs-minutes', date: '2026-02-12' },
  { slug: 'build-api-under-1-hour', date: '2026-02-19' },
  { slug: 'sirophp-vs-laravel-comparison', date: '2026-05-07' },
]

const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((p) => ({
  url: `${baseUrl}/blog/${p.slug}`,
  lastModified: new Date(p.date),
  changeFrequency: 'monthly' as const,
  priority: 0.8,
}))

const standaloneRoutes: MetadataRoute.Sitemap = standaloneSlugs.map((slug) => ({
    url: `${baseUrl}/documentation/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...blogRoutes, ...docIndexRoutes, ...guideRoutes, ...apiRoutes, ...standaloneRoutes]
}
