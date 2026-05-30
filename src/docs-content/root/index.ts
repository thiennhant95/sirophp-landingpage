
import type { Doc } from '../types'
import { doc as architecture } from './architecture'
import { doc as security } from './security'
import { doc as performance } from './performance'
import { doc as contributing } from './contributing'
import { doc as release_notes } from './release-notes'
import { doc as known_issues } from './known-issues'
import { doc as workflow } from './workflow'

export const allRootDocs: Record<string, Doc> = {
  'architecture': architecture,
  'security': security,
  'performance': performance,
  'contributing': contributing,
  'release-notes': release_notes,
  'known-issues': known_issues,
  'workflow': workflow,
}
