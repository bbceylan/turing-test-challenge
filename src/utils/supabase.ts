import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://idhpvkckcsuocwvviiie.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_vmNAxjHT1y3mLUMeOZOrnw_4XXmK6Zp';

// iOS Google OAuth Client ID: 800000881598-2m7hbnlagqgp9637e7oa652uq0936n33.apps.googleusercontent.com
// Add this to Supabase Dashboard → Authentication → Providers → Google → Client IDs

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

