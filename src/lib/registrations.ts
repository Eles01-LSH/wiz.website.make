import "server-only";
import { randomUUID } from "crypto";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export type ParticipantCategory = "medical" | "public" | "etc";
export type SmsStatus = "pending" | "sent" | "failed";

/** 문자 발송 종류: 사전예약 확인 / 행사 하루전날 안내 / 행사 당일 안내 */
export type SmsKind = "registration" | "reminder" | "dday";

export type Registration = {
  id: string;
  name: string;
  organization: string;
  department: string;
  position: string;
  phone: string;
  email: string;
  category: ParticipantCategory;
  meal: boolean;
  checkin: boolean;
  smsStatus: SmsStatus;
  smsSentAt: string | null;
  smsError: string | null;
  reminderSmsStatus: SmsStatus;
  reminderSmsSentAt: string | null;
  reminderSmsError: string | null;
  ddaySmsStatus: SmsStatus;
  ddaySmsSentAt: string | null;
  ddaySmsError: string | null;
  createdAt: string;
};

export type RegistrationInput = {
  name: string;
  organization?: string;
  department?: string;
  position?: string;
  phone: string;
  email?: string;
  category?: ParticipantCategory;
  meal?: boolean;
};

type RegistrationRow = {
  id: string;
  name: string;
  organization: string;
  department: string;
  position: string;
  phone: string;
  email: string;
  category: ParticipantCategory;
  meal: boolean;
  checkin: boolean;
  sms_status: SmsStatus;
  sms_sent_at: string | null;
  sms_error: string | null;
  reminder_sms_status: SmsStatus;
  reminder_sms_sent_at: string | null;
  reminder_sms_error: string | null;
  dday_sms_status: SmsStatus;
  dday_sms_sent_at: string | null;
  dday_sms_error: string | null;
  created_at: string;
};

const SELECT_COLUMNS =
  "id, name, organization, department, position, phone, email, category, meal, checkin, sms_status, sms_sent_at, sms_error, reminder_sms_status, reminder_sms_sent_at, reminder_sms_error, dday_sms_status, dday_sms_sent_at, dday_sms_error, created_at";

function toRegistration(row: RegistrationRow): Registration {
  return {
    id: row.id,
    name: row.name,
    organization: row.organization,
    department: row.department,
    position: row.position,
    phone: row.phone,
    email: row.email,
    category: row.category,
    meal: row.meal,
    checkin: row.checkin,
    smsStatus: row.sms_status,
    smsSentAt: row.sms_sent_at,
    smsError: row.sms_error,
    reminderSmsStatus: row.reminder_sms_status,
    reminderSmsSentAt: row.reminder_sms_sent_at,
    reminderSmsError: row.reminder_sms_error,
    ddaySmsStatus: row.dday_sms_status,
    ddaySmsSentAt: row.dday_sms_sent_at,
    ddaySmsError: row.dday_sms_error,
    createdAt: row.created_at,
  };
}

/** 관리자 세션(RLS: is_admin())으로만 성공한다. */
export async function getRegistrations(): Promise<Registration[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("registrations")
    .select(SELECT_COLUMNS)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data as RegistrationRow[]).map(toRegistration);
}

/** 대시보드 요약 카운트. 행 데이터는 내려받지 않고 개수만 센다. */
export async function getRegistrationStats() {
  const supabase = await createClient();

  const [{ count: total }, { count: checkedIn }, { count: smsSent }, { count: smsFailed }] =
    await Promise.all([
      supabase.from("registrations").select("id", { count: "exact", head: true }),
      supabase
        .from("registrations")
        .select("id", { count: "exact", head: true })
        .eq("checkin", true),
      supabase
        .from("registrations")
        .select("id", { count: "exact", head: true })
        .eq("sms_status", "sent"),
      supabase
        .from("registrations")
        .select("id", { count: "exact", head: true })
        .eq("sms_status", "failed"),
    ]);

  return {
    total: total ?? 0,
    checkedIn: checkedIn ?? 0,
    smsSent: smsSent ?? 0,
    smsFailed: smsFailed ?? 0,
  };
}

/**
 * 공개 사전등록 폼에서 호출. RLS가 checkin=false / sms_status='pending'을 강제한다.
 * 익명 제출자는 SELECT 권한이 없어(관리자만 명단 조회 가능) INSERT 후 RETURNING으로
 * 방금 넣은 행을 되읽을 수 없다 — 그래서 select()를 붙이지 않고, id는 미리 직접 생성해
 * 넣은 뒤 입력값 그대로 조합해 반환한다. (RLS를 느슨하게 풀지 않기 위한 의도적인 설계.)
 */
export async function addRegistration(input: RegistrationInput): Promise<Registration> {
  const supabase = await createClient();

  const id = randomUUID();
  const row = {
    id,
    name: input.name.trim(),
    organization: input.organization?.trim() ?? "",
    department: input.department?.trim() ?? "",
    position: input.position?.trim() ?? "",
    phone: input.phone.trim(),
    email: input.email?.trim() ?? "",
    category: input.category ?? "etc",
    meal: input.meal ?? false,
  };

  const { error } = await supabase.from("registrations").insert(row);
  if (error) throw new Error(error.message);

  return {
    id,
    name: row.name,
    organization: row.organization,
    department: row.department,
    position: row.position,
    phone: row.phone,
    email: row.email,
    category: row.category,
    meal: row.meal,
    checkin: false,
    smsStatus: "pending",
    smsSentAt: null,
    smsError: null,
    reminderSmsStatus: "pending",
    reminderSmsSentAt: null,
    reminderSmsError: null,
    ddaySmsStatus: "pending",
    ddaySmsSentAt: null,
    ddaySmsError: null,
    createdAt: new Date().toISOString(),
  };
}

const SMS_COLUMNS: Record<SmsKind, { status: string; sentAt: string; error: string }> = {
  registration: { status: "sms_status", sentAt: "sms_sent_at", error: "sms_error" },
  reminder: {
    status: "reminder_sms_status",
    sentAt: "reminder_sms_sent_at",
    error: "reminder_sms_error",
  },
  dday: { status: "dday_sms_status", sentAt: "dday_sms_sent_at", error: "dday_sms_error" },
};

/**
 * 문자 발송 결과를 기록한다. kind로 사전예약 확인 / 하루전날 안내 / 당일 안내 중
 * 어느 문자인지 구분해 서로 다른 컬럼에 기록한다 (한 사람이 세 종류를 각각 받을 수 있음).
 * 익명 등록 직후(관리자 세션이 없는 상태)에도 호출되므로 RLS를 우회하는
 * service-role 클라이언트를 쓴다.
 */
export async function updateSmsStatus(
  kind: SmsKind,
  id: string,
  status: SmsStatus,
  errorMessage?: string
): Promise<void> {
  const columns = SMS_COLUMNS[kind];
  const supabase = createAdminClient();
  await supabase
    .from("registrations")
    .update({
      [columns.status]: status,
      [columns.sentAt]: status === "sent" ? new Date().toISOString() : null,
      [columns.error]: status === "failed" ? (errorMessage ?? "알 수 없는 오류") : null,
    })
    .eq("id", id);
}

export async function setCheckin(id: string, checkin: boolean): Promise<Registration | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("registrations")
    .update({ checkin })
    .eq("id", id)
    .select(SELECT_COLUMNS)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data ? toRegistration(data as RegistrationRow) : null;
}
