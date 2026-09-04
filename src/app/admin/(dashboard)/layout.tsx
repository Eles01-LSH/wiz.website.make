import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/supabase/auth";
import LogoutButton from "@/components/admin/LogoutButton";

const NAV_LINKS = [
  { href: "/admin", label: "대시보드" },
  { href: "/admin/registrations", label: "참가자 관리" },
  { href: "/admin/messages", label: "문자 발송" },
];

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // middleware는 "세션이 있는지"만 본다. role까지는 여기서 한 번 더 확인해서
  // Supabase Auth 계정은 있지만 admin_users에 등록되지 않은 사용자를 차단한다.
  const { user, role } = await getAdminSession();
  if (!user || !role) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-mist">
      <header className="sticky top-0 z-40 border-b border-line bg-paper">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-8">
            <p className="text-sm font-black tracking-[0.2em] text-ink">WIZ CNI EVENT SYSTEM</p>
            <nav className="hidden items-center gap-5 md:flex">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-ink/70 transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted">{user?.email}</span>
            <LogoutButton />
          </div>
        </div>

        <nav className="flex items-center gap-4 overflow-x-auto border-t border-line px-6 py-2 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="shrink-0 text-xs font-semibold text-ink/70 transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
    </div>
  );
}
