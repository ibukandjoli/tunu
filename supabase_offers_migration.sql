-- Create the offers table
create table public.offers (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  auction_id uuid references public.auctions(id) not null,
  amount numeric not null,
  contact_info text not null,
  status text default 'pending' -- pending, accepted, rejected
);

-- Enable Row Level Security (RLS)
alter table public.offers enable row level security;

-- Policies

-- 1. Allow anyone (public) to INSERT an offer
create policy "Enable insert for everyone"
on public.offers for insert
to public
with check (true);

-- 2. Allow Admins (via Service Role or specific logic) to SELECT/VIEW offers
-- Ideally, limit this to admins. For now, since we use Service Role in Admin Panel, 
-- we can either leave it private (no select policy for anon) or create a specific one.
-- The Service Key ignores RLS, so we don't strictly *need* a select policy for the admin page to work if we use the Service Key.
-- However, if we want to confirm insertion worked via client, we might need read access for the user who created it? 
-- Let's keep it simple: Public can INSERT only. Admin (Service Role) can SELECT.
