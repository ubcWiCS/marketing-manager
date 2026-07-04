// Supabase client initialization
// Note: You need to create a .env.local file with your Supabase credentials
// Run: cp .env.local.example .env.local
// Then add your actual Supabase URL and anon key from your Supabase project settings

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Dynamic import to avoid build errors if package isn't installed yet
let createClient: any;
try {
  const module = require('@supabase/supabase-js');
  createClient = module.createClient;
} catch (e) {
  console.warn('Supabase client not available - run npm install @supabase/supabase-js');
}

export const supabase = createClient 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export default supabase;