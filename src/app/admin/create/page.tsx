'use client'

import { AuctionForm } from '@/components/admin/AuctionForm'

export default function CreateAuctionPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-20">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Créer un nouveau Drop</h2>
                <p className="text-muted-foreground">Configurer l'enchère quotidienne.</p>
            </div>

            <AuctionForm mode="create" />
        </div>
    )
}
