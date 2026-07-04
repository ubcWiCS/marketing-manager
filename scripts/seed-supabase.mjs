/**
 * Seed script to insert mock data into Supabase
 * Run: node scripts/seed-supabase.mjs
 * 
 * Requires .env.local with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
 */
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials. Make sure .env.local exists with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const tickets = [
  {
    title: "Summer Internships & Adventures Recap",
    portfolio: "Marketing",
    point_of_contact: "Ella Ilan",
    graphic_types: ["Instagram Post", "Instagram Carousel"],
    other_graphic_type: "",
    event_name: "Summer Recap",
    event_time: "12:00 PM",
    event_location: "Instagram",
    summary: "Create a carousel highlighting what our members have been up to over the summer, including internships, research, travel, conferences, and personal achievements before welcoming everyone back for the school year.",
    deadline: "2026-09-03",
    creative_vision: "Bright, fun, scrapbook aesthetic with candid photos, location stickers, and playful typography. Focus on celebrating community and showcasing diverse experiences.",
    reference_urls: [],
    additional_requests: "Collect photos from members by August 28. Include a final slide welcoming everyone back to campus.",
    status: "Open",
    priority: "High",
    created_at: "2026-07-04T10:00:00Z",
    updated_at: "2026-07-04T10:00:00Z",
    created_by: "Ella Ilan",
    is_on_board: false,
  },
  {
    title: "DataFest Recap Post",
    portfolio: "Events",
    point_of_contact: "Ella Ilan",
    graphic_types: ["Instagram Post", "LinkedIn Post"],
    other_graphic_type: "",
    event_name: "DataFest",
    event_time: "5:00 PM",
    event_location: "Online",
    summary: "Create a recap post celebrating our members who participated in DataFest, highlighting team photos, accomplishments, and memorable moments from the competition.",
    deadline: "2026-07-10",
    creative_vision: "Modern, data-inspired graphics with bold typography, event branding, and statistics overlays. Keep it energetic and professional.",
    reference_urls: [],
    additional_requests: "Include team placements if available and tag participating members.",
    status: "Open",
    priority: "Medium",
    created_at: "2026-07-04T10:05:00Z",
    updated_at: "2026-07-04T10:05:00Z",
    created_by: "Ella Ilan",
    is_on_board: false,
  },
  {
    title: "Data Science Meme TikTok #1",
    portfolio: "Marketing",
    point_of_contact: "Ella Ilan",
    graphic_types: ["Instagram Reel/TikTok"],
    other_graphic_type: "",
    event_name: "September Social Content",
    event_time: "6:00 PM",
    event_location: "TikTok",
    summary: "Produce a short, relatable meme TikTok about the realities of being a data science student.",
    deadline: "2026-08-28",
    creative_vision: "Trending audio, fast cuts, self-deprecating humour, captions, and campus footage.",
    reference_urls: [],
    additional_requests: "Aim for under 20 seconds and reuse a trending TikTok format.",
    status: "Open",
    priority: "Low",
    created_at: "2026-07-04T10:10:00Z",
    updated_at: "2026-07-04T10:10:00Z",
    created_by: "Ella Ilan",
    is_on_board: false,
  },
  {
    title: "Data Science Meme TikTok #2",
    portfolio: "Marketing",
    point_of_contact: "Ella Ilan",
    graphic_types: ["Instagram Reel/TikTok"],
    other_graphic_type: "",
    event_name: "September Social Content",
    event_time: "6:00 PM",
    event_location: "TikTok",
    summary: "Create another meme TikTok focused on debugging, Python, or late-night assignment struggles.",
    deadline: "2026-09-04",
    creative_vision: "Highly relatable student humour using a currently trending meme format.",
    reference_urls: [],
    additional_requests: "Keep editing quick and caption-heavy.",
    status: "Open",
    priority: "Low",
    created_at: "2026-07-04T10:15:00Z",
    updated_at: "2026-07-04T10:15:00Z",
    created_by: "Ella Ilan",
    is_on_board: false,
  },
  {
    title: "Data Science Meme TikTok #3",
    portfolio: "Marketing",
    point_of_contact: "Ella Ilan",
    graphic_types: ["Instagram Reel/TikTok"],
    other_graphic_type: "",
    event_name: "September Social Content",
    event_time: "6:00 PM",
    event_location: "TikTok",
    summary: "Produce the final September meme TikTok featuring data science stereotypes, imposter syndrome, or SQL jokes.",
    deadline: "2026-09-11",
    creative_vision: "Funny, fast-paced, and highly shareable with a punchline in the last few seconds.",
    reference_urls: [],
    additional_requests: "Encourage engagement with a question in the caption.",
    status: "Open",
    priority: "Low",
    created_at: "2026-07-04T10:20:00Z",
    updated_at: "2026-07-04T10:20:00Z",
    created_by: "Ella Ilan",
    is_on_board: false,
  },
  {
    title: "Meet the Team Campaign",
    portfolio: "Marketing",
    point_of_contact: "Ella Ilan",
    graphic_types: ["Instagram Carousel", "Instagram Story"],
    other_graphic_type: "",
    event_name: "Meet the Team",
    event_time: "12:00 PM",
    event_location: "Instagram",
    summary: "Design a carousel introducing this year's executive team with photos, roles, fun facts, and what each person is excited about this year.",
    deadline: "2026-09-08",
    creative_vision: "Consistent branded template with clean layouts, playful icons, and a welcoming tone. Feature each executive on their own slide.",
    reference_urls: [],
    additional_requests: "Collect headshots and fun facts from all executives before design begins.",
    status: "Open",
    priority: "High",
    created_at: "2026-07-04T10:25:00Z",
    updated_at: "2026-07-04T10:25:00Z",
    created_by: "Ella Ilan",
    is_on_board: false,
  },
];

async function seed() {
  console.log('Seeding Supabase with mock tickets...');
  
  const { data, error } = await supabase
    .from('tickets')
    .insert(tickets);

  if (error) {
    console.error('Error seeding tickets:', error.message);
    process.exit(1);
  }

  console.log(`Successfully seeded ${tickets.length} tickets!`);
}

seed();