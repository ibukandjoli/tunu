import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Eye, Pencil } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
    const supabase = await createClient()
    const { data: auctions } = await supabase
        .from('auctions')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Tableau de Bord Admin</h2>
                <Button asChild>
                    <Link href="/admin/create">Créer une Enchère</Link>
                </Button>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Titre</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead>Enchère Actuelle</TableHead>
                            <TableHead>Fin</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {auctions?.map((auction) => (
                            <TableRow key={auction.id}>
                                <TableCell className="font-medium">
                                    <div className="flex flex-col">
                                        <span>{auction.title}</span>
                                        <span className="text-xs text-muted-foreground">{auction.slug}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={auction.status === 'active' ? 'default' : 'secondary'}>
                                        {auction.status === 'active' ? 'En cours' : auction.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(auction.current_price)}</TableCell>
                                <TableCell>{new Date(auction.ends_at).toLocaleString('fr-FR')}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button variant="ghost" size="icon" asChild>
                                        <Link href={`/?auction=${auction.slug}`} target="_blank">
                                            <Eye className="w-4 h-4" />
                                        </Link>
                                    </Button>
                                    <Button variant="ghost" size="icon" asChild>
                                        <Link href={`/admin/edit/${auction.id}`}>
                                            <Pencil className="w-4 h-4" />
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {!auctions?.length && (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    Aucune enchère trouvée.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
