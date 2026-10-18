import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/admin-auth";
import { deleteNotice, updateNotice } from "@/lib/notices-store";

const MAX_SIZE = 15 * 1024 * 1024; // 15MB
const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/webp", "image/gif"];

async function isAuthed() {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

export async function DELETE(req, { params }) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Not signed in. Please log in again." }, { status: 401 });
  }
  const { id } = await params;
  const ok = await deleteNotice(id);
  if (!ok) {
    return NextResponse.json({ error: "Notice not found." }, { status: 404 });
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

  const titleRaw = formData.get("title");
  const descriptionRaw = formData.get("description");
  const file = formData.get("file");

  const title = typeof titleRaw === "string" ? titleRaw.trim() : undefined;
  const description = typeof descriptionRaw === "string" ? descriptionRaw.trim() : undefined;

  if (title !== undefined && !title) {
    return NextResponse.json({ error: "Title cannot be empty." }, { status: 400 });
  }

  let fileToUse;
  if (file && typeof file !== "string") {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "Only PDF, JPG, PNG, WEBP or GIF files are allowed." }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File is too large (max 15MB)." }, { status: 400 });
    }
    fileToUse = file;
  }

  try {
    const updated = await updateNotice(id, { title, description, file: fileToUse });
    if (!updated) {
      return NextResponse.json({ error: "Notice not found." }, { status: 404 });
    }
    return NextResponse.json({ notice: updated });
  } catch (err) {
    return NextResponse.json({ error: err.message || "Update failed." }, { status: 500 });
  }
}
