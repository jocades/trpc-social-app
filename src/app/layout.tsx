import '@/styles/globals.css'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/contexts/theme'
import { Toaster } from '@/components/ui/toaster'
import { TooltipProvider } from '@/components/ui/tooltip'
import { TailwindIndicator } from '@/components/tailwind-indicator'

import { TRPCProvider } from './_trpc/provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn('bg-background font-sans antialiased', inter.className)}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>
            <TRPCProvider>{children}</TRPCProvider>
          </TooltipProvider>
          <Toaster />
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
