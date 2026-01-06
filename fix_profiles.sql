-- 1. FIX TRIGGER & FUNCTION
-- Assure-toi que cette fonction est bien definie
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username, avatar_url)
  values (
    new.id,
    -- Fallback si pas de username dans les metadata
    coalesce(new.raw_user_meta_data->>'username', 'User ' || substr(new.id::text, 1, 6)),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing; -- Evite les erreurs si deja existant
  return new;
end;
$$;

-- Recréer le trigger proprement
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. REPARATION DES DONNÉES EXISTANTES (Fix immediat pour ton bug)
-- Insère une ligne dans profiles pour tous les users existants qui n'en ont pas
insert into public.profiles (id, username)
select 
  id, 
  coalesce(raw_user_meta_data->>'username', 'User ' || substr(id::text, 1, 6))
from auth.users
where id not in (select id from public.profiles);
