import { ImageResponse } from 'next/og'

export const runtime = 'edge'

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
          fontSize: 72,
          fontWeight: 800,
        }}
      >
        AB
      </div>
    ),
    { width: 192, height: 192 }
  )
}
