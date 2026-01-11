
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
    // 1. Check Key Integrity
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const isAnonKey = serviceRoleKey === process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    let supabase: any
    if (serviceRoleKey && !isAnonKey) {
        supabase = createClient(supabaseUrl, serviceRoleKey)
    } else {
        supabase = await createServerClient()
    }

    // Fetch auctions
    const { data: auctionsData, error: auctionError } = await supabase
        .from('auctions')
        .select('*')
        .order('created_at', { ascending: false })

    if (auctionError) console.error("Error fetching auctions:", auctionError)

    // Fetch bids (RAW - No joins to prevent FK errors)
    const { data: bidsData, error: bidsError } = await supabase
        .from('bids')
        .select('*')

    if (bidsError) console.error("Error fetching bids:", bidsError)

    // Fetch users via Auth Admin (Source of Truth for Emails)
    // The 'profiles' table seems empty or out of sync, so we use the Auth API directly.
    let profilesData: any[] = []
    let authError: any = null

    if (bidsData && bidsData.length > 0 && serviceRoleKey && !isAnonKey) {
        const bidderIds = Array.from(new Set(bidsData.map((b: any) => b.bidder_id).filter(Boolean)))

        try {
            const userPromises = bidderIds.map(async (id: any) => {
                const { data: { user }, error } = await supabase.auth.admin.getUserById(id)
                if (error || !user) return null
                return {
                    id: user.id,
                    username: user.user_metadata?.username || user.user_metadata?.full_name || 'Utilisateur',
                    email: user.email
                }
            })

            const users = await Promise.all(userPromises)
            profilesData = users.filter(Boolean)
        } catch (e) {
            console.error("Auth Admin Error:", e)
            authError = e
        }
    } else if (bidsData && bidsData.length > 0) {
        // Fallback for Anon Key (restricted view)
        const bidderIds = Array.from(new Set(bidsData.map((b: any) => b.bidder_id).filter(Boolean)))
        const { data: profiles } = await supabase
            .from('profiles')
            .select('id, username, email')
            .in('id', bidderIds)
        profilesData = profiles || []
    }

    // Merge bids into auctions
    const auctions = auctionsData?.map((auction: any) => {
        const auctionBids = bidsData?.filter((b: any) => b.auction_id === auction.id) || []
        // Attach profile to bid
        const enrichedBids = auctionBids.map((bid: any) => {
            const bidder = profilesData.find(p => p.id === bid.bidder_id)
            // Fallback if bidder not found but we have an ID
            if (!bidder && bid.bidder_id) {
                return { ...bid, bidder: { username: 'ID: ' + bid.bidder_id.slice(0, 8) + '...', email: 'Email masqué (Profil introuvable)' } }
            }
            return { ...bid, bidder }
        })
        return {
            ...auction,
            bids: enrichedBids
        }
    })

    // Fetch offers
    const { data: offersData, error: offersError } = await supabase
        .from('offers')
        .select('*')
        .order('created_at', { ascending: false })

    if (offersError) console.error("Error fetching offers:", offersError)

    // Enrich offers with auction title
    const allOffers = offersData?.map((offer: any) => {
        const auction = auctionsData?.find((a: any) => a.id === offer.auction_id)
        return {
            ...offer,
            auction
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

            {/* ERROR ALERTS */}
            {!serviceRoleKey && (
                <div className="bg-destructive/10 border-l-4 border-destructive text-destructive p-4 mb-4" role="alert">
                    <p className="font-bold">Attention</p>
                    <p>La clé <code>SUPABASE_SERVICE_ROLE_KEY</code> est manquante.</p>
                </div>
            )}
            {isAnonKey && (
                <div className="bg-destructive/10 border-l-4 border-destructive text-destructive p-4 mb-4" role="alert">
                    <p className="font-bold">Configuration Incorrecte</p>
                    <p>Vous avez utilisé la clé <strong>ANON</strong> à la place de la clé <strong>SERVICE_ROLE</strong>. Elle ne permet pas de voir les emails.</p>
                </div>
            )}



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
                                            <Link href={`/?auction=${auction.slug}`} target="_blank">
                                                <Eye className="w-4 h-4" />
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="icon" asChild>
                                            <Link href={`/admin/edit/${auction.id}`}>
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
                </TableBody>
            </Table>
        </div>

            {/* OFFERS SECTION */ }
    <div className="space-y-4 pt-8">
        <h3 className="text-xl font-bold tracking-tight">Dernières Propositions</h3>
        <div className="rounded-md border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Projet</TableHead>
                        <TableHead>Montant Proposé</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Note</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* @ts-ignore */}
                    {allOffers?.map((offer: any) => (
                        <TableRow key={offer.id}>
                            <TableCell className="font-medium">
                                {offer.auction?.title || 'Enchère supprimée'}
                            </TableCell>
                            <TableCell>
                                {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(offer.amount)}
                            </TableCell>
                            <TableCell>{offer.contact_info}</TableCell>
                            <TableCell>
                                {new Date(offer.created_at).toLocaleString('fr-FR')}
                            </TableCell>
                            <TableCell className="max-w-[200px] truncate text-muted-foreground italic">
                                {/* Basic extraction if message is merged in contact_info */}
                                {offer.contact_info.includes('Note:') ? 'Voir contact' : '-'}
                            </TableCell>
                        </TableRow>
                    ))}
                    {/* @ts-ignore */}
                    {!allOffers?.length && (
                        <TableRow>
                            <TableCell colSpan={5} className="h-24 text-center">
                                Aucune proposition pour le moment.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    </div>
        </div >
    )
}
