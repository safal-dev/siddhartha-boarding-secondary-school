import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/admin-auth";
import { deleteVideo, extractYouTubeId, updateVideo } from "@/lib/videos-store";

async function isAuthed() {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

export async function DELETE(req, { params }) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Not signed in. Please log in again." }, { status: 401 });
  }
  const { id } = await params;
  const ok = await deleteVideo(id);
  if (!ok) {
    return NextResponse.json({ error: "Video not found." }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}

export async function PATCH(req, { params }) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Not signed in. Please log in again." }, { status: 401 });
  }
  const { id } = await params;

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const title = typeof body.title === "string" ? body.title.trim() : undefined;
  const description = typeof body.description === "string" ? body.description.trim() : undefined;

  let youtubeId;
  if (typeof body.url === "string" && body.url.trim()) {
    youtubeId = extractYouTubeId(body.url.trim());
    if (!youtubeId) {
      return NextResponse.json({ error: "Please paste a valid YouTube video URL." }, { status: 400 });
    }
  }

  try {
    const updated = await updateVideo(id, { title, description, youtubeId });
    if (!updated) {
      return NextResponse.json({ error: "Video not found." }, { status: 404 });
    }
    return NextResponse.json({ video: updated });
  } catch (err) {
    return NextResponse.json({ error: err.message || "Update failed." }, { status: 500 });
  }
}
