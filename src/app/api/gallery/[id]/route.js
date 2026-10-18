import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/admin-auth";
import { deleteGalleryImage, isValidCategory, updateGalleryImage } from "@/lib/gallery-store";

const MAX_SIZE = 15 * 1024 * 1024; // 15MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

async function isAuthed() {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

export async function DELETE(req, { params }) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Not signed in. Please log in again." }, { status: 401 });
  }
  const { id } = await params;
  const ok = await deleteGalleryImage(id);
  if (!ok) {
    return NextResponse.json({ error: "Image not found." }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}

export async function PATCH(req, { params }) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Not signed in. Please log in again." }, { status: 401 });
  }
  const { id } = await params;

  let formData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
  }

  const categoryRaw = formData.get("category");
  const captionRaw = formData.get("caption");
  const linkRaw = formData.get("link");
  const file = formData.get("file");

  const category = typeof categoryRaw === "string" ? categoryRaw.trim() : undefined;
  const caption = typeof captionRaw === "string" ? captionRaw.trim() : undefined;
  const link = typeof linkRaw === "string" ? linkRaw.trim() : undefined;

  if (category !== undefined && !isValidCategory(category)) {
    return NextResponse.json({ error: "Please choose a valid category." }, { status: 400 });
  }

  let fileToUse;
  if (file && typeof file !== "string") {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "Only JPG, PNG, WEBP or GIF images are allowed." }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File is too large (max 15MB)." }, { status: 400 });
    }
    fileToUse = file;
  }

  try {
    const updated = await updateGalleryImage(id, { category, caption, link, file: fileToUse });
    if (!updated) {
      return NextResponse.json({ error: "Image not found." }, { status: 404 });
    }
    return NextResponse.json({ image: updated });
  } catch (err) {
    return NextResponse.json({ error: err.message || "Update failed." }, { status: 500 });
  }
}
