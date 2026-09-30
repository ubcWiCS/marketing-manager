/**
 * One-off export of Supabase tables to backup/*.json (plain REST, no SDK needed).
 * Run: node scripts/export-supabase.mjs
 * Requires .env.local with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
 */
import { config } from 'dotenv';
import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, '..', '.env.local') });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!url || !/^https?:\/\//.test(url) || !key) {
  console.error('NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY missing or not real values in .env.local');
  process.exit(1);
}

const outDir = resolve(__dirname, '..', 'backup');
mkdirSync(outDir, { recursive: true });

for (const table of ['tickets', 'team_members']) {
  const res = await fetch(`${url}/rest/v1/${table}?select=*`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });
  if (!res.ok) {
    console.error(`Failed to export ${table}: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  const data = await res.json();
  writeFileSync(resolve(outDir, `${table}.json`), JSON.stringify(data, null, 2));
  console.log(`${table}: ${data.length} rows`);
}
