export const metadata = { title: "Manage Student's Voice Videos | Siddhartha CMS" };

import VideosManager from "./VideosManager";

export default function AdminStudentVoicePage() {
  return (
    <section className="py-12 sm:py-14">
      <div className="container-page max-w-2xl space-y-10">
        <div>
          <h1 className="font-serif text-[24px] sm:text-[28px] text-navy mb-1">Manage The Student&rsquo;s Voice</h1>
          <p className="text-[14px] text-gray-600">Publish a new YouTube video or remove an existing one.</p>
        </div>
        <VideosManager />
      </div>
    </section>
  );
}
