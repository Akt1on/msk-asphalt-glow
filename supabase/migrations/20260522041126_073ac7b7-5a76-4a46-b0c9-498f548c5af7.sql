
-- Tighten function execute
revoke execute on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.touch_updated_at() from public, anon, authenticated;

-- Drop broad listing policy on cms-images; public bucket still serves files
-- by direct public URL (no SELECT on storage.objects needed for public buckets).
drop policy if exists "cms-images public read" on storage.objects;
