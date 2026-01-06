import { createClient } from '@/lib/supabase/server'
import { LandingPage } from '@/components/LandingPage'
import { ClientProviders } from '@/components/ClientProviders'
import { Auction, Bid } from '@/hooks/useRealtimeAuction'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const supabase = await createClient()

  const { data: auctionData, error: auctionError } = await supabase
    .from('auctions')
    .select('*')
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

  return (
    <ClientProviders>
      <LandingPage
        user={user}
        auction={auction}
        bids={bids}
        pastAuctions={pastAuctions}
      />
    </ClientProviders>
  )
}
