-- Row Level Security policies for Qriba v1
-- Apply after 0001_initial.sql

-- Enable RLS on all tables
alter table cities enable row level security;
alter table services enable row level security;
alter table offices enable row level security;
alter table city_services enable row level security;
alter table office_services enable row level security;
alter table form_submissions enable row level security;

-- ── Public read-only access for content tables ────────────────────────────────
-- Anon key can read published rows only.

create policy "public_read_cities"
  on cities for select
  using (is_published = true);

create policy "public_read_services"
  on services for select
  using (is_published = true);

create policy "public_read_offices"
  on offices for select
  using (is_published = true);

create policy "public_read_city_services"
  on city_services for select
  using (is_published = true);

create policy "public_read_office_services"
  on office_services for select
  using (true);

-- ── Form submissions: insert only, no read ────────────────────────────────────
-- Anon key can insert new submissions but cannot read any row.

create policy "public_insert_form_submissions"
  on form_submissions for insert
  with check (true);

-- No select policy on form_submissions → anon cannot read any submissions.

-- ── Service-role bypass (admin use) ──────────────────────────────────────────
-- The service_role key bypasses RLS by default in Supabase — no extra policy needed.
