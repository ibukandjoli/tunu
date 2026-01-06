-- Add columns for Badges
ALTER TABLE public.auctions
ADD COLUMN IF NOT EXISTS project_type text default 'SaaS',
ADD COLUMN IF NOT EXISTS creator_name text default 'Tunu Team',
ADD COLUMN IF NOT EXISTS project_status text default 'Live';

-- Update Gnémé Ko Entry
UPDATE public.auctions
SET
    project_type = 'App Web',
    creator_name = 'Ibuka Ndjoli',
    project_status = 'Prêt au Lancement',
    -- Note: Removed Stack Tags line, fixed 'acquérez' -> 'acquerrez', added double newlines for spacing
    description = '**Le Concept :** La 1ère plateforme en Afrique qui permet aux utilisateurs de miser sur leur propre réussite. S''ils échouent, ils perdent leur mise. S''ils réussissent, ils la récupèrent. La plateforme prend 10% de frais de service.

**Les Points Forts :**
* 🚀 **Prêt à l''emploi :** Site live sur gnemeko.com
* 🤖 **Boosté à l''IA :** Intégration de Google Gemini 2.0 pour l''analyse des preuves.
* 💸 **Business Model Validé :** Système de commission (10%) intégré.

**Ce que vous acquerrez :**
* Le Code Source complet (GitHub) - Propriété intellectuelle totale.
* Le transfert du domaine et de l''hébergement Vercel.
* La base de données Supabase configurée.'
WHERE slug = 'gneme-ko';
