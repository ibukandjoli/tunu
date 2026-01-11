'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { HandCoins } from 'lucide-react'

interface MakeOfferModalProps {
    auctionId: string
    auctionTitle: string
}

export function MakeOfferModal({ auctionId, auctionTitle }: MakeOfferModalProps) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [amount, setAmount] = useState('')
    const [contact, setContact] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const supabase = createClient()
            const { error } = await supabase
                .from('offers')
                .insert({
                    auction_id: auctionId,
                    amount: parseFloat(amount),

                    // "contact_info": `${contact} | Note: ${message}`
                    contact_info: message ? `${contact} (Note: ${message})` : contact
                })

            if (error) throw error

            toast.success("Proposition envoyée avec succès !", {
                description: "Nous reviendrons vers vous très rapidement."
            })
            setOpen(false)
            setAmount('')
            setContact('')
            setMessage('')
        } catch (error) {
            console.error('Error submitting offer:', error)
            toast.error("Erreur lors de l'envoi", {
                description: "Veuillez réessayer plus tard."
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full gap-2 border-primary/20 hover:bg-primary/5">
                    <HandCoins className="w-4 h-4" />
                    Faire une proposition
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Faire une offre</DialogTitle>
                    <DialogDescription>
                        Proposez un prix pour <strong>{auctionTitle}</strong>. Si votre offre est pertinente, nous vous recontacterons.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="amount">Votre Prix (€)</Label>
                        <Input
                            id="amount"
                            type="number"
                            placeholder="ex: 5000"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            min={1}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="contact">Email ou WhatsApp</Label>
                        <Input
                            id="contact"
                            placeholder="votre@email.com ou +221..."
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="message">Message (Optionnel)</Label>
                        <Textarea
                            id="message"
                            placeholder="Une précision sur votre offre ?"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Envoi..." : "Envoyer ma proposition"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
