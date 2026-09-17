import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = process.cwd()
const coreConsole = process.env.SIRO_CORE_CONSOLE ?? join(root, '..', '..', 'siro-core', 'Console.php')
if (!existsSync(coreConsole)) {
  console.error(`Core command registry not found: ${coreConsole}`)
  console.error('Set SIRO_CORE_CONSOLE to siro-core/Console.php before running this check.')
  process.exit(1)
}

const registry = readFileSync(coreConsole, 'utf8')
const commandNames = new Set([...registry.matchAll(/'([a-z][a-z0-9-]*(?::[a-z0-9-]+)*)'\s*=>/g)].map((match) => match[1]))
commandNames.add('--version')
commandNames.add('t')
commandNames.add('tink')
commandNames.add('why')
commandNames.add('slow')
commandNames.add('traces')
commandNames.add('list')
commandNames.add('mak')
commandNames.add('mig')
commandNames.add('lo')
commandNames.add('lis')

const allowedCustom = new Set(['report:generate', 'my:command'])
const files = []

function collect(path) {
  const stat = statSync(path)
  if (stat.isDirectory()) {
    for (const entry of readdirSync(path)) collect(join(path, entry))
    return
  }
  if (/\.(tsx?|md|txt|json)$/.test(path)) files.push(path)
}

collect(join(root, 'src'))
collect(join(root, 'public'))

const invalid = []
const commandPattern = /php siro ([a-z][a-z0-9]*(?::[a-z0-9-]+)*)(?!:)/g
for (const file of files) {
  const content = readFileSync(file, 'utf8')
  for (const match of content.matchAll(commandPattern)) {
    const command = match[1]
    if (commandNames.has(command) || allowedCustom.has(command)) continue
    invalid.push(`${relative(root, file)}: ${command}`)
  }
}

if (invalid.length > 0) {
  console.error('Unknown Siro commands found in documentation:')
  console.error([...new Set(invalid)].map((item) => `- ${item}`).join('\n'))
  process.exit(1)
}

console.log(`Documentation command check passed (${files.length} files scanned)`)
