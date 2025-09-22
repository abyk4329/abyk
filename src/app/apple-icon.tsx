// Generate Apple touch icon (180x180)
import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
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
          fontSize: 64,
          fontWeight: 800,
        }}
      >
        AB
      </div>
    ),
    size
  )
}
