-- 심포지엄 만족도 설문 테이블 + RLS 정책 (실제 설문지 문항 기준으로 재구성)
-- Supabase 대시보드 > SQL Editor 에서 실행하세요.
-- 기존 survey_responses 테이블(임시 테스트 응답 포함)을 지우고 새 구조로 다시 만듭니다.

drop table if exists public.survey_responses;

create table public.survey_responses (
  id uuid primary key default gen_random_uuid(),

  -- Ⅰ. 응답자 일반사항
  org_type text not null check (
    org_type in (
      'administration', 'health_center', 'medical_institution',
      'designated_center', 'academic', 'etc'
    )
  ),
  org_type_etc text not null default '',
  job_type text not null check (
    job_type in (
      'doctor', 'nurse', 'social_worker', 'admin',
      'health_tech', 'research_education', 'etc'
    )
  ),
  job_type_etc text not null default '',

  -- Ⅱ. 심포지엄 만족도 (문항 3~8, 5점 척도)
  overall_score smallint not null check (overall_score between 1 and 5),
  relevance_score smallint not null check (relevance_score between 1 and 5),
  policy_understanding_score smallint not null check (policy_understanding_score between 1 and 5),
  field_presentation_score smallint not null check (field_presentation_score between 1 and 5),
  panel_discussion_score smallint not null check (panel_discussion_score between 1 and 5),
  operation_score smallint not null check (operation_score between 1 and 5),

  -- Ⅲ. 프로그램별 만족도 (문항 9, 8개 항목 각 5점 척도)
  program_scores smallint[] not null
    check (array_length(program_scores, 1) = 8)
    check (program_scores <@ array[1, 2, 3, 4, 5]::smallint[]),

  -- Ⅳ. 향후 운영 및 개선의견
  willingness_score smallint not null check (willingness_score between 1 and 5),
  topic_request text not null default '',
  most_helpful text not null default '',
  improvement text not null default '',

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
