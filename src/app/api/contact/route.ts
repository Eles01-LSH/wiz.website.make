import { NextResponse } from "next/server";
import { sendContactEmail, type ContactAttachment } from "@/lib/email";

type ContactRequestBody = {
  company?: unknown;
  contactName?: unknown;
  phone?: unknown;
  email?: unknown;
  projectType?: unknown;
  budget?: unknown;
  timeline?: unknown;
  message?: unknown;
  attachments?: unknown;
};

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isAttachment(value: unknown): value is ContactAttachment {
  return (
    !!value &&
    typeof value === "object" &&
    typeof (value as ContactAttachment).filename === "string" &&
    typeof (value as ContactAttachment).content === "string"
  );
}

export async function POST(request: Request) {
  let body: ContactRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "요청 형식이 올바르지 않습니다." }, { status: 400 });
  }

  const phone = asString(body.phone);
  const message = asString(body.message);

  if (!phone || !message) {
    return NextResponse.json({ error: "필수 항목이 누락되었습니다." }, { status: 400 });
  }

  const attachments = Array.isArray(body.attachments)
    ? body.attachments.filter(isAttachment)
    : [];

  try {
    await sendContactEmail({
      company: asString(body.company) || undefined,
      contactName: asString(body.contactName) || undefined,
      phone,
      email: asString(body.email) || undefined,
      projectType: asString(body.projectType) || undefined,
      budget: asString(body.budget) || undefined,
      timeline: asString(body.timeline) || undefined,
      message,
      attachments,
    });
  } catch (err) {
    console.error("contact email send failed:", err);
    return NextResponse.json({ error: "이메일 발송에 실패했습니다." }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
