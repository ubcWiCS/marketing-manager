import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = !!(
  supabaseUrl &&
  supabaseUrl !== 'your-project-url-here' &&
  supabaseUrl !== 'your-project-url' &&
  (supabaseUrl.startsWith('http://') || supabaseUrl.startsWith('https://')) &&
  supabaseAnonKey &&
  supabaseAnonKey !== 'your-anon-key-here' &&
  supabaseAnonKey !== 'your-anon-key'
);

// A safe fallback proxy that prevents crashes if any Supabase queries are attempted
// when the credentials are not configured.
const dummyClient: any = new Proxy(() => dummyClient, {
  get(target, prop) {
    if (prop === 'then') {
      return (resolve: any) => resolve({ data: null, error: new Error("Supabase is not configured. Please check your .env.local file.") });
    }
    return dummyClient;
  },
  apply() {
    return dummyClient;
  }
});

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : dummyClient;

export default supabase;

