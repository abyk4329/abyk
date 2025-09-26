import { ImageResponse } from 'next/og'

export const runtime = 'edge'

// Serve a 32x32 PNG at /favicon.ico for broad browser compatibility
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0b0a10',
          color: 'white',
          fontSize: 18,
          fontWeight: 800,
        }}
      >
        AB
      </div>
    ),
    { width: 32, height: 32 }
  )
}
