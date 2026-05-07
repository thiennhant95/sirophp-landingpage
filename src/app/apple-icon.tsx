import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #00d4ff, #7b61ff)',
          borderRadius: '32px',
        }}
      >
        <span
          style={{
            fontSize: '100px',
            fontWeight: 800,
            color: '#ffffff',
          }}
        >
          S
        </span>
      </div>
    ),
    { width: 180, height: 180 },
  )
}
