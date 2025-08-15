import type { Metadata } from 'next'
// <CHANGE> Updated to use DM Sans for better typography
import { DM_Sans } from 'next/font/google'
import './globals.css'

// <CHANGE> Configured DM Sans with multiple weights for design hierarchy
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Beautiful Personal Chat App',
  description: 'Chat with AI mentors in a beautiful, modern interface',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={dmSans.variable}>
      <head>
        <style>{`
html {
  font-family: ${dmSans.style.fontFamily};
  --font-sans: ${dmSans.style.fontFamily};
}
        `}</style>
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
