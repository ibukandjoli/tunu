'use client'

import { useLanguage } from '@/lib/i18n/LanguageContext'
import { User } from '@supabase/supabase-js'
import { AuthModal } from '@/components/auth/AuthModal'
import { Button } from '@/components/ui/button'
import { AuctionView } from '@/components/auction/AuctionView'
import { Auction, Bid } from '@/hooks/useRealtimeAuction'
import { ArrowDown, CheckCircle, Gavel, Key, Smartphone, ShoppingBag, Globe, Zap, ArrowRight, Store, Trophy, Clock, Search, Send } from 'lucide-react'

interface LandingPageProps {
    user: User | null
    auction: Auction
    bids: Bid[]
    pastAuctions: any[]
}

export function LandingPage({ user, auction, bids, pastAuctions }: LandingPageProps) {
    const { t, language, setLanguage } = useLanguage()

    const handleWhatsAppRedirect = () => {
        window.location.href = "https://wa.me/221781362728"
    }

    return (
        <div className="flex flex-col font-sans">
            {/* Hero Section - White Background + Dot Pattern */}
            <section className="relative overflow-hidden bg-background py-20 md:py-32">
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
                <div className="container relative z-10 mx-auto px-4 text-center space-y-8">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-primary">
                        {t('hero.title')}
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground mx-auto max-w-3xl leading-relaxed">
                        {t('hero.subtitle')}
                    </p>

                    <div className="pt-8 flex justify-center">
                        <Button size="lg" className="rounded-full px-8 h-12 text-lg shadow-lg hover:shadow-xl transition-all" onClick={() => {
                            document.getElementById('live-drop')?.scrollIntoView({ behavior: 'smooth' })
                        }}>
                            Voir l'enchère du jour
                            <ArrowDown className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* L'Enchère du Jour (Widget) - Light Blue Background for Separation */}
            <section id="live-drop" className="bg-secondary/30 py-16 md:py-24 border-y border-border/50">
                <div className="container mx-auto px-4">
                    <AuctionView
                        initialAuction={auction}
                        initialBids={bids}
                        user={user}
                    />
                </div>
            </section>

            {/* Mission Section - White Background - NO Testimonial, NO Buttons */}
            <section className="py-20 md:py-28 bg-background">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1 relative">
                            {/* Illustration: Abstract Code + Growth */}
                            <div className="aspect-[4/3] bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl flex items-center justify-center border border-slate-700/50 relative overflow-hidden group shadow-2xl">
                                {/* Abstract Code Pattern Background */}
                                <div className="absolute inset-0 opacity-20 text-[10px] p-4 text-blue-400 font-mono leading-relaxed select-none overflow-hidden">
                                    {`import { Future } from '@tunu/growth';\n\nconst success = await Future.launch({\n  velocity: 'max',\n  risk: 0\n});\n\n// Ready to scale\nif (success) {\n  return "Freedom";\n}`}
                                    <br />
                                    {`\n// Optimized for conversion\nexport default function Win() {\n  const [revenue, setRevenue] = useState(0);\n  useEffect(() => {\n    scale(revenue);\n  }, []);\n}`}
                                </div>

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

                                {/* Growing Graph Icon */}
                                <div className="relative z-10 flex flex-col items-center gap-4">
                                    <div className="bg-blue-500/20 p-4 rounded-full backdrop-blur-sm border border-blue-500/30">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-blue-400 blur-lg opacity-40 animate-pulse"></div>
                                            <Trophy className="h-16 w-16 text-blue-400 relative z-10" />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2 rounded-full border border-slate-700/50 backdrop-blur-md">
                                        <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                                        <span className="text-xs font-medium text-slate-300">Ready to Scale</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 md:order-2 space-y-6 text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t('mission.title')}</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {t('mission.desc')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pourquoi les enchères ? - Light Gray Background */}
            <section className="py-20 bg-muted/30 border-y border-border/50">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-3xl font-bold text-center mb-16">{t('why.title')}</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-background p-6 rounded-xl shadow-sm border space-y-4">
                            <Clock className="h-10 w-10 text-primary" />
                            <div>
                                <h3 className="text-xl font-bold">{t('why.speed')}</h3>
                                <p className="text-muted-foreground mt-2">{t('why.speed_desc')}</p>
                            </div>
                        </div>
                        <div className="bg-background p-6 rounded-xl shadow-sm border space-y-4">
                            <Gavel className="h-10 w-10 text-primary" />
                            <div>
                                <h3 className="text-xl font-bold">{t('why.price')}</h3>
                                <p className="text-muted-foreground mt-2">{t('why.price_desc')}</p>
                            </div>
                        </div>
                        <div className="bg-background p-6 rounded-xl shadow-sm border space-y-4">
                            <Search className="h-10 w-10 text-primary" />
                            <div>
                                <h3 className="text-xl font-bold">{t('why.transparency')}</h3>
                                <p className="text-muted-foreground mt-2">{t('why.transparency_desc')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Past Auctions - Darker Background */}
            <section className="py-20 bg-muted/50 border-y border-border/50">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-3xl font-bold text-center mb-12">Enchères Terminées</h2>
                    {pastAuctions && pastAuctions.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {pastAuctions.map((past, idx) => {
                                const isSuccess = past.bid_count > 0 // Simple heuristic
                                return (
                                    <div key={past.id || idx} className="bg-background rounded-lg border shadow-sm p-4 space-y-3 relative overflow-hidden group hover:shadow-md transition-all">
                                        {/* Status Badge */}
                                        <div className="absolute top-2 right-2">
                                            {isSuccess ? (
                                                <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide border border-green-200">
                                                    Vendu
                                                </span>
                                            ) : (
                                                <span className="bg-zinc-100 text-zinc-500 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide border border-zinc-200">
                                                    Expiré
                                                </span>
                                            )}
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-lg leading-tight truncate pr-16">{past.title}</h4>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                                                    {past.project_type || 'Project'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-end justify-between pt-2 border-t mt-2">
                                            <div>
                                                <p className="text-xs text-muted-foreground uppercase">Prix Fin</p>
                                                <p className="font-mono font-bold">
                                                    {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(past.current_price)}
                                                </p>
                                            </div>
                                            <Button size="sm" variant="ghost" className="h-8 text-xs" disabled>
                                                Terminée
                                            </Button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <p className="text-center text-muted-foreground">Aucune enchère terminée pour le moment.</p>
                    )}
                </div>
            </section>


            {/* Comment ça marche - White Background */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4 max-w-6xl">
                    <h2 className="text-3xl font-bold text-center mb-16">{t('how.title')}</h2>

                    {/* Grid 4 columns for 4 steps */}
                    <div className="grid md:grid-cols-4 gap-8 text-center relative">
                        {/* Connector Line (visible on md+) */}
                        <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-secondary -z-10" />

                        <div className="space-y-4 relative z-10 group">
                            <div className="h-24 w-24 mx-auto rounded-full bg-background flex items-center justify-center border-4 border-muted group-hover:border-primary/20 transition-colors shadow-sm">
                                <CheckCircle className="h-10 w-10 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">{t('how.step1')}</h3>
                                <p className="text-sm text-muted-foreground mt-2">{t('how.step1_desc')}</p>
                            </div>
                        </div>

                        <div className="space-y-4 relative z-10 group">
                            <div className="h-24 w-24 mx-auto rounded-full bg-background flex items-center justify-center border-4 border-muted group-hover:border-primary/20 transition-colors shadow-sm">
                                <Gavel className="h-10 w-10 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">{t('how.step2')}</h3>
                                <p className="text-sm text-muted-foreground mt-2">{t('how.step2_desc')}</p>
                            </div>
                        </div>

                        <div className="space-y-4 relative z-10 group">
                            <div className="h-24 w-24 mx-auto rounded-full bg-background flex items-center justify-center border-4 border-muted group-hover:border-primary/20 transition-colors shadow-sm">
                                <Trophy className="h-10 w-10 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">{t('how.step3')}</h3>
                                <p className="text-sm text-muted-foreground mt-2">{t('how.step3_desc')}</p>
                            </div>
                        </div>

                        <div className="space-y-4 relative z-10 group">
                            <div className="h-24 w-24 mx-auto rounded-full bg-background flex items-center justify-center border-4 border-muted group-hover:border-primary/20 transition-colors shadow-sm">
                                <Key className="h-10 w-10 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">{t('how.step4')}</h3>
                                <p className="text-sm text-muted-foreground mt-2">{t('how.step4_desc')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Type d'actifs + CTA - Grey Background */}
            <section className="py-20 bg-muted/10">
                <div className="container mx-auto px-4 max-w-4xl text-center space-y-16">
                    <div>
                        <h2 className="text-3xl font-bold mb-12">{t('assets.title')}</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="flex flex-col items-center p-6 bg-background rounded-xl shadow-sm hover:shadow-md transition-all cursor-default">
                                <Globe className="h-8 w-8 text-primary mb-4" />
                                <span className="font-semibold">SaaS</span>
                            </div>
                            <div className="flex flex-col items-center p-6 bg-background rounded-xl shadow-sm hover:shadow-md transition-all cursor-default">
                                <ShoppingBag className="h-8 w-8 text-primary mb-4" />
                                <span className="font-semibold">E-commerce</span>
                            </div>
                            <div className="flex flex-col items-center p-6 bg-background rounded-xl shadow-sm hover:shadow-md transition-all cursor-default">
                                <Smartphone className="h-8 w-8 text-primary mb-4" />
                                <span className="font-semibold">{t('assets.app')}</span>
                            </div>
                            <div className="flex flex-col items-center p-6 bg-background rounded-xl shadow-sm hover:shadow-md transition-all cursor-default">
                                <Zap className="h-8 w-8 text-primary mb-4" />
                                <span className="font-semibold">{t('assets.dnvb')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Final CTA Box */}
                    <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-left shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
                        <div className="space-y-2 relative z-10">
                            <h3 className="text-2xl font-bold">{t('cta.title')}</h3>
                            <p className="text-primary-foreground/80">{t('cta.subtitle')}</p>
                        </div>
                        <Button
                            size="lg"
                            variant="secondary"
                            className="whitespace-nowrap h-12 px-8 relative z-10 font-bold"
                            onClick={handleWhatsAppRedirect}
                        >
                            {t('cta.button')}
                            <Send className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}

