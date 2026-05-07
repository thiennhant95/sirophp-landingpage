import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #00d4ff, #7b61ff)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '44px',
            fontWeight: 800,
            color: '#ffffff',
          }}
        >
          S
        </div>
        <span style={{ fontSize: '64px', fontWeight: 800, color: '#ffffff' }}>SiroPHP</span>
      </div>
      <div style={{ fontSize: '36px', color: '#ffffff', fontWeight: 700, marginBottom: '20px' }}>
        Build APIs Fast. Debug Faster.
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{ fontSize: '22px', color: '#9ca3af' }}>Lightweight PHP API Framework</span>
        <span style={{ fontSize: '16px', color: '#6b7280', marginTop: '8px' }}>
          Zero Dependencies • &lt;1ms Cold Boot • ~2MB RAM
        </span>
      </div>
    </div>,
    { width: 1200, height: 630 },
  )
}
