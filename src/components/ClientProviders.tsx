'use client'

import { LanguageProvider } from '@/lib/i18n/LanguageContext'

export function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <LanguageProvider>
            {children}
        </LanguageProvider>
    )
}
