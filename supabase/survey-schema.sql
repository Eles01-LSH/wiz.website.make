-- 2026년 지역필수의료 현장 의견수렴 — survey_responses 테이블 + RLS 정책
-- Supabase 대시보드 > SQL Editor 에서 실행하세요.
-- 기존 survey_responses 테이블(이전 설문 구조)을 지우고 새 구조로 다시 만듭니다.

drop table if exists public.survey_responses;

create table public.survey_responses (
  id uuid primary key default gen_random_uuid(),

  -- Ⅰ. 응답자 기본현황
  org_type text not null check (
    org_type in (
      'tertiary_general', 'general_hospital', 'regional_medical_center', 'clinic',
      'health_center', 'government', 'academic', 'etc'
    )
  ),
  org_type_etc text not null default '',
  region text not null check (
    region in ('gwangju', 'jeonnam', 'gwangju_jeonnam', 'etc')
  ),
  region_etc text not null default '',

  -- Ⅱ. 심포지엄 관련 질문 및 현장 의견 (자유서술, 선택)
  policy_question text not null default '',
  priority_task text not null default '',

  -- Ⅲ. 향후 심포지엄 및 협력사업 운영 방향
  future_format text not null check (
    future_format in (
      'regional_symposium', 'field_small_symposium', 'practice_workshop',
      'joint_discussion', 'online_hybrid', 'existing_council', 'etc'
    )
  ),
  additional_topics text not null default '',
  operation_feedback text not null default '',

  created_at timestamptz not null default now()
);

create index survey_responses_created_at_idx on public.survey_responses (created_at desc);

alter table public.survey_responses enable row level security;

-- 누구나(익명 포함) 제출 가능 — 조회는 불가
create policy "public can insert survey responses"
  on public.survey_responses
  for insert
  to anon, authenticated
  with check (true);

-- 관리자만 전체 응답 조회 가능 (schema.sql의 is_admin() 재사용)
create policy "admins can select survey responses"
  on public.survey_responses
  for select
  to authenticated
  using (public.is_admin());
