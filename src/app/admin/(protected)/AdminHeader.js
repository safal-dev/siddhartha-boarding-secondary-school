"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleLogout() {
    setBusy(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      router.replace("/admin/login");
      router.refresh();
    }
  }

  return (
    <header className="bg-navy text-white">
      <div className="container-page flex items-center justify-between py-4">
        <Link href="/admin" className="flex items-center gap-3">
          <Image src="/images/logo.png" alt="School crest" width={34} height={34} />
          <div>
            <div className="font-serif text-[16px] leading-tight">Siddhartha CMS</div>
            <div className="text-[11px] text-[#9ba4c9]">Content management</div>
          </div>
        </Link>
        <nav className="flex items-center gap-6 text-[13.5px] font-semibold">
          <Link href="/admin" className={pathname === "/admin" ? "text-gold" : "text-[#c3c9e6] hover:text-white"}>
            Dashboard
          </Link>
          <Link
            href="/admin/notices"
            className={pathname.startsWith("/admin/notices") ? "text-gold" : "text-[#c3c9e6] hover:text-white"}
          >
            Notices
          </Link>
          <Link
            href="/admin/gallery"
            className={pathname.startsWith("/admin/gallery") ? "text-gold" : "text-[#c3c9e6] hover:text-white"}
          >
            Gallery
          </Link>
          <Link
            href="/admin/student-voice"
            className={pathname.startsWith("/admin/student-voice") ? "text-gold" : "text-[#c3c9e6] hover:text-white"}
          >
            Videos
          </Link>
          <Link href="/" target="_blank" className="text-[#c3c9e6] hover:text-white">
            View Site ↗
          </Link>
          <button onClick={handleLogout} disabled={busy} className="text-[#f3c6c6] hover:text-white disabled:opacity-50">
            {busy ? "Signing out…" : "Log Out"}
          </button>
        </nav>
      </div>
    </header>
  );
}
