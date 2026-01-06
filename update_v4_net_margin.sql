-- Add net_margin column (nullable)
ALTER TABLE public.auctions
ADD COLUMN IF NOT EXISTS net_margin numeric;

-- Update Gnémé Ko Entry: Set net_margin to NULL (using Commission model instead)
UPDATE public.auctions
SET net_margin = NULL
WHERE slug = 'gneme-ko';
