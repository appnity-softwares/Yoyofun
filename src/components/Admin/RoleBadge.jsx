const labels = {
  super_admin: "Super Admin",
  admin: "Admin",
  moderator: "Moderator",
  staff: "Staff",
};

export default function RoleBadge({ role }) {
  return (
    <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-black uppercase tracking-wide text-blue-700 ring-1 ring-blue-100">
      {labels[role] || role}
    </span>
  );
}
