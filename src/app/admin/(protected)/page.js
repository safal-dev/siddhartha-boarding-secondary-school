import Link from "next/link";
import { connection } from "next/server";
import { listNotices } from "@/lib/notices-store";
import { listGalleryImages } from "@/lib/gallery-store";
import { listVideos } from "@/lib/videos-store";

export const metadata = { title: "Dashboard | Siddhartha CMS" };
export const instant = false;

export default async function AdminDashboard() {
  await connection();
  const [notices, galleryImages, videos] = await Promise.all([
    listNotices(),
    listGalleryImages(),
    listVideos(),
  ]);

  return (
    <section className="py-14 sm:py-16">
      <div className="container-page">
        <h1 className="font-serif text-[26px] sm:text-[30px] text-navy mb-1">Dashboard</h1>
        <p className="text-[14.5px] text-gray-600 mb-9">Welcome back. Manage your site content below.</p>

        <div className="grid sm:grid-cols-3 gap-5 max-w-3xl">
          <Link
            href="/admin/notices"
            className="bg-white border border-line border-t-4 border-t-maroon p-6 hover:shadow-md transition-shadow"
          >
            <div className="font-serif text-[36px] text-maroon font-bold leading-none mb-2">{notices.length}</div>
            <div className="font-semibold text-navy text-[15px] mb-1">Notices Published</div>
            <div className="text-[13px] text-gray-500">Click to publish or manage notices →</div>
          </Link>

          <Link
            href="/admin/gallery"
            className="bg-white border border-line border-t-4 border-t-navy p-6 hover:shadow-md transition-shadow"
          >
            <div className="font-serif text-[36px] text-navy font-bold leading-none mb-2">{galleryImages.length}</div>
            <div className="font-semibold text-navy text-[15px] mb-1">Gallery Photos</div>
            <div className="text-[13px] text-gray-500">Click to add or manage gallery photos →</div>
          </Link>

          <Link
            href="/admin/student-voice"
            className="bg-white border border-line border-t-4 border-t-gold p-6 hover:shadow-md transition-shadow"
          >
            <div className="font-serif text-[36px] text-navy font-bold leading-none mb-2">{videos.length}</div>
            <div className="font-semibold text-navy text-[15px] mb-1">Student&rsquo;s Voice Videos</div>
            <div className="text-[13px] text-gray-500">Click to publish or manage videos →</div>
          </Link>
        </div>
      </div>
    </section>
  );
}
