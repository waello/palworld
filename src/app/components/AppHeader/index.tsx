'use client'

import {
  GitHubLogoIcon,
  MoonIcon,
  SunIcon,
  TokensIcon
} from '@radix-ui/react-icons'
import { Button } from '~/app/components'
import { useTheme } from 'next-themes'

function AppHeader() {
  const { theme, setTheme } = useTheme()

  function toggleTheme() {
    const updatedTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(updatedTheme)
  }

  return (
    <header className="flex items-center justify-between p-6 pb-3">
      <div className="flex items-center gap-1.5 text-lg font-bold tracking-tighter">
        <TokensIcon className="h-6 w-6 text-primary" />
        Palbreeder
      </div>
      <div className="flex gap-3">

        <Button
          variant="outline"
          size="icon"
          title="Toggle theme"
          onClick={toggleTheme}
        >
          <SunIcon
            className="hidden dark:block"
            fontSize={20}
          />
          <MoonIcon
            className="dark:hidden"
            fontSize={20}
          />
        </Button>
      </div>
    </header>
  )
}

export { AppHeader }
