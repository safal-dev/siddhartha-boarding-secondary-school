import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/admin-auth";
import { deleteNotice } from "@/lib/notices-store";

async function isAuthed() {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

export async function DELETE(req, { params }) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Not signed in. Please log in again." }, { status: 401 });
  }
  const { id } = await params;
  const ok = await deleteNotice(id);
  if (!ok) {
    return NextResponse.json({ error: "Notice not found." }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
