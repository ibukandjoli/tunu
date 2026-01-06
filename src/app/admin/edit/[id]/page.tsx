import { createClient } from '@/lib/supabase/server'
import { AuctionForm } from '@/components/admin/AuctionForm'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function EditAuctionPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params
    const supabase = await createClient()
    const { data: auction } = await supabase
        .from('auctions')
        .select('*')
        .eq('id', params.id)
        .single()

    if (!auction) {
        notFound()
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-20">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Modifier l'Enchère</h2>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <span>{auction.title}</span>
                    <span className="text-xs font-mono bg-secondary px-2 py-0.5 rounded">{auction.id}</span>
                </div>
            </div>

            <AuctionForm mode="edit" initialData={auction} />
        </div>
    )
}
