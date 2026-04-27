import { useState } from "react";
import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { useAuth } from "../../hooks/useAuth";

const mobileItems = [
  ["Dashboard", "/admin/dashboard"],
  ["Tickets", "/admin/tickets"],
  ["Bookings", "/admin/bookings"],
  ["Messages", "/admin/messages"],
  ["Settings", "/admin/settings", ["super_admin", "admin"]],
  ["Users", "/admin/users", ["super_admin", "admin"]],
  ["Audit Logs", "/admin/audit-logs", ["super_admin", "admin"]],
];

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <AdminSidebar />
      {open && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 p-4 backdrop-blur-sm lg:hidden">
          <div className="h-full w-full max-w-sm rounded-lg bg-slate-950 p-4 text-white shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-lg font-black">YOYO Admin</p>
              <button onClick={() => setOpen(false)} className="rounded-lg bg-white/10 p-2">
                <X size={18} />
              </button>
            </div>
            <nav className="space-y-2">
              {mobileItems
                .filter((item) => !item[2] || item[2].includes(user?.role))
                .map(([label, path]) => (
                  <NavLink
                    key={path}
                    to={path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) => `block rounded-lg px-4 py-3 text-sm font-black ${isActive ? "bg-blue-600" : "text-slate-300"}`}
                  >
                    {label}
                  </NavLink>
                ))}
            </nav>
          </div>
        </div>
      )}
      <div className="lg:pl-72">
        <AdminHeader onMenu={() => setOpen(true)} />
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
