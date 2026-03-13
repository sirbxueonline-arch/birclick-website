-- Run this in your Supabase SQL editor to set up the waitlist table

create table if not exists public.waitlist (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  created_at  timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.waitlist enable row level security;

-- Only allow inserts via the service role key (API route)
-- No direct client access needed
create policy "Service role insert only"
  on public.waitlist
  for insert
  to service_role
  with check (true);

-- Index for faster duplicate checks
create index if not exists waitlist_email_idx on public.waitlist (email);
