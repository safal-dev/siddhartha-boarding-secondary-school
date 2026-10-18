export const metadata = { title: "Manage Gallery | Siddhartha CMS" };

import GalleryManager from "./GalleryManager";

export default function AdminGalleryPage() {
  return (
    <section className="py-12 sm:py-14">
      <div className="container-page max-w-3xl space-y-10">
        <div>
          <h1 className="font-serif text-[24px] sm:text-[28px] text-navy mb-1">Manage Gallery</h1>
          <p className="text-[14px] text-gray-600">
            Upload photos into one of the 4 gallery categories: School, Program, Achievement, or The Student&rsquo;s Voice.
          </p>
        </div>
        <GalleryManager />
      </div>
    </section>
  );
}
