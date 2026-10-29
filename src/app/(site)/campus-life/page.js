import Image from "next/image";
import { campusFacilities, studentVoices } from "@/lib/content";

export const metadata = {
  title: "Campus Life | Siddhartha Boarding Secondary School",
  description: "Facilities, transportation and co-curricular life at Siddhartha Boarding Secondary School, Nawalpur.",
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
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="relative container-page py-20 sm:py-24 text-center">
          <div className="section-kicker !text-gold">Campus Life</div>
          <h1 className="text-[32px] sm:text-[42px] font-serif mb-3">Life On Our 20-Ropani Campus</h1>
          <p className="text-[#c3c9e6] max-w-xl mx-auto">
            Transport, sports and community &mdash; everything a student needs to grow beyond the classroom.
          </p>
        </div>
      </section>

      {/* FACILITIES GRID */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="section-kicker">Campus &amp; Recreational Facilities</div>
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

      {/* TRANSPORTATION & ACCESSIBILITY */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="container-page text-center max-w-2xl mx-auto">
          <div className="section-kicker">Transportation</div>
          <h2 className="text-[26px] sm:text-[32px] text-navy mb-1">Getting to Campus</h2>
          <div className="section-divider mx-auto" />
          <p className="text-[15.5px] text-gray-700 leading-relaxed mb-4">
            Siddhartha is a day school &mdash; all students commute to campus daily. Dedicated
            bus routes connect Kawasoti and nearby villages to our 20-ropani campus, so
            distance doesn&rsquo;t stand between a child and a quality education.
          </p>
          <p className="text-[15.5px] text-gray-700 leading-relaxed">
            Students who prefer to cycle in have access to our supervised cycle stand, and the
            on-campus canteen keeps everyone fed through the school day.
          </p>
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
          <div className="relative h-[320px] sm:h-[380px] shadow-xl">
            <Image
              src="/images/school_courtyard_event.jpg"
              alt="Students and staff gathered in the school courtyard during a campus event"
              fill
              className="object-cover"
            />
          </div>
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
                <div className="relative h-[210px]">
                  <Image src={v.image} alt={v.context} fill className="object-cover" />
                </div>
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
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { src: "/images/campus-hero.jpg", alt: "Campus front elevation", pos: "85% 42%" },
              { src: "/images/student-voice.jpg", alt: "The Student's Voice radio program", pos: "center 15%" },
              { src: "/images/founder.png", alt: "Founder and Principal Bhoj Raj Dahal", pos: "center 15%" },
            ].map((img) => (
              <div key={img.src} className="relative h-[200px]">
                <Image src={img.src} alt={img.alt} fill style={{ objectPosition: img.pos }} className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
