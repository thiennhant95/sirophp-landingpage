import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const srcDir = 'D:\\VietVang\\SiroSoft\\SiroPHP\\docs'
const outDir = join(__dirname, '..', 'src', 'docs-content')

const categoryMap = {
  'guides': 'guide',
  'api': 'api',
  'conventions': 'convention',
  'examples': 'example',
}

function slugify(name) {
  return name
    .replace(/\.md$/i, '')
    .replace(/^MIGRATION_v0\.21$/i, 'migration-v0-21')
    .replace(/^\.env\./i, 'env-')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replace(/_/g, '-')
    .replace(/\./g, '-')
}

function parseMarkdown(text) {
  const blocks = []
  const lines = text.split('\n')
  let i = 0

  const addBlock = (block) => {
    if (block) blocks.push(block)
  }

  while (i < lines.length) {
    const line = lines[i]

    // Skip YAML frontmatter
    if (line.trim() === '---' && i === 0) {
      i++
      while (i < lines.length && lines[i].trim() !== '---') i++
      i++
      continue
    }

    // HR
    if (/^---\s*$/.test(line.trim()) && lines[i-1] !== undefined) {
      i++
      continue
    }
    if (/^___\s*$/.test(line.trim())) {
      addBlock({ type: 'hr' })
      i++
      continue
    }

    // Heading h2
    if (/^##\s+(.+)/.test(line)) {
      const text = line.replace(/^##\s+/, '').trim()
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      addBlock({ type: 'h2', id, text })
      i++
      continue
    }

    // Heading h3
    if (/^###\s+(.+)/.test(line)) {
      const text = line.replace(/^###\s+/, '').trim()
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      addBlock({ type: 'h3', id, text })
      i++
      continue
    }

    // Ignore h1 (doc title)
    if (/^#\s+(.+)/.test(line)) {
      i++
      continue
    }

    // Code block
    if (/^```/.test(line.trim())) {
      const lang = line.trim().replace(/^```/, '').trim() || undefined
      i++
      let code = ''
      while (i < lines.length && !/^```/.test(lines[i].trim())) {
        code += lines[i] + '\n'
        i++
      }
      code = code.replace(/\n$/, '')
      if (code) addBlock({ type: 'code', lang, code })
      i++
      continue
    }

    // Blockquote / Note (with embedded table support)
    if (/^>\s/.test(line)) {
      let bqLines = []
      while (i < lines.length && /^>/.test(lines[i])) {
        bqLines.push(lines[i].replace(/^>\s?/, ''))
        i++
      }
      // Convert blockquote lines to text preserving paragraph breaks
      const joinBq = (arr) => {
        const paras = []
        let cur = []
        for (const l of arr) {
          const t = l.trim()
          if (!t) { if (cur.length) { paras.push(cur.join(' ')); cur = [] } }
          else cur.push(t)
        }
        if (cur.length) paras.push(cur.join(' '))
        return paras.join('\n\n')
      }
      // Check if blockquote contains a table
      const tableIdx = bqLines.findIndex((l, idx) =>
        l.includes('|') && bqLines[idx + 1] && /^[\s|:-]+$/.test(bqLines[idx + 1].trim())
      )
      if (tableIdx >= 0) {
        const beforeText = joinBq(bqLines.slice(0, tableIdx))
        if (beforeText) addBlock({ type: 'note', variant: 'info', text: beforeText })
        const headerLine = bqLines[tableIdx]
        const headers = headerLine.split('|').filter(c => c.trim()).map(c => c.trim())
        let rowIdx = tableIdx + 2
        const rows = []
        while (rowIdx < bqLines.length && bqLines[rowIdx].includes('|')) {
          const cells = bqLines[rowIdx].split('|').filter(c => c.trim()).map(c => c.trim())
          if (cells.length === headers.length) rows.push(cells)
          rowIdx++
        }
        addBlock({ type: 'table', headers, rows })
        const afterText = joinBq(bqLines.slice(rowIdx))
        if (afterText) addBlock({ type: 'note', variant: 'info', text: afterText })
      } else {
        const text = joinBq(bqLines)
        if (text) addBlock({ type: 'note', variant: 'info', text })
      }
      continue
    }

    // Table
    if (line.includes('|') && lines[i+1] && /^[\s|:-]+$/.test(lines[i+1].trim())) {
      const headers = line.split('|').filter(c => c.trim()).map(c => c.trim())
      i += 2 // skip header + separator
      const rows = []
      while (i < lines.length && lines[i].includes('|')) {
        const cells = lines[i].split('|').filter(c => c.trim()).map(c => c.trim())
        if (cells.length === headers.length) rows.push(cells)
        i++
      }
      addBlock({ type: 'table', headers, rows })
      continue
    }

    // Unordered list
    if (/^[-*+]\s/.test(line)) {
      const items = []
      while (i < lines.length && /^[-*+]\s/.test(lines[i])) {
        let item = lines[i].replace(/^[-*+]\s/, '').trim()
        // Check for sub-items (continuation)
        i++
        while (i < lines.length && lines[i].trim() && !/^[-*#>\d|]/.test(lines[i]) && !/^```/.test(lines[i])) {
          item += ' ' + lines[i].trim()
          i++
        }
        items.push(item)
      }
      if (items.length) addBlock({ type: 'ul', items })
      continue
    }

    // Ordered list
    if (/^\d+\.\s/.test(line)) {
      const items = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, '').trim())
        i++
      }
      addBlock({ type: 'ol', items })
      continue
    }

    // Empty line
    if (!line.trim()) {
      i++
      continue
    }

    // Paragraph (collect consecutive text lines)
    let para = ''
    while (i < lines.length && lines[i].trim() && !/^##/.test(lines[i]) && !/^```/.test(lines[i]) && !/^>\s/.test(lines[i]) && !/^[-*+]\s/.test(lines[i]) && !/^\d+\.\s/.test(lines[i]) && !/^\d+\.\s/.test(lines[i]) && !/^___/.test(lines[i]) && !line.includes('|')) {
      if (para) para += ' '
      para += lines[i].trim()
      i++
    }
    if (para) {
      // Bold/italic to simple text
      para = para.replace(/\*\*(.+?)\*\*/g, '$1')
      para = para.replace(/\*(.+?)\*/g, '$1')
      para = para.replace(/`(.+?)`/g, '$1')
      addBlock({ type: 'p', text: para })
    }
    else {
      i++
    }
  }

  return blocks
}

function extractTitle(text) {
  const m = text.match(/^#\s+(.+)/m)
  return m ? m[1].trim() : ''
}

function extractDescription(text, title) {
  const lines = text.split('\n')
  let inFront = false
  let afterTitle = false
  for (const line of lines) {
    if (line.trim() === '---') {
      inFront = !inFront
      continue
    }
    if (inFront) continue
    if (line.startsWith('# ')) {
      afterTitle = true
      continue
    }
    if (afterTitle && line.trim()) {
      // Skip headings and code markers
      if (/^#{1,3}\s/.test(line) || /^```/.test(line)) continue
      return line.replace(/^>\s?/, '').replace(/\*\*(.+?)\*\*/g, '$1').trim().slice(0, 160)
    }
  }
  return title
}

// Process all files
function processFile(filePath, category, slug, subdir) {
  const text = readFileSync(filePath, 'utf-8')
  const title = extractTitle(text)
  const description = extractDescription(text, title)

  const blocks = parseMarkdown(text)
  const iconMap = {
    'guide': '📚',
    'api': '⚙️',
    'convention': '📝',
    'example': '💡',
    'root': '📄',
  }

  const relPath = subdir ? '../types' : './types'

  return `
import type { Doc } from '${relPath}'

export const doc: Doc = {
  meta: {
    title: ${JSON.stringify(title)},
    description: ${JSON.stringify(description)},
    category: ${JSON.stringify(categoryMap[category] || 'root')},
    order: 0,
    icon: ${JSON.stringify(iconMap[categoryMap[category] || 'root'])},
  },
  content: ${JSON.stringify(blocks, null, 2)},
}
`
}

// Build the guide and api content files
function buildRegistry() {
  const guideFiles = [
    'QUICKSTART', 'AUTHENTICATION', 'DATABASE', 'CACHING', 'EVENTS',
    'FILE_UPLOAD', 'I18N', 'MIGRATION', 'QUEUE_MAIL', 'TESTING', 'VALIDATION', 'API_VERSIONING', 'DEPLOYMENT',
  ]
  const apiFiles = [
    'Request', 'Response', 'Router', 'Model', 'Middleware', 'Validation',
    'Container', 'Config', 'Collection', 'Helpers', 'Str', 'Url',
    'Encryption', 'Hash', 'Http', 'Logger', 'Session', 'Storage',
    'UploadedFile', 'Mail', 'Queue', 'Schedule', 'Observers', 'Resource',
    'Pagination', 'SoftDeletes', 'FormRequest', 'CLI', 'Console', 'Debug',
    'Metrics', 'Lang', 'Testing', 'Events',
  ]

  const guidesDir = join(outDir, 'guides')
  if (!existsSync(guidesDir)) mkdirSync(guidesDir, { recursive: true })

  // Process guides
  const guideExports = []
  for (const name of guideFiles) {
    const slug = slugify(name)
    const filePath = join(srcDir, 'guides', name + '.md')
    if (!existsSync(filePath)) {
      console.warn(`Missing guide: ${filePath}`)
      continue
    }
    const content = processFile(filePath, 'guides', slug, true)
    writeFileSync(join(guidesDir, `${slug}.ts`), content)
    guideExports.push({ slug, title: extractTitle(readFileSync(filePath, 'utf-8')) })
    console.log(`  ✓ ${name} → guides/${slug}.ts`)
  }

  // Write guides index
  const guideIndex = `
import type { Doc } from '../types'
${guideExports.map(({ slug }) => `import { doc as ${slug.replace(/-/g, '_')} } from './${slug}'`).join('\n')}

export const allGuides: Record<string, Doc> = {
${guideExports.map(({ slug }) => `  '${slug}': ${slug.replace(/-/g, '_')},`).join('\n')}
}

export const guideSlugs = Object.keys(allGuides)
export const guideOrder = guideSlugs
`
  writeFileSync(join(guidesDir, 'index.ts'), guideIndex)
  console.log(`  ✓ guides/index.ts (${guideExports.length} guides)`)

  // Process API
  const apiDir = join(outDir, 'api')
  if (!existsSync(apiDir)) mkdirSync(apiDir, { recursive: true })

  const apiExports = []
  for (const name of apiFiles) {
    const slug = slugify(name)
    const filePath = join(srcDir, 'api', name + '.md')
    if (!existsSync(filePath)) {
      console.warn(`Missing API: ${filePath}`)
      continue
    }
    const content = processFile(filePath, 'api', slug, true)
    writeFileSync(join(apiDir, `${slug}.ts`), content)
    apiExports.push({ slug, title: extractTitle(readFileSync(filePath, 'utf-8')) })
    console.log(`  ✓ ${name} → api/${slug}.ts`)
  }

  // Write api index
  const apiIndex = `
import type { Doc } from '../types'
${apiExports.map(({ slug }) => `import { doc as ${slug.replace(/-/g, '_')} } from './${slug}'`).join('\n')}

export const allApiRefs: Record<string, Doc> = {
${apiExports.map(({ slug }) => `  '${slug}': ${slug.replace(/-/g, '_')},`).join('\n')}
}

export const apiSlugs = Object.keys(allApiRefs)
export const apiOrder = apiSlugs
`
  writeFileSync(join(apiDir, 'index.ts'), apiIndex)
  console.log(`  ✓ api/index.ts (${apiExports.length} API refs)`)
}

// Process standalone root docs
function processRootDocs() {
  const rootDocs = [
    { name: 'ARCHITECTURE', slug: 'architecture' },
    { name: 'SECURITY', slug: 'security' },
    { name: 'PERFORMANCE', slug: 'performance' },
    { name: 'CONTRIBUTING', slug: 'contributing' },
    { name: 'RELEASE_NOTES', slug: 'release-notes' },
    { name: 'KNOWN_ISSUES', slug: 'known-issues' },
    { name: 'WORKFLOW', slug: 'workflow' },
  ]

  const rootDir = join(outDir, 'root')
  if (!existsSync(rootDir)) mkdirSync(rootDir, { recursive: true })

  const exports = []
  for (const { name, slug } of rootDocs) {
    const filePath = join(srcDir, name + '.md')
    if (!existsSync(filePath)) {
      console.warn(`Missing root doc: ${filePath}`)
      continue
    }
    const content = processFile(filePath, 'root', slug, true)
    writeFileSync(join(rootDir, `${slug}.ts`), content)
    exports.push({ slug, title: extractTitle(readFileSync(filePath, 'utf-8')) })
    console.log(`  ✓ ${name} → root/${slug}.ts`)
  }

  const rootIndex = `
import type { Doc } from '../types'
${exports.map(({ slug }) => `import { doc as ${slug.replace(/-/g, '_')} } from './${slug}'`).join('\n')}

export const allRootDocs: Record<string, Doc> = {
${exports.map(({ slug }) => `  '${slug}': ${slug.replace(/-/g, '_')},`).join('\n')}
}
`
  writeFileSync(join(rootDir, 'index.ts'), rootIndex)
  console.log(`  ✓ root/index.ts (${exports.length} root docs)`)
}

// Process conventions
function processConventions() {
  const convDir = join(outDir, 'conventions')
  if (!existsSync(convDir)) mkdirSync(convDir, { recursive: true })

  const filePath = join(srcDir, 'conventions', 'responses.md')
  if (!existsSync(filePath)) { console.warn('Missing: conventions/responses.md'); return }

  const content = processFile(filePath, 'conventions', 'responses', true)
  writeFileSync(join(convDir, 'responses.ts'), content)

  const index = `
import type { Doc } from '../types'
import { doc as responses } from './responses'
export const allConventions: Record<string, Doc> = { responses }
`
  writeFileSync(join(convDir, 'index.ts'), index)
  console.log('  ✓ conventions/responses.ts')
}

// Process examples
function processExamples() {
  const exDir = join(outDir, 'examples')
  if (!existsSync(exDir)) mkdirSync(exDir, { recursive: true })

  const exampleFiles = [
    { name: 'blog', path: join(srcDir, 'examples', 'blog.md') },
    { name: 'ecommerce', path: join(srcDir, 'examples', 'ecommerce.md') },
  ]

  const exports = []
  for (const { name, path } of exampleFiles) {
    if (!existsSync(path)) { console.warn(`Missing: ${path}`); continue }
    const content = processFile(path, 'example', name, true)
    writeFileSync(join(exDir, `${name}.ts`), content)
    exports.push(name)
    console.log(`  ✓ examples/${name}.ts`)
  }

  const index = `
import type { Doc } from '../types'
${exports.map(n => `import { doc as ${n} } from './${n}'`).join('\n')}
export const allExamples: Record<string, Doc> = { ${exports.join(', ')} }
`
  writeFileSync(join(exDir, 'index.ts'), index)
}

// Main
console.log('=== Converting SiroPHP docs to TypeScript ===')
console.log('\nProcessing guides & API...')
buildRegistry()
console.log('\nProcessing root docs...')
processRootDocs()
console.log('\nProcessing conventions...')
processConventions()
console.log('\nProcessing examples...')
processExamples()
console.log('\n=== Done ===')
