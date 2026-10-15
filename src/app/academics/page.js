import Image from "next/image";
import { academicLadder } from "@/lib/content";

export const metadata = {
  title: "Academics | Siddhartha Boarding Secondary School",
  description: "Academic programs from Nursery to +2 Management, NEB-affiliated, at Siddhartha Boarding Secondary School, Nawalpur.",
};

export default function Academics() {
  return (
    <>
      <section className="relative bg-navy text-white">
        <div className="absolute inset-0">
          <Image src="/images/see-toppers.jpg" alt="Academic achievements" fill className="object-cover opacity-20" />
        </div>
        <div className="relative container-page py-20 sm:py-24 text-center">
          <div className="section-kicker !text-gold">Academics</div>
          <h1 className="text-[32px] sm:text-[42px] font-serif mb-3">Learning That Leads Somewhere</h1>
          <p className="text-[#c3c9e6] max-w-xl mx-auto">
            NEB-affiliated, Ministry-approved education from Nursery through +2 Management.
          </p>
        </div>
      </section>

      {/* LADDER */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="section-kicker">The Academic Path</div>
          <h2 className="text-[26px] sm:text-[32px] text-navy mb-1">Nursery to +2, One Continuous Journey</h2>
          <div className="section-divider" />
          <div className="grid sm:grid-cols-5 gap-5">
            {academicLadder.map((step) => (
              <div key={step.step} className="bg-white border border-line border-t-4 border-t-navy p-5">
                <div className="font-serif font-bold text-maroon text-[22px] mb-2">{step.step}</div>
                <div className="font-semibold text-[15px] text-navy mb-2">{step.title}</div>
                <p className="text-[13.5px] text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AFFILIATION */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="container-page grid sm:grid-cols-2 gap-12 items-center">
          <div>
            <div className="section-kicker">Affiliation &amp; Approval</div>
            <h2 className="text-[26px] sm:text-[32px] text-navy mb-1">Nationally Recognized Standards</h2>
            <div className="section-divider" />
            <p className="text-[15.5px] text-gray-700 leading-relaxed mb-4">
              Siddhartha Boarding Secondary School is affiliated with the National Examinations
              Board (NEB) and approved by Nepal&rsquo;s Ministry of Education, covering studies
              from the Secondary Education Examination (SEE) through our +2 Management program.
            </p>
            <p className="text-[15.5px] text-gray-700 leading-relaxed">
              Our teaching philosophy favors discussion-based learning over rote memorization
              &mdash; students are encouraged to question, discuss and apply what they learn,
              guided by an experienced, highly qualified faculty.
            </p>
          </div>
          <Image src="/images/campus-1.jpg" alt="Campus" width={560} height={400} className="object-cover w-full shadow-xl" />
        </div>
      </section>

      {/* RESULTS */}
      <section className="bg-maroon text-white text-center py-16 sm:py-20">
        <div className="container-page">
          <div className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-[#f0c67f] mb-2">
            Results that speak
          </div>
          <h2 className="text-[26px] sm:text-[32px] text-white mb-3">Municipality-Topping SEE Results</h2>
          <p className="text-[#f3dcc0] max-w-xl mx-auto mb-7 text-[15px]">
            Our students have placed first in Kawasoti Municipality among 96 schools in recent
            SEE results, with top scorers achieving above 94% average marks.
          </p>
          <Image
            src="/images/see-toppers.jpg"
            alt="SEE result toppers"
            width={560}
            height={560}
            className="max-w-[520px] w-full mx-auto border-[6px] border-white shadow-xl"
          />
        </div>
      </section>

      {/* LEARNING RESOURCES */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="section-kicker">Learning Resources</div>
          <h2 className="text-[26px] sm:text-[32px] text-navy mb-1">Labs, Library &amp; More</h2>
          <div className="section-divider" />
          <div className="grid sm:grid-cols-4 gap-5">
            {["Science Lab", "Computer Lab", "Library", "Audio-Visual Room"].map((t) => (
              <div key={t} className="bg-white border border-line p-6 text-center">
                <div className="w-[42px] h-[42px] border-2 border-maroon rounded-full flex items-center justify-center text-maroon font-bold mb-3.5 mx-auto">
                  {t[0]}
                </div>
                <h3 className="text-[15.5px] text-navy font-serif">{t}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
