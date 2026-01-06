-- 1. Ensure Realtime is enabled for tables
alter publication supabase_realtime add table public.auctions;
alter publication supabase_realtime add table public.bids;

-- 2. Set Replica Identity to FULL (Required for UPDATE payloads)
alter table public.auctions replica identity full;
alter table public.bids replica identity full;

-- 3. RLS Policies (CRITICAL for Realtime to send data to Anon users)
-- Enable RLS just to be safe it's on (or harmless if already on)
alter table public.auctions enable row level security;
alter table public.bids enable row level security;

-- Allow EVERYONE to read auctions (needed for Landing Page + Realtime)
drop policy if exists "Enable read access for all users" on public.auctions;
create policy "Enable read access for all users" on public.auctions for select using (true);

-- Allow EVERYONE to read bids (needed for Realtime history)
drop policy if exists "Enable read access for all users" on public.bids;
create policy "Enable read access for all users" on public.bids for select using (true);

-- Allow Authenticated users to INSERT bids
drop policy if exists "Enable insert for authenticated users only" on public.bids;
create policy "Enable insert for authenticated users only" on public.bids for insert with check (auth.role() = 'authenticated');
