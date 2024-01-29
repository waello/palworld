'use client'

import { ThemeProvider } from 'next-themes'

function AppThemeProvider(props: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      storageKey="theme"
      attribute="class"
    >
      {props.children}
    </ThemeProvider>
  )
}

export { AppThemeProvider }
