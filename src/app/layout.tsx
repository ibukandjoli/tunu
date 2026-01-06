import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TunuDrop | Enchères Quotidiennes de Produits Digitaux',
  description: 'Acquérez des SaaS, E-commerce et Actifs Digitaux premium. Un drop par jour.',
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
