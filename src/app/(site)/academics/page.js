import Image from "next/image";
import { academicLadderDetailed, academicFacilities } from "@/lib/content";

export const metadata = {
  title: "Academics | Siddhartha Boarding Secondary School",
  description: "Academic programs from Nursery to Grade 10 (SEE) at Siddhartha Boarding Secondary School, Nawalpur.",
};

export default function Academics() {
  return (
    <>
      <section className="relative bg-navy text-white">
        <div className="relative container-page py-20 sm:py-24 text-center">
          <div className="section-kicker !text-gold">Academics</div>
          <h1 className="text-[32px] sm:text-[42px] font-serif mb-3">Learning That Leads Somewhere</h1>
          <p className="text-[#c3c9e6] max-w-xl mx-auto">
            Ministry-approved education from Nursery through Grade 10 (SEE).
          </p>
        </div>
      </section>

      {/* DETAILED LADDER */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="section-kicker">The Academic Path</div>
          <h2 className="text-[26px] sm:text-[32px] text-navy mb-1">Nursery to Grade 10, One Continuous Journey</h2>
          <div className="section-divider" />
          <div className="space-y-5">
            {academicLadderDetailed.map((step) => (
              <div key={step.step} className="bg-white border border-line border-l-4 border-l-navy p-6 sm:p-7 grid sm:grid-cols-[auto_1fr] gap-6">
                <div className="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-1 sm:w-[140px]">
                  <div className="font-serif font-bold text-maroon text-[30px] leading-none">{step.step}</div>
                  <div className="text-[12px] uppercase tracking-wide text-gray-500 font-semibold">{step.grades}</div>
                </div>
                <div>
                  <h3 className="font-serif text-navy text-[19px] mb-2">{step.title}</h3>
                  <p className="text-[14.5px] text-gray-700 leading-relaxed mb-3">{step.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {step.focus.map((f) => (
                      <span key={f} className="text-[12px] bg-cream border border-line px-2.5 py-1 text-navy font-medium">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEACHING METHODOLOGY */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="container-page grid sm:grid-cols-2 gap-12 items-center">
          <div>
            <div className="section-kicker">Our Teaching Philosophy</div>
            <h2 className="text-[26px] sm:text-[32px] text-navy mb-1">Discussion Over Memorization</h2>
            <div className="section-divider" />
            <p className="text-[15.5px] text-gray-700 leading-relaxed mb-4">
              Siddhartha Boarding Secondary School is approved by Nepal&rsquo;s Ministry of
              Education, covering studies from Montessori/Nursery through the Secondary
              Education Examination (SEE) at Grade 10.
            </p>
            <p className="text-[15.5px] text-gray-700 leading-relaxed mb-4">
              Our classrooms favor discussion-based learning over rote memorization. Teachers
              are trained to pose questions before giving answers, and students are encouraged
              to debate, explain their reasoning, and connect lessons to real situations &mdash;
              not simply reproduce textbook lines on exam day.
            </p>
            <p className="text-[15.5px] text-gray-700 leading-relaxed">
              This philosophy extends outside the classroom too: our students co-produce a
              radio and TV discussion program with local media, putting real-world debate and
              research skills into practice well beyond the syllabus.
            </p>
          </div>
          <Image src="/images/student_voice_girl_radio2.jpg" alt="Student discussing on Radio Kawasoti" width={560} height={400} className="object-cover w-full shadow-xl" />
        </div>
      </section>

      {/* ASSESSMENT SYSTEM */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="section-kicker">Assessment &amp; Progress</div>
          <h2 className="text-[26px] sm:text-[32px] text-navy mb-1">How We Track Learning</h2>
          <div className="section-divider" />
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-white border border-line p-6">
              <h3 className="text-[16px] text-navy mb-2 font-serif">Periodic Assessments</h3>
              <p className="text-[14px] text-gray-600">
                Regular in-class tests and unit assessments track progress through the term,
                rather than leaving everything to a single final exam.
              </p>
            </div>
            <div className="bg-white border border-line p-6">
              <h3 className="text-[16px] text-navy mb-2 font-serif">Model Examinations</h3>
              <p className="text-[14px] text-gray-600">
                SEE candidates sit full-length model exams ahead of the national board exam,
                under exam-day conditions, to remove surprises on the real day.
              </p>
            </div>
            <div className="bg-white border border-line p-6">
              <h3 className="text-[16px] text-navy mb-2 font-serif">Parent Communication</h3>
              <p className="text-[14px] text-gray-600">
                Report cards and teacher feedback are shared with guardians so families stay
                informed of a student&rsquo;s progress, not just their final grade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS — typographic, no low-res banner image */}
      <section className="bg-maroon text-white text-center py-16 sm:py-20">
        <div className="container-page">
          <div className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-[#f0c67f] mb-3">
            Results that speak
          </div>
          <h2 className="text-[26px] sm:text-[32px] text-white mb-10">Municipality-Topping SEE Results</h2>
          <div className="grid grid-cols-3 max-w-xl mx-auto gap-6 sm:gap-10">
            <div>
              <div className="font-serif text-[40px] sm:text-[52px] text-gold leading-none">1st</div>
              <div className="text-[12px] sm:text-[13px] uppercase tracking-wide text-[#f3dcc0] mt-2">
                Among 96 Schools in Kawasoti
              </div>
            </div>
            <div>
              <div className="font-serif text-[40px] sm:text-[52px] text-gold leading-none">94%</div>
              <div className="text-[12px] sm:text-[13px] uppercase tracking-wide text-[#f3dcc0] mt-2">
                Top Scorer Average
              </div>
            </div>
            <div>
              <div className="font-serif text-[40px] sm:text-[52px] text-gold leading-none">69.5</div>
              <div className="text-[12px] sm:text-[13px] uppercase tracking-wide text-[#f3dcc0] mt-2">
                Municipality Average Marks
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEARNING RESOURCES */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="container-page">
          <div className="section-kicker">Learning Resources</div>
          <h2 className="text-[26px] sm:text-[32px] text-navy mb-1">Labs, Library &amp; More</h2>
          <div className="section-divider" />
          <div className="grid sm:grid-cols-4 gap-5">
            {academicFacilities.map((f) => (
              <div key={f.title} className="bg-white border border-line p-6 text-center">
                <div className="w-[42px] h-[42px] border-2 border-maroon rounded-full flex items-center justify-center text-maroon font-bold mb-3.5 mx-auto">
                  {f.title[0]}
                </div>
                <h3 className="text-[15.5px] text-navy font-serif mb-1.5">{f.title}</h3>
                <p className="text-[12.5px] text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
