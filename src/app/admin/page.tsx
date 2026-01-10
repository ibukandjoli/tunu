
import { createClient as createServerClient } from '@/lib/supabase/server'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Eye, Pencil } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
    // 1. Try to use Admin Client (Service Role) to bypass RLS
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!

    let supabase: any

    if (serviceRoleKey) {
        supabase = createClient(supabaseUrl, serviceRoleKey)
    } else {
        console.warn("SUPABASE_SERVICE_ROLE_KEY is missing. Falling back to authenticated user client (RLS may hide data).")
        supabase = await createServerClient()
    }

    // Fetch auctions
    const { data: auctionsData, error: auctionError } = await supabase
        .from('auctions')
        .select('*')
        .order('created_at', { ascending: false })

    if (auctionError) console.error("Error fetching auctions:", auctionError)

    // Fetch bids with profiles
    const { data: bidsData, error: bidsError } = await supabase
        .from('bids')
        .select(`
amount,
    auction_id,
    bidder_id,
    bidder: profiles(
        username,
        email
    )
        `)

    if (bidsError) console.error("Error fetching bids:", bidsError)

    // Merge bids into auctions
    const auctions = auctionsData?.map((auction: any) => {
        const auctionBids = bidsData?.filter((b: any) => b.auction_id === auction.id) || []
        return {
            ...auction,
            bids: auctionBids
        }
    })

    // Helper to get max bid
    const getHighestBid = (bids: any[]) => {
        if (!bids || bids.length === 0) return null
        return bids.reduce((prev, current) => (prev.amount > current.amount) ? prev : current)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Tableau de Bord Admin</h2>
                <Button asChild>
                    <Link href="/admin/create">Créer une Enchère</Link>
                </Button>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Titre</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead>Vainqueur / Leader</TableHead>
                            <TableHead>Enchère Actuelle</TableHead>
                            <TableHead>Fin</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {auctions?.map((auction: any) => {
                            const isExpired = new Date(auction.ends_at) < new Date()
                            const isEnded = auction.status === 'sold' || auction.status === 'ended' || isExpired

                            // Determine status label
                            let statusLabel = 'Inconnu'
                            let statusVariant: "default" | "secondary" | "destructive" | "outline" = "secondary"

                            if (auction.status === 'active') {
                                if (isExpired) {
                                    statusLabel = 'Terminée (À CLÔTURER)'
                                    statusVariant = "destructive"
                                } else {
                                    statusLabel = 'En cours'
                                    statusVariant = "default"
                                }
                            } else if (auction.status === 'draft') {
                                statusLabel = 'Brouillon'
                                statusVariant = "secondary"
                            } else {
                                statusLabel = auction.status // sold, ended
                                statusVariant = "outline"
                            }

                            const highestBid = getHighestBid(auction.bids)
                            const winnerName = highestBid?.bidder?.username || 'Aucune offre'
                            const winnerEmail = highestBid?.bidder?.email

                            return (
                                <TableRow key={auction.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex flex-col">
                                            <span>{auction.title}</span>
                                            <span className="text-xs text-muted-foreground">{auction.slug}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={statusVariant}>
                                            {statusLabel}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col text-sm">
                                            <span className="font-medium">{winnerName}</span>
                                            {winnerEmail && <span className="text-xs text-muted-foreground">{winnerEmail}</span>}
                                        </div>
                                    </TableCell>
                                    <TableCell>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(auction.current_price)}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span>{new Date(auction.ends_at).toLocaleString('fr-FR')}</span>
                                            <span className="text-xs text-muted-foreground">
                                                {(() => {
                                                    const diff = new Date(auction.ends_at).getTime() - new Date().getTime()
                                                    const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
                                                    if (diff < 0) return 'Terminée'
                                                    if (days === 0) return "Aujourd'hui"
                                                    if (days === 1) return 'Demain'
                                                    return `Dans ${days} jours`
                                                })()}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="ghost" size="icon" asChild>
                                            <Link href={`/? auction = ${auction.slug} `} target="_blank">
                                                <Eye className="w-4 h-4" />
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="icon" asChild>
                                            <Link href={`/ admin / edit / ${auction.id} `}>
                                                <Pencil className="w-4 h-4" />
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                        {!auctions?.length && (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                    Aucune enchère trouvée.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
