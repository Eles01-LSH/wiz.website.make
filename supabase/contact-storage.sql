-- WIZ CNI 문의 폼 첨부파일 저장소 — Supabase Storage 버킷 + 정책
-- Supabase 대시보드 > SQL Editor 에서 전체를 한 번에 실행하세요.
-- (이미 실행한 뒤 다시 실행해도 안전하도록 IF NOT EXISTS / ON CONFLICT로 작성했습니다.)

-- ============================================================
-- 1. contact-attachments 버킷 생성 (비공개)
--    Vercel 서버리스 함수의 요청 크기 제한(약 4.5MB)을 우회하기 위해,
--    브라우저가 이 버킷에 파일을 "직접" 업로드하고, 이메일에는
--    서버가 생성한 서명된(signed) 링크만 담아 보낸다.
-- ============================================================
insert into storage.buckets (id, name, public)
values ('contact-attachments', 'contact-attachments', false)
on conflict (id) do nothing;

-- ============================================================
-- 2. 익명(문의 작성자)은 업로드(INSERT)만 가능, 조회/수정/삭제는 불가.
--    실제 다운로드는 서버가 service-role 키로 생성한 서명 URL을 통해서만 이뤄진다
--    (그 URL은 RLS를 우회하므로 별도 SELECT 정책이 필요 없다).
-- ============================================================
drop policy if exists "anyone can upload contact attachments" on storage.objects;
create policy "anyone can upload contact attachments"
  on storage.objects
  for insert
  to anon, authenticated
  with check (bucket_id = 'contact-attachments');
