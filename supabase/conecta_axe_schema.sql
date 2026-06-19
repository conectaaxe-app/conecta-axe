-- CONECTA AXÉ — SCHEMA INICIAL SUPABASE
-- Versão sem financeiro. Mercado Pago fica para etapa final.
-- Executar no Supabase SQL Editor.

create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- TIPOS
do $$ begin
  create type public.profile_role as enum ('common_user', 'house_manager', 'moderator', 'admin_master');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.content_status as enum ('active', 'hidden', 'removed', 'suspended');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.event_response_type as enum ('interested', 'going');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.report_status as enum ('pending', 'reviewing', 'resolved', 'ignored');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.moderation_action as enum ('allow', 'warn', 'review', 'hide', 'block', 'suspend', 'escalate');
exception when duplicate_object then null; end $$;

-- PERFIS PESSOAIS
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  username text not null unique,
  email text,
  avatar_url text,
  cover_url text,
  bio text,
  city text,
  state text,
  role public.profile_role not null default 'common_user',
  is_public boolean not null default true,
  show_house_affiliation boolean not null default true,
  affiliated_house_id uuid,
  managed_house_id uuid unique,
  status public.content_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is 'Perfil pessoal público. Não cria evento oficial diretamente. Cada perfil pode gerenciar no máximo uma casa.';

-- CASAS DE AXÉ
create table if not exists public.houses (
  id uuid primary key default gen_random_uuid(),
  owner_profile_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  username text not null unique,
  description text,
  logo_url text,
  cover_url text,
  address text,
  number text,
  neighborhood text,
  city text,
  state text,
  zip_code text,
  latitude numeric(10,7),
  longitude numeric(10,7),
  is_public boolean not null default true,
  status public.content_status not null default 'active',
  followers_count integer not null default 0,
  events_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.houses is 'Perfil público da casa de axé. Não exige aprovação prévia para cadastrar/publicar eventos.';

alter table public.profiles
  add constraint profiles_affiliated_house_fk
  foreign key (affiliated_house_id) references public.houses(id) on delete set null;

alter table public.profiles
  add constraint profiles_managed_house_fk
  foreign key (managed_house_id) references public.houses(id) on delete set null;

-- ADMINISTRADORES DA CASA
create table if not exists public.house_admins (
  id uuid primary key default gen_random_uuid(),
  house_id uuid not null references public.houses(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  is_owner boolean not null default false,
  can_edit_house boolean not null default true,
  can_create_events boolean not null default true,
  can_manage_admins boolean not null default false,
  created_at timestamptz not null default now(),
  unique (house_id, profile_id),
  unique (profile_id)
);

comment on table public.house_admins is 'Uma casa pode ter vários admins. Cada perfil só pode administrar uma casa.';

-- EVENTOS
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  house_id uuid not null references public.houses(id) on delete cascade,
  created_by_profile_id uuid not null references public.profiles(id) on delete restrict,
  title text not null,
  slug text unique,
  description text,
  poster_url text,
  event_date date not null,
  start_time time not null,
  end_time time,
  address text,
  neighborhood text,
  city text,
  state text,
  latitude numeric(10,7),
  longitude numeric(10,7),
  is_public boolean not null default true,
  is_official boolean not null default true,
  status public.content_status not null default 'active',
  interested_count integer not null default 0,
  going_count integer not null default 0,
  internal_priority boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.events is 'Evento oficial só nasce pelo perfil da casa. Casas podem cadastrar múltiplos eventos futuros, inclusive calendário anual.';

create index if not exists events_house_date_idx on public.events(house_id, event_date, start_time);
create index if not exists events_location_idx on public.events(latitude, longitude);
create index if not exists events_future_idx on public.events(event_date) where status = 'active';

-- RESPOSTAS DO EVENTO
create table if not exists public.event_responses (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  response public.event_response_type not null,
  reminder_3h_enabled boolean not null default true,
  created_at timestamptz not null default now(),
  unique (event_id, profile_id, response)
);

comment on table public.event_responses is 'Quando response = going, o sistema deve enviar notificação 3 horas antes do evento.';

-- LEMBRETES
create table if not exists public.event_reminders (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  remind_at timestamptz not null,
  sent_at timestamptz,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  unique (event_id, profile_id)
);

-- POSTS
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  author_profile_id uuid references public.profiles(id) on delete cascade,
  author_house_id uuid references public.houses(id) on delete cascade,
  related_event_id uuid references public.events(id) on delete set null,
  body text,
  image_url text,
  status public.content_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint post_has_author check (author_profile_id is not null or author_house_id is not null)
);

-- COMENTÁRIOS
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references public.posts(id) on delete cascade,
  event_id uuid references public.events(id) on delete cascade,
  author_profile_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  status public.content_status not null default 'active',
  created_at timestamptz not null default now(),
  constraint comment_has_target check (post_id is not null or event_id is not null)
);

-- CURTIDAS
create table if not exists public.likes (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  post_id uuid references public.posts(id) on delete cascade,
  comment_id uuid references public.comments(id) on delete cascade,
  event_id uuid references public.events(id) on delete cascade,
  created_at timestamptz not null default now()
);

-- SEGUIDORES
create table if not exists public.follows (
  id uuid primary key default gen_random_uuid(),
  follower_profile_id uuid not null references public.profiles(id) on delete cascade,
  followed_profile_id uuid references public.profiles(id) on delete cascade,
  followed_house_id uuid references public.houses(id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint follows_one_target check (
    (followed_profile_id is not null and followed_house_id is null)
    or
    (followed_profile_id is null and followed_house_id is not null)
  ),
  unique (follower_profile_id, followed_profile_id),
  unique (follower_profile_id, followed_house_id)
);

-- BLOQUEIO
create table if not exists public.user_blocks (
  id uuid primary key default gen_random_uuid(),
  blocker_profile_id uuid not null references public.profiles(id) on delete cascade,
  blocked_profile_id uuid not null references public.profiles(id) on delete cascade,
  reason text,
  created_at timestamptz not null default now(),
  unique (blocker_profile_id, blocked_profile_id)
);

-- REDES SOCIAIS POR LINK VALIDADO
create table if not exists public.social_links (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete cascade,
  house_id uuid references public.houses(id) on delete cascade,
  platform text not null check (platform in ('instagram', 'tiktok', 'facebook', 'youtube', 'whatsapp', 'website')),
  url text not null,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  constraint social_link_owner check (
    (profile_id is not null and house_id is null)
    or
    (profile_id is null and house_id is not null)
  ),
  unique (profile_id, platform),
  unique (house_id, platform)
);

comment on table public.social_links is 'Campos opcionais, link-only, sem texto livre. Cada link pode ser visível ou oculto.';

-- SELOS
create table if not exists public.badges (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  description text,
  created_at timestamptz not null default now()
);

insert into public.badges (code, name, description) values
  ('affiliated_house', 'Filiado à Casa', 'Usuário filiado a uma casa de axé.'),
  ('house_manager', 'Gestor da Casa', 'Usuário gestor de perfil de casa.'),
  ('house_profile', 'Casa de Axé', 'Perfil oficial de casa de axé.'),
  ('official_event', 'Evento Oficial', 'Evento criado por uma casa de axé.'),
  ('verified_house', 'Casa Verificada', 'Selo futuro/opcional.'),
  ('cultural_partner', 'Parceiro Cultural', 'Selo futuro/opcional.')
on conflict (code) do nothing;

create table if not exists public.profile_badges (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  badge_id uuid not null references public.badges(id) on delete cascade,
  house_id uuid references public.houses(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (profile_id, badge_id, house_id)
);

create table if not exists public.house_badges (
  id uuid primary key default gen_random_uuid(),
  house_id uuid not null references public.houses(id) on delete cascade,
  badge_id uuid not null references public.badges(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (house_id, badge_id)
);

-- DENÚNCIAS
create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_profile_id uuid not null references public.profiles(id) on delete cascade,
  reported_profile_id uuid references public.profiles(id) on delete set null,
  reported_house_id uuid references public.houses(id) on delete set null,
  reported_event_id uuid references public.events(id) on delete set null,
  reported_post_id uuid references public.posts(id) on delete set null,
  reported_comment_id uuid references public.comments(id) on delete set null,
  reason text not null,
  details text,
  status public.report_status not null default 'pending',
  admin_notes text,
  resolved_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

-- MODERAÇÃO AUTOMÁTICA
create table if not exists public.moderation_rules (
  id uuid primary key default gen_random_uuid(),
  term text not null,
  category text not null,
  severity integer not null check (severity between 0 and 4),
  action public.moderation_action not null default 'review',
  is_active boolean not null default true,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.moderation_logs (
  id uuid primary key default gen_random_uuid(),
  rule_id uuid references public.moderation_rules(id) on delete set null,
  profile_id uuid references public.profiles(id) on delete set null,
  content_type text,
  content_id uuid,
  original_text text,
  action public.moderation_action not null,
  created_at timestamptz not null default now()
);

-- Termos culturais permitidos: não bloquear automaticamente.
create table if not exists public.allowed_cultural_terms (
  id uuid primary key default gen_random_uuid(),
  term text not null unique,
  notes text
);

insert into public.allowed_cultural_terms (term, notes) values
  ('macumba', 'Termo cultural/popular permitido. Avaliar contexto ofensivo apenas.'),
  ('axé', 'Termo central da comunidade.'),
  ('terreiro', 'Termo religioso/cultural.'),
  ('gira', 'Termo religioso/cultural.'),
  ('orixá', 'Termo religioso/cultural.'),
  ('ebó', 'Termo religioso/cultural.'),
  ('despacho', 'Termo religioso/cultural.'),
  ('pai de santo', 'Termo religioso/cultural.'),
  ('mãe de santo', 'Termo religioso/cultural.'),
  ('filho de santo', 'Termo religioso/cultural.'),
  ('candomblé', 'Termo religioso/cultural.'),
  ('umbanda', 'Termo religioso/cultural.'),
  ('ilê', 'Termo religioso/cultural.'),
  ('casa de axé', 'Termo religioso/cultural.')
on conflict (term) do nothing;

-- DESTAQUES INTERNOS
create table if not exists public.internal_highlights (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  highlight_type text not null check (highlight_type in ('profile', 'house', 'event', 'post', 'campaign')),
  profile_id uuid references public.profiles(id) on delete set null,
  house_id uuid references public.houses(id) on delete set null,
  event_id uuid references public.events(id) on delete set null,
  post_id uuid references public.posts(id) on delete set null,
  image_url text,
  cta_label text,
  starts_at timestamptz,
  ends_at timestamptz,
  show_every_n_sessions integer not null default 2,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- RLS
alter table public.profiles enable row level security;
alter table public.houses enable row level security;
alter table public.house_admins enable row level security;
alter table public.events enable row level security;
alter table public.event_responses enable row level security;
alter table public.event_reminders enable row level security;
alter table public.posts enable row level security;
alter table public.comments enable row level security;
alter table public.likes enable row level security;
alter table public.follows enable row level security;
alter table public.user_blocks enable row level security;
alter table public.social_links enable row level security;
alter table public.badges enable row level security;
alter table public.profile_badges enable row level security;
alter table public.house_badges enable row level security;
alter table public.reports enable row level security;
alter table public.moderation_rules enable row level security;
alter table public.moderation_logs enable row level security;
alter table public.allowed_cultural_terms enable row level security;
alter table public.internal_highlights enable row level security;

-- POLÍTICAS BÁSICAS DE LEITURA PÚBLICA
create policy "public read active profiles" on public.profiles for select using (status = 'active' and is_public = true);
create policy "public read active houses" on public.houses for select using (status = 'active' and is_public = true);
create policy "public read active events" on public.events for select using (status = 'active' and is_public = true);
create policy "public read active posts" on public.posts for select using (status = 'active');
create policy "public read active comments" on public.comments for select using (status = 'active');
create policy "public read badges" on public.badges for select using (true);
create policy "public read allowed cultural terms" on public.allowed_cultural_terms for select using (true);

-- POLÍTICAS DO PRÓPRIO USUÁRIO
create policy "user can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "user can insert own event response" on public.event_responses for insert with check (auth.uid() = profile_id);
create policy "user can delete own event response" on public.event_responses for delete using (auth.uid() = profile_id);
create policy "user can create own posts" on public.posts for insert with check (auth.uid() = author_profile_id);
create policy "user can comment" on public.comments for insert with check (auth.uid() = author_profile_id);
create policy "user can follow" on public.follows for insert with check (auth.uid() = follower_profile_id);
create policy "user can block" on public.user_blocks for insert with check (auth.uid() = blocker_profile_id);
create policy "user can report" on public.reports for insert with check (auth.uid() = reporter_profile_id);

-- POLÍTICAS PARA GESTOR/ADMIN DA CASA
create policy "house admins can update their house" on public.houses
for update using (
  exists (
    select 1 from public.house_admins ha
    where ha.house_id = houses.id and ha.profile_id = auth.uid() and ha.can_edit_house = true
  )
);

create policy "house admins can create events" on public.events
for insert with check (
  exists (
    select 1 from public.house_admins ha
    where ha.house_id = events.house_id and ha.profile_id = auth.uid() and ha.can_create_events = true
  )
);

create policy "house admins can update events" on public.events
for update using (
  exists (
    select 1 from public.house_admins ha
    where ha.house_id = events.house_id and ha.profile_id = auth.uid() and ha.can_create_events = true
  )
);

-- OBSERVAÇÕES IMPORTANTES:
-- 1. Financeiro/Mercado Pago fica fora desta versão.
-- 2. Casas aparecem no mapa quando têm eventos futuros.
-- 3. Casas podem publicar múltiplos eventos futuros, inclusive calendário anual.
-- 4. Evento oficial só é criado pelo perfil da casa.
-- 5. Perfil pessoal não cria evento oficial.
-- 6. Todos os perfis são públicos no MVP.
