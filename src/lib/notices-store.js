import { list, put, del } from "@vercel/blob";

const INDEX_PATH = "notices/index.json";

async function getIndexBlob() {
  try {
    const { blobs } = await list({ prefix: INDEX_PATH, limit: 1 });
    return blobs.find((b) => b.pathname === INDEX_PATH) || null;
  } catch {
    // Blob storage not configured yet (e.g. missing BLOB_READ_WRITE_TOKEN at build time)
    return null;
  }
}

export async function listNotices() {
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

async function saveIndex(notices) {
  await put(INDEX_PATH, JSON.stringify(notices, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 0,
  });
}

export async function addNotice({ title, description, file }) {
  const arrayBuffer = await file.arrayBuffer();
  const isPdf = file.type === "application/pdf";
  const ext = isPdf ? "pdf" : (file.name.split(".").pop() || "jpg");
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const filePath = `notices-files/${id}.${ext}`;

  const uploaded = await put(filePath, Buffer.from(arrayBuffer), {
    access: "public",
    addRandomSuffix: false,
    contentType: file.type || undefined,
  });

  const notices = await listNotices();
  const notice = {
    id,
    title,
    description,
    fileUrl: uploaded.url,
    fileType: isPdf ? "pdf" : "image",
    fileName: file.name,
    createdAt: new Date().toISOString(),
  };
  notices.push(notice);
  await saveIndex(notices);
  return notice;
}

export async function deleteNotice(id) {
  const notices = await listNotices();
  const target = notices.find((n) => n.id === id);
  if (!target) return false;
  const remaining = notices.filter((n) => n.id !== id);
  await saveIndex(remaining);
  try {
    await del(target.fileUrl);
  } catch {
    // file already gone, ignore
  }
  return true;
}

export async function updateNotice(id, { title, description, file }) {
  const notices = await listNotices();
  const index = notices.findIndex((n) => n.id === id);
  if (index === -1) return null;

  const existing = notices[index];
  const updated = { ...existing };

  if (typeof title === "string") updated.title = title;
  if (typeof description === "string") updated.description = description;

  if (file) {
    const arrayBuffer = await file.arrayBuffer();
    const isPdf = file.type === "application/pdf";
    const ext = isPdf ? "pdf" : (file.name.split(".").pop() || "jpg");
    const filePath = `notices-files/${id}.${ext}`;

    const uploaded = await put(filePath, Buffer.from(arrayBuffer), {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: file.type || undefined,
    });

    const oldFileUrl = existing.fileUrl;
    updated.fileUrl = uploaded.url;
    updated.fileType = isPdf ? "pdf" : "image";
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
  notices[index] = updated;
  await saveIndex(notices);
  return updated;
}
