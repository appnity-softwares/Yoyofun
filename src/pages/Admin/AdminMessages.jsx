import { useCallback, useEffect, useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import { adminService } from "../../services/adminService";
import ConfirmModal from "../../components/Admin/ConfirmModal";
import DataTable from "../../components/Admin/DataTable";
import MessageDetailsModal from "../../components/Admin/MessageDetailsModal";
import Pagination from "../../components/Admin/Pagination";
import SearchInput from "../../components/Admin/SearchInput";
import StatusBadge from "../../components/Admin/StatusBadge";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const loadMessages = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await adminService.messages({ page, search, status });
      setMessages(data.items);
      setMeta(data.meta);
    } catch (err) {
      setError(err.message || "Unable to load messages.");
    } finally {
      setLoading(false);
    }
  }, [page, search, status]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const updateStatus = async (message, nextStatus) => {
    try {
      await adminService.updateMessageStatus(message.id, nextStatus);
      await loadMessages();
    } catch (err) {
      setError(err.message || "Unable to update message.");
    }
  };

  const columns = [
    {
      key: "sender",
      label: "Sender",
      render: (message) => (
        <div>
          <p className="font-black text-slate-900">{message.name}</p>
          <p className="text-xs font-bold text-slate-400">{message.email}</p>
        </div>
      ),
    },
    { key: "subject", label: "Subject", render: (message) => message.subject || "Contact request" },
    { key: "created_at", label: "Date", render: (message) => new Date(message.created_at).toLocaleString("en-IN") },
    { key: "status_badge", label: "Status", render: (message) => <StatusBadge value={message.status} /> },
    {
      key: "status",
      label: "Update",
      render: (message) => (
        <select value={message.status} onChange={(event) => updateStatus(message, event.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-black outline-none">
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
          <option value="archived">Archived</option>
        </select>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (message) => (
        <div className="flex gap-2">
          <button onClick={() => setSelected(message)} className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-600" title="View">
            <Eye size={17} />
          </button>
          <button onClick={() => setDeleteTarget(message)} className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600" title="Delete">
            <Trash2 size={17} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-blue-600">Support</p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Messages</h2>
      </div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <SearchInput value={search} onChange={(value) => { setSearch(value); setPage(1); }} placeholder="Search messages" />
        <select value={status} onChange={(event) => { setStatus(event.target.value); setPage(1); }} className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none">
          <option value="">All statuses</option>
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
          <option value="archived">Archived</option>
        </select>
      </div>
      {error && <div className="rounded-lg bg-red-50 p-4 text-sm font-bold text-red-700">{error}</div>}
      <DataTable columns={columns} rows={messages} loading={loading} emptyTitle="No messages found" />
      <Pagination meta={meta} onPageChange={setPage} />
      <MessageDetailsModal message={selected} onClose={() => setSelected(null)} />
      <ConfirmModal
        open={Boolean(deleteTarget)}
        title="Delete message?"
        description="This soft deletes the contact message from the admin inbox."
        confirmLabel="Delete"
        onClose={() => setDeleteTarget(null)}
        onConfirm={async () => {
          await adminService.deleteMessage(deleteTarget.id);
          setDeleteTarget(null);
          await loadMessages();
        }}
      />
    </div>
  );
}
