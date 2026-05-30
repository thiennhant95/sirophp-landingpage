
import type { Doc } from '../types'
import { doc as request } from './request'
import { doc as response } from './response'
import { doc as router } from './router'
import { doc as model } from './model'
import { doc as middleware } from './middleware'
import { doc as validation } from './validation'
import { doc as container } from './container'
import { doc as config } from './config'
import { doc as collection } from './collection'
import { doc as helpers } from './helpers'
import { doc as str } from './str'
import { doc as url } from './url'
import { doc as encryption } from './encryption'
import { doc as hash } from './hash'
import { doc as http } from './http'
import { doc as logger } from './logger'
import { doc as session } from './session'
import { doc as storage } from './storage'
import { doc as uploaded_file } from './uploaded-file'
import { doc as mail } from './mail'
import { doc as queue } from './queue'
import { doc as schedule } from './schedule'
import { doc as observers } from './observers'
import { doc as resource } from './resource'
import { doc as pagination } from './pagination'
import { doc as soft_deletes } from './soft-deletes'
import { doc as form_request } from './form-request'
import { doc as cli } from './cli'
import { doc as console } from './console'
import { doc as debug } from './debug'
import { doc as metrics } from './metrics'
import { doc as lang } from './lang'
import { doc as testing } from './testing'
import { doc as events } from './events'

export const allApiRefs: Record<string, Doc> = {
  'request': request,
  'response': response,
  'router': router,
  'model': model,
  'middleware': middleware,
  'validation': validation,
  'container': container,
  'config': config,
  'collection': collection,
  'helpers': helpers,
  'str': str,
  'url': url,
  'encryption': encryption,
  'hash': hash,
  'http': http,
  'logger': logger,
  'session': session,
  'storage': storage,
  'uploaded-file': uploaded_file,
  'mail': mail,
  'queue': queue,
  'schedule': schedule,
  'observers': observers,
  'resource': resource,
  'pagination': pagination,
  'soft-deletes': soft_deletes,
  'form-request': form_request,
  'cli': cli,
  'console': console,
  'debug': debug,
  'metrics': metrics,
  'lang': lang,
  'testing': testing,
  'events': events,
}

export const apiSlugs = Object.keys(allApiRefs)
export const apiOrder = apiSlugs
