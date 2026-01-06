import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export interface Bid {
    id: string
    amount: number
    created_at: string
    bidder_id: string
    bidder?: {
        username: string
    }
}

export interface Auction {
    id: string
    title: string
    description: string
    summary: string
    start_price: number
    current_price: number
    min_increment: number
    ends_at: string
    status: 'draft' | 'active' | 'ended' | 'sold'
    winner_id?: string
    image_url?: string
    slug: string
    revenue_ltm?: number
    monetization_details?: string
    demo_url?: string
    stack_tags?: string[]
    project_type?: string
    creator_name?: string
    project_status?: string
    net_margin?: number
}

export function useRealtimeAuction(initialAuction: Auction, initialBids: Bid[]) {
    const [auction, setAuction] = useState<Auction>(initialAuction)
    const [bids, setBids] = useState<Bid[]>(initialBids)
    const supabase = createClient()

    useEffect(() => {
        const channel = supabase
            .channel(`auction_room:${initialAuction.id}`)
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'auctions',
                    filter: `id=eq.${initialAuction.id}`,
                },
                (payload) => {
                    console.log('Auction update received:', payload)
                    setAuction(payload.new as Auction)
                }
            )
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'bids',
                    filter: `auction_id=eq.${initialAuction.id}`,
                },
                async (payload) => {
                    console.log('New bid received:', payload)
                    // Fetch the profile for the new bid
                    const { data: bidder } = await supabase
                        .from('profiles')
                        .select('username')
                        .eq('id', payload.new.bidder_id)
                        .single()

                    const newBid = {
                        ...payload.new,
                        bidder: bidder || { username: 'Anonymous' }
                    } as Bid

                    setBids((prev) => [newBid, ...prev])
                }
            )
            .subscribe((status) => {
                console.log('Subscription status:', status)
            })

        return () => {
            supabase.removeChannel(channel)
        }
    }, [initialAuction.id])

    return { auction, bids }
}
