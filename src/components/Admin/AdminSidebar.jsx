import { NavLink } from "react-router-dom";
import { BarChart3, BookOpen, ClipboardList, FileClock, LayoutDashboard, MessageSquare, Settings, Ticket, Users } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const navItems = [
  { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Tickets", path: "/admin/tickets", icon: Ticket },
  { label: "Bookings", path: "/admin/bookings", icon: ClipboardList },
  { label: "Messages", path: "/admin/messages", icon: MessageSquare },
  { label: "Settings", path: "/admin/settings", icon: Settings, roles: ["super_admin", "admin"] },
  { label: "Users", path: "/admin/users", icon: Users, roles: ["super_admin", "admin"] },
  { label: "Audit Logs", path: "/admin/audit-logs", icon: FileClock, roles: ["super_admin", "admin"] },
];

export default function AdminSidebar() {
  const { user } = useAuth();
  const visibleItems = navItems.filter((item) => !item.roles || item.roles.includes(user?.role));

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-slate-800 bg-slate-950 px-4 py-6 text-white lg:block">
      <div className="mb-8 px-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-600">
            <BarChart3 size={22} />
          </div>
          <div>
            <p className="text-lg font-black tracking-tight">YOYO Admin</p>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-300">Booking Ops</p>
          </div>
        </div>
      </div>
      <nav className="space-y-2">
        {visibleItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-black transition ${
                isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-950/30" : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <item.icon size={19} />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="absolute bottom-6 left-4 right-4 rounded-lg border border-white/10 bg-white/5 p-4">
        <BookOpen className="mb-3 text-blue-300" size={20} />
        <p className="text-sm font-black">YOYO FUN N FOODS</p>
        <p className="mt-1 text-xs font-semibold leading-5 text-slate-400">Secure booking, inventory, messages, and revenue operations.</p>
      </div>
    </aside>
  );
}
