'use client'

import { useLanguage } from '@/lib/i18n/LanguageContext'
import { User } from '@supabase/supabase-js'
import { AuthModal } from '@/components/auth/AuthModal'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface HeaderProps {
    user: User | null
}

export function Header({ user }: HeaderProps) {
    const { t, language, setLanguage } = useLanguage()

    return (
        <nav className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-6">
                    <span className="font-extrabold text-2xl tracking-tighter">TUNU.</span>
                </Link>

                <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded-md overflow-hidden">
                        <button
                            onClick={() => setLanguage('fr')}
                            className={`px-3 py-1 text-xs font-bold cursor-pointer transition-colors ${language === 'fr' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                        >
                            {t('nav.fr')}
                        </button>
                        <button
                            onClick={() => setLanguage('en')}
                            className={`px-3 py-1 text-xs font-bold cursor-pointer transition-colors ${language === 'en' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                        >
                            {t('nav.en')}
                        </button>
                    </div>

                    {user ? (
                        <div className="text-sm font-medium hidden md:block">
                            {user.email}
                        </div>
                    ) : (
                        <AuthModal>
                            <Button size="sm">{t('nav.login')}</Button>
                        </AuthModal>
                    )}
                </div>
            </div>
        </nav>
    )
}
