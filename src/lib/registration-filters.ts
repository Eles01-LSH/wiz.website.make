import type { Registration } from "@/lib/registrations";

export type CategoryFilter = "all" | "medical" | "public" | "etc";
export type CheckinFilter = "all" | "done" | "pending";
export type SmsFilter = "all" | "sent" | "failed";

export type RegistrationFilters = {
  q: string;
  category: CategoryFilter;
  checkin: CheckinFilter;
  sms: SmsFilter;
};

export const DEFAULT_FILTERS: RegistrationFilters = {
  q: "",
  category: "all",
  checkin: "all",
  sms: "all",
};

export const CATEGORY_LABELS: Record<Registration["category"], string> = {
  medical: "의료기관",
  public: "공공기관",
  etc: "기타",
};

export function filterRegistrations(
  registrations: Registration[],
  filters: RegistrationFilters
): Registration[] {
  const q = filters.q.trim().toLowerCase();

  return registrations.filter((r) => {
    if (q) {
      const haystack = `${r.name} ${r.organization} ${r.phone}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    if (filters.category !== "all" && r.category !== filters.category) return false;
    if (filters.checkin === "done" && !r.checkin) return false;
    if (filters.checkin === "pending" && r.checkin) return false;
    if (filters.sms === "sent" && r.smsStatus !== "sent") return false;
    if (filters.sms === "failed" && r.smsStatus !== "failed") return false;

    return true;
  });
}
