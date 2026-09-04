import { CONTACT_INFO } from "@/data/contact";

export default function Footer() {
  const [tel, email, address] = CONTACT_INFO;

  return (
    <footer className="mt-auto px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-black text-ink">WIZ CNI</p>
          <p className="mt-1 text-xs text-muted">Creative Media Production &amp; Technology</p>
        </div>

        <div className="text-xs text-muted">
          {address.value} · T. {tel.value} · E. {email.value}
        </div>

        <p className="text-xs text-muted">
          © {new Date().getFullYear()} WIZ CNI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
