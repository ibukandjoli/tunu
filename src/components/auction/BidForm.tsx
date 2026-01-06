'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Loader2, ArrowUpRight } from 'lucide-react'
import { Auction } from '@/hooks/useRealtimeAuction'
import { AuthModal } from '@/components/auth/AuthModal'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { formatCurrency } from '@/lib/utils'

export function BidForm({ auction, user }: { auction: Auction, user: any }) {
    const [amount, setAmount] = useState<string>('')
    const [isLoading, setIsLoading] = useState(false)
    const supabase = createClient()
    const { t } = useLanguage()

    // Calculate minimum bid
    const minBid = Number(auction.current_price) + Number(auction.min_increment)
    // If first bid, must be at least start_price
    const nextMin = auction.current_price === 0 ? auction.start_price : minBid

    async function handleBid(e: React.FormEvent) {
        e.preventDefault()
        if (!amount) return

        const bidValue = parseFloat(amount)
        if (isNaN(bidValue)) return

        if (bidValue < nextMin) {
            toast.error('Bid too low', {
                description: `Minimum bid is ${formatCurrency(nextMin).eur}`
            })
            return
        }

        setIsLoading(true)

        try {
            const { error } = await supabase.rpc('place_bid', {
                auction_id: auction.id,
                bid_amount: bidValue
            })

            if (error) throw error

            toast.success('Enchère validée !', {
                description: `Vous êtes le meilleur enchérisseur à ${formatCurrency(bidValue).eur}`
            })
            setAmount('')
        } catch (error) {
            toast.error('Erreur', {
                description: (error as Error).message
            })
        } finally {
            setIsLoading(false)
        }
    }

    if (auction.status !== 'active') {
        return (
            <div className="rounded-xl border bg-muted/50 p-6 text-center">
                <h3 className="font-semibold text-muted-foreground">{t('auction.ended')}</h3>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="rounded-xl border bg-primary/5 p-6 text-center space-y-4">
                <div className="space-y-1">
                    <h3 className="font-semibold text-primary">Connectez-vous pour enchérir</h3>
                    <p className="text-sm text-muted-foreground">Accès sécurisé réservé aux membres.</p>
                </div>
                <AuthModal>
                    <Button className="w-full">{t('nav.login')}</Button>
                </AuthModal>
            </div>
        )
    }

    return (
        <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
            <div className="space-y-1">
                <h3 className="font-semibold">{t('auction.place_bid')}</h3>
                <p className="text-sm text-muted-foreground">
                    {t('auction.min_bid')}: <span className="font-mono font-medium text-foreground">{formatCurrency(nextMin).eur}</span>
                </p>
            </div>

            <form onSubmit={handleBid} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="bid-amount" className="sr-only">Montant</Label>
                    <div className="relative">
                        <span className="absolute left-3 top-2.5 text-muted-foreground">€</span>
                        <Input
                            id="bid-amount"
                            type="number"
                            min={nextMin}
                            step="1"
                            placeholder={nextMin.toString()}
                            className="pl-7 text-lg font-mono font-bold"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    {amount && !isNaN(parseFloat(amount)) && (
                        <p className="text-xs text-muted-foreground text-right">
                            ≈ {formatCurrency(parseFloat(amount)).fcfa}
                        </p>
                    )}
                </div>

                <Button type="submit" className="w-full text-lg h-12" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <ArrowUpRight className="mr-2 h-5 w-5" />}
                    {t('auction.place_bid')}
                </Button>
            </form>

            <p className="text-[10px] text-muted-foreground text-center">
                En plaçant une enchère, vous vous engagez à l'achat.
            </p>
        </div>
    )
}
