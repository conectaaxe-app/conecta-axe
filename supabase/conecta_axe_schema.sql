-- CONECTA AXÉ — ESQUEMA INICIAL DO BANCO DE DADOS
-- Rode este arquivo no SQL Editor do Supabase quando formos conectar o app ao banco.
-- A parte financeira/Mercado Pago fica para uma fase posterior.

create extension if not exists "uuid-ossp";
create extension if not exists postgis;

-- ENUMS
create type public.profile_role as enum ('common_user', 'casa_manager', 'moderator', 'admin_master');
create type public.casa_admin_role as enum ('owner', 'admin');
create type public.event_status as enum ('draft', 'published', 'hidden', 'cancelled', 'finished');
create type public.post_status as enum ('published', 'hidden', 'removed');
create type public.report_status as enum ('pending', 'in_review', 'resolved', 'ignored');
create type public.moderation_action as enum ('allow', 'warn', 'review', 'hide_pending_review', 'block', 'remove', 'suspend', 'escalate_admin');
create type public.badge_type as enum ('affiliation', 'casa_manager', 'sacerdote', 'sacerdotisa', 'casa_de_axe', 'casa_verificada', 'evento_oficial', 'apoiador_comunidade', 'professor_instrutor', 'parceiro_cultural');
create type public.social_platform as enum ('instagram', 'tiktok', 'facebook', 'youtube', 'whatsapp', 'website');
create type public.highlight_content_type as enum ('profile', 'casa', 'event', 'post', 'campaign');

-- PERFIL PESSOAL
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  username text not null unique,
  bio text,
  city text,
  state text,
  avatar_url text,
  cover_url text,
  role public.profile_role not null default 'common_user',
  is_public boolean not null default true,
  show_affiliation boolean not null default true,
  affiliated_casa_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint username_format check (username ~ '^[a-z0-9_.]{3,30}$')
);

-- CASAS DE AXÉ
create table public.casas (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  username text not null unique,
  description text,
  logo_url text,
  cover_url text,
  address_line text,
  number text,
  neighborhood text,
  city text,
  state text,
  cep text,
  latitude double precision,
  longitude double precision,
  location geography(point, 4326) generated always as (
    case when latitude is not null and longitude is not null
    then st_setsrid(st_makepoint(longitude, latitude), 4326)::geography
    else null end
  ) stored,
  is_public boolean not null default true,
  is_active boolean not null default true,
  created_by uuid not null references public.profiles(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint casa_username_format check (username ~ '^[a-z0-9_.]{3,30}$')
);

alter table public.profiles
add constraint profiles_affiliated_casa_fk foreign key (affiliated_casa_id) references public.casas(id) on delete set null;

-- Cada perfil pessoal pode gerenciar apenas 1 casa.
-- Uma casa pode ter vários administradores.
create table public.casa_admins (
  id uuid primary key default uuid_generate_v4(),
  casa_id uuid not null references public.casas(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  role public.casa_admin_role not null default 'admin',
  invited_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (casa_id, profile_id),
  unique (profile_id)
);

-- EVENTOS OFICIAIS
-- Evento oficial só nasce a partir de uma casa de axé.
-- Casas podem publicar múltiplos eventos futuros, inclusive calendário anual.
create table public.events (
  id uuid primary key default uuid_generate_v4(),
  casa_id uuid not null references public.casas(id) on delete cascade,
  created_by uuid not null references public.profiles(id) on delete restrict,
  title text not null,
  description text,
  folder_url text,
  starts_at timestamptz not null,
  ends_at timestamptz,
  address_line text,
  number text,
  neighborhood text,
  city text,
  state text,
  cep text,
  latitude double precision,
  longitude double precision,
  location geography(point, 4326) generated always as (
    case when latitude is not null and longitude is not null
    then st_setsrid(st_makepoint(longitude, latitude), 4326)::geography
    else null end
  ) stored,
  status public.event_status not null default 'published',
  is_public boolean not null default true,
  is_internal_priority boolean not null default false,
  is_paid_highlight boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Interações de evento
create table public.event_responses (
  id uuid primary key default uuid_generate_v4(),
  event_id uuid not null references public.events(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  response text not null check (response in ('interested', 'going')),
  reminder_3h_scheduled boolean not null default false,
  created_at timestamptz not null default now(),
  unique (event_id, profile_id, response)
);

create table public.event_reminders (
  id uuid primary key default uuid_generate_v4(),
  event_id uuid not null references public.events(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  remind_at timestamptz not null,
  sent_at timestamptz,
  channel text not null default 'push',
  created_at timestamptz not null default now(),
  unique(event_id, profile_id, remind_at)
);

-- POSTS E FEED
create table public.posts (
  id uuid primary key default uuid_generate_v4(),
  author_profile_id uuid references public.profiles(id) on delete cascade,
  author_casa_id uuid references public.casas(id) on delete cascade,
  shared_event_id uuid references public.events(id) on delete set null,
  body text,
  image_url text,
  status public.post_status not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint one_author_only check (
    (author_profile_id is not null and author_casa_id is null)
    or (author_profile_id is null and author_casa_id is not null)
  )
);

create table public.post_likes (
  id uuid primary key default uuid_generate_v4(),
  post_id uuid not null references public.posts(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(post_id, profile_id)
);

create table public.post_comments (
  id uuid primary key default uuid_generate_v4(),
  post_id uuid not null references public.posts(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  status public.post_status not null default 'published',
  moderation_level int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- SEGUIR / BLOQUEAR
create table public.follows (
  id uuid primary key default uuid_generate_v4(),
  follower_profile_id uuid not null references public.profiles(id) on delete cascade,
  followed_profile_id uuid references public.profiles(id) on delete cascade,
  followed_casa_id uuid references public.casas(id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint follow_target check (
    (followed_profile_id is not null and followed_casa_id is null)
    or (followed_profile_id is null and followed_casa_id is not null)
  )
);

create unique index follows_unique_profile on public.follows(follower_profile_id, followed_profile_id) where followed_profile_id is not null;
create unique index follows_unique_casa on public.follows(follower_profile_id, followed_casa_id) where followed_casa_id is not null;

create table public.user_blocks (
  id uuid primary key default uuid_generate_v4(),
  blocker_profile_id uuid not null references public.profiles(id) on delete cascade,
  blocked_profile_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(blocker_profile_id, blocked_profile_id),
  constraint cannot_block_self check (blocker_profile_id <> blocked_profile_id)
);

-- REDES SOCIAIS: apenas links estruturados, nada de texto livre.
create table public.social_links (
  id uuid primary key default uuid_generate_v4(),
  owner_profile_id uuid references public.profiles(id) on delete cascade,
  owner_casa_id uuid references public.casas(id) on delete cascade,
  platform public.social_platform not null,
  url text not null,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint one_social_owner check (
    (owner_profile_id is not null and owner_casa_id is null)
    or (owner_profile_id is null and owner_casa_id is not null)
  ),
  constraint social_url_is_link check (url ~ '^https?://')
);

create unique index social_links_unique_profile_platform on public.social_links(owner_profile_id, platform) where owner_profile_id is not null;
create unique index social_links_unique_casa_platform on public.social_links(owner_casa_id, platform) where owner_casa_id is not null;

-- SELOS
create table public.badges (
  id uuid primary key default uuid_generate_v4(),
  type public.badge_type not null,
  label text not null,
  description text,
  icon text,
  color text,
  created_at timestamptz not null default now(),
  unique(type, label)
);

create table public.profile_badges (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references public.profiles(id) on delete cascade,
  casa_id uuid references public.casas(id) on delete cascade,
  badge_id uuid not null references public.badges(id) on delete cascade,
  related_casa_id uuid references public.casas(id) on delete set null,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  constraint one_badge_owner check (
    (profile_id is not null and casa_id is null)
    or (profile_id is null and casa_id is not null)
  )
);

-- DENÚNCIAS E MODERAÇÃO
create table public.reports (
  id uuid primary key default uuid_generate_v4(),
  reporter_profile_id uuid references public.profiles(id) on delete set null,
  target_type text not null check (target_type in ('profile', 'casa', 'event', 'post', 'comment', 'photo')),
  target_id uuid not null,
  reason text not null,
  details text,
  status public.report_status not null default 'pending',
  decision text,
  moderator_profile_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create table public.moderation_rules (
  id uuid primary key default uuid_generate_v4(),
  term text not null,
  category text not null,
  severity int not null check (severity between 0 and 4),
  action public.moderation_action not null,
  is_active boolean not null default true,
  notes text,
  created_at timestamptz not null default now(),
  unique(term, category)
);

create table public.moderation_actions_log (
  id uuid primary key default uuid_generate_v4(),
  moderator_profile_id uuid references public.profiles(id) on delete set null,
  action public.moderation_action not null,
  target_type text not null,
  target_id uuid not null,
  reason text,
  created_at timestamptz not null default now()
);

-- DESTAQUES INTERNOS ROTATIVOS
create table public.internal_highlights (
  id uuid primary key default uuid_generate_v4(),
  content_type public.highlight_content_type not null,
  content_id uuid,
  title text not null,
  description text,
  image_url text,
  cta_label text,
  cta_url text,
  starts_at timestamptz,
  ends_at timestamptz,
  frequency_sessions int not null default 2,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.internal_highlight_impressions (
  id uuid primary key default uuid_generate_v4(),
  highlight_id uuid not null references public.internal_highlights(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  session_number int,
  clicked_at timestamptz,
  dismissed_at timestamptz,
  shown_at timestamptz not null default now()
);

-- ÍNDICES DE LOCALIZAÇÃO E PERFORMANCE
create index casas_location_idx on public.casas using gist(location);
create index events_location_idx on public.events using gist(location);
create index events_casa_starts_idx on public.events(casa_id, starts_at);
create index events_status_starts_idx on public.events(status, starts_at);
create index reports_status_idx on public.reports(status, created_at);

-- RLS
alter table public.profiles enable row level security;
alter table public.casas enable row level security;
alter table public.casa_admins enable row level security;
alter table public.events enable row level security;
alter table public.event_responses enable row level security;
alter table public.event_reminders enable row level security;
alter table public.posts enable row level security;
alter table public.post_likes enable row level security;
alter table public.post_comments enable row level security;
alter table public.follows enable row level security;
alter table public.user_blocks enable row level security;
alter table public.social_links enable row level security;
alter table public.badges enable row level security;
alter table public.profile_badges enable row level security;
alter table public.reports enable row level security;
alter table public.moderation_rules enable row level security;
alter table public.moderation_actions_log enable row level security;
alter table public.internal_highlights enable row level security;
alter table public.internal_highlight_impressions enable row level security;

-- POLÍTICAS BÁSICAS DO MVP
create policy "public profiles are readable" on public.profiles for select using (is_public = true);
create policy "users update own profile" on public.profiles for update using (auth.uid() = id);
create policy "users insert own profile" on public.profiles for insert with check (auth.uid() = id);

create policy "public casas are readable" on public.casas for select using (is_public = true and is_active = true);
create policy "authenticated users create casas" on public.casas for insert with check (auth.uid() = created_by);
create policy "casa admins update casa" on public.casas for update using (
  exists(select 1 from public.casa_admins ca where ca.casa_id = casas.id and ca.profile_id = auth.uid())
);

create policy "casa admins readable" on public.casa_admins for select using (true);
create policy "owner can add admins" on public.casa_admins for insert with check (
  auth.uid() = profile_id
  or exists(select 1 from public.casa_admins ca where ca.casa_id = casa_admins.casa_id and ca.profile_id = auth.uid() and ca.role = 'owner')
);

create policy "public events are readable" on public.events for select using (is_public = true and status = 'published');
create policy "casa admins create events" on public.events for insert with check (
  exists(select 1 from public.casa_admins ca where ca.casa_id = events.casa_id and ca.profile_id = auth.uid())
);
create policy "casa admins update events" on public.events for update using (
  exists(select 1 from public.casa_admins ca where ca.casa_id = events.casa_id and ca.profile_id = auth.uid())
);

create policy "profiles can respond to events" on public.event_responses for insert with check (auth.uid() = profile_id);
create policy "profiles see own event responses" on public.event_responses for select using (auth.uid() = profile_id);
create policy "profiles see own reminders" on public.event_reminders for select using (auth.uid() = profile_id);

create policy "published posts readable" on public.posts for select using (status = 'published');
create policy "profiles create own posts" on public.posts for insert with check (auth.uid() = author_profile_id);
create policy "post author updates own posts" on public.posts for update using (auth.uid() = author_profile_id);

create policy "comments readable" on public.post_comments for select using (status = 'published');
create policy "profiles create comments" on public.post_comments for insert with check (auth.uid() = profile_id);

create policy "likes readable" on public.post_likes for select using (true);
create policy "profiles like" on public.post_likes for insert with check (auth.uid() = profile_id);

create policy "follows readable" on public.follows for select using (true);
create policy "profiles follow" on public.follows for insert with check (auth.uid() = follower_profile_id);
create policy "profiles unfollow" on public.follows for delete using (auth.uid() = follower_profile_id);

create policy "block owner reads" on public.user_blocks for select using (auth.uid() = blocker_profile_id);
create policy "profiles block" on public.user_blocks for insert with check (auth.uid() = blocker_profile_id);
create policy "profiles unblock" on public.user_blocks for delete using (auth.uid() = blocker_profile_id);

create policy "visible social links readable" on public.social_links for select using (is_visible = true);
create policy "profile owner manages social links" on public.social_links for all using (auth.uid() = owner_profile_id) with check (auth.uid() = owner_profile_id);

create policy "badges readable" on public.badges for select using (true);
create policy "visible profile badges readable" on public.profile_badges for select using (is_visible = true);

create policy "profiles create reports" on public.reports for insert with check (auth.uid() = reporter_profile_id);
create policy "reporter reads own reports" on public.reports for select using (auth.uid() = reporter_profile_id);

create policy "active highlights readable" on public.internal_highlights for select using (is_active = true);
create policy "profiles insert highlight impressions" on public.internal_highlight_impressions for insert with check (auth.uid() = profile_id);

-- FUNÇÃO: buscar eventos próximos por raio inicial em km.
create or replace function public.nearby_events(lat double precision, lng double precision, radius_km double precision default 10)
returns table (
  event_id uuid,
  title text,
  starts_at timestamptz,
  casa_name text,
  distance_km double precision
)
language sql stable
as $$
  select e.id, e.title, e.starts_at, c.name,
         round((st_distance(e.location, st_setsrid(st_makepoint(lng, lat), 4326)::geography) / 1000)::numeric, 2)::double precision as distance_km
  from public.events e
  join public.casas c on c.id = e.casa_id
  where e.status = 'published'
    and e.is_public = true
    and e.starts_at >= now()
    and e.location is not null
    and st_dwithin(e.location, st_setsrid(st_makepoint(lng, lat), 4326)::geography, radius_km * 1000)
  order by e.is_internal_priority desc, e.starts_at asc, distance_km asc;
$$;

-- FUNÇÃO: casas com eventos futuros para evitar mapa vazio.
create or replace function public.casas_with_future_events(lat double precision, lng double precision, radius_km double precision default 50)
returns table (
  casa_id uuid,
  casa_name text,
  next_event_title text,
  next_event_at timestamptz,
  distance_km double precision
)
language sql stable
as $$
  with next_events as (
    select distinct on (e.casa_id) e.casa_id, e.title, e.starts_at
    from public.events e
    where e.status = 'published' and e.is_public = true and e.starts_at >= now()
    order by e.casa_id, e.starts_at asc
  )
  select c.id, c.name, ne.title, ne.starts_at,
         round((st_distance(c.location, st_setsrid(st_makepoint(lng, lat), 4326)::geography) / 1000)::numeric, 2)::double precision as distance_km
  from public.casas c
  join next_events ne on ne.casa_id = c.id
  where c.is_active = true
    and c.is_public = true
    and c.location is not null
    and st_dwithin(c.location, st_setsrid(st_makepoint(lng, lat), 4326)::geography, radius_km * 1000)
  order by distance_km asc, ne.starts_at asc;
$$;

-- REGRAS INICIAIS DE MODERAÇÃO: exemplos estruturais.
insert into public.moderation_rules(term, category, severity, action, notes) values
('macumba', 'termo cultural permitido', 0, 'allow', 'Não bloquear automaticamente; analisar contexto se houver denúncia.'),
('axé', 'termo cultural permitido', 0, 'allow', 'Termo central da comunidade.'),
('terreiro', 'termo cultural permitido', 0, 'allow', 'Termo cultural/religioso permitido.'),
('ameaça física explícita', 'ameaças e violência', 4, 'block', 'Placeholder: substituir por lista controlada no painel admin.'),
('racismo explícito', 'racismo e discriminação', 4, 'block', 'Placeholder: lista sensível deve ser mantida no admin, não em código público.'),
('intolerância religiosa explícita', 'intolerância religiosa', 4, 'block', 'Placeholder: termos ofensivos graves entram como bloqueio/revisão.');

-- SELOS BASE
insert into public.badges(type, label, description, icon, color) values
('affiliation', 'Filiado à Casa', 'Usuário filiado a uma casa de axé.', 'leaf', '#2F4E2D'),
('casa_manager', 'Gestor da Casa', 'Usuário administrador de uma casa de axé.', 'home', '#D4A23A'),
('casa_de_axe', 'Casa de Axé', 'Perfil oficial de casa de axé.', 'building', '#2F4E2D'),
('evento_oficial', 'Evento Oficial', 'Evento criado por uma casa de axé.', 'calendar-star', '#C23D2A'),
('casa_verificada', 'Casa Verificada', 'Selo futuro/opcional de verificação.', 'shield', '#1682E6')
on conflict do nothing;
