-- Supabase Database Schema for Portfolio Manager
-- Run this SQL in your Supabase project's SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tickets table
CREATE TABLE IF NOT EXISTS tickets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  portfolio TEXT NOT NULL,
  point_of_contact TEXT NOT NULL,
  graphic_types TEXT[] NOT NULL,
  other_graphic_type TEXT,
  event_name TEXT NOT NULL,
  event_time TEXT,
  event_location TEXT,
  deadline DATE NOT NULL,
  summary TEXT NOT NULL,
  creative_vision TEXT NOT NULL,
  reference_urls TEXT[] DEFAULT '{}',
  additional_requests TEXT,
  status TEXT DEFAULT 'Open' CHECK (status IN ('Open', 'In Progress', 'In Review', 'Completed', 'Archived')),
  priority TEXT DEFAULT 'Medium' CHECK (priority IN ('Low', 'Medium', 'High', 'Urgent')),
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
  created_by TEXT NOT NULL,
  assigned_to TEXT,
  is_on_board BOOLEAN DEFAULT FALSE
);

-- Team members table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status);
CREATE INDEX IF NOT EXISTS idx_tickets_portfolio ON tickets(portfolio);
CREATE INDEX IF NOT EXISTS idx_tickets_created_at ON tickets(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tickets_is_on_board ON tickets(is_on_board);

-- Enable Row Level Security
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Create policies (allowing all operations for now - add authentication later)
CREATE POLICY "Allow all operations on tickets" ON tickets
  FOR ALL USING (true);

CREATE POLICY "Allow all operations on team_members" ON team_members
  FOR ALL USING (true);

-- Insert default team members
INSERT INTO team_members (name) VALUES
  ('Raisa'),
  ('Angelina'),
  ('Grace'),
  ('Selima'),
  ('Olivia'),
  ('Emily'),
  ('Giorgia')
ON CONFLICT (name) DO NOTHING;

-- Insert sample tickets (optional - remove if you don't want sample data)
INSERT INTO tickets (
  title, portfolio, point_of_contact, graphic_types, event_name, 
  deadline, summary, creative_vision, status, priority, created_by
) VALUES (
  'Fall Recruitment Instagram Campaign',
  'Marketing',
  'Sarah Chen',
  ARRAY['Instagram Post', 'Instagram Story'],
  'Fall 2025 Recruitment',
  '2025-08-31',
  'Need a series of Instagram posts and stories to promote our fall recruitment event.',
  'Warm, inviting colors with organization branding. Include event date, time, and QR code.',
  'In Progress',
  'High',
  'Sarah Chen'
) ON CONFLICT DO NOTHING;