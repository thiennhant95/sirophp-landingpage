import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = process.cwd()
const coreRoot = process.env.SIRO_CORE_ROOT ?? join(root, '..', '..', 'siro-core')
const coreFiles = {
  Router: join(coreRoot, 'Router.php'),
  Request: join(coreRoot, 'Request.php'),
  Response: join(coreRoot, 'Response.php'),
  Storage: join(coreRoot, 'Storage.php'),
  Mail: join(coreRoot, 'Mail.php'),
  Queue: join(coreRoot, 'Queue.php'),
  Model: join(coreRoot, 'Model.php'),
  Logger: join(coreRoot, 'Logger.php'),
  Session: join(coreRoot, 'Session.php'),
  Event: join(coreRoot, 'Event.php'),
  Validator: join(coreRoot, 'Validator.php'),
  FormRequest: join(coreRoot, 'FormRequest.php'),
}

for (const [name, file] of Object.entries(coreFiles)) {
  if (!existsSync(file)) {
    console.error(`Core API source not found for ${name}: ${file}`)
    process.exit(1)
  }
}

function publicMethods(file) {
  const content = readFileSync(file, 'utf8')
  return {
    all: new Set([...content.matchAll(/public\s+(?:static\s+)?function\s+(\w+)\s*\(/g)].map((match) => match[1])),
    static: new Set([...content.matchAll(/public\s+static\s+function\s+(\w+)\s*\(/g)].map((match) => match[1])),
  }
}

const methods = Object.fromEntries(Object.entries(coreFiles).map(([name, file]) => [name, publicMethods(file)]))
const files = []

function collect(path) {
  const stat = statSync(path)
  if (stat.isDirectory()) {
    for (const entry of readdirSync(path)) collect(join(path, entry))
    return
  }
  if (/\.(tsx?|md|txt)$/.test(path)) files.push(path)
}

collect(join(root, 'src', 'docs-content'))
collect(join(root, 'public'))

const invalid = []
const checks = [
  { type: 'class', className: 'Router', pattern: /\bRouter::(\w+)\s*\(/g },
  { type: 'class', className: 'Request', pattern: /\bRequest::(\w+)\s*\(/g },
  { type: 'class', className: 'Response', pattern: /\bResponse::(\w+)\s*\(/g },
  { type: 'class', className: 'Storage', pattern: /\bStorage::(\w+)\s*\(/g },
  { type: 'class', className: 'Mail', pattern: /\bMail::(\w+)\s*\(/g },
  { type: 'class', className: 'Queue', pattern: /\bQueue::(\w+)\s*\(/g },
  { type: 'class', className: 'Model', pattern: /\bModel::(\w+)\s*\(/g },
  { type: 'class', className: 'Logger', pattern: /\bLogger::(\w+)\s*\(/g },
  { type: 'class', className: 'Session', pattern: /\bSession::(\w+)\s*\(/g },
  { type: 'class', className: 'Event', pattern: /\bEvent::(\w+)\s*\(/g },
  { type: 'class', className: 'Validator', pattern: /\bValidator::(\w+)\s*\(/g },
  { type: 'router', className: 'Router', pattern: /\$(?:router|r)->(\w+)\s*\(/g },
  { type: 'request', className: 'Request', pattern: /\$request->(\w+)\s*\(/g },
  { type: 'instance', className: 'FormRequest', pattern: /\$(?:formRequest|form_request)->(\w+)\s*\(/g },
]

for (const file of files) {
  const content = readFileSync(file, 'utf8')
  for (const check of checks) {
    for (const match of content.matchAll(check.pattern)) {
      const classMethods = methods[check.className]
      const valid = check.type === 'class'
        ? classMethods.static.has(match[1])
        : classMethods.all.has(match[1])
      if (!valid) {
        invalid.push(`${relative(root, file)}: ${check.className}::${match[1]}`)
      }
    }
  }
}

if (invalid.length > 0) {
  console.error('Unknown Core API methods found in documentation:')
  console.error([...new Set(invalid)].map((item) => `- ${item}`).join('\n'))
  process.exit(1)
}

console.log(`Documentation API check passed (${files.length} files scanned)`)
