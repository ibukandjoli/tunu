-- Enable insert/update for specific admin email (or all authenticated for now to unblock)
-- Drops existing restrictive policies if any (optional, but safer to add new ones)

DROP POLICY IF EXISTS "Enable insert for admins" ON public.auctions;
DROP POLICY IF EXISTS "Enable update for admins" ON public.auctions;

CREATE POLICY "Enable insert for admins"
ON public.auctions
FOR INSERT
TO authenticated
WITH CHECK (auth.email() = 'ibuka.ndjoli@gmail.com');

CREATE POLICY "Enable update for admins"
ON public.auctions
FOR UPDATE
TO authenticated
USING (auth.email() = 'ibuka.ndjoli@gmail.com')
WITH CHECK (auth.email() = 'ibuka.ndjoli@gmail.com');

-- Ensure storage bucket exists for auction images
INSERT INTO storage.buckets (id, name, public)
VALUES ('auction-images', 'auction-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Public Access"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'auction-images');

CREATE POLICY "Admin Upload"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'auction-images' AND auth.email() = 'ibuka.ndjoli@gmail.com');
