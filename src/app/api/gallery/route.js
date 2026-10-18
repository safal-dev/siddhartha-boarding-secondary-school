import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/admin-auth";
import { addGalleryImage, isValidCategory, listGalleryImages } from "@/lib/gallery-store";

const MAX_SIZE = 15 * 1024 * 1024; // 15MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

async function isAuthed() {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

export async function GET() {
  const images = await listGalleryImages();
  return NextResponse.json({ images });
}

export async function POST(req) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Not signed in. Please log in again." }, { status: 401 });
  }

  let formData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
  }

  const category = (formData.get("category") || "").toString().trim();
  const caption = (formData.get("caption") || "").toString().trim();
  const link = (formData.get("link") || "").toString().trim();
  const file = formData.get("file");

  if (!isValidCategory(category)) {
    return NextResponse.json({ error: "Please choose a valid category." }, { status: 400 });
  }
  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "An image file is required." }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Only JPG, PNG, WEBP or GIF images are allowed." }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File is too large (max 15MB)." }, { status: 400 });
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_STORE_ID) {
    return NextResponse.json(
      { error: "File storage is not configured yet. Enable Vercel Blob storage for this project and redeploy." },
      { status: 500 }
    );
  }

  try {
    const image = await addGalleryImage({ category, caption, link, file });
    return NextResponse.json({ image }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message || "Upload failed." }, { status: 500 });
  }
}
