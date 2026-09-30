/**
 * Import backup/tickets.json and backup/team_members.json (from export-supabase.mjs) into Firestore.
 * Run: node scripts/import-firestore.mjs
 * Requires .env.local with the NEXT_PUBLIC_FIREBASE_* values.
 * Re-runnable: documents keep their original ids, so re-running overwrites instead of duplicating.
 */
import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, writeBatch } from 'firebase/firestore';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, '..', '.env.local') });

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
});
if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
  console.error('Missing NEXT_PUBLIC_FIREBASE_* values in .env.local');
  process.exit(1);
}
const db = getFirestore(app);

const load = (name) => JSON.parse(readFileSync(resolve(__dirname, '..', 'backup', `${name}.json`), 'utf8'));
const iso = (v) => (v ? new Date(v).toISOString() : new Date().toISOString());

const toTicket = (t) => ({
  title: t.title,
  portfolio: t.portfolio,
  pointOfContact: t.point_of_contact,
  graphicTypes: t.graphic_types || [],
  otherGraphicType: t.other_graphic_type || null,
  eventName: t.event_name,
  eventDate: t.event_date || null,
  eventTime: t.event_time || null,
  eventLocation: t.event_location || null,
  deadline: t.deadline,
  summary: t.summary,
  creativeVision: t.creative_vision,
  references: t.reference_urls || [],
  additionalRequests: t.additional_requests || null,
  status: t.status,
  priority: t.priority,
  createdAt: iso(t.created_at),
  updatedAt: iso(t.updated_at),
  createdBy: t.created_by,
  assignedTo: t.assigned_to || null,
  isOnBoard: !!t.is_on_board,
});

async function writeAll(collectionName, rows, map) {
  // Firestore batches are limited to 500 writes
  for (let i = 0; i < rows.length; i += 400) {
    const batch = writeBatch(db);
    rows.slice(i, i + 400).forEach((r) => batch.set(doc(db, collectionName, r.id), map(r)));
    await batch.commit();
  }
  console.log(`${collectionName}: ${rows.length} documents written`);
}

await writeAll('tickets', load('tickets'), toTicket);
await writeAll('team_members', load('team_members'), (m) => ({ name: m.name, createdAt: iso(m.created_at) }));
process.exit(0);
