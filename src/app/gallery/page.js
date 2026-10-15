import Image from "next/image";
import { galleryCategories } from "@/lib/content";

export const metadata = {
  title: "Gallery | Siddhartha Boarding Secondary School",
  description: "Photo gallery of campus, students, staff, community programs and achievements at Siddhartha Boarding Secondary School, Nawalpur.",
};

export default function Gallery() {
  return (
    <>
      <section className="relative bg-navy text-white">
        <div className="absolute inset-0">
          <Image src="/images/student_voice_girl_radio1.jpg" alt="Student recording at Radio Kawasoti" fill className="object-cover opacity-25" />
        </div>
        <div className="relative container-page py-20 sm:py-24 text-center">
          <div className="section-kicker !text-gold">Gallery</div>
          <h1 className="text-[32px] sm:text-[42px] font-serif mb-3">Moments from Siddhartha</h1>
          <p className="text-[#c3c9e6] max-w-xl mx-auto">
            Campus, classrooms, community programs and the people who make Siddhartha home.
          </p>
        </div>
      </section>

      {galleryCategories.map((cat, i) => (
        <section key={cat.title} className={i % 2 === 0 ? "py-14 sm:py-16" : "py-14 sm:py-16 bg-cream"}>
          <div className="container-page">
            <div className="section-kicker">{cat.title}</div>
            <div className="section-divider" />
            <div className="grid sm:grid-cols-3 gap-4">
              {cat.images.map((img) => (
                <div key={img.src} className="bg-white border border-line p-3 shadow-sm">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={400}
                    height={300}
                    className="w-full h-[240px] object-cover"
                  />
                  <p className="text-[12px] text-gray-500 mt-2 px-1">{img.alt}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="py-14 sm:py-16 bg-white border-t border-line text-center">
        <div className="container-page">
          <p className="text-[14px] text-gray-500 max-w-xl mx-auto">
            More photos coming soon. Follow us on{" "}
            <a href="https://www.facebook.com/kawasotisiddhartha" target="_blank" rel="noreferrer" className="text-maroon font-semibold">
              Facebook
            </a>{" "}
            for the latest campus updates and events.
          </p>
        </div>
      </section>
    </>
  );
}
