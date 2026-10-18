import { list, put, del } from "@vercel/blob";

const INDEX_PATH = "gallery/index.json";

export const GALLERY_CATEGORIES = [
  { key: "school", label: "School" },
  { key: "program", label: "Program" },
  { key: "achievement", label: "Achievement" },
  { key: "student-voice", label: "The Student's Voice" },
];

export function isValidCategory(key) {
  return GALLERY_CATEGORIES.some((c) => c.key === key);
}

async function getIndexBlob() {
  try {
    const { blobs } = await list({ prefix: INDEX_PATH, limit: 1 });
    return blobs.find((b) => b.pathname === INDEX_PATH) || null;
  } catch {
    return null;
  }
}

export async function listGalleryImages() {
  const indexBlob = await getIndexBlob();
  if (!indexBlob) return [];
  try {
    // Cache-bust: Vercel Blob's public URLs sit behind a CDN that can briefly
    // serve a stale cached copy even with cacheControlMaxAge:0 on the blob
    // itself. Appending a unique query param forces a fresh edge fetch so
    // back-to-back writes (e.g. deleting two items quickly) don't race
    // against a stale read.
    const bustUrl = `${indexBlob.url}?v=${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const res = await fetch(bustUrl, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];
  } catch {
    return [];
  }
}

async function saveIndex(images) {
  await put(INDEX_PATH, JSON.stringify(images, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 0,
  });
}

async function uploadOneFile({ category, caption, link, file }, suffix = "") {
  const arrayBuffer = await file.arrayBuffer();
  const ext = file.name.split(".").pop() || "jpg";
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${suffix}`;
  const filePath = `gallery-files/${id}.${ext}`;

  const uploaded = await put(filePath, Buffer.from(arrayBuffer), {
    access: "public",
    addRandomSuffix: false,
    contentType: file.type || undefined,
  });

  return {
    id,
    category,
    caption: caption || "",
    link: link || "",
    fileUrl: uploaded.url,
    fileName: file.name,
    createdAt: new Date().toISOString(),
  };
}

export async function addGalleryImage({ category, caption, link, file }) {
  const image = await uploadOneFile({ category, caption, link, file });
  const images = await listGalleryImages();
  images.push(image);
  await saveIndex(images);
  return image;
}

// Uploads every file in parallel, then performs a single read-modify-write
// of the shared index — avoids the index-overwrite race that would happen
// if each file went through its own separate addGalleryImage() call.
export async function addGalleryImages({ category, caption, link, files }) {
  const newImages = await Promise.all(
    files.map((file, i) => uploadOneFile({ category, caption, link, file }, `-${i}`))
  );
  const images = await listGalleryImages();
  images.push(...newImages);
  await saveIndex(images);
  return newImages;
}

export async function updateGalleryImage(id, { category, caption, link, file }) {
  const images = await listGalleryImages();
  const index = images.findIndex((img) => img.id === id);
  if (index === -1) return null;

  const existing = images[index];
  const updated = { ...existing };

  if (typeof category === "string") updated.category = category;
  if (typeof caption === "string") updated.caption = caption;
  if (typeof link === "string") updated.link = link;

  if (file) {
    const arrayBuffer = await file.arrayBuffer();
    const ext = file.name.split(".").pop() || "jpg";
    const filePath = `gallery-files/${id}.${ext}`;

    const uploaded = await put(filePath, Buffer.from(arrayBuffer), {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: file.type || undefined,
    });

    const oldFileUrl = existing.fileUrl;
    updated.fileUrl = uploaded.url;
    updated.fileName = file.name;

    if (oldFileUrl && oldFileUrl !== uploaded.url) {
      try {
        await del(oldFileUrl);
      } catch {
        // old file already gone, ignore
      }
    }
  }

  updated.updatedAt = new Date().toISOString();
  images[index] = updated;
  await saveIndex(images);
  return updated;
}

export async function deleteGalleryImage(id) {
  const images = await listGalleryImages();
  const target = images.find((img) => img.id === id);
  if (!target) return false;
  const remaining = images.filter((img) => img.id !== id);
  await saveIndex(remaining);
  try {
    await del(target.fileUrl);
  } catch {
    // file already gone, ignore
  }
  return true;
}
