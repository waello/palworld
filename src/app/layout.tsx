import '~/styles/dist.css'
import '~/styles/globals.css'

import { GeistSans } from 'geist/font/sans'
import { Providers } from '~/app/context'

export const metadata = {
  title: 'Palbreeder | Palworld Breeding Calculator',
  description:
    'Palbreeder is a Palworld breeding calculator that helps you find the best breeding combinations for your Paldeck.',
  icons: [{ rel: 'icon', url: '/favicon.svg' }]
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={`${GeistSans.className} w-full bg-background`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
