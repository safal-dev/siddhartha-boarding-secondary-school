import Image from "next/image";
import { siteInfo } from "@/lib/content";

export const metadata = {
  title: "About Us | Siddhartha Boarding Secondary School",
  description: "History, mission, motto and founder's message from Siddhartha Boarding Secondary School, Kawasoti, Nawalpur.",
};

export default function About() {
  return (
    <>
      <section className="relative bg-navy text-white">
        <div className="absolute inset-0">
          <Image src="/images/campus-2.jpg" alt="Campus" fill className="object-cover opacity-25" />
        </div>
        <div className="relative container-page py-20 sm:py-24 text-center">
          <div className="section-kicker !text-gold">About Us</div>
          <h1 className="text-[32px] sm:text-[42px] font-serif mb-3">Our Story, Our Purpose</h1>
          <p className="text-[#e9d9a7] italic max-w-xl mx-auto">&ldquo;{siteInfo.motto}&rdquo;</p>
        </div>
      </section>

      {/* HISTORY */}
      <section className="py-16 sm:py-20">
        <div className="container-page grid sm:grid-cols-2 gap-12 items-center">
          <div>
            <div className="section-kicker">Our History</div>
            <h2 className="text-[26px] sm:text-[32px] text-navy mb-1">Established 2046 B.S. (1989 AD)</h2>
            <div className="section-divider" />
            <p className="text-[15.5px] text-gray-700 leading-relaxed mb-4">
              Siddhartha Boarding Secondary School was founded in Kawasoti-3, Shivamandir,
              Nawalpur, with a simple conviction: that a village as promising as Kawasoti
              deserved a school that could stand alongside the best in the region.
            </p>
            <p className="text-[15.5px] text-gray-700 leading-relaxed mb-4">
              Over 35 years, that conviction grew into a 20-ropani campus with separate
              academic blocks for primary, lower secondary, secondary and higher secondary
              levels &mdash; a deliberate design so every age group learns in a calm, focused
              environment suited to them.
            </p>
            <p className="text-[15.5px] text-gray-700 leading-relaxed">
              Today, Siddhartha serves more than 1,600 students from Nursery through +2
              Management, and remains one of the most recognized private institutions in
              Kawasoti Municipality.
            </p>
          </div>
          <Image src="/images/campus-hero.jpg" alt="Campus front view" width={600} height={420} className="object-cover w-full shadow-xl" />
        </div>
      </section>

      {/* MISSION/MOTTO */}
      <section className="bg-navy text-white py-16 sm:py-20">
        <div className="container-page text-center">
          <div className="section-kicker !text-gold">Our Motto</div>
          <h2 className="font-serif text-[26px] sm:text-[36px] max-w-3xl mx-auto leading-snug mb-6">
            &ldquo;{siteInfo.motto}&rdquo;
          </h2>
          <p className="text-[#c3c9e6] max-w-2xl mx-auto text-[15.5px] leading-relaxed">
            This is more than a phrase above our gate &mdash; it is the standard every lesson,
            every teacher and every graduate of Siddhartha is measured against. We believe
            learning that stays inside the classroom is unfinished learning. Our students are
            taught to see their education as a debt owed back to their community: to the
            country that gave them opportunity, and to the poor who need an advocate.
          </p>
        </div>
      </section>

      {/* FOUNDER FULL MESSAGE */}
      <section className="py-16 sm:py-20">
        <div className="container-page grid sm:grid-cols-[300px_1fr] gap-12 items-start">
          <Image
            src="/images/founder.jpg"
            alt="Bhoj Raj Dahal, Founder and Principal"
            width={300}
            height={370}
            className="rounded border-[6px] border-white shadow-2xl object-cover w-full"
          />
          <div>
            <div className="section-kicker">Founder &amp; Principal&rsquo;s Message</div>
            <h2 className="text-[24px] sm:text-[28px] text-navy mb-4">{siteInfo.founder.name}</h2>
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
            <p className="text-[15.5px] text-gray-700 leading-relaxed mb-6">
              Outside the classroom, {siteInfo.founder.name} has personally funded accident
              insurance for roughly 1,700 students across community schools in Kawasoti
              Municipality, and established the Devilal&ndash;Ramadevi Smriti Chhatrabritti
              Akshaya Kosh, a scholarship endowment in memory of his late parents that
              continues to support dozens of community schools in the municipality.
            </p>
            <div className="text-maroon font-bold uppercase text-[13px] tracking-wide">
              {siteInfo.founder.name} &mdash; {siteInfo.founder.role}
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="container-page">
          <div className="section-kicker">Why Choose Us</div>
          <h2 className="text-[26px] sm:text-[32px] text-navy mb-1">What Sets Siddhartha Apart</h2>
          <div className="section-divider" />
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-white border border-line p-6">
              <h3 className="text-[17px] text-navy mb-2 font-serif">Separate Blocks by Level</h3>
              <p className="text-[14.5px] text-gray-600">
                Primary, lower secondary, secondary and +2 students each learn in their own
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

      {/* STAFF */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="section-kicker">Our People</div>
          <h2 className="text-[26px] sm:text-[32px] text-navy mb-1">A Dedicated Faculty &amp; Staff</h2>
          <div className="section-divider" />
          <div className="grid sm:grid-cols-2 gap-6">
            <Image src="/images/staff-1.jpg" alt="Faculty and staff group" width={560} height={400} className="object-cover w-full shadow-lg" />
            <Image src="/images/staff-2.jpg" alt="Faculty and staff group" width={560} height={400} className="object-cover w-full shadow-lg" />
          </div>
          <p className="text-[15.5px] text-gray-700 leading-relaxed mt-6 max-w-2xl">
            Our highly qualified, experienced teachers lead every classroom &mdash; from our
            Montessori wing to our +2 Management faculty &mdash; with a shared emphasis on
            discussion-based teaching and genuine care for every student&rsquo;s growth.
          </p>
        </div>
      </section>
    </>
  );
}
