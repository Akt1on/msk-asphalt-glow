
-- Table: cms_state (single-row content store)
create table public.cms_state (
  id text primary key default 'main',
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.cms_state enable row level security;

-- Public read
create policy "cms_state public read"
on public.cms_state for select
to anon, authenticated
using (true);

-- Admin allowlist table
create table public.admin_users (
  email text primary key,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

create policy "admin_users self read"
on public.admin_users for select
to authenticated
using (email = (auth.jwt() ->> 'email'));

-- Function: is current user an admin?
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users
    where email = (auth.jwt() ->> 'email')
  );
$$;

-- Write policies for cms_state: admins only
create policy "cms_state admin insert"
on public.cms_state for insert
to authenticated
with check (public.is_admin());

create policy "cms_state admin update"
on public.cms_state for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "cms_state admin delete"
on public.cms_state for delete
to authenticated
using (public.is_admin());

-- Bootstrap: seed first admin (the first user to sign up becomes admin
-- if admin_users is empty). We handle this with a trigger on auth.users.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (select 1 from public.admin_users) then
    insert into public.admin_users (email) values (new.email);
  end if;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- updated_at trigger
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger cms_state_touch
before update on public.cms_state
for each row execute function public.touch_updated_at();

-- Realtime
alter publication supabase_realtime add table public.cms_state;

-- Seed initial row (empty; client will populate defaults on first load)
insert into public.cms_state (id, data) values ('main', '{}'::jsonb)
on conflict (id) do nothing;

-- Storage bucket for CMS images
insert into storage.buckets (id, name, public)
values ('cms-images', 'cms-images', true)
on conflict (id) do nothing;

create policy "cms-images public read"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'cms-images');

create policy "cms-images admin insert"
on storage.objects for insert
to authenticated
with check (bucket_id = 'cms-images' and public.is_admin());

create policy "cms-images admin update"
on storage.objects for update
to authenticated
using (bucket_id = 'cms-images' and public.is_admin());

create policy "cms-images admin delete"
on storage.objects for delete
to authenticated
using (bucket_id = 'cms-images' and public.is_admin());
