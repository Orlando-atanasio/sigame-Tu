import { createClient } from '@supabase/supabase-js';

const env = (import.meta as any).env;

const supabaseUrl = env.VITE_SUPABASE_URL || 'https://MISSING.supabase.co';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || 'MISSING';

if (supabaseUrl.includes('MISSING')) {
  console.error('Supabase URL is missing! Ensure VITE_SUPABASE_URL is set in Vercel.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
