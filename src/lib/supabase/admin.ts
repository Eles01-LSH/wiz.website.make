import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Service Role Key를 쓰는 서버 전용 클라이언트. RLS를 완전히 우회하므로
 * 브라우저로 절대 전달되지 않는 코드(Route Handler, 서버 스크립트, 향후
 * SOLAPI 발송 잡 등)에서만 사용한다. "use client" 컴포넌트에서 import 금지.
 */
export function createAdminClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY 환경변수가 설정되지 않았습니다.");
  }

  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceRoleKey,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
