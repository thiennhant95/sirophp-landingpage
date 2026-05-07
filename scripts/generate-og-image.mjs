import sharp from 'sharp'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')

const WIDTH = 1200
const HEIGHT = 630

const svg = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000000"/>
      <stop offset="100%" stop-color="#0a0a0a"/>
    </linearGradient>
    <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#00d4ff" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#7b61ff" stop-opacity="0.05"/>
    </linearGradient>
    <linearGradient id="logo-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#00d4ff"/>
      <stop offset="100%" stop-color="#7b61ff"/>
    </linearGradient>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)"/>

  <circle cx="200" cy="100" r="300" fill="#00d4ff" opacity="0.03"/>
  <circle cx="1000" cy="500" r="250" fill="#7b61ff" opacity="0.03"/>

  <g transform="translate(600, 260)">
    <rect x="-52" y="-52" width="104" height="104" rx="26" fill="url(#logo-bg)"/>
    <text x="0" y="18" text-anchor="middle" font-family="system-ui, sans-serif" font-size="56" font-weight="800" fill="white">S</text>
  </g>

  <text x="600" y="370" text-anchor="middle" font-family="system-ui, sans-serif" font-size="72" font-weight="800" fill="white">
    SiroPHP
  </text>

  <text x="600" y="445" text-anchor="middle" font-family="system-ui, sans-serif" font-size="36" font-weight="700" fill="white">
    Build APIs Fast. Debug Faster.
  </text>

  <text x="600" y="490" text-anchor="middle" font-family="system-ui, sans-serif" font-size="22" fill="#9ca3af">
    Lightweight PHP API Framework
  </text>

  <text x="600" y="520" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" fill="#6b7280">
    Zero Dependencies • &lt;1ms Cold Boot • ~2MB RAM
  </text>
</svg>
`

async function generate() {
  try {
    const pngBuffer = await sharp(Buffer.from(svg))
      .resize(WIDTH, HEIGHT)
      .png()
      .toBuffer()

    const outputPath = join(publicDir, 'opengraph-image.png')
    await sharp(pngBuffer).toFile(outputPath)
    console.log(`✅ Generated: ${outputPath} (${(pngBuffer.length / 1024).toFixed(1)} KB)`)
  } catch (err) {
    console.error('Error generating image:', err)
    process.exit(1)
  }
}

generate()
