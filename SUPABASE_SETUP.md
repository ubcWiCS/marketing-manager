# Supabase Setup Guide

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in your project details:
   - Name: `portfolio-manager` (or any name you prefer)
   - Database Password: (save this securely)
   - Region: Choose the closest region to you
5. Wait for the project to be created (about 2 minutes)

## Step 2: Get Your Credentials

1. In your Supabase project dashboard, go to **Settings** (gear icon in the left sidebar)
2. Click on **API** in the settings menu
3. You'll find:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **anon public** key: A long string starting with `eyJ...`
4. Copy both of these

## Step 3: Configure Environment Variables

1. Create a `.env.local` file in the root of your project:
   ```bash
   cp .env.local.example .env.local
   ```

2. Open `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your-anon-key-here
   ```

3. Make sure `.env.local` is in your `.gitignore` (it should be by default)

## Step 4: Set Up Database Schema

1. In your Supabase project dashboard, go to **SQL Editor** (in the left sidebar)
2. Click **New Query**
3. Open the file `src/lib/supabase/schema.sql` in this project
4. Copy all the SQL code from that file
5. Paste it into the Supabase SQL Editor
6. Click **Run** (or press Ctrl+Enter)
7. You should see "Success. No rows returned"

This will create:
- `tickets` table with all necessary fields
- `team_members` table
- Indexes for better performance
- Row Level Security policies
- Default team members (Ella, Yolanda, Claire, Amber, Rosie)
- Sample ticket data

## Step 5: Verify Setup

1. Go to **Table Editor** in Supabase dashboard
2. You should see two tables: `tickets` and `team_members`
3. Click on `team_members` - you should see 5 default members
4. Click on `tickets` - you should see 1 sample ticket

## Step 6: Connect Your App

The Supabase client is already configured in `src/lib/supabase/client.ts`. Now you need to:

1. Update the contexts to use Supabase instead of mock data
2. Replace `src/lib/mock-data.ts` imports with Supabase queries
3. Add loading states for async operations

## Next Steps (Coming Up)

I'll now update the code to:
- Replace mock data with real Supabase queries
- Update ticket context to use database operations
- Update team context to use database operations
- Add loading and error states
- Test the connection

## Troubleshooting

**"Module not found" error:**
- Make sure you ran `npm install @supabase/supabase-js @supabase/ssr`
- Try restarting your dev server: `npm run dev`

**"Invalid API key" error:**
- Double-check your `.env.local` file
- Make sure you copied the full anon key (it's very long)
- Restart your dev server after changing `.env.local`

**"Table doesn't exist" error:**
- Make sure you ran the SQL schema in Supabase SQL Editor
- Check for any error messages in the SQL Editor

## Security Notes

- The current setup allows all operations (no authentication)
- For production, you should:
  - Add Supabase Auth
  - Set up proper Row Level Security policies
  - Use service role keys only on the server
  - Never expose service role keys in client-side code

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Next.js Guide](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)
- [Supabase Discord Community](https://discord.supabase.com)