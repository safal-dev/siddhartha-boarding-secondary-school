import { Suspense } from "react";
import { connection } from "next/server";
import { listVideos } from "@/lib/videos-store";
import VideoGrid from "./VideoGrid";

export const metadata = {
  title: "The Student's Voice | Siddhartha Boarding Secondary School",
  description:
    "Watch The Student's Voice (Bidyarthiharuko Aawaz) — our students' radio and TV discussion program co-produced with Radio Kawasoti and Kawasoti TV.",
};

async function VideosContent() {
  await connection();
  const videos = await listVideos();
  return <VideoGrid videos={videos} />;
}

function VideosSkeleton() {
  return (
    <div className="container-page py-16">
      <div className="grid sm:grid-cols-3 gap-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="aspect-video bg-line animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export default function StudentVoicePage() {
  return (
    <>
      <section className="relative bg-navy text-white">
        <div className="relative container-page py-20 sm:py-24 text-center">
          <div className="section-kicker !text-gold">Resources</div>
          <h1 className="text-[32px] sm:text-[42px] font-serif mb-3">The Student&rsquo;s Voice</h1>
          <p className="text-[#c3c9e6] max-w-xl mx-auto">
            Bidyarthiharuko Aawaz &mdash; our students&rsquo; radio and TV discussion program,
            co-produced with Radio Kawasoti and Kawasoti TV.
          </p>
        </div>
      </section>

      <Suspense fallback={<VideosSkeleton />}>
        <VideosContent />
      </Suspense>
    </>
  );
}
