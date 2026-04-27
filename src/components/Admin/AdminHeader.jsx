import { Link } from "react-router-dom";
import { LogOut, Menu, ShieldCheck } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import RoleBadge from "./RoleBadge";

export default function AdminHeader({ onMenu }) {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button onClick={onMenu} className="rounded-lg border border-slate-200 p-2 text-slate-600 lg:hidden">
            <Menu size={20} />
          </button>
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">Production Console</p>
            <h1 className="text-xl font-black tracking-tight text-slate-900">YOYO Admin Panel</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/" className="hidden rounded-lg border border-slate-200 px-4 py-2 text-sm font-black text-slate-600 transition hover:bg-slate-50 md:inline-flex">
            Public Site
          </Link>
          <div className="hidden items-center gap-3 rounded-lg border border-slate-200 px-3 py-2 md:flex">
            <ShieldCheck className="text-blue-600" size={18} />
            <div>
              <p className="text-sm font-black text-slate-900">{user?.name}</p>
              <RoleBadge role={user?.role} />
            </div>
          </div>
          <button onClick={logout} className="rounded-lg bg-slate-900 p-3 text-white transition hover:bg-blue-600" title="Logout">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
