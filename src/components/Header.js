"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks, siteInfo } from "@/lib/content";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-navy-dark text-[13px] text-[#cfd4e6]">
        <div className="container-page flex items-center justify-between py-2">
          <span>
            {siteInfo.phones[0]} &nbsp;&middot;&nbsp; {siteInfo.phones[1]}
          </span>
          <span className="hidden sm:inline">{siteInfo.address}</span>
        </div>
      </div>

      <header className="bg-white border-b-[3px] border-gold sticky top-0 z-50">
        <div className="container-page flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3.5">
            <Image src="/images/logo.png" alt="School crest" width={54} height={54} />
            <div>
              <div className="font-bold text-navy leading-tight text-[17px] sm:text-[19px] font-serif">
                Siddhartha Boarding
                <br />
                Secondary School
              </div>
              <div className="text-[11px] uppercase tracking-wider text-maroon font-semibold">
                Est. {siteInfo.established.split(" ")[0]} &middot; Nawalpur
              </div>
            </div>
          </Link>

          <nav className="hidden lg:block">
            <ul className="flex gap-7 font-semibold text-[14.5px] text-navy">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`hover:text-maroon transition-colors ${
                      pathname === l.href ? "text-maroon" : ""
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link href="/admissions" className="btn-maroon hidden lg:inline-block !py-2.5 !px-5 text-[14px]">
            Apply Now
          </Link>

          <button
            className="lg:hidden text-navy font-bold text-2xl"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        {open && (
          <div className="lg:hidden border-t border-line bg-white">
            <ul className="container-page py-4 flex flex-col gap-4 font-semibold text-navy">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={() => setOpen(false)}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/admissions" className="btn-maroon inline-block" onClick={() => setOpen(false)}>
                  Apply Now
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
}
