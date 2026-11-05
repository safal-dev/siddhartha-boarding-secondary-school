import Image from "next/image";
import { siteInfo } from "@/lib/content";

export const metadata = {
  title: "Coming Soon | Siddhartha Boarding Secondary School",
  description:
    "The new Siddhartha Boarding Secondary School website is on its way. Check back soon.",
  robots: { index: false, follow: false },
};

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-navy-dark text-white flex flex-col relative overflow-hidden">
      {/* Decorative background glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-[0.07]"
        style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute bottom-[-200px] right-[-150px] w-[500px] h-[500px] rounded-full opacity-[0.06]"
        style={{ background: "radial-gradient(circle, var(--maroon) 0%, transparent 70%)" }}
      />

      <div className="relative flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-xl w-full text-center">
          <div className="mx-auto mb-7 w-[110px] h-[110px] relative">
            <Image src="/images/logo.png" alt="School crest" fill className="object-contain" priority />
          </div>

          <p className="italic text-[13px] sm:text-[14px] text-[#e9d9a7] tracking-wide mb-3">
            &ldquo;{siteInfo.motto}&rdquo;
          </p>

          <h1 className="font-serif text-[26px] sm:text-[32px] leading-tight mb-1">
            Siddhartha Boarding Secondary School
          </h1>
          <p className="text-[12.5px] uppercase tracking-[0.16em] text-gold font-semibold mb-10">
            Est. {siteInfo.established.split(" ")[0]} &middot; Kawasoti-3, Nawalpur
          </p>

          <div className="w-14 h-[3px] bg-gold mx-auto mb-8" />

          <h2 className="font-serif text-[30px] sm:text-[38px] mb-4">Something New is Coming</h2>
          <p className="text-[15px] sm:text-[16px] text-[#c3c9e6] leading-relaxed max-w-md mx-auto mb-10">
            We&rsquo;re putting the finishing touches on our new website. Thank you for your
            patience &mdash; please check back soon.
          </p>

          <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-[13.5px] text-[#9ba4c9] border-t border-white/10 pt-6">
            <span>{siteInfo.phones[0]}</span>
            <span className="hidden sm:inline text-white/20">&bull;</span>
            <span>{siteInfo.address}</span>
          </div>
        </div>
      </div>

      <div className="relative text-center text-[11.5px] text-[#6b729a] pb-6">
        &copy; 2025 Siddhartha Boarding Secondary School, Nawalpur.
      </div>
    </div>
  );
}
