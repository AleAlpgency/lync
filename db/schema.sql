-- Member card scans. Run once against DATABASE_URL: psql "$DATABASE_URL" -f db/schema.sql
-- Safe to re-run: tables and partners are only created when missing.

create table if not exists partners (
  id serial primary key,
  name text not null unique,
  -- Staff enter this once on their phone; it tells the scan page which partner is scanning.
  pin text not null unique,
  created_at timestamptz not null default now()
);
-- Partner details (category, deal, online code, order, visibility) are added
-- by db/002-partner-details.sql, which also fills them in for the launch list.

create table if not exists redemptions (
  id serial primary key,
  subscription_id text not null,
  member_name text not null,
  partner_id integer not null references partners(id),
  created_at timestamptz not null default now()
);

create index if not exists redemptions_created_at_idx on redemptions (created_at desc);

-- Partners from Rebecca's list (LYNC events excluded for now). PINs are random 6-character codes.
insert into partners (name, pin)
select n, upper(substr(md5(random()::text || n), 1, 6))
from unnest(array[
  'Madrid Community Acupuncture', 'Epico Café', 'Masamune', 'OBE', 'Brod Bakery',
  'Ana Hache', 'Amazonia Estética', 'Laser Natura', 'BFF Barre', 'Ventura',
  'Student Housing Abroad', 'Intellete', 'IE Navigator Blueprint', 'Guest Ready'
]) as n
on conflict (name) do nothing;
