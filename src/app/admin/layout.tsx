import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/')
    }

    // Strict Admin Check
    const ADMIN_EMAILS = ['ibuka.ndjoli@gmail.com', 'admin@tunudrop.com']

    if (!user.email || !ADMIN_EMAILS.includes(user.email)) {
        redirect('/') // Redirect unauthorized users to home
    }

    return (
        <div className="flex min-h-screen flex-col">
            <header className="border-b bg-muted/40 px-6 py-3">
                <div className="flex items-center justify-between">
                    <h1 className="font-bold">TunuDrop Admin</h1>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                </div>
            </header>
            <main className="flex-1 p-6">
                {children}
            </main>
        </div>
    )
}
