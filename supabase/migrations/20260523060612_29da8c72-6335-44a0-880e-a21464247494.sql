
-- Attach trigger so first signup becomes admin (function already exists)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Pre-authorize the fixed admin email so writes succeed immediately after signup
INSERT INTO public.admin_users (email)
VALUES ('admin@msk-asfalt.local')
ON CONFLICT (email) DO NOTHING;
