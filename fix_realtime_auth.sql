-- FIX TRIGGER USERNAME & REPLICA IDENTITY

-- 1. Mettre REPLICA IDENTITY à FULL pour Supabase Realtime (Fix Update broadcast)
alter table public.auctions replica identity full;

-- 2. Update Random Username logic
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  random_suffix int;
begin
  random_suffix := floor(random() * (9999 - 1000 + 1) + 1000);
  
  insert into public.profiles (id, username, avatar_url)
  values (
    new.id,
    -- Generate Bidder-XXXX if no username provided
    coalesce(new.raw_user_meta_data->>'username', 'Bidder-' || random_suffix::text),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;
