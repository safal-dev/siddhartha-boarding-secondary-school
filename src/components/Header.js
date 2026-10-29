"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks, siteInfo } from "@/lib/content";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

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
              <div className="hidden sm:block italic text-[8.5px] sm:text-[9px] text-maroon/90 leading-tight tracking-wide mb-0.5">
                &ldquo;{siteInfo.motto}&rdquo;
              </div>
              <div className="font-bold text-navy leading-tight text-[17px] sm:text-[19px] font-serif">
                Siddhartha Boarding
                <br />
                Secondary School
              </div>
              <div className="text-[11px] uppercase tracking-wider text-maroon font-semibold">
                Est. {siteInfo.established.split(" ")[0]} &middot; Kawasoti-3, Nawalpur
              </div>
            </div>
          </Link>

          <nav className="hidden lg:block">
            <ul className="flex gap-7 font-semibold text-[14.5px] text-navy">
              {navLinks.map((l) =>
                l.children ? (
                  <li
                    key={l.label}
                    className="relative"
                    onMouseEnter={() => setResourcesOpen(true)}
                    onMouseLeave={() => setResourcesOpen(false)}
                  >
                    <button
                      type="button"
                      onClick={() => setResourcesOpen((v) => !v)}
                      className={`flex items-center gap-1 hover:text-maroon transition-colors ${
                        l.children.some((c) => c.href === pathname) ? "text-maroon" : ""
                      }`}
                      aria-expanded={resourcesOpen}
                    >
                      {l.label}
                      <span className="text-[10px] mt-0.5">▾</span>
                    </button>
                    {resourcesOpen && (
                      <ul className="absolute left-0 top-full pt-2 w-44">
                        <div className="bg-white border border-line shadow-lg py-2">
                          {l.children.map((c) => (
                            <li key={c.href}>
                              <Link
                                href={c.href}
                                className={`block px-4 py-2 hover:bg-cream hover:text-maroon transition-colors ${
                                  pathname === c.href ? "text-maroon" : "text-navy"
                                }`}
                              >
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </div>
                      </ul>
                    )}
                  </li>
                ) : (
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
                )
              )}
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
              {navLinks.map((l) =>
                l.children ? (
                  <li key={l.label}>
                    <button
                      type="button"
                      className="flex items-center gap-1.5 w-full"
                      onClick={() => setMobileResourcesOpen((v) => !v)}
                      aria-expanded={mobileResourcesOpen}
                    >
                      {l.label}
                      <span className="text-[11px]">{mobileResourcesOpen ? "▴" : "▾"}</span>
                    </button>
                    {mobileResourcesOpen && (
                      <ul className="mt-3 ml-3 flex flex-col gap-3 text-[14.5px] font-medium text-gray-700 border-l border-line pl-4">
                        {l.children.map((c) => (
                          <li key={c.href}>
                            <Link href={c.href} onClick={() => setOpen(false)}>
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ) : (
                  <li key={l.href}>
                    <Link href={l.href} onClick={() => setOpen(false)}>
                      {l.label}
                    </Link>
                  </li>
                )
              )}
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
