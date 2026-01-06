import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, MessageCircle } from 'lucide-react'

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-2xl">
            <h1 className="text-3xl font-bold text-center mb-12">Contactez-nous</h1>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Mail className="h-5 w-5" />
                            Email
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            Pour toute question sur une enchère, un paiement ou un partenariat.
                        </p>
                        <a href="mailto:hello@tunudrop.com" className="font-medium text-primary hover:underline">
                            hello@tunudrop.com
                        </a>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MessageCircle className="h-5 w-5" />
                            WhatsApp
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            Une question urgente ou besoin d'assistance immédiate ?
                        </p>
                        <Button asChild className="w-full sm:w-auto">
                            <a href="https://wa.me/221781362728" target="_blank" rel="noopener noreferrer">
                                Discuter sur WhatsApp
                            </a>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
