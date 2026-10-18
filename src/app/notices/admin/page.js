"use client";

import { useCallback, useEffect, useState } from "react";

function NoticeForm({ password, onUploaded }) {
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
      const res = await fetch("/api/notices", {
        method: "POST",
        headers: { "x-admin-password": password },
        body: fd,
      });
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

function NoticeList({ password, notices, onDeleted }) {
  const [busyId, setBusyId] = useState(null);

  async function handleDelete(id) {
    if (!confirm("Delete this notice? This cannot be undone.")) return;
    setBusyId(id);
    try {
      const res = await fetch(`/api/notices/${id}`, {
        method: "DELETE",
        headers: { "x-admin-password": password },
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Delete failed.");
      }
      onDeleted();
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
        <div key={n.id} className="flex items-center justify-between bg-white border border-line px-5 py-3.5">
          <div>
            <div className="font-semibold text-navy text-[14.5px]">{n.title}</div>
            <div className="text-[12px] text-gray-500">
              {n.fileType.toUpperCase()} &middot; {new Date(n.createdAt).toLocaleDateString()}
            </div>
          </div>
          <button
            onClick={() => handleDelete(n.id)}
            disabled={busyId === n.id}
            className="text-[13px] text-maroon font-semibold hover:underline disabled:opacity-50"
          >
            {busyId === n.id ? "Deleting…" : "Delete"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default function NoticesAdminPage() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkedSession, setCheckedSession] = useState(false);

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
    if (typeof window === "undefined") return;
    const saved = sessionStorage.getItem("notices-admin-password");
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time session restore on mount
      setPassword(saved);
      setUnlocked(true);
    }
    setCheckedSession(true);
  }, []);

  useEffect(() => {
    if (unlocked) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- fetch triggers its own setState internally
      loadNotices();
    }
  }, [unlocked, loadNotices]);

  function handleUnlock(e) {
    e.preventDefault();
    sessionStorage.setItem("notices-admin-password", password);
    setUnlocked(true);
  }

  if (!checkedSession) {
    return null;
  }

  if (!unlocked) {
    return (
      <section className="py-24 bg-cream min-h-[60vh] flex items-center">
        <div className="container-page max-w-sm mx-auto">
          <h1 className="font-serif text-[24px] text-navy mb-5 text-center">Notices Admin</h1>
          <form onSubmit={handleUnlock} className="bg-white border border-line p-6 space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              className="w-full border border-line px-3.5 py-2.5 text-[14.5px]"
              required
              autoFocus
            />
            <button type="submit" className="btn-maroon w-full">
              Unlock
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20 bg-cream min-h-[70vh]">
      <div className="container-page max-w-2xl mx-auto space-y-10">
        <div>
          <div className="section-kicker">Notices Admin</div>
          <h1 className="text-[26px] sm:text-[32px] text-navy mb-1">Publish a New Notice</h1>
          <div className="section-divider" />
          <NoticeForm password={password} onUploaded={loadNotices} />
        </div>

        <div>
          <h2 className="font-serif text-[20px] text-navy mb-4">Published Notices {loading && "…"}</h2>
          <NoticeList password={password} notices={notices} onDeleted={loadNotices} />
        </div>
      </div>
    </section>
  );
}
