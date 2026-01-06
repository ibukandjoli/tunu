-- Add missing columns for V4 logic
ALTER TABLE public.auctions 
ADD COLUMN IF NOT EXISTS revenue_ltm numeric default 0,
ADD COLUMN IF NOT EXISTS monetization_details text,
ADD COLUMN IF NOT EXISTS demo_url text,
ADD COLUMN IF NOT EXISTS stack_tags text[] default '{}';

-- Update Gnémé Ko Entry with correct data
UPDATE public.auctions
SET 
    revenue_ltm = 0,
    monetization_details = 'Commission: 10% sur chaque pari.',
    demo_url = 'https://gnemeko.com',
    stack_tags = ARRAY['Next.js 14', 'TypeScript', 'Supabase', 'Gemini AI', 'Tailwind'],
    image_url = '/screenshots/gnemeko.png' -- Ensure this matches exactly where user put it
WHERE slug = 'gneme-ko';
