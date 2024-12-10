'use client'

import { useEffect, useState } from 'react'
import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return nothing or a loading state during the first render on the server
    return null
  }

  return <ThemeProvider attribute="class">{children}</ThemeProvider>
}
