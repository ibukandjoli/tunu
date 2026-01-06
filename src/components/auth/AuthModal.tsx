'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Loader2, Mail, Lock } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export function AuthModal({ children }: { children?: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const [step, setStep] = useState<'email' | 'otp'>('email')
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')

    const supabase = createClient()
    const { t } = useLanguage()

    async function handleSendOtp(e: React.FormEvent) {
        e.preventDefault()
        setIsLoading(true)

        try {
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    shouldCreateUser: true,
                    // Note: Supabase sends a Magic Link by default. 
                    // To customize this to a Code template, the User must edit the email template in Supabase Dashboard.
                }
            })

            if (error) throw error

            setStep('otp')
            toast.success(t('login.sent'), {
                description: t('login.check_email'),
            })
        } catch (error) {
            toast.error('Error', {
                description: (error as Error).message
            })
        } finally {
            setIsLoading(false)
        }
    }

    async function handleVerifyOtp(e: React.FormEvent) {
        e.preventDefault()
        setIsLoading(true)

        try {
            const { error } = await supabase.auth.verifyOtp({
                email,
                token: otp,
                type: 'email'
            })

            if (error) throw error

            toast.success(t('auth.welcome'))
            setIsOpen(false)
            router.refresh() // Refresh Next.js server components without full reload
        } catch (error) {
            toast.error(t('auth.invalid_code'), {
                description: t('auth.check_code')
            })
        } finally {
            setIsLoading(false)
        }
    }

    const reset = () => {
        setStep('email')
        setOtp('')
        setIsLoading(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={(val) => {
            setIsOpen(val)
            if (!val) setTimeout(reset, 200)
        }}>
            <DialogTrigger asChild>
                {children || <Button variant="outline">{t('nav.login')}</Button>}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{step === 'email' ? t('login.title') : t('auth.verify_title')}</DialogTitle>
                    <DialogDescription>
                        {step === 'email'
                            ? t('login.desc')
                            : `${t('auth.verify_desc_start')} ${email}.`
                        }
                    </DialogDescription>
                </DialogHeader>

                {step === 'email' ? (
                    <form onSubmit={handleSendOtp} className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    required
                                    className="pl-9"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            {t('login.send')}
                        </Button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp} className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="otp">{t('auth.code_label')}</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="otp"
                                    type="text"
                                    placeholder="12345678"
                                    required
                                    className="pl-9 text-lg tracking-widest font-mono"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    maxLength={8}
                                />
                            </div>
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            {t('auth.verify_btn')}
                        </Button>
                        <Button variant="ghost" className="w-full" onClick={() => setStep('email')} type="button">
                            {t('auth.change_email')}
                        </Button>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    )
}
