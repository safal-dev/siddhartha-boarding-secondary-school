import { list, put } from "@vercel/blob";

const INDEX_PATH = "videos/index.json";

// Accepts any common YouTube URL format (watch, youtu.be, shorts, embed) or
// a bare 11-char video ID, and returns just the video ID.
export function extractYouTubeId(input) {
  if (!input) return null;
  const trimmed = input.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;

  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtube\.com\/shorts\/|youtube\.com\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const re of patterns) {
    const m = trimmed.match(re);
    if (m) return m[1];
  }
  try {
    const url = new URL(trimmed);
    const v = url.searchParams.get("v");
    if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v;
  } catch {
    // not a valid URL, ignore
  }
  return null;
}

async function getIndexBlob() {
  try {
    const { blobs } = await list({ prefix: INDEX_PATH, limit: 1 });
    return blobs.find((b) => b.pathname === INDEX_PATH) || null;
  } catch {
    return null;
  }
}

export async function listVideos() {
  const indexBlob = await getIndexBlob();
  if (!indexBlob) return [];
  try {
    // Cache-bust the same way as notices/gallery, to avoid a stale CDN read.
    const bustUrl = `${indexBlob.url}?v=${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const res = await fetch(bustUrl, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];
  } catch {
    return [];
  }
}

async function saveIndex(videos) {
  await put(INDEX_PATH, JSON.stringify(videos, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 0,
  });
}

export async function addVideo({ title, description, youtubeId }) {
  const video = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: title || "",
    description: description || "",
    youtubeId,
    createdAt: new Date().toISOString(),
  };
  const videos = await listVideos();
  videos.push(video);
  await saveIndex(videos);
  return video;
}

export async function updateVideo(id, { title, description, youtubeId }) {
  const videos = await listVideos();
  const index = videos.findIndex((v) => v.id === id);
  if (index === -1) return null;

  const updated = { ...videos[index] };
  if (typeof title === "string") updated.title = title;
  if (typeof description === "string") updated.description = description;
  if (youtubeId) updated.youtubeId = youtubeId;
  updated.updatedAt = new Date().toISOString();

  videos[index] = updated;
  await saveIndex(videos);
  return updated;
}

export async function deleteVideo(id) {
  const videos = await listVideos();
  const target = videos.find((v) => v.id === id);
  if (!target) return false;
  const remaining = videos.filter((v) => v.id !== id);
  await saveIndex(remaining);
  return true;
}
