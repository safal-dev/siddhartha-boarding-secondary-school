"use client";

import { useEffect, useState } from "react";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default function VideoGrid({ videos }) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!active) return;
    function onKey(e) {
      if (e.key === "Escape") setActive(null);
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  if (videos.length === 0) {
    return (
      <div className="container-page py-16">
        <div className="bg-white border border-line text-center py-14 px-6">
          <p className="text-[14.5px] text-gray-500">Videos coming soon.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container-page py-14 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setActive(v)}
              className="text-left bg-white border border-line shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="relative w-full aspect-video bg-navy overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`}
                  alt={v.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/25 transition-colors">
                  <div className="w-14 h-14 rounded-full bg-maroon/95 flex items-center justify-center shadow-lg">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-white ml-1" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-navy text-[15px] leading-snug mb-1 line-clamp-2">{v.title}</h3>
                {v.description && (
                  <p className="text-[13px] text-gray-600 leading-relaxed line-clamp-2 mb-1.5">{v.description}</p>
                )}
                <p className="text-[12px] text-gray-400">{formatDate(v.createdAt)}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-3 sm:p-8"
          onClick={() => setActive(null)}
        >
          <div
            className="w-full max-w-4xl bg-navy-dark shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-2.5 bg-navy-dark border-b border-white/10">
              <h3 className="text-white text-[14px] sm:text-[15px] font-semibold truncate pr-4">{active.title}</h3>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Minimize"
                className="shrink-0 text-white/80 hover:text-white w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="relative w-full aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${active.youtubeId}?autoplay=1`}
                title={active.title}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            {active.description && (
              <div className="px-4 py-3 text-[13.5px] text-[#c3c9e6] leading-relaxed border-t border-white/10">
                {active.description}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
