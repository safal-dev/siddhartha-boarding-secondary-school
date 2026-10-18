"use client";

import { useCallback, useEffect, useState } from "react";

function NoticeForm({ onUploaded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
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
    if (!file) {
      setError("Please choose a PDF or image file.");
      return;
    }
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("description", description);
      fd.append("file", file);
      const res = await fetch("/api/notices", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Upload failed.");
      }
      setSuccess("Notice published.");
      setTitle("");
      setDescription("");
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
        <label className="block text-[13px] font-semibold text-navy mb-1.5">Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-line px-3.5 py-2.5 text-[14.5px]"
          placeholder="e.g. SEE Pre-Board Exam Routine 2082"
          required
        />
      </div>
      <div>
        <label className="block text-[13px] font-semibold text-navy mb-1.5">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full border border-line px-3.5 py-2.5 text-[14.5px]"
          placeholder="Short details students/parents should know"
        />
      </div>
      <div>
        <label className="block text-[13px] font-semibold text-navy mb-1.5">PDF or Image *</label>
        <input
          type="file"
          accept="application/pdf,image/jpeg,image/png,image/webp,image/gif"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full border border-line px-3.5 py-2.5 text-[14px] bg-cream"
          required
        />
        <p className="text-[12px] text-gray-500 mt-1.5">PDF, JPG, PNG, WEBP or GIF — max 15MB.</p>
      </div>

      {error && <p className="text-[13.5px] text-maroon font-semibold">{error}</p>}
      {success && <p className="text-[13.5px] text-green-700 font-semibold">{success}</p>}

      <button type="submit" disabled={busy} className="btn-maroon disabled:opacity-50">
        {busy ? "Uploading…" : "Publish Notice"}
      </button>
    </form>
  );
}

function EditNoticeForm({ notice, onSaved, onCancel }) {
  const [title, setTitle] = useState(notice.title);
  const [description, setDescription] = useState(notice.description || "");
  const [file, setFile] = useState(null);
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
      const fd = new FormData();
      fd.append("title", title);
      fd.append("description", description);
      if (file) fd.append("file", file);
      const res = await fetch(`/api/notices/${notice.id}`, { method: "PATCH", body: fd });
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
          Replace File <span className="font-normal text-gray-500">(optional &mdash; leave blank to keep current file)</span>
        </label>
        <input
          type="file"
          accept="application/pdf,image/jpeg,image/png,image/webp,image/gif"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full border border-line px-3 py-2 text-[13.5px] bg-white"
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

function NoticeList({ notices, onChanged }) {
  const [busyId, setBusyId] = useState(null);
  const [editingId, setEditingId] = useState(null);

  async function handleDelete(id) {
    if (!confirm("Delete this notice? This cannot be undone.")) return;
    setBusyId(id);
    try {
      const res = await fetch(`/api/notices/${id}`, { method: "DELETE" });
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

  if (notices.length === 0) {
    return <p className="text-[14px] text-gray-500">No notices published yet.</p>;
  }

  return (
    <div className="space-y-3">
      {notices.map((n) => (
        <div key={n.id} className="bg-white border border-line">
          <div className="flex items-center justify-between px-5 py-3.5">
            <div>
              <div className="font-semibold text-navy text-[14.5px]">{n.title}</div>
              <div className="text-[12px] text-gray-500">
                {n.fileType.toUpperCase()} &middot; {new Date(n.createdAt).toLocaleDateString()}
                {n.updatedAt && <> &middot; edited {new Date(n.updatedAt).toLocaleDateString()}</>}
              </div>
            </div>
            <div className="flex gap-4 shrink-0">
              <button
                onClick={() => setEditingId(editingId === n.id ? null : n.id)}
                className="text-[13px] text-navy font-semibold hover:underline"
              >
                {editingId === n.id ? "Close" : "Edit"}
              </button>
              <button
                onClick={() => handleDelete(n.id)}
                disabled={busyId === n.id}
                className="text-[13px] text-maroon font-semibold hover:underline disabled:opacity-50"
              >
                {busyId === n.id ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
          {editingId === n.id && (
            <div className="px-5 pb-5">
              <EditNoticeForm
                notice={n}
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

export default function NoticesManager() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadNotices = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/notices", { cache: "no-store" });
      const data = await res.json();
      setNotices(data.notices || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data load on mount
    loadNotices();
  }, [loadNotices]);

  return (
    <>
      <div>
        <h2 className="font-serif text-[19px] text-navy mb-3">Publish a New Notice</h2>
        <NoticeForm onUploaded={loadNotices} />
      </div>

      <div>
        <h2 className="font-serif text-[19px] text-navy mb-3">Published Notices {loading && "…"}</h2>
        <NoticeList notices={notices} onChanged={loadNotices} />
      </div>
    </>
  );
}
