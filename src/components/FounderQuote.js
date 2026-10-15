import Image from "next/image";
import { siteInfo } from "@/lib/content";

/**
 * Founder message block without a photo — we don't currently have a clean,
 * professional headshot of the founder (only a festival-greeting graphic
 * with decorative borders/text, which isn't usable). This uses the school
 * crest + a styled pull-quote instead. Swap in a real portrait photo here
 * once the school supplies one (see README "Known gaps").
 */
export default function FounderQuote({ quote, compact = false }) {
  return (
    <div className={`flex ${compact ? "flex-col items-center text-center" : "flex-col sm:flex-row items-center sm:items-start"} gap-6`}>
      <div className="shrink-0 w-[110px] h-[110px] rounded-full bg-navy flex items-center justify-center shadow-xl border-4 border-gold/70">
        <Image src="/images/logo.png" alt="School crest" width={72} height={72} />
      </div>
      <div className={compact ? "" : ""}>
        <blockquote className={`font-serif text-navy leading-relaxed mb-3 ${compact ? "text-[18px]" : "text-[20px] sm:text-[23px]"}`}>
          &ldquo;{quote}&rdquo;
        </blockquote>
        <div className="text-maroon font-bold uppercase text-[13px] tracking-wide">
          {siteInfo.founder.name} &mdash; {siteInfo.founder.role}
        </div>
      </div>
    </div>
  );
}
