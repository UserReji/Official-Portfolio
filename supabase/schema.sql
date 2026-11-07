-- Run this in Supabase SQL Editor (Dashboard -> SQL Editor -> New query)

create table if not exists public.contacts (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id text primary key,
  name text not null,
  role text not null,
  company text,
  content text not null,
  created_at timestamptz not null default now()
);

-- Seed testimonials (optional, safe to re-run with upsert)
insert into public.testimonials (id, name, role, company, content)
values
  ('t-1', 'Office of the VPAA', 'OJT Supervisor', 'Holy Cross of Davao College', 'They demonstrated exceptional performance while working from home. They consistently showed initiative, responsibility, and professionalism in completing assigned tasks. Despite the remote setup, they maintained good communication, met deadlines, adapted quickly to new challenges, and delivered high-quality work with minimal supervision.'),
  ('t-2', 'Sir Arvin Lauron', 'Thesis Adviser', 'Holy Cross of Davao College', 'Brought a level of polish to the capstone that went beyond the requirements. The team delivered on time and the system has been used in real-world pilots.'),
  ('t-3', 'Anonymous Classmate', 'Classmate & Groupmate', '', 'Always the one who actually gets things done in a group. Reliable, sharp, and somehow still manages to keep the team''s morale up even during crunch time.'),
  ('t-4', 'Anonymous', 'Someone Who Knows You', '', 'Honestly kind of scary how fast they pick things up. You give them something new and they just… figure it out. Then they make it look easy.')
on conflict (id) do nothing;

-- Lock down public access: the app uses the service-role key server-side.
alter table public.contacts enable row level security;
alter table public.testimonials enable row level security;
