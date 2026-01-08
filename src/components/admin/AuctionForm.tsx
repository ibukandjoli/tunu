'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import { Loader2, Upload, Eye, PenLine } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
    title: z.string().min(2, "Le titre est requis"),
    slug: z.string().min(2, "Le slug est requis"),
    summary: z.string().min(10, "Le résumé est trop court"),
    description: z.string().min(10, "La description est trop courte"),
    start_price: z.coerce.number().min(1),
    min_increment: z.coerce.number().min(1),
    ends_at: z.string(),
    image_url: z.string().optional().or(z.literal('')),
    demo_url: z.string().url("URL invalide").optional().or(z.literal('')),
    revenue_ltm: z.coerce.number().optional(),
    net_margin: z.coerce.number().optional().nullable(),
    monetization_details: z.string().optional(),
    stack_tags: z.string().optional(),
    project_type: z.string().optional(),
    creator_name: z.string().optional(),
    project_status: z.string().optional(),
    status: z.enum(['active', 'draft', 'sold', 'cancelled']).default('draft'),
})

type AuctionFormValues = z.infer<typeof formSchema>

interface AuctionFormProps {
    initialData?: any
    mode: 'create' | 'edit'
}

export function AuctionForm({ initialData, mode }: AuctionFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const supabase = createClient()

    // Default values logic
    const defaultValues: Partial<AuctionFormValues> = {
        title: initialData?.title || '',
        slug: initialData?.slug || '',
        summary: initialData?.summary || '',
        description: initialData?.description || '',
        start_price: initialData?.start_price || 1000,
        min_increment: initialData?.min_increment || 50,
        ends_at: initialData?.ends_at ? new Date(initialData.ends_at).toISOString().slice(0, 16) : '',
        image_url: initialData?.image_url || '',
        demo_url: initialData?.demo_url || '',
        revenue_ltm: initialData?.revenue_ltm || 0,
        net_margin: initialData?.net_margin || 0,
        monetization_details: initialData?.monetization_details || '',
        stack_tags: initialData?.stack_tags ? initialData.stack_tags.join(', ') : '',
        project_type: initialData?.project_type || 'SaaS',
        creator_name: initialData?.creator_name || 'Ibuka Ndjoli',
        project_status: initialData?.project_status || 'Live',
        status: initialData?.status || 'draft',
    }

    const form = useForm<AuctionFormValues>({
        resolver: zodResolver(formSchema) as any,
        defaultValues,
    })

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return

        setIsUploading(true)
        const file = e.target.files[0]
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`
        const filePath = `${fileName}`

        try {
            const { error: uploadError } = await supabase.storage
                .from('auction-images')
                .upload(filePath, file)

            if (uploadError) throw uploadError

            const { data: { publicUrl } } = supabase.storage
                .from('auction-images')
                .getPublicUrl(filePath)

            form.setValue('image_url', publicUrl)
            toast.success("Image téléchargée avec succès")
        } catch (error) {
            console.error(error)
            toast.error("Erreur lors de l'envoi de l'image")
        } finally {
            setIsUploading(false)
        }
    }

    async function onSubmit(values: AuctionFormValues) {
        setIsLoading(true)
        try {
            const tagsArray = values.stack_tags
                ? values.stack_tags.split(',').map(tag => tag.trim()).filter(t => t.length > 0)
                : []

            const payload = {
                title: values.title,
                slug: values.slug,
                summary: values.summary,
                description: values.description,
                start_price: values.start_price,
                // Only set current_price on creation, don't overwrite on edit unless logic requires
                ...(mode === 'create' ? { current_price: values.start_price } : {}),
                min_increment: values.min_increment,
                ends_at: new Date(values.ends_at).toISOString(),
                image_url: values.image_url || null,
                demo_url: values.demo_url || null,
                revenue_ltm: values.revenue_ltm || 0,
                net_margin: values.net_margin,
                monetization_details: values.monetization_details || null,
                stack_tags: tagsArray,
                project_type: values.project_type,
                creator_name: values.creator_name,
                project_status: values.project_status,
                status: values.status,
            }

            let error;
            if (mode === 'create') {
                const { error: insertError } = await supabase.from('auctions').insert(payload)
                error = insertError
            } else {
                const { error: updateError } = await supabase
                    .from('auctions')
                    .update(payload)
                    .eq('id', initialData.id)
                error = updateError
            }

            if (error) throw error

            toast.success(mode === 'create' ? 'Enchère créée !' : 'Enchère modifiée !')
            router.push('/admin')
            router.refresh()
        } catch (error) {
            console.error(error)
            toast.error(mode === 'create' ? 'Erreur création' : 'Erreur modification', {
                description: (error as Error).message
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex justify-end gap-4 sticky top-0 bg-background/95 backdrop-blur z-10 py-4 border-b">
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem className="w-[150px]">
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Statut" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="draft">Brouillon</SelectItem>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="sold">Vendue</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {mode === 'create' ? 'Publier / Sauvegarder' : 'Mettre à jour'}
                    </Button>
                    {mode === 'edit' && (
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={async () => {
                                if (confirm('Êtes-vous sûr de vouloir supprimer cette enchère ? Cette action est irréversible.')) {
                                    setIsLoading(true)
                                    const { error } = await supabase.from('auctions').delete().eq('id', initialData.id)
                                    if (error) {
                                        toast.error("Erreur lors de la suppression")
                                    } else {
                                        toast.success("Enchère supprimée")
                                        router.push('/admin')
                                        router.refresh()
                                    }
                                    setIsLoading(false)
                                }
                            }}
                            disabled={isLoading}
                        >
                            Supprimer
                        </Button>
                    )}
                </div>

                <div className="grid gap-6">
                    {/* Basic Info */}
                    <div className="grid gap-4 p-4 border rounded-lg">
                        <h3 className="font-semibold mb-2">Informations Générales</h3>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Titre</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="slug"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Slug</FormLabel>
                                        <FormControl><Input {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="project_type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Type</FormLabel>
                                        <FormControl><Input {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Media & URL */}
                    <div className="grid gap-4 p-4 border rounded-lg">
                        <h3 className="font-semibold mb-2">Médias & Liens</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <FormLabel>Image du Projet</FormLabel>
                                <div className="flex gap-4 items-center">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        disabled={isUploading}
                                    />
                                    {isUploading && <Loader2 className="animate-spin h-4 w-4" />}
                                </div>
                                <FormField
                                    control={form.control}
                                    name="image_url"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl><Input placeholder="URL ou Upload..." {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {form.watch('image_url') && (
                                    <div className="relative w-full aspect-video rounded-md overflow-hidden border">
                                        <img src={form.watch('image_url')} alt="Preview" className="object-cover w-full h-full" />
                                    </div>
                                )}
                            </div>

                            <FormField
                                control={form.control}
                                name="demo_url"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Lien Démo</FormLabel>
                                        <FormControl><Input placeholder="https://..." {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Description - Rich Textish */}
                    <div className="grid gap-4 p-4 border rounded-lg">
                        <h3 className="font-semibold mb-2">Contenu</h3>
                        <FormField
                            control={form.control}
                            name="summary"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Pitch Court</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description Complète (Markdown Supporté)</FormLabel>
                                    <Tabs defaultValue="write" className="w-full">
                                        <TabsList>
                                            <TabsTrigger value="write"><PenLine className="w-4 h-4 mr-2" />Édition</TabsTrigger>
                                            <TabsTrigger value="preview"><Eye className="w-4 h-4 mr-2" />Aperçu</TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="write">
                                            <FormControl>
                                                <Textarea className="h-64 font-mono text-sm leading-relaxed p-4" placeholder="# Titre\n\n**Gras**..." {...field} />
                                            </FormControl>
                                            <p className="text-xs text-muted-foreground mt-2">
                                                Utilisez **gras** pour le gras, # pour les titres, * pour les listes.
                                            </p>
                                        </TabsContent>
                                        <TabsContent value="preview" className="border rounded-md p-4 min-h-[16rem] bg-muted/30">
                                            <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-bold prose-p:my-4 prose-ul:list-disc prose-ul:pl-4">
                                                {/* @ts-ignore */}
                                                <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                                                    {field.value || 'Rien à afficher'}
                                                </ReactMarkdown>
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="stack_tags"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tags (séparés par virgules)</FormLabel>
                                    <FormControl><Input placeholder="React, Node.js..." {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Financials */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                        <FormField
                            control={form.control}
                            name="revenue_ltm"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Revenus (€)</FormLabel>
                                    <FormControl><Input type="number" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="net_margin"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Marge (%)</FormLabel>
                                    <FormControl><Input type="number" {...field} value={field.value ?? ''} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="monetization_details"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel>Business Model (si pas de revenu)</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Auction Settings */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
                        <FormField
                            control={form.control}
                            name="start_price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prix Départ (€)</FormLabel>
                                    <FormControl><Input type="number" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="min_increment"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Incrément (€)</FormLabel>
                                    <FormControl><Input type="number" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="ends_at"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date Fin</FormLabel>
                                    <FormControl><Input type="datetime-local" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            </form>
        </Form>
    )
}
