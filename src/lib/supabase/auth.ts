import "server-only";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export type AdminRole = "super_admin" | "registration_staff" | "message_manager" | "viewer";

export async function getAdminSession() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { user: null, role: null, supabase };
  }

  const { data: adminRow } = await supabase
    .from("admin_users")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();

  return { user, role: (adminRow?.role as AdminRole | undefined) ?? null, supabase };
}

/**
 * API 라우트 맨 앞에서 호출한다. 세션이 없으면 401, 세션은 있지만
 * admin_users에 등록되지 않았거나(role 없음) 허용된 role이 아니면 403을 반환한다.
 * 향후 역할별 API를 늘릴 때 requireAdmin(["message_manager", "super_admin"]) 형태로 사용한다.
 */
export async function requireAdmin(allowedRoles?: AdminRole[]) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return {
      response: NextResponse.json(
        { error: "관리자 인증이 아직 설정되지 않았습니다. (Supabase 미연결)" },
        { status: 401 }
      ),
    } as const;
  }

  const { user, role, supabase } = await getAdminSession();

  if (!user) {
    return {
      response: NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 }),
    } as const;
  }

  if (!role || (allowedRoles && !allowedRoles.includes(role))) {
    return {
      response: NextResponse.json({ error: "권한이 없습니다." }, { status: 403 }),
    } as const;
  }

  return { user, role, supabase } as const;
}
