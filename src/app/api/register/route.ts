import { NextResponse } from "next/server";
import { addRegistration, type ParticipantCategory } from "@/lib/registrations";
import { notifyRegistrationCreated } from "@/lib/notifications";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CATEGORY_VALUES: ParticipantCategory[] = ["medical", "public", "etc"];

type RegisterBody = {
  name?: unknown;
  organization?: unknown;
  department?: unknown;
  position?: unknown;
  phone?: unknown;
  email?: unknown;
  category?: unknown;
  meal?: unknown;
  consent?: unknown;
};

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: RegisterBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "요청 형식이 올바르지 않습니다." },
      { status: 400 }
    );
  }

  const name = asTrimmedString(body.name);
  const organization = asTrimmedString(body.organization);
  const department = asTrimmedString(body.department);
  const position = asTrimmedString(body.position);
  const phone = asTrimmedString(body.phone);
  const email = asTrimmedString(body.email);
  const rawCategory = asTrimmedString(body.category);
  const category = CATEGORY_VALUES.includes(rawCategory as ParticipantCategory)
    ? (rawCategory as ParticipantCategory)
    : "etc";
  const meal = body.meal === true;
  const consent = body.consent === true;

  if (!name) {
    return NextResponse.json(
      { error: "이름을 입력해 주세요." },
      { status: 400 }
    );
  }

  if (!phone) {
    return NextResponse.json(
      { error: "연락처를 입력해 주세요." },
      { status: 400 }
    );
  }

  if (email && !EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: "이메일 형식이 올바르지 않습니다." },
      { status: 400 }
    );
  }

  if (!consent) {
    return NextResponse.json(
      { error: "개인정보 수집 및 이용에 동의해 주세요." },
      { status: 400 }
    );
  }

  try {
    const registration = await addRegistration({
      name,
      organization,
      department,
      position,
      phone,
      email,
      category,
      meal,
    });

    await notifyRegistrationCreated(registration);

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("register failed:", err);
    return NextResponse.json(
      { error: "등록 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." },
      { status: 500 }
    );
  }
}
