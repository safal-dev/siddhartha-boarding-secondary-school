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
    const res = await fetch(indexBlob.url, { cache: "no-store" });
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
