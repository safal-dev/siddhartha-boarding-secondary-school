export const metadata = { title: "Manage Notices | Siddhartha CMS" };

import NoticesManager from "./NoticesManager";

export default function AdminNoticesPage() {
  return (
    <section className="py-12 sm:py-14">
      <div className="container-page max-w-2xl space-y-10">
        <div>
          <h1 className="font-serif text-[24px] sm:text-[28px] text-navy mb-1">Manage Notices</h1>
          <p className="text-[14px] text-gray-600">Publish a new notice or remove an existing one.</p>
        </div>
        <NoticesManager />
      </div>
    </section>
  );
}
