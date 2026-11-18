-- Credenciamento AMi Kinder — contas na nuvem (Supabase)
-- Como usar: crie um projeto gratuito em https://supabase.com, abra "SQL Editor",
-- cole todo este arquivo e clique em "Run". Pode rodar mais de uma vez sem problema.

create extension if not exists pgcrypto;

create table if not exists public.ak_users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  pass_hash text not null,
  role text not null default 'user' check (role in ('admin', 'prof', 'apoio', 'user')),
  active boolean not null default true,
  created_at timestamptz not null default now()
);
create unique index if not exists ak_users_email_key on public.ak_users ((lower(email)));

create table if not exists public.ak_sessions (
  token text primary key,
  user_id uuid not null references public.ak_users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.ak_users enable row level security;
alter table public.ak_sessions enable row level security;

revoke all on public.ak_users from anon, authenticated;
revoke all on public.ak_sessions from anon, authenticated;

create or replace function public.ak_user_json(u public.ak_users)
returns jsonb
language sql
immutable
as $$
  select jsonb_build_object(
    'id', u.id,
    'name', u.name,
    'email', u.email,
    'role', u.role,
    'active', u.active,
    'createdAt', u.created_at
  );
$$;

create or replace function public.ak_session_admin(p_token text)
returns uuid
language sql
security definer
set search_path = public
as $$
  select s.user_id
  from ak_sessions s
  join ak_users u on u.id = s.user_id
  where s.token = p_token and u.active and u.role = 'admin';
$$;

create or replace function public.ak_public_state()
returns jsonb
language sql
security definer
set search_path = public
as $$
  select jsonb_build_object('hasUsers', exists (select 1 from ak_users));
$$;

create or replace function public.ak_bootstrap(p_name text, p_email text, p_pass text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  new_user public.ak_users;
  new_token text;
begin
  if exists (select 1 from ak_users) then
    return jsonb_build_object('ok', false, 'error', 'exists');
  end if;
  if length(btrim(coalesce(p_name, ''))) < 2 then
    return jsonb_build_object('ok', false, 'error', 'name');
  end if;
  if length(coalesce(p_pass, '')) < 6 then
    return jsonb_build_object('ok', false, 'error', 'password');
  end if;
  insert into ak_users (name, email, pass_hash, role)
  values (btrim(p_name), lower(btrim(p_email)), crypt(p_pass, gen_salt('bf', 10)), 'admin')
  returning * into new_user;
  new_token := encode(gen_random_bytes(24), 'hex');
  insert into ak_sessions (token, user_id) values (new_token, new_user.id);
  return jsonb_build_object('ok', true, 'token', new_token, 'user', ak_user_json(new_user));
exception when unique_violation then
  return jsonb_build_object('ok', false, 'error', 'email');
end;
$$;

create or replace function public.ak_login(p_email text, p_pass text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  u public.ak_users;
  new_token text;
begin
  select * into u
  from ak_users
  where lower(email) = lower(btrim(coalesce(p_email, '')))
  limit 1;
  if not found or crypt(coalesce(p_pass, ''), u.pass_hash) <> u.pass_hash then
    return jsonb_build_object('ok', false, 'error', 'invalid');
  end if;
  if not u.active then
    return jsonb_build_object('ok', false, 'error', 'inactive');
  end if;
  new_token := encode(gen_random_bytes(24), 'hex');
  insert into ak_sessions (token, user_id) values (new_token, u.id);
  return jsonb_build_object('ok', true, 'token', new_token, 'user', ak_user_json(u));
end;
$$;

create or replace function public.ak_session_user(p_token text)
returns jsonb
language sql
security definer
set search_path = public
as $$
  select coalesce(
    (
      select ak_user_json(u)
      from ak_sessions s
      join ak_users u on u.id = s.user_id
      where s.token = p_token and u.active
    ),
    'null'::jsonb
  );
$$;

create or replace function public.ak_logout(p_token text)
returns void
language sql
security definer
set search_path = public
as $$
  delete from ak_sessions where token = p_token;
$$;

create or replace function public.ak_admin_list(p_token text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
begin
  if ak_session_admin(p_token) is null then
    return jsonb_build_object('ok', false, 'error', 'forbidden');
  end if;
  return jsonb_build_object(
    'ok', true,
    'users', coalesce(
      (select jsonb_agg(ak_user_json(u) order by u.created_at) from ak_users u),
      '[]'::jsonb
    )
  );
end;
$$;

create or replace function public.ak_admin_create(
  p_token text, p_name text, p_email text, p_pass text, p_role text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  new_user public.ak_users;
begin
  if ak_session_admin(p_token) is null then
    return jsonb_build_object('ok', false, 'error', 'forbidden');
  end if;
  if p_role not in ('admin', 'prof', 'apoio', 'user') then
    return jsonb_build_object('ok', false, 'error', 'role');
  end if;
  if length(btrim(coalesce(p_name, ''))) < 2 then
    return jsonb_build_object('ok', false, 'error', 'name');
  end if;
  if length(coalesce(p_pass, '')) < 6 then
    return jsonb_build_object('ok', false, 'error', 'password');
  end if;
  insert into ak_users (name, email, pass_hash, role, active)
  values (btrim(p_name), lower(btrim(p_email)), crypt(p_pass, gen_salt('bf', 10)), p_role, true)
  returning * into new_user;
  return jsonb_build_object('ok', true, 'user', ak_user_json(new_user));
exception when unique_violation then
  return jsonb_build_object('ok', false, 'error', 'email');
end;
$$;

create or replace function public.ak_admin_update(
  p_token text, p_id uuid, p_name text, p_email text, p_role text,
  p_active boolean, p_pass text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  admin_id uuid;
  target public.ak_users;
  admin_count int;
  updated public.ak_users;
begin
  admin_id := ak_session_admin(p_token);
  if admin_id is null then
    return jsonb_build_object('ok', false, 'error', 'forbidden');
  end if;
  select * into target from ak_users where id = p_id;
  if not found then
    return jsonb_build_object('ok', false, 'error', 'notfound');
  end if;
  if p_role not in ('admin', 'prof', 'apoio', 'user') then
    return jsonb_build_object('ok', false, 'error', 'role');
  end if;
  if length(btrim(coalesce(p_name, ''))) < 2 then
    return jsonb_build_object('ok', false, 'error', 'name');
  end if;
  if p_active is null then
    p_active := target.active;
  end if;
  if p_pass is not null and length(p_pass) > 0 and length(p_pass) < 6 then
    return jsonb_build_object('ok', false, 'error', 'password');
  end if;
  if p_id = admin_id and (p_role <> target.role or p_active <> target.active) then
    return jsonb_build_object('ok', false, 'error', 'self');
  end if;
  if target.role = 'admin' and target.active and (p_role <> 'admin' or not p_active) then
    select count(*) into admin_count from ak_users where role = 'admin' and active;
    if admin_count <= 1 then
      return jsonb_build_object('ok', false, 'error', 'lastadmin');
    end if;
  end if;
  update ak_users
  set name = btrim(p_name),
      email = lower(btrim(p_email)),
      role = p_role,
      active = p_active,
      pass_hash = case
        when p_pass is not null and length(p_pass) > 0 then crypt(p_pass, gen_salt('bf', 10))
        else pass_hash
      end
  where id = p_id
  returning * into updated;
  if not updated.active then
    delete from ak_sessions where user_id = updated.id;
  end if;
  return jsonb_build_object('ok', true, 'user', ak_user_json(updated));
exception when unique_violation then
  return jsonb_build_object('ok', false, 'error', 'email');
end;
$$;

create or replace function public.ak_admin_delete(p_token text, p_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  admin_id uuid;
  target public.ak_users;
  admin_count int;
begin
  admin_id := ak_session_admin(p_token);
  if admin_id is null then
    return jsonb_build_object('ok', false, 'error', 'forbidden');
  end if;
  select * into target from ak_users where id = p_id;
  if not found then
    return jsonb_build_object('ok', false, 'error', 'notfound');
  end if;
  if p_id = admin_id then
    return jsonb_build_object('ok', false, 'error', 'self');
  end if;
  if target.role = 'admin' and target.active then
    select count(*) into admin_count from ak_users where role = 'admin' and active;
    if admin_count <= 1 then
      return jsonb_build_object('ok', false, 'error', 'lastadmin');
    end if;
  end if;
  delete from ak_users where id = p_id;
  return jsonb_build_object('ok', true);
end;
$$;

grant execute on function public.ak_public_state() to anon, authenticated;
grant execute on function public.ak_bootstrap(text, text, text) to anon, authenticated;
grant execute on function public.ak_login(text, text) to anon, authenticated;
grant execute on function public.ak_session_user(text) to anon, authenticated;
grant execute on function public.ak_logout(text) to anon, authenticated;
grant execute on function public.ak_admin_list(text) to anon, authenticated;
grant execute on function public.ak_admin_create(text, text, text, text, text) to anon, authenticated;
grant execute on function public.ak_admin_update(text, uuid, text, text, text, boolean, text) to anon, authenticated;
grant execute on function public.ak_admin_delete(text, uuid) to anon, authenticated;
