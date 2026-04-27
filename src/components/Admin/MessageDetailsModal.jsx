import { X } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function MessageDetailsModal({ message, onClose }) {
  if (!message) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[180] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-lg bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">Message</p>
            <h3 className="text-xl font-black text-slate-900">{message.subject || "Contact request"}</h3>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100">
            <X size={20} />
          </button>
        </div>
        <div className="space-y-4 p-5">
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge value={message.status} />
            <span className="text-sm font-bold text-slate-400">{new Date(message.created_at).toLocaleString("en-IN")}</span>
          </div>
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm font-black text-slate-900">{message.name}</p>
            <p className="text-sm font-semibold text-slate-500">{message.email}</p>
            {message.phone && <p className="text-sm font-semibold text-slate-500">{message.phone}</p>}
          </div>
          <p className="rounded-lg border border-slate-100 p-4 text-sm font-semibold leading-7 text-slate-600">{message.message}</p>
        </div>
      </div>
    </div>
  );
}
