import Image from "next/image";
import { facilities } from "@/lib/content";

export const metadata = {
  title: "Campus Life | Siddhartha Boarding Secondary School",
  description: "Facilities, hostel/boarding, and co-curricular life at Siddhartha Boarding Secondary School, Nawalpur.",
};

export default function CampusLife() {
  return (
    <>
      <section className="relative bg-navy text-white">
        <div className="absolute inset-0">
          <Image src="/images/campus-1.jpg" alt="Campus" fill className="object-cover opacity-25" />
        </div>
        <div className="relative container-page py-20 sm:py-24 text-center">
          <div className="section-kicker !text-gold">Campus Life</div>
          <h1 className="text-[32px] sm:text-[42px] font-serif mb-3">Life On Our 20-Ropani Campus</h1>
          <p className="text-[#c3c9e6] max-w-xl mx-auto">
            Boarding, labs, sports and community &mdash; everything a student needs to grow.
          </p>
        </div>
      </section>

      {/* FACILITIES GRID */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="section-kicker">Facilities</div>
          <h2 className="text-[26px] sm:text-[32px] text-navy mb-1">Everything on One Campus</h2>
          <div className="section-divider" />
          <div className="grid sm:grid-cols-4 gap-5">
            {facilities.map((f) => (
              <div key={f.title} className="bg-white border border-line p-6">
                <div className="w-[42px] h-[42px] border-2 border-maroon rounded-full flex items-center justify-center text-maroon font-bold mb-3.5">
                  {f.title[0]}
                </div>
                <h3 className="text-[15.5px] text-navy mb-1.5 font-serif">{f.title}</h3>
                <p className="text-[13.5px] text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOARDING / HOSTEL */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="container-page grid sm:grid-cols-2 gap-12 items-center">
          <div>
            <div className="section-kicker">Boarding</div>
            <h2 className="text-[26px] sm:text-[32px] text-navy mb-1">A Home Away From Home</h2>
            <div className="section-divider" />
            <p className="text-[15.5px] text-gray-700 leading-relaxed mb-4">
              &ldquo;Boarding&rdquo; is part of our name for a reason. Many of our students
              travel from villages beyond Kawasoti, and our hostel facility exists so distance
              never stands between a child and a quality education.
            </p>
            <p className="text-[15.5px] text-gray-700 leading-relaxed">
              Supervised accommodation, regular meals, and a disciplined daily routine give
              boarding students the stability to focus on their studies and co-curricular life
              &mdash; while our transportation service supports day scholars from surrounding areas.
            </p>
          </div>
          <Image src="/images/campus-2.jpg" alt="Campus building" width={560} height={400} className="object-cover w-full shadow-xl" />
        </div>
      </section>

      {/* CO-CURRICULAR */}
      <section className="py-16 sm:py-20">
        <div className="container-page grid sm:grid-cols-2 gap-12 items-center">
          <Image src="/images/student-voice.jpg" alt="Student's Voice radio program" width={560} height={400} className="object-cover w-full shadow-xl" />
          <div>
            <div className="section-kicker">Beyond the Classroom</div>
            <h2 className="text-[26px] sm:text-[32px] text-navy mb-1">Co-Curricular &amp; Community Life</h2>
            <div className="section-divider" />
            <p className="text-[15.5px] text-gray-700 leading-relaxed mb-4">
              Dance, music, educational tours and other extracurricular activities (ECA) round
              out the Siddhartha experience, alongside a spacious playground and full sporting
              equipment for physical education and team games.
            </p>
            <p className="text-[15.5px] text-gray-700 leading-relaxed">
              Our students also co-produce <em>&ldquo;The Student&rsquo;s Voice&rdquo;</em>
              (&ldquo;Bidyarthiharuko Aawaz&rdquo;) with Radio Kawasoti and Kawasoti TV &mdash;
              a youth talk program where our students discuss real issues facing Nepali society,
              putting the &ldquo;serve the country&rdquo; half of our motto directly into practice.
            </p>
          </div>
        </div>
      </section>

      {/* GALLERY STRIP */}
      <section className="bg-white border-t border-line py-16 sm:py-20">
        <div className="container-page">
          <div className="section-kicker">Campus Moments</div>
          <h2 className="text-[26px] sm:text-[32px] text-navy mb-1">A Day at Siddhartha</h2>
          <div className="section-divider" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {["/images/students-1.jpg", "/images/students-2.jpg", "/images/staff-1.jpg", "/images/staff-2.jpg"].map((src) => (
              <Image key={src} src={src} alt="Campus life" width={300} height={200} className="h-[170px] w-full object-cover" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
