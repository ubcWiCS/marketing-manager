-- This SQL will mark all existing tickets as unassigned
-- Run this in your Supabase SQL Editor

UPDATE tickets
SET assigned_to = NULL
WHERE assigned_to IS NOT NULL;

-- Verify the changes
SELECT id, title, point_of_contact, assigned_to, is_on_board
FROM tickets
WHERE assigned_to IS NOT NULL;