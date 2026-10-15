import Image from "next/image";
import { boardingRoutine, campusFacilities, studentVoices } from "@/lib/content";

export const metadata = {
  title: "Campus Life | Siddhartha Boarding Secondary School",
  description: "Facilities, hostel/boarding, daily routine and co-curricular life at Siddhartha Boarding Secondary School, Nawalpur.",
};

const clubs = [
  "Dance & Music Club",
  "Debate & Public Speaking",
  "Science & Robotics Club",
  "Sports Teams (Football, Volleyball, Athletics)",
  "Student's Voice Media Team",
  "Educational Tour Committee",
];

export default function CampusLife() {
  return (
    <>
      <section className="relative bg-navy text-white">
        <div className="absolute inset-0">
          <Image src="/images/campus-1.jpg" alt="Campus building with event banner" fill className="object-cover opacity-25" />
        </div>
        <div className="relative container-page py-20 sm:py-24 text-center">
          <div className="section-kicker !text-gold">Campus Life</div>
          <h1 className="text-[32px] sm:text-[42px] font-serif mb-3">Life On Our 20-Ropani Campus</h1>
          <p className="text-[#c3c9e6] max-w-xl mx-auto">
            Boarding, sports and community &mdash; everything a student needs to grow beyond the classroom.
          </p>
        </div>
      </section>

      {/* FACILITIES GRID */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="section-kicker">Residential &amp; Recreational Facilities</div>
          <h2 className="text-[26px] sm:text-[32px] text-navy mb-1">Everything Outside the Classroom</h2>
          <div className="section-divider" />
          <div className="grid sm:grid-cols-3 gap-5">
            {campusFacilities.map((f) => (
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

      {/* BOARDING / HOSTEL + ROUTINE */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="container-page">
          <div className="grid sm:grid-cols-2 gap-12 items-center mb-14">
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
            <Image src="/images/campus-2.jpg" alt="Campus building with event banner" width={560} height={400} className="object-cover w-full shadow-xl" />
          </div>

          <div className="bg-white border border-line p-7 sm:p-9">
            <h3 className="font-serif text-navy text-[19px] mb-5">A Typical Boarding Day (indicative)</h3>
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-3">
              {boardingRoutine.map((r) => (
                <div key={r.time} className="flex gap-4 border-b border-line pb-2.5">
                  <div className="text-maroon font-bold text-[13.5px] w-[76px] shrink-0">{r.time}</div>
                  <div className="text-[14px] text-gray-700">{r.activity}</div>
                </div>
              ))}
            </div>
            <p className="text-[12px] text-gray-500 mt-5">
              * Schedule is indicative and may vary by grade level and term &mdash; confirm the
              current routine with the hostel supervisor.
            </p>
          </div>
        </div>
      </section>

      {/* CO-CURRICULAR / CLUBS */}
      <section className="py-16 sm:py-20">
        <div className="container-page grid sm:grid-cols-2 gap-12 items-center">
          <div>
            <div className="section-kicker">Beyond the Classroom</div>
            <h2 className="text-[26px] sm:text-[32px] text-navy mb-1">Clubs, Sports &amp; Activities</h2>
            <div className="section-divider" />
            <p className="text-[15.5px] text-gray-700 leading-relaxed mb-5">
              Dance, music, educational tours and other extracurricular activities (ECA) round
              out the Siddhartha experience, alongside a spacious playground and full sporting
              equipment for physical education and team games.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
              {clubs.map((c) => (
                <li key={c} className="flex gap-2.5 text-[14.5px] text-gray-700">
                  <span className="text-maroon font-bold">•</span> {c}
                </li>
              ))}
            </ul>
          </div>
          <Image src="/images/students-2.jpg" alt="Students at a school event" width={560} height={400} className="object-cover w-full shadow-xl" />
        </div>
      </section>

      {/* STUDENT'S VOICE SPOTLIGHT */}
      <section className="bg-navy text-white py-16 sm:py-20">
        <div className="container-page">
          <div className="section-kicker !text-gold">Community Spotlight</div>
          <h2 className="font-serif text-[26px] sm:text-[32px] mb-1">The Student&rsquo;s Voice</h2>
          <div className="section-divider" />
          <p className="text-[#c3c9e6] text-[15.5px] leading-relaxed mb-10 max-w-2xl">
            Our students co-produce <em>&ldquo;Bidyarthiharuko Aawaz&rdquo;</em> (The
            Student&rsquo;s Voice) with Radio Kawasoti and Kawasoti TV, discussing real issues
            facing Nepali society &mdash; unemployment, civic sense, and the responsibilities of
            young citizens. It is our motto&rsquo;s &ldquo;serve the country&rdquo; half, lived
            out on air.
          </p>
          <div className="grid sm:grid-cols-4 gap-5">
            {studentVoices.map((v) => (
              <div key={v.image} className="bg-white/5 border border-white/15 overflow-hidden">
                <Image src={v.image} alt={v.context} width={300} height={360} className="w-full h-[210px] object-cover" />
                <div className="p-4">
                  <p className="text-[13px] text-[#dfe3f2] italic leading-snug mb-2">&ldquo;{v.quote}&rdquo;</p>
                  <div className="text-[11px] text-gold font-semibold uppercase tracking-wide">{v.context}</div>
                </div>
              </div>
            ))}
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
            {["/images/students-1.jpg", "/images/staff-1.jpg", "/images/staff-2.jpg", "/images/see-toppers.jpg"].map((src) => (
              <Image key={src} src={src} alt="Campus life" width={300} height={200} className="h-[170px] w-full object-cover" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
