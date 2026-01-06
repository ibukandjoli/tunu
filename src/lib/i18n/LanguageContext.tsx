'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'fr' | 'en'

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const translations = {
    fr: {
        'hero.title': 'Prenez la relève.',
        'hero.subtitle': 'Chaque jour à midi, nous vous offrons une opportunité unique d\'acquérir un projet/business à fort potentiel, prêt à décoller ou qui génère déjà des revenus. Ne partez plus de zéro.',
        'nav.login': 'Connexion',
        'nav.guest': 'Invité',
        'nav.fr': 'FR',
        'nav.en': 'EN',
        'auction.current_bid': 'Enchère en cours',
        'auction.place_bid': 'Enchérir',
        'auction.min_bid': 'Mise minimum',
        'auction.ended': 'ENCHÈRE TERMINÉE',
        'trust.verified': 'Projets Vérifiés',
        'trust.verified_desc': 'Audit complet par TEKKI Studio',
        'trust.transfer': 'Transfert Instantané',
        'trust.transfer_desc': 'Code & Assets en 24h',
        'trust.growth': 'Fort Potentiel',
        'trust.growth_desc': 'Business validés avec traction',
        'login.title': 'Connexion / Inscription',
        'login.desc': 'Entrez votre email pour recevoir un Code de Sécurité.',
        'login.sent': 'Code envoyé !',
        'login.check_email': 'Vérifiez votre email.',
        'login.send': 'Recevoir le code',
        'footer.rights': 'Tous droits réservés.',
        'status.active': 'En cours',
        'status.ended': 'Terminé',
        'status.sold': 'Vendu',
        'how.title': 'Comment ça marche ?',
        'how.step1': 'Connectez-vous',
        'how.step1_desc': 'Accès membre sécurisé.',
        'how.step2': 'Enchérissez',
        'how.step2_desc': 'Placez votre offre.',
        'how.step3': 'Remportez',
        'how.step3_desc': 'L\'offre la plus haute gagne.',
        'how.step4': 'Récupérez',
        'how.step4_desc': 'Transfert des assets en 24h.',
        'assets.title': 'Types d\'actifs',
        'assets.dnvb': 'Marque DNVB',
        'assets.app': 'App Web/Mobile',
        'mission.title': 'Gagnez 12 mois de développement.',
        'mission.desc': 'Pourquoi passer des mois à coder et designer ? Acquérez des fondations solides (Code, Marque, Stratégie) et concentrez-vous sur ce qui compte vraiment : la croissance.',
        'mission.seller': 'Vendre un projet',
        'mission.buyer': 'Acheter un actif',
        'why.title': 'Pourquoi les enchères ?',
        'why.speed': 'Rapidité',
        'why.speed_desc': 'Vente à date fixe. Pas de négociations interminables.',
        'why.price': 'Vrai Prix',
        'why.price_desc': 'Le marché décide de la valeur réelle de l\'actif.',
        'why.transparency': 'Transparence',
        'why.transparency_desc': 'Toutes les offres sont visibles en temps réel.',
        'cta.title': 'Vous souhaitez proposer votre business ?',
        'cta.subtitle': 'Parlez-en à notre équipe pour validation.',
        'cta.button': 'Soumettre mon business',
        'metrics.revenue': 'Revenus (LTM)',
        'metrics.margin': 'Marge Nette',
        'auth.verify_title': 'Entrez le Code',
        'auth.verify_desc_start': 'Code envoyé à',
        'auth.code_label': 'Code de Sécurité',
        'auth.verify_btn': 'Vérifier & Connexion',
        'auth.change_email': 'Changer d\'email',
        'auth.invalid_code': 'Code Invalide',
        'auth.check_code': 'Vérifiez le code et réessayez.',
        'auth.welcome': 'Bon retour !',
    },
    en: {
        'hero.title': 'Take over the legacy.',
        'hero.subtitle': 'Every day at noon, a unique opportunity to acquire a profitable, verified, turnkey business.',
        'nav.login': 'Login',
        'nav.guest': 'Guest',
        'nav.fr': 'FR',
        'nav.en': 'EN',
        'auction.current_bid': 'Current Highest Bid',
        'auction.place_bid': 'Place Bid',
        'auction.min_bid': 'Minimum Bid',
        'auction.ended': 'AUCTION ENDED',
        'trust.verified': 'Verified Asset',
        'trust.verified_desc': 'Full audit by TEKKI Studio',
        'trust.transfer': 'Instant Transfer',
        'trust.transfer_desc': 'Assets in 24h',
        'trust.growth': 'High Growth',
        'trust.growth_desc': 'Validated MRR history',
        'login.title': 'Login / Register',
        'login.desc': 'Enter your email to receive a Security Code.',
        'login.sent': 'Code Sent!',
        'login.check_email': 'Check your email.',
        'login.send': 'Send Code',
        'footer.rights': 'All rights reserved.',
        'status.active': 'Active',
        'status.ended': 'Ended',
        'status.sold': 'Sold',
        'how.title': 'How it works',
        'how.step1': 'Login',
        'how.step1_desc': 'Secure member access.',
        'how.step2': 'Bid',
        'how.step2_desc': 'Place your unique bid.',
        'how.step3': 'Win',
        'how.step3_desc': 'Highest bidder takes it all.',
        'how.step4': 'Acquire',
        'how.step4_desc': 'Asset transfer in 24h.',
        'assets.title': 'Asset Types',
        'assets.dnvb': 'DNVB Brand',
        'assets.app': 'Web/Mobile App',
        'mission.title': 'Accelerate your entrepreneurial journey',
        'mission.desc': 'TUNU connects creators ready to move on with ambitious buyers. Don\'t start from scratch: buy a running business.',
        'mission.seller': 'Sell a project',
        'mission.buyer': 'Buy an asset',
        'why.title': 'Why Auctions?',
        'why.speed': 'Speed',
        'why.speed_desc': 'Fixed date sale. No endless negotiations.',
        'why.price': 'True Price',
        'why.price_desc': 'The market decides the real value.',
        'why.transparency': 'Transparency',
        'why.transparency_desc': 'All bids are visible in real-time.',
        'cta.title': 'Want to sell your business?',
        'cta.subtitle': 'Talk to our team for validation.',
        'cta.button': 'Submit my business',
        'metrics.revenue': 'Revenue (LTM)',
        'metrics.margin': 'Net Margin',
        'auth.verify_title': 'Enter Code',
        'auth.verify_desc_start': 'Code sent to',
        'auth.code_label': 'Security Code',
        'auth.verify_btn': 'Verify & Login',
        'auth.change_email': 'Change Email',
        'auth.invalid_code': 'Invalid Code',
        'auth.check_code': 'Please check code and try again.',
        'auth.welcome': 'Welcome back!',
    }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('fr')

    useEffect(() => {
        const saved = localStorage.getItem('tunu_lang') as Language
        if (saved && (saved === 'fr' || saved === 'en')) {
            setLanguage(saved)
        }
    }, [])

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang)
        localStorage.setItem('tunu_lang', lang)
    }

    const t = (key: string) => {
        return translations[language][key as keyof typeof translations['fr']] || key
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}
