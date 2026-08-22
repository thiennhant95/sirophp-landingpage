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

  const standaloneRoutes: MetadataRoute.Sitemap = standaloneSlugs.map((slug) => ({
    url: `${baseUrl}/documentation/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...docIndexRoutes, ...guideRoutes, ...apiRoutes, ...standaloneRoutes]
}
