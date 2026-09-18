import { readFileSync } from 'node:fs'

const config = readFileSync('next.config.ts', 'utf8')
const required = [
  'X-Content-Type-Options',
  'X-Frame-Options',
  'Referrer-Policy',
  'Content-Security-Policy',
  'Strict-Transport-Security',
  'Permissions-Policy',
]
const missing = required.filter((header) => !config.includes(`key: '${header}'`))

if (missing.length > 0) {
  console.error(`Missing security headers: ${missing.join(', ')}`)
  process.exit(1)
}

if (!config.includes("poweredByHeader: false")) {
  console.error('poweredByHeader must remain disabled')
  process.exit(1)
}

console.log(`Security configuration check passed (${required.length} headers)`)
