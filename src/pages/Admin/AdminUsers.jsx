import { useCallback, useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { adminService } from "../../services/adminService";
import ConfirmModal from "../../components/Admin/ConfirmModal";
import DataTable from "../../components/Admin/DataTable";
import Pagination from "../../components/Admin/Pagination";
import RoleBadge from "../../components/Admin/RoleBadge";
import SearchInput from "../../components/Admin/SearchInput";
import StatusBadge from "../../components/Admin/StatusBadge";

const emptyUser = { name: "", email: "", password: "", role: "staff", is_active: true };

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyUser);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await adminService.users({ page, search });
      setUsers(data.items);
      setMeta(data.meta);
    } catch (err) {
      setError(err.message || "Unable to load users.");
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const saveUser = async (event) => {
    event.preventDefault();
    try {
      if (editing) {
        await adminService.updateUser(editing.id, form);
      } else {
        await adminService.createUser(form);
      }
      setForm(emptyUser);
      setEditing(null);
      setShowForm(false);
      await loadUsers();
    } catch (err) {
      setError(err.message || "Unable to save user.");
    }
  };

  const columns = [
    {
      key: "name",
      label: "User",
      render: (user) => (
        <button onClick={() => { setEditing(user); setForm({ name: user.name, email: user.email, password: "", role: user.role, is_active: user.is_active }); setShowForm(true); }} className="text-left">
          <p className="font-black text-slate-900">{user.name}</p>
          <p className="text-xs font-bold text-slate-400">{user.email}</p>
        </button>
      ),
    },
    { key: "role", label: "Role", render: (user) => <RoleBadge role={user.role} /> },
    { key: "is_active", label: "Status", render: (user) => <StatusBadge value={user.is_active ? "active" : "inactive"} /> },
    { key: "last_login", label: "Last Login", render: (user) => (user.last_login ? new Date(user.last_login).toLocaleString("en-IN") : "-") },
    {
      key: "actions",
      label: "Actions",
      render: (user) => (
        <button onClick={() => setDeleteTarget(user)} className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600" title="Deactivate">
          <Trash2 size={17} />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-blue-600">Access</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Admin Users</h2>
        </div>
        <button onClick={() => { setEditing(null); setForm(emptyUser); setShowForm(true); }} className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700">
          <Plus size={18} /> Add User
        </button>
      </div>
      <SearchInput value={search} onChange={(value) => { setSearch(value); setPage(1); }} placeholder="Search users" />
      {error && <div className="rounded-lg bg-red-50 p-4 text-sm font-bold text-red-700">{error}</div>}
      {showForm && (
        <form onSubmit={saveUser} className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-5">
          <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Name" required className="rounded-lg border border-slate-200 p-3 font-bold outline-none" />
          <input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="Email" required className="rounded-lg border border-slate-200 p-3 font-bold outline-none" />
          <input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder={editing ? "New password" : "Password"} required={!editing} className="rounded-lg border border-slate-200 p-3 font-bold outline-none" />
          <select value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })} className="rounded-lg border border-slate-200 p-3 font-bold outline-none">
            <option value="staff">Staff</option>
            <option value="moderator">Moderator</option>
            <option value="admin">Admin</option>
            <option value="super_admin">Super Admin</option>
          </select>
          <button className="rounded-lg bg-blue-600 px-4 py-3 text-sm font-black text-white hover:bg-blue-700">{editing ? "Update" : "Create"}</button>
        </form>
      )}
      <DataTable columns={columns} rows={users} loading={loading} emptyTitle="No admin users found" />
      <Pagination meta={meta} onPageChange={setPage} />
      <ConfirmModal
        open={Boolean(deleteTarget)}
        title="Deactivate admin user?"
        description="This keeps the account record for audit history but prevents future login."
        confirmLabel="Deactivate"
        onClose={() => setDeleteTarget(null)}
        onConfirm={async () => {
          await adminService.deleteUser(deleteTarget.id);
          setDeleteTarget(null);
          await loadUsers();
        }}
      />
    </div>
  );
}
