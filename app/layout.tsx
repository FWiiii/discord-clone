import type { Metadata } from 'next'

import { ModalProvider } from '@/components/providers/modal-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'

import { cn } from '@/lib/utils'
import { ClerkProvider } from '@clerk/nextjs'

import { Open_Sans } from 'next/font/google'
import './globals.css'

const font = Open_Sans({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn('bg-white dark:bg-[#313338]', font.className)}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            storageKey="discord-theme"
          >
            <ModalProvider />
            {children}
          </ThemeProvider>

        </body>
      </html>
    </ClerkProvider>
  )
}
