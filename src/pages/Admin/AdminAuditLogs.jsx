import { useCallback, useEffect, useState } from "react";
import { adminService } from "../../services/adminService";
import DataTable from "../../components/Admin/DataTable";
import Pagination from "../../components/Admin/Pagination";
import SearchInput from "../../components/Admin/SearchInput";
import RoleBadge from "../../components/Admin/RoleBadge";

export default function AdminAuditLogs() {
  const [logs, setLogs] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [module, setModule] = useState("");
  const [action, setAction] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadLogs = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await adminService.auditLogs({ page, module, action });
      setLogs(data.items);
      setMeta(data.meta);
    } catch (err) {
      setError(err.message || "Unable to load audit logs.");
    } finally {
      setLoading(false);
    }
  }, [page, module, action]);

  useEffect(() => {
    loadLogs();
  }, [loadLogs]);

  const columns = [
    { key: "created_at", label: "Time", render: (log) => new Date(log.created_at).toLocaleString("en-IN") },
    {
      key: "admin",
      label: "Admin",
      render: (log) => log.admin_user ? (
        <div>
          <p className="font-black text-slate-900">{log.admin_user.name}</p>
          <RoleBadge role={log.admin_user.role} />
        </div>
      ) : "-",
    },
    { key: "module", label: "Module" },
    { key: "action", label: "Action" },
    { key: "ip_address", label: "IP" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-blue-600">Security</p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Audit Logs</h2>
      </div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <SearchInput value={module} onChange={(value) => { setModule(value); setPage(1); }} placeholder="Filter module" />
        <SearchInput value={action} onChange={(value) => { setAction(value); setPage(1); }} placeholder="Filter action" />
      </div>
      {error && <div className="rounded-lg bg-red-50 p-4 text-sm font-bold text-red-700">{error}</div>}
      <DataTable columns={columns} rows={logs} loading={loading} emptyTitle="No audit logs found" />
      <Pagination meta={meta} onPageChange={setPage} />
    </div>
  );
}
