import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const read = (file) => readFileSync(join(root, file), 'utf8')
const installer = read('src/lib/installer.ts')
const version = installer.match(/version:\s*["']([^"']+)["']/)?.[1]

if (!version) {
  console.error('Unable to read installer version from src/lib/installer.ts')
  process.exit(1)
}

const checks = [
  ['public/downloads/manifest.json', new RegExp(`"version"\\s*:\\s*"${version}"`)],
  ['public/downloads/guide.md', new RegExp(`Siro Installer v${version}`)],
  ['src/app/layout.tsx', new RegExp(`softwareVersion: +(?:INSTALLER\\.version|["']${version}["'])`)],
  ['src/components/CTA.tsx', new RegExp(`Core v${version}`)],
  ['src/components/Hero.tsx', new RegExp(`Core v${version}`)],
  ['src/components/Footer.tsx', new RegExp(`v${version}`)],
  ['src/docs-content/guides/migration.ts', new RegExp(`v${version} \\(Current\\)`)],
]

const failures = checks.filter(([file, pattern]) => !pattern.test(read(file))).map(([file]) => `${file} does not contain version ${version}`)
if (failures.length > 0) {
  console.error('Version consistency check failed:')
  console.error(failures.map((failure) => `- ${failure}`).join('\n'))
  process.exit(1)
}

console.log(`Version consistency check passed (v${version})`)
