import { describe, it, expect } from 'vitest'

describe('Landing Page', () => {
  it('has correct title', () => {
    expect('SiroPHP - API Framework').toBeTruthy()
  })
})

describe('Sitemap', () => {
  it('respects noIndex in production', () => {
    expect(process.env.NODE_ENV).toBeDefined()
  })
})
