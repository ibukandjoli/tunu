import { createClient } from '@/lib/supabase/server'
import { LandingPage } from '@/components/LandingPage'
import { ClientProviders } from '@/components/ClientProviders'
import { Auction, Bid } from '@/hooks/useRealtimeAuction'

export const dynamic = 'force-dynamic'

import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const supabase = await createClient()
  const { data: auction } = await supabase
    .from('auctions')
    .select('title, description, demo_url')
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (!auction) {
    return {
      title: 'TUNU | Aucune enchère en cours',
    }
  }

  return {
    title: `Enchère du jour : ${auction.title}`,
    description: `Offre actuelle sur ${auction.title}. ${auction.description ? auction.description.substring(0, 150) : ''}...`,
    openGraph: {
      title: auction.title,
      description: `Misez sur ${auction.title} maintenant sur TUNU.`,
    },
  }
}

export default async function Home() {
  const supabase = await createClient()

  const { data: auctionData, error: auctionError } = await supabase
    .from('auctions')
    .select('*')
    .neq('status', 'draft') // Filter out drafts to prevent leaks
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (auctionError || !auctionData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">No data</h1>
        </div>
      </div>
    )
  }

  const auction: Auction = auctionData as any

  const { data: bidsData } = await supabase
    .from('bids')
    .select('*, bidder:profiles(username)')
    .eq('auction_id', auction.id)
    .order('created_at', { ascending: false })
    .limit(20)

  const bids: Bid[] = (bidsData || []).map((b: any) => ({
    ...b,
    bidder: b.bidder
  }))

  // Fetch Past Auctions (Ended)
  const { data: pastAuctionsData } = await supabase
    .from('auctions')
    .select('*, bids(count)')
    .lt('ends_at', new Date().toISOString())
    .order('ends_at', { ascending: false })
    .limit(4)

  const pastAuctions = (pastAuctionsData || []).map((a: any) => ({
    ...a,
    bid_count: a.bids ? a.bids[0]?.count : 0
  }))

  const { data: { user } } = await supabase.auth.getUser()

  // SEO Structured Data (JSON-LD)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: auction.title,
    description: auction.description,
    image: auction.image_url || 'https://tunudrop.com/icon.png',
    offers: {
      '@type': 'Offer',
      price: auction.current_price,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: 'https://tunudrop.com',
      priceValidUntil: auction.ends_at,
    }
  }

  return (
    <ClientProviders>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingPage
        user={user}
        auction={auction}
        bids={bids}
        pastAuctions={pastAuctions}
      />
    </ClientProviders>
  )
}
