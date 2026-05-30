import type { Doc } from './types'
import { allGuides } from './guides'
import { allApiRefs } from './api'
import { allRootDocs } from './root'
import { allConventions } from './conventions'
import { allExamples } from './examples'

export const allDocs: Record<string, Doc> = {
  ...allGuides,
  ...allApiRefs,
  ...allRootDocs,
  ...allConventions,
  ...allExamples,
}

export function getDoc(category: string, slug: string): Doc | undefined {
  // Guides
  if (category === 'guides') return allGuides[slug]
  // API
  if (category === 'api') return allApiRefs[slug]
  // Conventions
  if (slug === 'responses') return allConventions['responses']
  // Examples
  if (slug === 'blog' || slug === 'ecommerce') return allExamples[slug]
  // Root docs (architecture, security, etc.)
  return allRootDocs[slug]
}
