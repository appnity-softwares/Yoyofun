export default function StatCard({ icon: Icon, label, value, tone = "blue" }) {
  const toneClass = tone === "green" ? "text-green-600 bg-green-50" : tone === "amber" ? "text-amber-600 bg-amber-50" : "text-blue-600 bg-blue-50";
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">{label}</p>
          <p className="mt-3 text-3xl font-black tracking-tight text-slate-900">{value}</p>
        </div>
        {Icon && (
          <div className={`rounded-lg p-3 ${toneClass}`}>
            <Icon size={24} />
          </div>
        )}
      </div>
    </div>
  );
}
