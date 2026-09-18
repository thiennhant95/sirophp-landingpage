import { readFileSync, statSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { join } from 'node:path'

const root = process.cwd()
const manifest = JSON.parse(readFileSync(join(root, 'public/downloads/manifest.json'), 'utf8'))
const installer = readFileSync(join(root, 'src/lib/installer.ts'), 'utf8')
const sourceVersion = installer.match(/version:\s*["']([^"']+)["']/)?.[1]
const phar = join(root, 'public/downloads/siro.phar')

if (!sourceVersion || manifest.version !== sourceVersion) {
  console.error(`Release version mismatch: source=${sourceVersion ?? 'missing'} manifest=${manifest.version ?? 'missing'}`)
  process.exit(1)
}

if (!statSync(phar).isFile() || statSync(phar).size === 0) {
  console.error('PHAR is missing or empty')
  process.exit(1)
}

const sha256 = createHash('sha256').update(readFileSync(phar)).digest('hex')
if (manifest.sha256 && manifest.sha256 !== sha256) {
  console.error(`PHAR checksum mismatch: manifest=${manifest.sha256} actual=${sha256}`)
  process.exit(1)
}

console.log(`Release verification passed (v${sourceVersion}, sha256=${sha256})`)
