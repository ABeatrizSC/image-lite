import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

const poppins = Poppins({ subsets: ['latin'], weight: '400' })

export const metadata: Metadata = {
  title: 'Image Lite App',
  description: 'Fullstack project | Spring Boot, ReactJS, Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
     <body className={`${poppins.className} min-h-screen`}>{children}</body>
    </html>
  )
}
