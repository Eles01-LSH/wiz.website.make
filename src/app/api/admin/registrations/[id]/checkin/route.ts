import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/auth";
import { setCheckin } from "@/lib/registrations";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if ("response" in auth) return auth.response;

  const { id } = await params;

  let body: { checkin?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "요청 형식이 올바르지 않습니다." },
      { status: 400 }
    );
  }

  if (typeof body.checkin !== "boolean") {
    return NextResponse.json(
      { error: "checkin 값이 필요합니다." },
      { status: 400 }
    );
  }

  const registration = await setCheckin(id, body.checkin);

  if (!registration) {
    return NextResponse.json(
      { error: "등록 정보를 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  return NextResponse.json({ ok: true, registration });
}
