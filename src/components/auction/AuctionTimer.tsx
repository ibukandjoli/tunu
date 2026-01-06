'use client'

import { useEffect, useState } from 'react'
import { intervalToDuration } from 'date-fns'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export function AuctionTimer({ endsAt }: { endsAt: string }) {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())
    const [isMounted, setIsMounted] = useState(false)
    const { t } = useLanguage()

    function calculateTimeLeft() {
        const end = new Date(endsAt)
        const now = new Date()

        if (now >= end) {
            return null
        }

        return intervalToDuration({ start: now, end })
    }

    useEffect(() => {
        setIsMounted(true)
        const timer = setInterval(() => {
            const remaining = calculateTimeLeft()
            setTimeLeft(remaining)
            if (!remaining) clearInterval(timer)
        }, 1000)

        return () => clearInterval(timer)
    }, [endsAt])

    // Hydration fix
    if (!isMounted) return <div className="animate-pulse bg-muted h-10 w-32 rounded"></div>

    if (!timeLeft) {
        return (
            <div className="text-right">
                <p className="text-red-500 font-bold uppercase tracking-wider text-xl leading-none">
                    {t('auction.ended')}
                </p>
            </div>
        )
    }

    // Helper to pad with zero
    const pad = (n?: number) => n?.toString().padStart(2, '0') || '00'

    return (
        <div className="font-mono text-xl sm:text-2xl font-bold tabular-nums tracking-widest text-primary">
            {timeLeft.hours !== undefined && (
                <span>{pad(timeLeft.hours)}<span className="text-muted-foreground font-sans text-sm mx-1">h</span></span>
            )}
            <span>{pad(timeLeft.minutes)}<span className="text-muted-foreground font-sans text-sm mx-1">m</span></span>
            <span>{pad(timeLeft.seconds)}<span className="text-muted-foreground font-sans text-sm mx-1">s</span></span>
        </div>
    )
}
