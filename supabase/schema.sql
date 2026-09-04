-- WIZ CNI 사전등록 시스템 — Supabase 스키마 + RLS 정책
-- Supabase 대시보드 > SQL Editor 에서 전체를 한 번에 실행하세요.
-- (이미 실행한 뒤 다시 실행해도 안전하도록 IF NOT EXISTS / OR REPLACE로 작성했습니다.)

create extension if not exists pgcrypto;

-- ============================================================
-- 1. registrations: 사전등록 참가자 테이블
-- ============================================================
create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  organization text not null default '',
  department text not null default '',
  "position" text not null default '',
  phone text not null,
  email text not null default '',
  category text not null default 'etc' check (category in ('medical', 'public', 'etc')),
  meal boolean not null default false,
  checkin boolean not null default false,
  sms_status text not null default 'pending' check (sms_status in ('pending', 'sent', 'failed')),
  sms_sent_at timestamptz,
  sms_error text,
  created_at timestamptz not null default now()
);

create index if not exists registrations_created_at_idx on public.registrations (created_at desc);

alter table public.registrations enable row level security;

-- ============================================================
-- 2. admin_users: 관리자 계정 ↔ 권한(role) 매핑
--    Supabase Auth에는 회원가입 화면을 두지 않고, 대시보드에서
--    Authentication > Users로 계정을 만든 뒤 이 테이블에 role을
--    한 줄 등록해야 그 계정이 "관리자"로 인식됩니다.
-- ============================================================
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'super_admin'
    check (role in ('super_admin', 'registration_staff', 'message_manager', 'viewer')),
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

-- 본인 role 행만 조회 가능 (다른 관리자 목록은 볼 수 없음)
drop policy if exists "admin can read own row" on public.admin_users;
create policy "admin can read own row"
  on public.admin_users
  for select
  to authenticated
  using (auth.uid() = user_id);

-- ============================================================
-- 3. is_admin(): RLS 정책에서 재사용하는 권한 확인 함수
--    security definer로 선언해 admin_users의 RLS를 우회해서
--    "요청자가 admin_users에 등록돼 있는지"를 판별합니다.
-- ============================================================
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.admin_users where user_id = auth.uid()
  );
$$;

-- ============================================================
-- 4. registrations RLS 정책
--    - 일반 사용자(익명 포함): INSERT만 가능, checkin/sms 관련 값은
--      직접 true/성공 상태로 넣을 수 없도록 WITH CHECK로 제한
--    - 관리자: SELECT/UPDATE 가능 (DELETE 정책 없음 = 기본 차단)
-- ============================================================
drop policy if exists "public can insert registrations" on public.registrations;
create policy "public can insert registrations"
  on public.registrations
  for insert
  to anon, authenticated
  with check (
    coalesce(checkin, false) = false
    and coalesce(sms_status, 'pending') = 'pending'
  );

drop policy if exists "admins can select registrations" on public.registrations;
create policy "admins can select registrations"
  on public.registrations
  for select
  to authenticated
  using (public.is_admin());

drop policy if exists "admins can update registrations" on public.registrations;
create policy "admins can update registrations"
  on public.registrations
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================
-- 5. 관리자 계정을 admin_users에 등록하는 방법
--    ① Supabase 대시보드 > Authentication > Users > Add user 로
--       이메일/비밀번호 계정을 먼저 만드세요.
--    ② 만들어진 사용자의 UUID를 복사해서 아래 INSERT의
--       '00000000-0000-0000-0000-000000000000' 자리에 넣고 실행하세요.
-- ============================================================
-- insert into public.admin_users (user_id, role)
-- values ('00000000-0000-0000-0000-000000000000', 'super_admin')
-- on conflict (user_id) do update set role = excluded.role;
