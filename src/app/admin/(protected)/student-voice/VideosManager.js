"use client";

import { useCallback, useEffect, useState } from "react";

function VideoForm({ onPublished }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!title.trim()) {
      setError("Please enter a title.");
      return;
    }
    if (!url.trim()) {
      setError("Please paste a YouTube video URL.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, url }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Could not publish the video.");
      }
      setSuccess("Video published.");
      setTitle("");
      setDescription("");
      setUrl("");
      onPublished();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-line p-6 sm:p-7 space-y-5">
      <div>
        <label className="block text-[13px] font-semibold text-navy mb-1.5">Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-line px-3.5 py-2.5 text-[14.5px]"
          placeholder="e.g. The Student's Voice - EP: 20"
          required
        />
      </div>
      <div>
        <label className="block text-[13px] font-semibold text-navy mb-1.5">YouTube URL *</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full border border-line px-3.5 py-2.5 text-[14.5px]"
          placeholder="https://www.youtube.com/watch?v=..."
          required
        />
        <p className="text-[12px] text-gray-500 mt-1.5">
          Paste any YouTube link (watch, youtu.be, or Shorts) — it will be embedded automatically.
        </p>
      </div>
      <div>
        <label className="block text-[13px] font-semibold text-navy mb-1.5">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full border border-line px-3.5 py-2.5 text-[14.5px]"
          placeholder="Short summary of the episode/topic"
        />
      </div>

      {error && <p className="text-[13.5px] text-maroon font-semibold">{error}</p>}
      {success && <p className="text-[13.5px] text-green-700 font-semibold">{success}</p>}

      <button type="submit" disabled={busy} className="btn-maroon disabled:opacity-50">
        {busy ? "Publishing…" : "Publish Video"}
      </button>
    </form>
  );
}

function EditVideoForm({ video, onSaved, onCancel }) {
  const [title, setTitle] = useState(video.title);
  const [description, setDescription] = useState(video.description || "");
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!title.trim()) {
      setError("Title cannot be empty.");
      return;
    }
    setBusy(true);
    try {
      const body = { title, description };
      if (url.trim()) body.url = url;
      const res = await fetch(`/api/videos/${video.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
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
        <label className="block text-[12.5px] font-semibold text-navy mb-1.5">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-line px-3 py-2 text-[14px] bg-white"
          required
        />
      </div>
      <div>
        <label className="block text-[12.5px] font-semibold text-navy mb-1.5">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full border border-line px-3 py-2 text-[14px] bg-white"
        />
      </div>
      <div>
        <label className="block text-[12.5px] font-semibold text-navy mb-1.5">
          Replace YouTube URL <span className="font-normal text-gray-500">(optional &mdash; leave blank to keep current video)</span>
        </label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full border border-line px-3 py-2 text-[13.5px] bg-white"
          placeholder="https://www.youtube.com/watch?v=..."
        />
      </div>

      {error && <p className="text-[13px] text-maroon font-semibold">{error}</p>}

      <div className="flex gap-3">
        <button type="submit" disabled={busy} className="btn-maroon !py-2 !px-4 text-[13.5px] disabled:opacity-50">
          {busy ? "Saving…" : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={busy}
          className="text-[13.5px] font-semibold text-gray-600 hover:text-navy"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function VideoList({ videos, onChanged }) {
  const [busyId, setBusyId] = useState(null);
  const [editingId, setEditingId] = useState(null);

  async function handleDelete(id) {
    if (!confirm("Delete this video? This cannot be undone.")) return;
    setBusyId(id);
    try {
      const res = await fetch(`/api/videos/${id}`, { method: "DELETE" });
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

  if (videos.length === 0) {
    return <p className="text-[14px] text-gray-500">No videos published yet.</p>;
  }

  return (
    <div className="space-y-3">
      {videos.map((v) => (
        <div key={v.id} className="bg-white border border-line">
          <div className="flex items-center justify-between px-5 py-3.5 gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={`https://img.youtube.com/vi/${v.youtubeId}/default.jpg`}
                alt=""
                className="w-16 h-12 object-cover shrink-0 bg-navy"
              />
              <div className="min-w-0">
                <div className="font-semibold text-navy text-[14.5px] truncate">{v.title}</div>
                <div className="text-[12px] text-gray-500">
                  {new Date(v.createdAt).toLocaleDateString()}
                  {v.updatedAt && <> &middot; edited {new Date(v.updatedAt).toLocaleDateString()}</>}
                </div>
              </div>
            </div>
            <div className="flex gap-4 shrink-0">
              <button
                onClick={() => setEditingId(editingId === v.id ? null : v.id)}
                className="text-[13px] text-navy font-semibold hover:underline"
              >
                {editingId === v.id ? "Close" : "Edit"}
              </button>
              <button
                onClick={() => handleDelete(v.id)}
                disabled={busyId === v.id}
                className="text-[13px] text-maroon font-semibold hover:underline disabled:opacity-50"
              >
                {busyId === v.id ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
          {editingId === v.id && (
            <div className="px-5 pb-5">
              <EditVideoForm
                video={v}
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
  );
}

export default function VideosManager() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadVideos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/videos", { cache: "no-store" });
      const data = await res.json();
      setVideos(data.videos || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data load on mount
    loadVideos();
  }, [loadVideos]);

  return (
    <>
      <div>
        <h2 className="font-serif text-[19px] text-navy mb-3">Publish a New Video</h2>
        <VideoForm onPublished={loadVideos} />
      </div>

      <div>
        <h2 className="font-serif text-[19px] text-navy mb-3">Published Videos {loading && "…"}</h2>
        <VideoList videos={videos} onChanged={loadVideos} />
      </div>
    </>
  );
}
