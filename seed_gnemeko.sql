-- INSERT GNEME KO AUCTION 001
-- Assumes User wants to start straight away. Status 'active'.
-- End Date: 2026-01-07 12:00:00 (Assuming User meant 2026, or wants it to run until Jan 7th of current/next year)

INSERT INTO public.auctions (
    title,
    slug,
    summary,
    description,
    start_price,
    current_price,
    min_increment,
    starts_at,
    ends_at,
    status,
    image_url
) VALUES (
    'Gnémé Ko - Plateforme de Goal-Setting & Paris Sociaux',
    'gneme-ko',
    'Le Concept : La 1ère plateforme en Afrique qui permet aux utilisateurs de miser sur leur propre réussite.',
    '**Le Concept :** La 1ère plateforme en Afrique qui permet aux utilisateurs de miser sur leur propre réussite. S''ils échouent, ils perdent leur mise. S''ils réussissent, ils la récupèrent. La plateforme prend 10% de frais de service.

**Les Points Forts :**
* 🚀 **Prêt à l''emploi :** Site live sur gnemeko.com
* 🤖 **Boosté à l''IA :** Intégration de Google Gemini 2.0 pour l''analyse des preuves.
* 💸 **Business Model Validé :** Système de commission (10%) intégré.

**Ce que vous achetez :**
* Le Code Source complet (GitHub) - Propriété intellectuelle totale.
* Le transfert du domaine et de l''hébergement Vercel.
* La base de données Supabase configurée.

Stack Tags : ["Next.js 14", "TypeScript", "Supabase", "Gemini AI", "Tailwind"]',
    1000, -- Start Price
    1000, -- Current Price (starts at this)
    100,  -- Min Increment
    now(),
    '2026-01-07 12:00:00', -- Ends in ~2 days (assuming current year is 2026 based on system time)
    'active',
    '/screenshots/gnemeko.png' -- INSTRUCTION: User to place 'gnemeko.png' in public/screenshots/
);
