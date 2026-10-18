import { NextResponse } from "next/server";
import { listGalleryImages } from "@/lib/gallery-store";

export async function GET(_req, { params }) {
  const { id } = await params;
  const images = await listGalleryImages();
  const image = images.find((img) => img.id === id);

  if (!image) {
    return new NextResponse("Not found", { status: 404 });
  }

  const upstream = await fetch(image.fileUrl, { cache: "no-store" });
  if (!upstream.ok || !upstream.body) {
    return new NextResponse("Not found", { status: 404 });
  }

  const contentType = upstream.headers.get("content-type") || "application/octet-stream";

  return new NextResponse(upstream.body, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `inline; filename="${(image.fileName || "photo").replace(/"/g, "")}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
