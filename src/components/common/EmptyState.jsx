import { Inbox } from "lucide-react";

export default function EmptyState({ title = "Nothing here yet", description = "New records will appear here." }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-200 bg-white p-10 text-center">
      <Inbox className="mx-auto mb-4 text-slate-300" size={36} />
      <h3 className="text-lg font-black text-slate-800">{title}</h3>
      <p className="mt-2 text-sm font-medium text-slate-400">{description}</p>
    </div>
  );
}
