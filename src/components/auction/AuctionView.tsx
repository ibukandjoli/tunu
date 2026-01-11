'use client'

import { Auction, Bid, useRealtimeAuction } from '@/hooks/useRealtimeAuction'
import { AuctionHero } from './AuctionHero'
import { AuctionTimer } from './AuctionTimer'
import { BidForm } from './BidForm'
import { MakeOfferModal } from './MakeOfferModal'
import { BidTicker } from './BidTicker'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { User } from '@supabase/supabase-js'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { formatCurrency } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import { ExternalLink, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AuthModal } from '@/components/auth/AuthModal'

interface AuctionViewProps {
    initialAuction: Auction
    initialBids: Bid[]
    user: User | null
}

export function AuctionView({ initialAuction, initialBids, user }: AuctionViewProps) {
    const { auction, bids } = useRealtimeAuction(initialAuction, initialBids)
    const { t } = useLanguage()
    const { eur, fcfa } = formatCurrency(auction.current_price)

    // Logic: Revenue vs Business Model
    const showRevenue = auction.revenue_ltm && auction.revenue_ltm > 0
    const revenue = formatCurrency(auction.revenue_ltm || 0)

    // Dynamic Header Badges Logic
    // Default logic for now, can be expanded
    const badgeText = auction.revenue_ltm && auction.revenue_ltm > 0 ? t('trust.growth') : "Prêt au Lancement"

    return (
        <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                {/* Left Column: Project Details */}
                <div className="lg:col-span-7 space-y-8">
                    <AuctionHero auction={auction} />

                    {/* Live Demo CTA (Auth Gated) */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-2">
                            {/* Stack Tags */}
                            {auction.stack_tags && auction.stack_tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="rounded-full px-3 text-xs font-normal whitespace-nowrap">
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        {user ? (
                            auction.demo_url && (
                                <Button variant="outline" size="sm" className="gap-2 cursor-pointer w-full sm:w-auto" onClick={() => window.open(auction.demo_url, '_blank')}>
                                    Voir le site en live <ExternalLink className="h-3 w-3" />
                                </Button>
                            )
                        ) : (
                            <AuthModal>
                                <Button variant="outline" size="sm" className="gap-2 cursor-pointer opacity-70 w-full sm:w-auto">
                                    <Lock className="h-3 w-3" /> Voir le site (Connexion requise)
                                </Button>
                            </AuthModal>
                        )}
                    </div>

                    <Separator />

                    {/* Metrics Section with Dual Currency OR Business Model */}
                    <div className="bg-background p-6 rounded-xl border border-secondary shadow-sm space-y-4">
                        <h4 className="font-semibold text-lg">Métriques Clés</h4>
                        <div className="grid grid-cols-2 gap-4">
                            {showRevenue ? (
                                <div>
                                    <span className="text-xs text-muted-foreground uppercase tracking-wider">{t('metrics.revenue')}</span>
                                    <p className="font-mono text-xl">{revenue.eur}</p>
                                    <p className="font-mono text-xs text-muted-foreground">≈ {revenue.fcfa}</p>
                                </div>
                            ) : (
                                <div>
                                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Business Model</span>
                                    <p className="font-medium text-lg text-primary">{auction.monetization_details || 'N/A'}</p>
                                </div>
                            )}

                            {auction.net_margin != null && (
                                <div>
                                    <span className="text-xs text-muted-foreground uppercase tracking-wider">{t('metrics.margin')}</span>
                                    <p className="font-mono text-xl">{auction.net_margin}%</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t">
                        <h3 className="text-2xl font-extrabold tracking-tight mb-6">À propos de {auction.title}</h3>
                        <div className="prose prose-slate dark:prose-invert max-w-none text-foreground font-light leading-relaxed prose-p:my-8 prose-headings:my-6 prose-strong:font-bold prose-strong:text-primary prose-strong:text-lg prose-headings:font-bold">
                            {/* @ts-ignore */}
                            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                                {auction.description}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>

                {/* Right Column: Sticky Auction Action */}
                <div className="lg:col-span-5">
                    <div className="sticky top-24 space-y-4">
                        <Card className="border-2 border-primary/10 shadow-lg overflow-hidden relative">
                            {/* Gradient Overlay */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-primary" />

                            <CardHeader className="pb-4 space-y-2">
                                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                    <div>
                                        <CardTitle className="text-lg text-muted-foreground font-medium">{t('auction.current_bid')}</CardTitle>
                                        <div className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-2 text-primary">
                                            {eur}
                                        </div>
                                        <p className="text-sm text-muted-foreground font-mono mt-1">
                                            ≈ {fcfa}
                                        </p>
                                    </div>
                                    <div className="self-end sm:self-start sm:text-right">
                                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">Temps Restant</span>
                                        <AuctionTimer endsAt={auction.ends_at} />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <BidForm auction={auction} user={user} />

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-background px-2 text-muted-foreground">Ou</span>
                                    </div>
                                </div>

                                <MakeOfferModal auctionId={auction.id} auctionTitle={auction.title} />
                                <Separator />
                                <BidTicker bids={bids} />
                            </CardContent>
                        </Card>

                        <div className="text-center text-xs text-muted-foreground">
                            <p>Sécurisé par la Garantie TunuDrop.</p>
                        </div>

                        {/* Dynamic Trust Badges in Sidebar if needed, otherwise rely on Header in LandingPage */}
                    </div>
                </div>
            </div>
        </div>
    )
}
