import type { Doc } from './types'
import { allRootDocs } from './root'
import { allConventions } from './conventions'
import { allExamples } from './examples'

export const standaloneDocs: Record<string, Doc> = {
  ...allRootDocs,
  ...allConventions,
  ...allExamples,
}

export const standaloneSlugs = Object.keys(standaloneDocs)

export const standaloneNav: Record<string, { prev?: string; next?: string }> = {
  workflow: { next: 'architecture' },
  architecture: { prev: 'workflow', next: 'security' },
  security: { prev: 'architecture', next: 'performance' },
  performance: { prev: 'security', next: 'contributing' },
  contributing: { prev: 'performance', next: 'release-notes' },
  'release-notes': { prev: 'contributing', next: 'known-issues' },
  'known-issues': { prev: 'release-notes' },
  responses: { next: 'blog' },
  blog: { prev: 'responses', next: 'ecommerce' },
  ecommerce: { prev: 'blog' },
}
