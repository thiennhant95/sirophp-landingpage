import { describe, it, expect, vi } from 'vitest'

const PAGES = [
  '/', '/features', '/docs', '/benchmarks', '/blog',
  '/install', '/faq', '/security', '/privacy', '/terms',
  '/examples', '/tutorials', '/replay',
]

const FEATURES = [
  'zero', 'router', 'orm', 'jwt', 'debug', 'cli',
]

describe('Navigation', () => {
  it('has all expected pages', () => {
    expect(PAGES.length).toBeGreaterThanOrEqual(13)
    expect(PAGES).toContain('/')
    expect(PAGES).toContain('/features')
    expect(PAGES).toContain('/docs')
    expect(PAGES).toContain('/blog')
  })
})

describe('Features', () => {
  it('has all core features', () => {
    expect(FEATURES.length).toBeGreaterThanOrEqual(6)
    expect(FEATURES).toContain('router')
    expect(FEATURES).toContain('jwt')
    expect(FEATURES).toContain('debug')
  })
})

describe('SEO', () => {
  it('has sitemap', () => {
    expect(() => import('@/app/sitemap')).not.toThrow()
  })
})
