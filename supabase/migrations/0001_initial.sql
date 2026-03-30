create table if not exists cities (
  id bigint generated always as identity primary key,
  slug text unique not null,
  name text not null,
  region text not null,
  summary text,
  verification_date date,
  is_published boolean default false
);

create table if not exists services (
  id bigint generated always as identity primary key,
  slug text unique not null,
  name text not null,
  category text not null,
  summary text,
  generic_steps jsonb default '[]'::jsonb,
  is_published boolean default false
);

create table if not exists offices (
  id bigint generated always as identity primary key,
  city_id bigint references cities(id) on delete cascade,
  slug text unique not null,
  name text not null,
  district text,
  office_type text not null,
  address text,
  maps_url text,
  verification_date date,
  is_published boolean default false
);

create table if not exists city_services (
  id bigint generated always as identity primary key,
  city_id bigint references cities(id) on delete cascade,
  service_id bigint references services(id) on delete cascade,
  summary text,
  required_docs jsonb default '[]'::jsonb,
  fees_note text,
  delay_note text,
  online_links jsonb default '[]'::jsonb,
  fallback_note text,
  verification_date date,
  is_published boolean default false,
  unique(city_id, service_id)
);

create table if not exists office_services (
  office_id bigint references offices(id) on delete cascade,
  service_id bigint references services(id) on delete cascade,
  priority_rank int default 100,
  primary key (office_id, service_id)
);

create table if not exists form_submissions (
  id uuid primary key default gen_random_uuid(),
  form_type text not null,
  payload_json jsonb not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);
