import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/admin-auth";
import { addVideo, extractYouTubeId, listVideos } from "@/lib/videos-store";

async function isAuthed() {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

export async function GET() {
  const videos = await listVideos();
  return NextResponse.json({ videos });
}

export async function POST(req) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Not signed in. Please log in again." }, { status: 401 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const title = (body.title || "").toString().trim();
  const description = (body.description || "").toString().trim();
  const urlInput = (body.url || "").toString().trim();

  if (!title) {
    return NextResponse.json({ error: "Please enter a title." }, { status: 400 });
  }
  const youtubeId = extractYouTubeId(urlInput);
  if (!youtubeId) {
    return NextResponse.json(
      { error: "Please paste a valid YouTube video URL (or an 11-character video ID)." },
      { status: 400 }
    );
  }

  try {
    const video = await addVideo({ title, description, youtubeId });
    return NextResponse.json({ video }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message || "Could not publish the video." }, { status: 500 });
  }
}
