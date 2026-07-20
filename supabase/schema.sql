-- Roadbook Alemania — esquema Supabase
-- Ejecuta este SQL en el proyecto Supabase (SQL Editor > New query > Run).
-- Modelo "sin usuarios": el aislamiento lo da el trip_code (código secreto compartido).

-- 1) Checklist compartida (un item = una parada/tarea del itinerario)
create table if not exists public.checks (
  trip_code  text not null,
  item_id    text not null,
  checked    boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (trip_code, item_id)
);

-- 2) Anotaciones compartidas (por día "d10" o por parada "d10-koenigssee")
create table if not exists public.notes (
  id          uuid primary key default gen_random_uuid(),
  trip_code   text not null,
  anchor_id   text not null,
  body        text not null,
  author_nick text,
  created_at  timestamptz not null default now()
);

create index if not exists notes_trip_idx on public.notes (trip_code, anchor_id);

-- 3) RLS permisiva (sin login). Suficiente para un grupo pequeño con código secreto.
alter table public.checks enable row level security;
alter table public.notes  enable row level security;

drop policy if exists "trip access checks" on public.checks;
create policy "trip access checks" on public.checks
  for all using (true) with check (true);

drop policy if exists "trip access notes" on public.notes;
create policy "trip access notes" on public.notes
  for all using (true) with check (true);

-- 4) Realtime: publicar cambios de ambas tablas
alter publication supabase_realtime add table public.checks;
alter publication supabase_realtime add table public.notes;
