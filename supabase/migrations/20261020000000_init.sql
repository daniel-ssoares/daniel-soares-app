-- Esquema inicial do portfólio.
-- Rodar com a Supabase CLI (supabase db push) ou colar no SQL Editor do painel.
--
-- Segurança: RLS ligado em todas as tabelas e NENHUMA policy criada.
-- Resultado: as chaves anon/publishable (usadas em navegador) não leem nem escrevem nada.
-- Só a API .NET acessa o banco, pela connection string (variável de ambiente na Vercel).

create table public.contact_messages (
  id          bigint generated always as identity primary key,
  name        text        not null check (char_length(name) between 2 and 120),
  email       text        not null check (char_length(email) <= 200),
  kind        text        not null check (kind in ('project', 'proposal', 'other')),
  message     text        not null check (char_length(message) between 10 and 2000),
  lang        text        not null default 'pt' check (lang in ('pt', 'en')),
  created_at  timestamptz not null default now()
);

-- client: descrição do cliente exibida no card (ex.: "um banco de investimentos suíço").
-- O case de menor sort_order aparece em destaque no site (problema → solução → resultado + métrica).
create table public.cases (
  id            bigint generated always as identity primary key,
  lang          text        not null check (lang in ('pt', 'en')),
  sort_order    int         not null default 0,
  title         text        not null,
  client        text        not null,
  context       text,
  problem       text,
  summary       text        not null,
  result        text,
  metric_value  text,
  metric_label  text,
  tags          text[]      not null default '{}',
  published     boolean     not null default true
);

create index cases_lang_order_idx on public.cases (lang, sort_order) where published;

create table public.page_views (
  id             bigint generated always as identity primary key,
  path           text        not null check (char_length(path) <= 200),
  referrer_host  text,
  created_at     timestamptz not null default now()
);

create index page_views_created_at_idx on public.page_views (created_at);

alter table public.contact_messages enable row level security;
alter table public.cases            enable row level security;
alter table public.page_views       enable row level security;
