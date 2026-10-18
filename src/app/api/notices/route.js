import { NextResponse } from "next/server";
import { addNotice, listNotices } from "@/lib/notices-store";

const MAX_SIZE = 15 * 1024 * 1024; // 15MB
const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/webp", "image/gif"];

function checkPassword(req) {
  const provided = req.headers.get("x-admin-password") || "";
  const expected = process.env.NOTICES_ADMIN_PASSWORD;
  if (!expected) return false; // refuse all writes until an admin password is configured
  return provided === expected;
}

export async function GET() {
  const notices = await listNotices();
  return NextResponse.json({ notices });
}

export async function POST(req) {
  if (!checkPassword(req)) {
    return NextResponse.json({ error: "Invalid or missing admin password." }, { status: 401 });
  }

  let formData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
  }

  const title = (formData.get("title") || "").toString().trim();
  const description = (formData.get("description") || "").toString().trim();
  const file = formData.get("file");

  if (!title) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }
  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "A PDF or image file is required." }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Only PDF, JPG, PNG, WEBP or GIF files are allowed." }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File is too large (max 15MB)." }, { status: 400 });
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "File storage is not configured yet. Enable Vercel Blob storage for this project and redeploy." },
      { status: 500 }
    );
  }

  try {
    const notice = await addNotice({ title, description, file });
    return NextResponse.json({ notice }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message || "Upload failed." }, { status: 500 });
  }
}
