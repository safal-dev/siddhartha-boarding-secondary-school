import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/admin-auth";
import AdminHeader from "./AdminHeader";

export const instant = false;

export default async function ProtectedAdminLayout({ children }) {
  const store = await cookies();
  const authed = verifySessionToken(store.get(SESSION_COOKIE)?.value);
  if (!authed) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-cream">
      <AdminHeader />
      <main>{children}</main>
    </div>
  );
}
