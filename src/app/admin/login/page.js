"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed.");
      }
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="min-h-screen bg-navy flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-7">
          <div className="w-[72px] h-[72px] bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-xl">
            <Image src="/images/logo.png" alt="School crest" width={54} height={54} />
          </div>
          <h1 className="font-serif text-[22px] text-white">Siddhartha CMS</h1>
          <p className="text-[13px] text-[#c3c9e6] mt-1">Staff sign in</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-7 space-y-4 shadow-2xl">
          <div>
            <label className="block text-[13px] font-semibold text-navy mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-line px-3.5 py-2.5 text-[14.5px]"
              required
              autoFocus
            />
          </div>

          {error && <p className="text-[13.5px] text-maroon font-semibold">{error}</p>}

          <button type="submit" disabled={busy} className="btn-maroon w-full disabled:opacity-50">
            {busy ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="text-center text-[12.5px] text-[#9ba4c9] mt-5">
          Authorized school staff only.
        </p>
      </div>
    </section>
  );
}
