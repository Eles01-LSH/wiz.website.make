import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

// Server Component / Route Handler 전용. 로그인한 관리자의 세션 쿠키를 그대로
// 실어서 요청하므로, RLS가 "authenticated + is_admin()" 여부를 그대로 판단한다.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Component에서 호출된 경우 쿠키를 쓸 수 없다.
            // middleware가 세션 갱신을 담당하므로 무시해도 안전하다.
          }
        },
      },
    }
  );
}
