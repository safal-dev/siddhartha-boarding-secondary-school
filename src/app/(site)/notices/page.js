import Image from "next/image";
import { Suspense } from "react";
import { connection } from "next/server";
import { listNotices } from "@/lib/notices-store";

export const metadata = {
  title: "Notices | Siddhartha Boarding Secondary School",
  description: "Official notices, circulars and announcements from Siddhartha Boarding Secondary School, Nawalpur.",
};

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

async function NoticesList() {
  await connection();
  const notices = await listNotices();

  if (notices.length === 0) {
    return (
      <div className="bg-cream border border-line text-center py-16 px-6">
        <p className="text-[15.5px] text-gray-600">
          No notices have been posted yet. Please check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {notices.map((n) => (
        <article key={n.id} className="bg-white border border-line shadow-sm">
          <div className="p-6 sm:p-7 border-b border-line">
            <div className="text-[12px] uppercase tracking-wide text-maroon font-semibold mb-1.5">
              {formatDate(n.createdAt)}
            </div>
            <h2 className="font-serif text-[22px] sm:text-[25px] text-navy mb-2">{n.title}</h2>
            {n.description && (
              <p className="text-[15px] text-gray-700 leading-relaxed whitespace-pre-line">
                {n.description}
              </p>
            )}
          </div>

          <div className="bg-cream p-4 sm:p-5">
            {n.fileType === "pdf" ? (
              <>
                <object
                  data={n.fileUrl}
                  type="application/pdf"
                  className="w-full h-[70vh] min-h-[420px] border border-line bg-white"
                  aria-label={n.title}
                >
                  <div className="p-6 text-center text-[14px] text-gray-600">
                    Your browser can&rsquo;t preview this PDF inline.{" "}
                    <a href={n.fileUrl} target="_blank" rel="noreferrer" className="text-maroon font-semibold underline">
                      Open it in a new tab
                    </a>
                    .
                  </div>
                </object>
                <div className="text-right mt-2">
                  <a
                    href={n.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[13px] text-maroon font-semibold hover:underline"
                  >
                    Open full size in new tab →
                  </a>
                </div>
              </>
            ) : (
              <a href={n.fileUrl} target="_blank" rel="noreferrer" className="block">
                <div className="relative w-full h-[70vh] min-h-[420px] bg-white border border-line">
                  <Image
                    src={n.fileUrl}
                    alt={n.title}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

function NoticesSkeleton() {
  return (
    <div className="space-y-10">
      {[0, 1].map((i) => (
        <div key={i} className="bg-white border border-line p-6 sm:p-7 animate-pulse">
          <div className="h-3 w-28 bg-line mb-3" />
          <div className="h-6 w-2/3 bg-line mb-3" />
          <div className="h-[200px] w-full bg-line" />
        </div>
      ))}
    </div>
  );
}

export default function NoticesPage() {
  return (
    <>
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute -right-16 -top-16 w-[420px] h-[420px] opacity-[0.07]">
          <Image src="/images/logo.png" alt="" fill className="object-contain" />
        </div>
        <div className="relative container-page py-20 sm:py-24 text-center">
          <div className="section-kicker !text-gold">Notices</div>
          <h1 className="text-[32px] sm:text-[42px] font-serif mb-3">Notices &amp; Announcements</h1>
          <p className="text-[#c3c9e6] max-w-xl mx-auto">
            Official circulars, exam routines and announcements from the school office.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page max-w-3xl mx-auto">
          <Suspense fallback={<NoticesSkeleton />}>
            <NoticesList />
          </Suspense>
        </div>
      </section>
    </>
  );
}
