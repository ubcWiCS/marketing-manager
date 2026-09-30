# Firebase Setup Guide

1. Go to https://console.firebase.google.com and create a project (free Spark plan, no card needed).
2. **Build > Firestore Database > Create database** (production mode, pick the closest region).
3. **Project settings > General > Your apps > Web (`</>`)**: register an app and copy the config values.
4. Copy `.env.local.example` to `.env.local` and fill in the `NEXT_PUBLIC_FIREBASE_*` values.
5. **Firestore > Rules**: paste the contents of `firestore.rules` and publish.
   These rules are open (same as the old Supabase setup). Tighten them before storing anything sensitive.
6. (Optional) Migrate existing data:
   ```bash
   node scripts/export-supabase.mjs   # needs real Supabase values in .env.local
   node scripts/import-firestore.mjs  # writes backup/*.json into Firestore
   ```

Collections are created automatically on first write: `tickets` and `team_members`.
