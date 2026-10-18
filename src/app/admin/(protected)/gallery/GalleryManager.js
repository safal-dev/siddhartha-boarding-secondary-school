"use client";

import { useCallback, useEffect, useState } from "react";

const CATEGORIES = [
  { key: "school", label: "School" },
  { key: "program", label: "Program" },
  { key: "achievement", label: "Achievement" },
  { key: "student-voice", label: "The Student's Voice" },
];

function UploadForm({ onUploaded }) {
  const [category, setCategory] = useState("school");
  const [caption, setCaption] = useState("");
  const [link, setLink] = useState("");
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!file) {
      setError("Please choose an image file.");
      return;
    }
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("category", category);
      fd.append("caption", caption);
      fd.append("link", link);
      fd.append("file", file);
      const res = await fetch("/api/gallery", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Upload failed.");
      }
      setSuccess("Photo added to gallery.");
      setCaption("");
      setLink("");
      setFile(null);
      e.target.reset();
      onUploaded();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-line p-6 sm:p-7 space-y-5">
      <div>
        <label className="block text-[13px] font-semibold text-navy mb-1.5">Category *</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-line px-3.5 py-2.5 text-[14.5px] bg-white"
        >
          {CATEGORIES.map((c) => (
            <option key={c.key} value={c.key}>
              {c.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-[13px] font-semibold text-navy mb-1.5">Caption (optional)</label>
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full border border-line px-3.5 py-2.5 text-[14.5px]"
          placeholder="e.g. Annual sports day, 2082"
        />
      </div>
      <div>
        <label className="block text-[13px] font-semibold text-navy mb-1.5">
          Link (optional &mdash; e.g. a Facebook video for The Student&rsquo;s Voice)
        </label>
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full border border-line px-3.5 py-2.5 text-[14.5px]"
          placeholder="https://www.facebook.com/..."
        />
      </div>
      <div>
        <label className="block text-[13px] font-semibold text-navy mb-1.5">Image *</label>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full border border-line px-3.5 py-2.5 text-[14px] bg-cream"
          required
        />
        <p className="text-[12px] text-gray-500 mt-1.5">JPG, PNG, WEBP or GIF — max 15MB.</p>
      </div>

      {error && <p className="text-[13.5px] text-maroon font-semibold">{error}</p>}
      {success && <p className="text-[13.5px] text-green-700 font-semibold">{success}</p>}

      <button type="submit" disabled={busy} className="btn-maroon disabled:opacity-50">
        {busy ? "Uploading…" : "Add to Gallery"}
      </button>
    </form>
  );
}

function EditImageForm({ image, onCancel, onSaved }) {
  const [category, setCategory] = useState(image.category);
  const [caption, setCaption] = useState(image.caption || "");
  const [link, setLink] = useState(image.link || "");
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("category", category);
      fd.append("caption", caption);
      fd.append("link", link);
      if (file) fd.append("file", file);
      const res = await fetch(`/api/gallery/${image.id}`, { method: "PATCH", body: fd });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Update failed.");
      }
      onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-cream border border-line p-5 mt-2 space-y-4">
      <div>
        <label className="block text-[12.5px] font-semibold text-navy mb-1.5">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-line px-3 py-2 text-[14px] bg-white"
        >
          {CATEGORIES.map((c) => (
            <option key={c.key} value={c.key}>
              {c.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-[12.5px] font-semibold text-navy mb-1.5">Caption</label>
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full border border-line px-3 py-2 text-[14px] bg-white"
        />
      </div>
      <div>
        <label className="block text-[12.5px] font-semibold text-navy mb-1.5">Link</label>
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full border border-line px-3 py-2 text-[14px] bg-white"
          placeholder="https://..."
        />
      </div>
      <div>
        <label className="block text-[12.5px] font-semibold text-navy mb-1.5">
          Replace Image <span className="font-normal text-gray-500">(optional)</span>
        </label>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full border border-line px-3 py-2 text-[13.5px] bg-white"
        />
      </div>

      {error && <p className="text-[13px] text-maroon font-semibold">{error}</p>}

      <div className="flex gap-3">
        <button type="submit" disabled={busy} className="btn-maroon !py-2 !px-4 text-[13.5px] disabled:opacity-50">
          {busy ? "Saving…" : "Save Changes"}
        </button>
        <button type="button" onClick={onCancel} disabled={busy} className="text-[13.5px] font-semibold text-gray-600 hover:text-navy">
          Cancel
        </button>
      </div>
    </form>
  );
}

function ImageList({ images, onChanged }) {
  const [busyId, setBusyId] = useState(null);
  const [editingId, setEditingId] = useState(null);

  async function handleDelete(id) {
    if (!confirm("Delete this photo? This cannot be undone.")) return;
    setBusyId(id);
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Delete failed.");
      }
      onChanged();
    } catch (err) {
      alert(err.message);
    } finally {
      setBusyId(null);
    }
  }

  if (images.length === 0) {
    return <p className="text-[14px] text-gray-500">No photos uploaded yet.</p>;
  }

  return (
    <div className="space-y-4">
      {CATEGORIES.map((cat) => {
        const items = images.filter((img) => img.category === cat.key);
        return (
          <div key={cat.key}>
            <h3 className="text-[13px] font-bold uppercase tracking-wide text-maroon mb-2">
              {cat.label} ({items.length})
            </h3>
            {items.length === 0 ? (
              <p className="text-[13.5px] text-gray-400 mb-3">No photos in this category yet.</p>
            ) : (
              <div className="space-y-2 mb-3">
                {items.map((img) => (
                  <div key={img.id} className="bg-white border border-line">
                    <div className="flex items-center gap-4 px-4 py-3">
                      <div className="relative w-[70px] h-[52px] bg-cream shrink-0 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={`/api/gallery/${img.id}/file`} alt={img.caption || cat.label} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-navy text-[14px] truncate">{img.caption || "(no caption)"}</div>
                        <div className="text-[12px] text-gray-500">
                          {new Date(img.createdAt).toLocaleDateString()}
                          {img.link && <> &middot; has link</>}
                        </div>
                      </div>
                      <div className="flex gap-3.5 shrink-0">
                        <button
                          onClick={() => setEditingId(editingId === img.id ? null : img.id)}
                          className="text-[13px] text-navy font-semibold hover:underline"
                        >
                          {editingId === img.id ? "Close" : "Edit"}
                        </button>
                        <button
                          onClick={() => handleDelete(img.id)}
                          disabled={busyId === img.id}
                          className="text-[13px] text-maroon font-semibold hover:underline disabled:opacity-50"
                        >
                          {busyId === img.id ? "Deleting…" : "Delete"}
                        </button>
                      </div>
                    </div>
                    {editingId === img.id && (
                      <div className="px-4 pb-4">
                        <EditImageForm
                          image={img}
                          onCancel={() => setEditingId(null)}
                          onSaved={() => {
                            setEditingId(null);
                            onChanged();
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function GalleryManager() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadImages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/gallery", { cache: "no-store" });
      const data = await res.json();
      setImages(data.images || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data load on mount
    loadImages();
  }, [loadImages]);

  return (
    <>
      <div>
        <h2 className="font-serif text-[19px] text-navy mb-3">Add a Photo</h2>
        <UploadForm onUploaded={loadImages} />
      </div>

      <div>
        <h2 className="font-serif text-[19px] text-navy mb-3">Gallery Photos {loading && "…"}</h2>
        <ImageList images={images} onChanged={loadImages} />
      </div>
    </>
  );
}
