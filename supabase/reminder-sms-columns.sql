-- WIZ CNI 사전등록 시스템 — 하루전날/당일 안내문자 상태 컬럼 추가
-- Supabase 대시보드 > SQL Editor 에서 전체를 한 번에 실행하세요.
-- (이미 실행한 뒤 다시 실행해도 안전하도록 IF NOT EXISTS로 작성했습니다.)

alter table public.registrations
  add column if not exists reminder_sms_status text not null default 'pending'
    check (reminder_sms_status in ('pending', 'sent', 'failed')),
  add column if not exists reminder_sms_sent_at timestamptz,
  add column if not exists reminder_sms_error text,
  add column if not exists dday_sms_status text not null default 'pending'
    check (dday_sms_status in ('pending', 'sent', 'failed')),
  add column if not exists dday_sms_sent_at timestamptz,
  add column if not exists dday_sms_error text;

-- 기존 "admins can update registrations" RLS 정책이 테이블 전체 UPDATE를 허용하므로
-- 새 컬럼에도 그대로 적용된다 (별도 정책 추가 불필요).
