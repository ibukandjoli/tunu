'use client'

import { useLanguage } from '@/lib/i18n/LanguageContext'
import { Badge } from '@/components/ui/badge'
import { Clock, ShieldCheck, TrendingUp, User, Activity } from 'lucide-react'
import Image from 'next/image'

export function AuctionHero({ auction }: { auction: any }) {
    const { t } = useLanguage()

    return (
        <section className="space-y-6">
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0 uppercase tracking-widest text-[10px]">
                        {auction.project_type || 'SaaS Drop'}
                    </Badge>
                    {auction.status === 'active' && (
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                    )}
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground leading-tight">
                    {auction.title}
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                    {auction.summary}
                </p>
            </div>

            {/* Image (Video aspect ratio) - Moved Below Text */}
            {auction.image_url && (
                <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-secondary shadow-sm">
                    <Image
                        src={auction.image_url}
                        alt={auction.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            )}

            <div className="grid gap-4 md:grid-cols-3">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/30 border border-secondary/50">
                    <div className="p-2 bg-background rounded-full shadow-sm">
                        <User className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-sm">
                        <p className="font-semibold text-foreground/90">Conçu par</p>
                        <p className="text-muted-foreground text-xs">{auction.creator_name || 'Tunu Team'}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/30 border border-secondary/50">
                    <div className="p-2 bg-background rounded-full shadow-sm">
                        <Activity className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="text-sm">
                        <p className="font-semibold text-foreground/90">État du projet</p>
                        <p className="text-muted-foreground text-xs">{auction.project_status || 'Live'}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/30 border border-secondary/50">
                    <div className="p-2 bg-background rounded-full shadow-sm">
                        <Clock className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="text-sm">
                        <p className="font-semibold text-foreground/90">{t('trust.transfer')}</p>
                        <p className="text-muted-foreground text-xs">{t('trust.transfer_desc')}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
