import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = process.cwd()
const files = []
const routes = new Set(['/'])
const publicFiles = new Set()

function collect(path) {
  const stat = statSync(path)
  if (stat.isDirectory()) {
    for (const entry of readdirSync(path)) collect(join(path, entry))
    return
  }
  if (/\.(tsx?|md|txt)$/.test(path)) files.push(path)
}

function collectRoutes(path, route = '') {
  if (!existsSync(path)) return
  for (const entry of readdirSync(path, { withFileTypes: true })) {
    if (entry.name.startsWith('_') || entry.name.startsWith('(')) continue
    const nextRoute = entry.name === 'page.tsx' ? route : `${route}/${entry.name}`
    const entryPath = join(path, entry.name)
    if (entry.isDirectory()) collectRoutes(entryPath, nextRoute)
    if (entry.name === 'page.tsx') routes.add(route || '/')
  }
}

collect(join(root, 'src'))
collect(join(root, 'public'))
collectRoutes(join(root, 'src', 'app'))

function collectPublic(path, prefix = '') {
  for (const entry of readdirSync(path, { withFileTypes: true })) {
    const entryPath = join(path, entry.name)
    const publicPath = `${prefix}/${entry.name}`
    if (entry.isDirectory()) collectPublic(entryPath, publicPath)
    else publicFiles.add(publicPath)
  }
}

collectPublic(join(root, 'public'))

const invalid = []
const urlPattern = /https?:\/\/[^\s)'"<>]+/g
const internalPattern = /\]\((\/[^)#\s)]*)[)#]?/g

function routeExists(path) {
  const normalized = path.replace(/[.,`}'"\]]+$/, '').replace(/\/$/, '') || '/'
  if (normalized.startsWith('/downloads/') && publicFiles.has(normalized)) return true
  if (['/logo', '/opengraph-image', '/opengraph-image.png', '/sitemap.xml', '/robots.txt', '/install.ps1', '/install.sh'].includes(normalized)) return true
  if (routes.has(normalized)) return true
  return [...routes].some((route) => {
    const routeParts = route.split('/').filter(Boolean)
    const pathParts = normalized.split('/').filter(Boolean)
    return routeParts.length === pathParts.length && routeParts.every((part, index) => part.startsWith('[') || part === pathParts[index])
  })
}

for (const file of files) {
  const content = readFileSync(file, 'utf8')
  for (const match of content.matchAll(urlPattern)) {
    if (match[0].includes('${') || match[0].includes('localhost')) continue
    try {
      const url = new URL(match[0])
      if (!['http:', 'https:'].includes(url.protocol)) invalid.push(`${relative(root, file)}: ${match[0]}`)
      if (url.hostname === 'sirophp.com' && !routeExists(url.pathname)) {
        invalid.push(`${relative(root, file)}: unknown internal route ${url.pathname}`)
      }
    } catch {
      invalid.push(`${relative(root, file)}: ${match[0]}`)
    }
  }
  for (const match of content.matchAll(internalPattern)) {
    if (!routeExists(match[1])) invalid.push(`${relative(root, file)}: unknown internal route ${match[1]}`)
  }
}

if (invalid.length > 0) {
  console.error('Invalid documentation links found:')
  console.error([...new Set(invalid)].map((item) => `- ${item}`).join('\n'))
  process.exit(1)
}

console.log(`Documentation link check passed (${files.length} files, ${routes.size} routes scanned)`)
