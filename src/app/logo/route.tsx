import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000000',
        }}
      >
        <div
          style={{
            width: '180px',
            height: '180px',
            borderRadius: '40px',
            background: 'linear-gradient(135deg, #00d4ff, #7b61ff)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '100px',
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: '40px',
          }}
        >
          S
        </div>
        <span
          style={{
            fontSize: '64px',
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-0.02em',
          }}
        >
          SiroPHP
        </span>
      </div>
    ),
    { width: 512, height: 512 },
  )
}
