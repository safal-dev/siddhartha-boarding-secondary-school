import Image from "next/image";
import { siteInfo } from "@/lib/content";

export const metadata = {
  title: "Admissions | Siddhartha Boarding Secondary School",
  description: "Admissions process, scholarships and enquiry form for Siddhartha Boarding Secondary School, Nawalpur.",
};

const steps = [
  { n: "01", t: "Enquire", d: "Call the school office or submit the enquiry form below with your child's grade and details." },
  { n: "02", t: "Visit & Document Check", d: "Visit the campus with your child's previous academic records and required documents." },
  { n: "03", t: "Assessment", d: "A short interaction/assessment may be scheduled depending on grade level." },
  { n: "04", t: "Confirmation & Enrollment", d: "Once confirmed, complete enrollment formalities and fee submission to secure the seat." },
];

export default function Admissions() {
  return (
    <>
      <section className="relative bg-navy text-white">
        <div className="absolute inset-0">
          <Image src="/images/students-1.jpg" alt="Students" fill className="object-cover opacity-25" />
        </div>
        <div className="relative container-page py-20 sm:py-24 text-center">
          <div className="section-kicker !text-gold">Admissions</div>
          <h1 className="text-[32px] sm:text-[42px] font-serif mb-3">Begin Your Child&rsquo;s Journey</h1>
          <p className="text-[#c3c9e6] max-w-xl mx-auto italic">&ldquo;{siteInfo.motto}&rdquo;</p>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="section-kicker">How to Apply</div>
          <h2 className="text-[26px] sm:text-[32px] text-navy mb-1">A Simple, Guided Admission Process</h2>
          <div className="section-divider" />
          <div className="grid sm:grid-cols-4 gap-5">
            {steps.map((s) => (
              <div key={s.n} className="bg-white border border-line p-6">
                <div className="font-serif font-bold text-maroon text-[22px] mb-2">{s.n}</div>
                <h3 className="font-semibold text-navy text-[15.5px] mb-2">{s.t}</h3>
                <p className="text-[13.5px] text-gray-600">{s.d}</p>
              </div>
            ))}
          </div>
          <p className="text-[13px] text-gray-500 mt-5">
            * Exact fee structure, required documents and session dates are confirmed directly
            with the school office — please call or visit for current details.
          </p>
        </div>
      </section>

      {/* SCHOLARSHIP */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="container-page grid sm:grid-cols-2 gap-12 items-center">
          <Image src="/images/founder.jpg" alt="Founder" width={480} height={400} className="object-cover w-full shadow-xl" />
          <div>
            <div className="section-kicker">Scholarships &amp; Support</div>
            <h2 className="text-[26px] sm:text-[32px] text-navy mb-1">Education for Every Family</h2>
            <div className="section-divider" />
            <p className="text-[15.5px] text-gray-700 leading-relaxed mb-4">
              In the spirit of our motto &mdash; &ldquo;{siteInfo.motto}&rdquo; &mdash; the
              school supports scholarship schemes for deserving students. Founder
              {" "}{siteInfo.founder.name} has also personally established community scholarship
              and insurance programs for students beyond our own campus, reflecting the values
              we hope every family considering Siddhartha will share.
            </p>
            <p className="text-[15.5px] text-gray-700 leading-relaxed">
              Contact the school office directly to discuss scholarship eligibility and current
              fee arrangements for your child&rsquo;s grade level.
            </p>
          </div>
        </div>
      </section>

      {/* ENQUIRY FORM */}
      <section className="py-16 sm:py-20">
        <div className="container-page max-w-2xl">
          <div className="section-kicker">Enquiry Form</div>
          <h2 className="text-[26px] sm:text-[32px] text-navy mb-1">Start an Admission Enquiry</h2>
          <div className="section-divider" />
          <form className="grid sm:grid-cols-2 gap-5 bg-white border border-line p-7 sm:p-8">
            <div className="sm:col-span-1">
              <label className="block text-[13px] font-semibold text-navy mb-1.5">Parent / Guardian Name</label>
              <input type="text" required className="w-full border border-line px-3.5 py-2.5 text-[14.5px] focus:outline-none focus:border-maroon" />
            </div>
            <div className="sm:col-span-1">
              <label className="block text-[13px] font-semibold text-navy mb-1.5">Phone Number</label>
              <input type="tel" required className="w-full border border-line px-3.5 py-2.5 text-[14.5px] focus:outline-none focus:border-maroon" />
            </div>
            <div className="sm:col-span-1">
              <label className="block text-[13px] font-semibold text-navy mb-1.5">Student Name</label>
              <input type="text" className="w-full border border-line px-3.5 py-2.5 text-[14.5px] focus:outline-none focus:border-maroon" />
            </div>
            <div className="sm:col-span-1">
              <label className="block text-[13px] font-semibold text-navy mb-1.5">Grade Interested In</label>
              <select className="w-full border border-line px-3.5 py-2.5 text-[14.5px] focus:outline-none focus:border-maroon">
                <option>Montessori / Nursery</option>
                <option>Primary (1-5)</option>
                <option>Lower Secondary (6-8)</option>
                <option>Secondary (9-10)</option>
                <option>+2 Management (11-12)</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[13px] font-semibold text-navy mb-1.5">Message</label>
              <textarea rows={4} className="w-full border border-line px-3.5 py-2.5 text-[14.5px] focus:outline-none focus:border-maroon" />
            </div>
            <div className="sm:col-span-2">
              <button type="submit" className="btn-maroon w-full sm:w-auto">
                Submit Enquiry
              </button>
              <p className="text-[12.5px] text-gray-500 mt-3">
                Prefer to talk directly? Call us at {siteInfo.phones[0]} or {siteInfo.phones[1]}.
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
