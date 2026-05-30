
import type { Doc } from '../types'
import { doc as quickstart } from './quickstart'
import { doc as authentication } from './authentication'
import { doc as database } from './database'
import { doc as caching } from './caching'
import { doc as events } from './events'
import { doc as file_upload } from './file-upload'
import { doc as i18n } from './i18n'
import { doc as migration } from './migration'
import { doc as queue_mail } from './queue-mail'
import { doc as testing } from './testing'
import { doc as validation } from './validation'
import { doc as api_versioning } from './api-versioning'
import { doc as deployment } from './deployment'

export const allGuides: Record<string, Doc> = {
  'quickstart': quickstart,
  'authentication': authentication,
  'database': database,
  'caching': caching,
  'events': events,
  'file-upload': file_upload,
  'i18n': i18n,
  'migration': migration,
  'queue-mail': queue_mail,
  'testing': testing,
  'validation': validation,
  'api-versioning': api_versioning,
  'deployment': deployment,
}

export const guideSlugs = Object.keys(allGuides)
export const guideOrder = guideSlugs
