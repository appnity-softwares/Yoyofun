const styles = {
  active: "bg-green-50 text-green-700 ring-green-100",
  inactive: "bg-slate-100 text-slate-600 ring-slate-200",
  paid: "bg-green-50 text-green-700 ring-green-100",
  pending: "bg-amber-50 text-amber-700 ring-amber-100",
  failed: "bg-red-50 text-red-700 ring-red-100",
  refunded: "bg-purple-50 text-purple-700 ring-purple-100",
  confirmed: "bg-blue-50 text-blue-700 ring-blue-100",
  cancelled: "bg-red-50 text-red-700 ring-red-100",
  new: "bg-blue-50 text-blue-700 ring-blue-100",
  read: "bg-slate-100 text-slate-600 ring-slate-200",
  replied: "bg-green-50 text-green-700 ring-green-100",
  archived: "bg-slate-100 text-slate-500 ring-slate-200",
};

export default function StatusBadge({ value }) {
  const normalized = String(value || "inactive").toLowerCase();
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide ring-1 ${styles[normalized] || styles.inactive}`}>
      {normalized.replace("_", " ")}
    </span>
  );
}
