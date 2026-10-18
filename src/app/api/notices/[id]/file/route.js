import { NextResponse } from "next/server";
import { listNotices } from "@/lib/notices-store";

export async function GET(_req, { params }) {
  const { id } = await params;
  const notices = await listNotices();
  const notice = notices.find((n) => n.id === id);

  if (!notice) {
    return new NextResponse("Not found", { status: 404 });
  }

  const upstream = await fetch(notice.fileUrl, { cache: "no-store" });
  if (!upstream.ok || !upstream.body) {
    return new NextResponse("Not found", { status: 404 });
  }

  const contentType =
    notice.fileType === "pdf" ? "application/pdf" : upstream.headers.get("content-type") || "application/octet-stream";

  return new NextResponse(upstream.body, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `inline; filename="${(notice.fileName || notice.title || "file").replace(/"/g, "")}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
