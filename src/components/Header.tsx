"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { label: "ABOUT", href: "/about" },
  { label: "SERVICES", href: "/services" },
  { label: "VOUCHER", href: "/voucher" },
  { label: "PORTFOLIO", href: "/portfolio" },
  { label: "CONTACT", href: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20 md:px-10">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/wiz-icon.png"
            alt="WIZ CNI"
            width={135}
            height={59}
            priority
            className="h-7 w-auto md:h-8"
          />
          <span className="text-xl font-black tracking-tight text-ink">WIZ CNI</span>
        </Link>

        <nav className="hidden items-center justify-between md:mx-auto md:flex md:max-w-md md:flex-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/80 transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="hidden items-center rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-ink md:inline-flex"
        >
          PROJECT INQUIRY
        </Link>

        <button
          type="button"
          aria-label="메뉴 열기"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-6 bg-ink transition-transform ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-ink transition-transform ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-paper px-6 pb-8 pt-4 md:hidden">
          <nav className="flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-semibold text-ink"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex w-fit items-center rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-paper"
            >
              PROJECT INQUIRY
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
