import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://tunudrop.com'),
  title: {
    default: 'TUNU | Enchères Quotidiennes de Produits Digitaux',
    template: '%s | TUNU'
  },
  description: 'Acquérez des SaaS, E-commerce et Actifs Digitaux premium. Un drop par jour à ne pas manquer.',
  keywords: ['enchères', 'business en ligne', 'saas', 'e-commerce', 'acquisition', 'side project', 'startups', 'app mobile'],
  authors: [{ name: 'TUNU Team' }],
  creator: 'TUNU',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://tunudrop.com',
    title: 'TUNU | Enchères de Projets Digitaux',
    description: 'Chaque jour, un nouveau business digital à acquérir au meilleur prix.',
    siteName: 'TUNU',
    images: [
      {
        url: '/icon.png', // Fallback to icon if no specific OG image yet
        width: 1200,
        height: 630,
        alt: 'TUNU - Digital Asset Auctions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TUNU | Enchères Quotidiennes',
    description: 'Ne ratez pas le prochain drop. SaaS, Apps et E-commerce.',
    images: ['/icon.png'],
    creator: '@tunudrop',
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.className} antialiased min-h-screen bg-background`}>
        {children}
        <Toaster richColors position="top-center" duration={4000} />
      </body>
    </html>
  )
}
