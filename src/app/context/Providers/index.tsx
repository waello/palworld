import { AppThemeProvider } from '~/app/context'
import { type ReactNode } from 'react'

function Providers(props: { children: ReactNode }) {
  return <AppThemeProvider>{props.children}</AppThemeProvider>
}

export { Providers }
