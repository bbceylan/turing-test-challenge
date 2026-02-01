import { createClient } from '@supabase/supabase-js';

// These should be replaced with actual environment variables
const SUPABASE_URL = 'https://placeholder-project.supabase.co'; // Must be valid URL format
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder'; // Dummy JWT format

const isPlaceholder = SUPABASE_URL === 'https://placeholder-project.supabase.co';

export const supabase = createClient(
    isPlaceholder ? 'https://example.supabase.co' : SUPABASE_URL,
    isPlaceholder ? 'placeholder' : SUPABASE_ANON_KEY
);
