import Image from "next/image";
import Link from "next/link";
import { navLinks, siteInfo } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-[#c7cce0] pt-14 pb-6 text-[14px] mt-auto">
      <div className="container-page">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3.5">
              <Image src="/images/logo.png" alt="logo" width={42} height={42} className="bg-white rounded-full p-0.5" />
              <strong className="text-white font-serif text-[16px]">
                Siddhartha Boarding
                <br />
                Secondary School
              </strong>
            </div>
            <p>&ldquo;{siteInfo.motto}&rdquo;</p>
          </div>

          <div>
            <h4 className="text-white font-serif text-[16px] mb-3.5">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.slice(1).map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif text-[16px] mb-3.5">Contact</h4>
            <ul className="space-y-2">
              <li>{siteInfo.address}</li>
              <li>{siteInfo.phones.join(" / ")}</li>
              <li>
                <a href={siteInfo.facebook} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  facebook.com/kawasotisiddhartha
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-center text-[12.5px] text-[#8a90ad]">
          <span>© 2025 Siddhartha Boarding Secondary School, Nawalpur. All rights reserved.</span>
          <Link href="/admin/login" className="hover:text-white transition-colors">
            Staff Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
