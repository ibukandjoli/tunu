'use client'

import { Bid } from '@/hooks/useRealtimeAuction'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { formatCurrency } from '@/lib/utils'

export function BidTicker({ bids }: { bids: Bid[] }) {
    const { t } = useLanguage()

    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
            <div className="p-4 border-b">
                <h3 className="font-semibold leading-none tracking-tight">Activité Live</h3>
                <p className="text-sm text-muted-foreground mt-1">{bids.length} offres</p>
            </div>
            <ScrollArea className="h-[300px] p-4">
                {bids.length === 0 ? (
                    <div className="text-center text-sm text-muted-foreground py-8">
                        Soyez le premier à enchérir.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {bids.map((bid) => {
                            const { eur } = formatCurrency(bid.amount)
                            return (
                                <div key={bid.id} className="flex items-center justify-between text-sm animate-in fade-in slide-in-from-top-2">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="font-medium">{bid.bidder?.username || 'Unknown'}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-muted-foreground text-xs">
                                            {new Date(bid.created_at).toLocaleTimeString('fr-FR')}
                                        </span>
                                        <Badge variant="secondary" className="font-mono">
                                            {eur}
                                        </Badge>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </ScrollArea>
        </div>
    )
}
