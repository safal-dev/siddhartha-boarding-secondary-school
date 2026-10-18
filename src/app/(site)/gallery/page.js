import Image from "next/image";
import { Suspense } from "react";
import { connection } from "next/server";
import { GALLERY_CATEGORIES, listGalleryImages } from "@/lib/gallery-store";

export const metadata = {
  title: "Gallery | Siddhartha Boarding Secondary School",
  description: "Photos of our school, programs, achievements and The Student's Voice media project at Siddhartha Boarding Secondary School, Nawalpur.",
};

async function GalleryContent() {
  await connection();
  const images = await listGalleryImages();

  return (
    <>
      {GALLERY_CATEGORIES.map((cat, i) => {
        const items = images.filter((img) => img.category === cat.key);
        return (
          <section key={cat.key} className={i % 2 === 0 ? "py-14 sm:py-16" : "py-14 sm:py-16 bg-cream"}>
            <div className="container-page">
              <div className="section-kicker">{cat.label}</div>
              <div className="section-divider" />
              {items.length === 0 ? (
                <div className="bg-white border border-line text-center py-12 px-6">
                  <p className="text-[14px] text-gray-500">Photos coming soon.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {items.map((img) => {
                    const card = (
                      <div className="bg-white border border-line p-3 shadow-sm h-full">
                        <div className="relative w-full h-[260px]">
                          <Image
                            src={`/api/gallery/${img.id}/file`}
                            alt={img.caption || cat.label}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        </div>
                        {(img.caption || img.link) && (
                          <div className="pt-2.5 px-1 flex items-center justify-between gap-2">
                            {img.caption && <p className="text-[13px] text-gray-600">{img.caption}</p>}
                            {img.link && (
                              <span className="text-[12.5px] text-maroon font-semibold shrink-0">Watch →</span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                    return img.link ? (
                      <a key={img.id} href={img.link} target="_blank" rel="noreferrer" className="block hover:shadow-md transition-shadow">
                        {card}
                      </a>
                    ) : (
                      <div key={img.id}>{card}</div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        );
      })}
    </>
  );
}

function GallerySkeleton() {
  return (
    <div className="py-16">
      <div className="container-page grid sm:grid-cols-3 gap-5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-[260px] bg-line animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export default function Gallery() {
  return (
    <>
      <section className="relative bg-navy text-white">
        <div className="relative container-page py-20 sm:py-24 text-center">
          <div className="section-kicker !text-gold">Gallery</div>
          <h1 className="text-[32px] sm:text-[42px] font-serif mb-3">Moments from Siddhartha</h1>
          <p className="text-[#c3c9e6] max-w-xl mx-auto">
            School, programs, achievements and The Student&rsquo;s Voice &mdash; all in one place.
          </p>
        </div>
      </section>

      <Suspense fallback={<GallerySkeleton />}>
        <GalleryContent />
      </Suspense>
    </>
  );
}
