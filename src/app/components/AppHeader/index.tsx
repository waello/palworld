'use client'

import {
  GitHubLogoIcon,
  MoonIcon,
  SunIcon,
  TokensIcon
} from '@radix-ui/react-icons'
import { Button } from '~/app/components'
import { useTheme } from 'next-themes'
import ListPageinfo from "~/app/pals/page";
import Link from 'next/link';

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
        <div className="flex items-center  text-lg font-bold tracking-tighter">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"/>
            </svg>
            <Link href="/">
                Calculator
            </Link>
        </div>

        <div className="flex items-center  text-lg font-bold tracking-tighter">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"/>
          </svg>

          <Link href="/pals">
              Pals
          </Link>
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
