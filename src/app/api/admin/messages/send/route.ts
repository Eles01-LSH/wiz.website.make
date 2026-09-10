import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/auth";
import { getRegistrations } from "@/lib/registrations";
import { sendBulkNotification, type BulkSmsKind } from "@/lib/notifications";

function isBulkSmsKind(value: unknown): value is BulkSmsKind {
  return value === "reminder" || value === "dday" || value === "etc";
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if ("response" in auth) return auth.response;

  let body: { kind?: unknown; ids?: unknown; message?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "요청 형식이 올바르지 않습니다." }, { status: 400 });
  }

  if (!isBulkSmsKind(body.kind)) {
    return NextResponse.json({ error: "발송 종류가 올바르지 않습니다." }, { status: 400 });
  }

  const ids = Array.isArray(body.ids)
    ? body.ids.filter((id): id is string => typeof id === "string")
    : [];

  if (ids.length === 0) {
    return NextResponse.json({ error: "발송 대상을 선택해 주세요." }, { status: 400 });
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message) {
    return NextResponse.json({ error: "문자 내용을 입력해 주세요." }, { status: 400 });
  }
  if (message.length > 2000) {
    return NextResponse.json({ error: "문자 내용이 너무 깁니다. (최대 2000자)" }, { status: 400 });
  }

  try {
    const all = await getRegistrations();
    const targets = all.filter((r) => ids.includes(r.id));

    if (targets.length === 0) {
      return NextResponse.json({ error: "발송 대상을 찾을 수 없습니다." }, { status: 404 });
    }

    const result = await sendBulkNotification(body.kind, targets, message);
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("bulk sms send failed:", err);
    const message = err instanceof Error ? err.message : "문자 발송에 실패했습니다.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
