import React from "react"
import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'

import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Cloud Ware - Cybersecurity Platform',
  description: 'Advanced cybersecurity platform for file analysis and malware detection.',
}

export const viewport = {
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${spaceGrotesk.variable} ${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
