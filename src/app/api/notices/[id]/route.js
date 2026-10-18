import { NextResponse } from "next/server";
import { deleteNotice } from "@/lib/notices-store";

function checkPassword(req) {
  const provided = req.headers.get("x-admin-password") || "";
  const expected = process.env.NOTICES_ADMIN_PASSWORD;
  if (!expected) return false;
  return provided === expected;
}

export async function DELETE(req, { params }) {
  if (!checkPassword(req)) {
    return NextResponse.json({ error: "Invalid or missing admin password." }, { status: 401 });
  }
  const { id } = await params;
  const ok = await deleteNotice(id);
  if (!ok) {
    return NextResponse.json({ error: "Notice not found." }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
