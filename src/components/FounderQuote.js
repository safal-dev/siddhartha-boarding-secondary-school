import Image from "next/image";
import { siteInfo } from "@/lib/content";

/**
 * Founder message block — crest-framed portrait photo + pull-quote.
 * Uses the real portrait photo supplied by the school (public/images/founder.png).
 */
export default function FounderQuote({ quote, compact = false }) {
  return (
    <div className={`flex ${compact ? "flex-col items-center text-center" : "flex-col sm:flex-row items-center sm:items-start"} gap-7`}>
      <div className="shrink-0 w-[150px] h-[150px] sm:w-[170px] sm:h-[170px] rounded-full overflow-hidden shadow-2xl border-4 border-gold/80 bg-navy relative">
        <Image src="/images/founder.png" alt="Bhoj Raj Dahal, Founder and Principal" fill className="object-cover" />
      </div>
      <div>
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
