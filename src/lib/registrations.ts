import "server-only";
import { createClient } from "@/lib/supabase/server";

export type ParticipantCategory = "medical" | "public" | "etc";
export type SmsStatus = "pending" | "sent" | "failed";

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
  created_at: string;
};

const SELECT_COLUMNS =
  "id, name, organization, department, position, phone, email, category, meal, checkin, sms_status, sms_sent_at, sms_error, created_at";

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

/** 공개 사전등록 폼에서 호출. RLS가 checkin=false / sms_status='pending'을 강제한다. */
export async function addRegistration(input: RegistrationInput): Promise<Registration> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("registrations")
    .insert({
      name: input.name.trim(),
      organization: input.organization?.trim() ?? "",
      department: input.department?.trim() ?? "",
      position: input.position?.trim() ?? "",
      phone: input.phone.trim(),
      email: input.email?.trim() ?? "",
      category: input.category ?? "etc",
      meal: input.meal ?? false,
    })
    .select(SELECT_COLUMNS)
    .single();

  if (error) throw new Error(error.message);
  return toRegistration(data as RegistrationRow);
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
