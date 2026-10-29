import Image from "next/image";
import { siteInfo } from "@/lib/content";

export const metadata = {
  title: "About Us | Siddhartha Boarding Secondary School",
  description: "History, mission, motto and founder's message from Siddhartha Boarding Secondary School, Kawasoti, Nawalpur.",
};

const timeline = [
  { year: "2046 B.S. (1989)", text: "Siddhartha Boarding Secondary School is founded in Kawasoti-3, Shivamandir, Nawalpur, under single ownership." },
  { year: "1990s–2000s", text: "The campus grows across 20 ropanis of land, adding science, computer and library facilities as enrollment rises." },
  { year: "2010s", text: "Separate academic blocks are built for primary, lower secondary, secondary and higher secondary levels." },
  { year: "2022", text: "The school celebrates its 33rd anniversary, honoring an unusual cohort: 13 pairs of twins studying across its classrooms in a single academic year." },
  { year: "2024", text: "Founder Bhoj Raj Dahal funds accident insurance for ~1,700 students across four community schools in Kawasoti Municipality, extending the school's service mission beyond its own gates." },
  { year: "Today", text: "Siddhartha serves 1,600+ students from Nursery through Grade 10, and remains one of Kawasoti's most recognized private institutions." },
];

const values = [
  {
    title: "Live to Learn",
    body: "Curiosity comes first. Every subject is taught to be understood and questioned, not memorized and forgotten the day after an exam.",
  },
  {
    title: "Discipline with Compassion",
    body: "Clear expectations and a structured environment, balanced with a teaching culture that treats every student as worth the patience.",
  },
  {
    title: "Serve the Country & the Poor",
    body: "Education is treated as a debt to be repaid — to the nation, and to those who had less opportunity. We try to model that, not just teach it.",
  },
];

export default function About() {
  return (
    <>
      <section className="relative bg-navy text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/campus-hero.jpg"
            alt="Siddhartha campus building"
            fill
            style={{ objectPosition: "center 35%" }}
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative container-page py-20 sm:py-24 text-center">
          <div className="section-kicker !text-gold">About Us</div>
          <h1 className="text-[32px] sm:text-[42px] font-serif mb-3">Our Story, Our Purpose</h1>
          <p className="text-[#e9d9a7] italic max-w-xl mx-auto">&ldquo;{siteInfo.motto}&rdquo;</p>
        </div>
      </section>

      {/* HISTORY */}
      <section className="py-16 sm:py-20">
        <div className="container-page grid sm:grid-cols-[1fr_260px] gap-12">
          <div>
            <div className="section-kicker">Our History</div>
            <h2 className="text-[26px] sm:text-[32px] text-navy mb-1">Established 2046 B.S. (1989 AD)</h2>
            <div className="section-divider" />
            <p className="text-[15.5px] text-gray-700 leading-relaxed mb-4">
              Siddhartha Boarding Secondary School was founded in Kawasoti-3, Shivamandir,
              Nawalpur, with a simple conviction: that a village as promising as Kawasoti
              deserved a school that could stand alongside the best in the region.
            </p>
            <p className="text-[15.5px] text-gray-700 leading-relaxed">
              Over 35 years, that conviction grew into a 20-ropani campus with separate
              academic blocks for primary, lower secondary and secondary levels &mdash; a
              deliberate design so every age group learns in a calm, focused environment
              suited to them.
            </p>
          </div>
          <div className="bg-cream border border-line p-6 space-y-5 self-start">
            <div>
              <div className="font-serif text-[26px] text-maroon font-bold">2046 B.S.</div>
              <div className="text-[12px] uppercase tracking-wide text-gray-500">Founded (1989 AD)</div>
            </div>
            <div className="border-t border-line pt-5">
              <div className="font-serif text-[26px] text-maroon font-bold">20</div>
              <div className="text-[12px] uppercase tracking-wide text-gray-500">Ropanis of Campus</div>
            </div>
            <div className="border-t border-line pt-5">
              <div className="font-serif text-[26px] text-maroon font-bold">35+</div>
              <div className="text-[12px] uppercase tracking-wide text-gray-500">Years Serving Kawasoti</div>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="container-page">
          <div className="section-kicker">Our Journey</div>
          <h2 className="text-[26px] sm:text-[32px] text-navy mb-1">35+ Years, One Growing Campus</h2>
          <div className="section-divider" />
          <div className="space-y-0">
            {timeline.map((t, i) => (
              <div key={t.year} className="flex gap-6 sm:gap-10">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-maroon mt-1.5 shrink-0" />
                  {i < timeline.length - 1 && <div className="w-px flex-1 bg-line" />}
                </div>
                <div className="pb-9">
                  <div className="font-serif text-navy font-bold text-[16px] mb-1">{t.year}</div>
                  <p className="text-[14.5px] text-gray-600 max-w-xl">{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION/MOTTO + VALUES */}
      <section className="bg-navy text-white py-16 sm:py-20">
        <div className="container-page text-center">
          <div className="section-kicker !text-gold">Our Motto</div>
          <h2 className="font-serif text-[26px] sm:text-[36px] max-w-3xl mx-auto leading-snug mb-6">
            &ldquo;{siteInfo.motto}&rdquo;
          </h2>
          <p className="text-[#c3c9e6] max-w-2xl mx-auto text-[15.5px] leading-relaxed mb-12">
            This is more than a phrase above our gate &mdash; it is the standard every lesson,
            every teacher and every graduate of Siddhartha is measured against.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 text-left">
            {values.map((v) => (
              <div key={v.title} className="bg-white/5 border border-white/15 p-6">
                <h3 className="font-serif text-gold text-[18px] mb-2.5">{v.title}</h3>
                <p className="text-[14px] text-[#c3c9e6] leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER FULL MESSAGE */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="section-kicker">Founder &amp; Principal&rsquo;s Message</div>
          <h2 className="text-[24px] sm:text-[28px] text-navy mb-6">{siteInfo.founder.name}</h2>
          <div className="grid sm:grid-cols-[170px_1fr] gap-8 items-start">
            <div className="w-[150px] h-[150px] sm:w-[170px] sm:h-[170px] rounded-full overflow-hidden shadow-2xl border-4 border-gold/80 bg-navy relative">
              <Image src="/images/founder.png" alt="Bhoj Raj Dahal, Founder and Principal" fill className="object-cover" />
            </div>
            <div>
              <p className="text-[15.5px] text-gray-700 leading-relaxed mb-4">
                &ldquo;When I founded this school in 2046 B.S., I wanted to build more than a
                place where children memorize facts for an exam. I wanted a school that produces
                citizens &mdash; people who look at their village, their country, and the families
                with less than their own, and feel a duty to act.&rdquo;
              </p>
              <p className="text-[15.5px] text-gray-700 leading-relaxed mb-4">
                &ldquo;That is why our motto is not decoration. It is instruction. &lsquo;Live to
                learn, learn to serve the country and the poor&rsquo; is what I ask of every
                teacher in our staff room, and what I hope every parent asks of their child when
                they come home from school.&rdquo;
              </p>
              <div className="text-maroon font-bold uppercase text-[13px] tracking-wide">
                {siteInfo.founder.name} &mdash; {siteInfo.founder.role}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY IMPACT */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="container-page grid sm:grid-cols-2 gap-12 items-center">
          <Image
            src="/images/founder_scholarship_ceremony.jpg"
            alt="Founder Bhoj Raj Dahal performing a ceremonial lamp-lighting at a community event"
            width={560}
            height={400}
            className="object-cover w-full shadow-xl"
          />
          <div>
            <div className="section-kicker">Beyond Our Own Gates</div>
            <h2 className="text-[26px] sm:text-[32px] text-navy mb-1">Service, Proven in Practice</h2>
            <div className="section-divider" />
            <p className="text-[15.5px] text-gray-700 leading-relaxed mb-4">
              {siteInfo.founder.name} has personally funded accident insurance for roughly 1,700
              students across four community schools in Kawasoti Municipality &mdash; Janabikas
              Vidyashram Basic School, Jiwan Jyoti Secondary School, Shahid Smriti Community
              School, and Gyanodaya Secondary School &mdash; covering students around the clock,
              365 days a year, not only while on school premises.
            </p>
            <p className="text-[15.5px] text-gray-700 leading-relaxed">
              He has also established the Devilal&ndash;Ramadevi Smriti Chhatrabritti Akshaya
              Kosh, a scholarship endowment created in memory of his late parents, which
              continues to fund scholarships across roughly 40 community schools throughout
              Kawasoti Municipality &mdash; living proof that our motto extends well past our
              own classroom walls.
            </p>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="section-kicker">Why Choose Us</div>
          <h2 className="text-[26px] sm:text-[32px] text-navy mb-1">What Sets Siddhartha Apart</h2>
          <div className="section-divider" />
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-white border border-line p-6">
              <h3 className="text-[17px] text-navy mb-2 font-serif">Separate Blocks by Level</h3>
              <p className="text-[14.5px] text-gray-600">
                Primary, lower secondary and secondary students each learn in their own
                dedicated building, so younger and older students never disrupt one another.
              </p>
            </div>
            <div className="bg-white border border-line p-6">
              <h3 className="text-[17px] text-navy mb-2 font-serif">Discussion-Based Teaching</h3>
              <p className="text-[14.5px] text-gray-600">
                Our experienced faculty are trained to teach through discussion and inquiry,
                not rote memorization &mdash; building students who can think, not just recall.
              </p>
            </div>
            <div className="bg-white border border-line p-6">
              <h3 className="text-[17px] text-navy mb-2 font-serif">A Values-First Culture</h3>
              <p className="text-[14.5px] text-gray-600">
                From scholarships to community partnerships, service to others is woven into
                school life &mdash; not an afterthought, but a daily practice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRIVIA CALLOUT */}
      <section className="bg-maroon text-white py-14 sm:py-16">
        <div className="container-page text-center">
          <div className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-[#f0c67f] mb-2">
            Did You Know?
          </div>
          <h2 className="font-serif text-[22px] sm:text-[28px] max-w-2xl mx-auto leading-snug">
            In 2022, Siddhartha was home to <span className="text-gold">13 pairs of twins</span>{" "}
            studying together across our classrooms &mdash; from Nursery through Grade 10 &mdash;
            in a single academic year, a coincidence the school celebrated at its 33rd anniversary.
          </h2>
        </div>
      </section>

      {/* STAFF */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="section-kicker">Our People</div>
          <h2 className="text-[26px] sm:text-[32px] text-navy mb-1">A Dedicated Faculty &amp; Staff</h2>
          <div className="section-divider" />
          <div className="bg-navy text-white p-8 sm:p-10 grid sm:grid-cols-[auto_1fr] gap-7 items-center">
            <div className="w-[64px] h-[64px] rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <Image src="/images/logo.png" alt="School crest" width={40} height={40} />
            </div>
            <p className="text-[16px] sm:text-[18px] font-serif leading-relaxed text-[#e7ecfa]">
              Our highly qualified, experienced teachers lead every classroom &mdash; from our
              Montessori wing through our SEE-preparation faculty &mdash; with a shared emphasis
              on discussion-based teaching and genuine care for every student&rsquo;s growth.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
