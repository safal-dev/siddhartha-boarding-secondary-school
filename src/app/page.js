import Image from "next/image";
import Link from "next/link";
import { academicLadder, facilities, siteInfo, stats } from "@/lib/content";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/campus-hero.jpg"
            alt="Siddhartha Boarding Secondary School campus"
            fill
            priority
            className="object-cover opacity-30"
          />
        </div>
        <div className="relative container-page pt-20 pb-24 sm:pt-28 sm:pb-28 text-center">
          <div className="w-[92px] h-[92px] bg-white rounded-full mx-auto mb-7 flex items-center justify-center shadow-2xl">
            <Image src="/images/logo.png" alt="School crest" width={72} height={72} />
          </div>
          <h1 className="text-[32px] sm:text-[46px] leading-tight max-w-3xl mx-auto mb-5 font-serif">
            Shaping Character, Knowledge &amp; Service Since 1989
          </h1>
          <p className="italic text-[17px] sm:text-[19px] text-[#e9d9a7] max-w-xl mx-auto mb-9">
            &ldquo;{siteInfo.motto}&rdquo;
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/admissions" className="btn-gold">
              Apply for Admission
            </Link>
            <Link href="/campus-life" className="btn-outline">
              Visit the Campus
            </Link>
          </div>
          <div className="inline-block mt-9 text-[12.5px] uppercase tracking-[0.12em] text-[#cfd4e6] border-t border-white/25 pt-5">
            Established {siteInfo.established} &nbsp;|&nbsp; NEB Affiliated &nbsp;|&nbsp; Nursery &ndash; Grade 12
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="bg-white border-b border-line">
        <div className="container-page grid grid-cols-2 sm:grid-cols-4 text-center py-9">
          {stats.map((s, i) => (
            <div key={s.label} className={i > 0 ? "sm:border-l border-line" : ""}>
              <div className="font-serif text-[28px] sm:text-[32px] text-maroon font-bold">{s.num}</div>
              <div className="text-[11.5px] sm:text-[12.5px] uppercase tracking-wider text-gray-500 mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WELCOME / MOTTO-LED INTRO */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="container-page grid sm:grid-cols-2 gap-12 items-center">
          <div>
            <div className="section-kicker">Welcome to Siddhartha</div>
            <h2 className="text-[26px] sm:text-[32px] text-navy mb-4">
              A School Built to Give Back
            </h2>
            <div className="section-divider" />
            <p className="text-[15.5px] text-gray-700 leading-relaxed mb-4">
              For more than 35 years, Siddhartha Boarding Secondary School has guided children
              of Kawasoti from their very first lesson to their final board exam &mdash; not
              just to pass, but to grow into citizens who put their learning to work for others.
            </p>
            <p className="text-[15.5px] text-gray-700 leading-relaxed">
              Our motto, <em>&ldquo;{siteInfo.motto}&rdquo;</em>, is not a slogan on a wall.
              It shapes how we teach: discussion over rote memorization, discipline alongside
              compassion, and a constant reminder that every student who leaves our gates carries
              a responsibility to their country and to those who have less.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Image src="/images/students-1.jpg" alt="Students at a school event" width={400} height={400} className="rounded-sm object-cover h-full w-full shadow-lg" />
            <Image src="/images/campus-1.jpg" alt="Campus building" width={400} height={400} className="rounded-sm object-cover h-full w-full shadow-lg mt-8" />
          </div>
        </div>
      </section>

      {/* FOUNDER MESSAGE */}
      <section className="bg-white border-t border-b border-line py-16 sm:py-20">
        <div className="container-page grid sm:grid-cols-[260px_1fr] gap-11 items-center">
          <Image
            src="/images/founder.jpg"
            alt="Bhoj Raj Dahal, Founder and Principal"
            width={260}
            height={320}
            className="rounded border-[6px] border-white shadow-2xl object-cover w-full"
          />
          <div>
            <div className="section-kicker">From the Founder&rsquo;s Desk</div>
            <blockquote className="font-serif text-[20px] sm:text-[23px] text-navy leading-relaxed mb-4">
              &ldquo;We built this school on one belief &mdash; education is only complete when
              it is used to serve the nation and the poor. Every child who walks through our
              gates carries that duty forward.&rdquo;
            </blockquote>
            <div className="text-maroon font-bold uppercase text-[13px] tracking-wide">
              {siteInfo.founder.name} &mdash; {siteInfo.founder.role}
            </div>
            <p className="text-[14.5px] text-gray-600 mt-3 max-w-xl">
              Beyond the classroom, {siteInfo.founder.name} has funded accident insurance for
              students at neighboring community schools and established a scholarship endowment
              in memory of his late parents &mdash; living proof of the school&rsquo;s own motto.
            </p>
          </div>
        </div>
      </section>

      {/* ACADEMIC LADDER */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="section-kicker">Academics</div>
          <h2 className="text-[26px] sm:text-[32px] text-navy mb-1">A Clear Path, Nursery to +2</h2>
          <div className="section-divider" />
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {academicLadder.map((step) => (
              <div key={step.step} className="bg-white border border-line border-t-4 border-t-navy p-5 text-center">
                <div className="font-serif font-bold text-maroon text-[20px]">{step.step}</div>
                <div className="font-semibold text-[14px] mt-1.5 text-navy">{step.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACHIEVEMENT BANNER */}
      <section className="bg-maroon text-white text-center py-16 sm:py-20">
        <div className="container-page">
          <div className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-[#f0c67f] mb-2">
            Results that speak
          </div>
          <h2 className="text-[26px] sm:text-[32px] text-white mb-6">
            Municipality-Topping SEE Results
          </h2>
          <Image
            src="/images/see-toppers.jpg"
            alt="SEE result toppers"
            width={560}
            height={560}
            className="max-w-[520px] w-full mx-auto border-[6px] border-white shadow-xl"
          />
        </div>
      </section>

      {/* FACILITIES PREVIEW */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="container-page">
          <div className="section-kicker">Campus &amp; Facilities</div>
          <h2 className="text-[26px] sm:text-[32px] text-navy mb-1">Everything a Growing Mind Needs</h2>
          <div className="section-divider" />
          <div className="grid sm:grid-cols-3 gap-6">
            {facilities.slice(0, 3).map((f) => (
              <div key={f.title} className="bg-white border border-line p-6">
                <div className="w-[42px] h-[42px] border-2 border-maroon rounded-full flex items-center justify-center text-maroon font-bold mb-3.5">
                  {f.title[0]}
                </div>
                <h3 className="text-[17px] text-navy mb-1.5 font-serif">{f.title}</h3>
                <p className="text-[14.5px] text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-9">
            <Link href="/campus-life" className="btn-outline-navy">
              See All Facilities
            </Link>
          </div>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="bg-white border-t border-line py-16 sm:py-20">
        <div className="container-page">
          <div className="section-kicker">Gallery</div>
          <h2 className="text-[26px] sm:text-[32px] text-navy mb-1">Campus Life</h2>
          <div className="section-divider" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              ["/images/campus-2.jpg", "Campus building"],
              ["/images/staff-1.jpg", "Faculty and staff"],
              ["/images/students-2.jpg", "Students at a school event"],
              ["/images/student-voice.jpg", "Student's Voice radio program"],
            ].map(([src, alt]) => (
              <Image key={src} src={src} alt={alt} width={300} height={200} className="h-[170px] w-full object-cover" />
            ))}
          </div>
          <div className="text-center mt-9">
            <Link href="/gallery" className="btn-outline-navy">
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-navy text-white text-center py-16 sm:py-20">
        <div className="container-page">
          <h2 className="text-[26px] sm:text-[32px] text-white mb-3">Ready to Join Our Community?</h2>
          <p className="text-[#c3c9e6] mb-7 max-w-lg mx-auto">
            Admissions for the new session are open. Reach out today to learn more about enrolling
            your child at Siddhartha Boarding Secondary School.
          </p>
          <Link href="/contact" className="btn-gold">
            Enquire About Admission
          </Link>
        </div>
      </section>
    </>
  );
}
