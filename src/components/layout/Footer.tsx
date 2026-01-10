'use client'

import Link from 'next/link'

export function Footer() {
    return (
        <footer className="border-t py-12 bg-background mt-auto">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xl tracking-tighter">TUNU.</span>
                    <span className="text-sm text-muted-foreground ml-2">© {new Date().getFullYear()}</span>
                </div>
                <div className="flex gap-6 text-sm text-muted-foreground underline-offset-4">
                    <Link href="/terms" className="hover:underline">CGU</Link>
                    <Link href="/privacy" className="hover:underline">Confidentialité</Link>
                    <Link href="/contact" className="hover:underline">Contact</Link>
                </div>
            </div>
        </footer>
    )
}
