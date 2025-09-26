'use client'

import { useEffect } from 'react'

export default function NoIndexWhenQA() {
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      const isQa = params.get('qa') === '1'
      if (!isQa) return

      const meta = document.createElement('meta')
      meta.setAttribute('name', 'robots')
      meta.setAttribute('content', 'noindex')
      document.head.appendChild(meta)

      return () => {
        if (meta && meta.parentNode) meta.parentNode.removeChild(meta)
      }
    } catch {
      // Silently ignore any errors when adding/removing meta tags
    }
  }, [])

  return null
}
