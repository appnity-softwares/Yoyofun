import { useCallback, useEffect, useState } from "react";
import { Edit2, Plus, Power, Trash2 } from "lucide-react";
import { adminService } from "../../services/adminService";
import { formatINR } from "../../services/api";
import DataTable from "../../components/Admin/DataTable";
import SearchInput from "../../components/Admin/SearchInput";
import StatusBadge from "../../components/Admin/StatusBadge";
import Pagination from "../../components/Admin/Pagination";
import ConfirmModal from "../../components/Admin/ConfirmModal";
import TicketForm from "../../components/Admin/TicketForm";

export default function AdminTickets() {
  const [tickets, setTickets] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const loadTickets = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await adminService.tickets({ page, search, status });
      setTickets(data.items);
      setMeta(data.meta);
    } catch (err) {
      setError(err.message || "Unable to load tickets.");
    } finally {
      setLoading(false);
    }
  }, [page, search, status]);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  const saveTicket = async (payload) => {
    setSubmitting(true);
    try {
      if (editing) {
        await adminService.updateTicket(editing.id, payload);
      } else {
        await adminService.createTicket(payload);
      }
      setFormOpen(false);
      setEditing(null);
      await loadTickets();
    } catch (err) {
      setError(err.message || "Unable to save ticket.");
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      key: "title",
      label: "Ticket",
      render: (ticket) => (
        <div>
          <p className="font-black text-slate-900">{ticket.title}</p>
          <p className="text-xs font-bold text-slate-400">{ticket.slug}</p>
        </div>
      ),
    },
    { key: "price", label: "Price", render: (ticket) => <span className="font-black text-blue-600">{formatINR(ticket.price)}</span> },
    { key: "stock", label: "Stock", render: (ticket) => `${ticket.stock} left` },
    { key: "sold_count", label: "Sold" },
    { key: "status", label: "Status", render: (ticket) => <StatusBadge value={ticket.is_active ? "active" : "inactive"} /> },
    {
      key: "actions",
      label: "Actions",
      render: (ticket) => (
        <div className="flex gap-2">
          <button onClick={() => { setEditing(ticket); setFormOpen(true); }} className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-600" title="Edit">
            <Edit2 size={17} />
          </button>
          <button onClick={() => adminService.toggleTicketStatus(ticket.id).then(loadTickets).catch((err) => setError(err.message))} className="rounded-lg p-2 text-slate-500 hover:bg-amber-50 hover:text-amber-600" title="Toggle status">
            <Power size={17} />
          </button>
          <button onClick={() => setDeleteTarget(ticket)} className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600" title="Delete">
            <Trash2 size={17} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-blue-600">Inventory</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Tickets</h2>
        </div>
        <button onClick={() => { setEditing(null); setFormOpen(true); }} className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700">
          <Plus size={18} /> Add Ticket
        </button>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <SearchInput value={search} onChange={(value) => { setSearch(value); setPage(1); }} placeholder="Search tickets" />
        <select value={status} onChange={(event) => { setStatus(event.target.value); setPage(1); }} className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-blue-500">
          <option value="">All statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {error && <div className="rounded-lg bg-red-50 p-4 text-sm font-bold text-red-700">{error}</div>}
      {formOpen && (
        <TicketForm
          key={editing?.id || "new-ticket"}
          ticket={editing}
          submitting={submitting}
          onSubmit={saveTicket}
          onCancel={() => { setFormOpen(false); setEditing(null); }}
        />
      )}

      <DataTable columns={columns} rows={tickets} loading={loading} emptyTitle="No tickets found" />
      <Pagination meta={meta} onPageChange={setPage} />
      <ConfirmModal
        open={Boolean(deleteTarget)}
        title="Delete ticket?"
        description="This soft deletes the ticket from the admin catalog and removes it from public purchase flows."
        confirmLabel="Delete"
        onClose={() => setDeleteTarget(null)}
        onConfirm={async () => {
          await adminService.deleteTicket(deleteTarget.id);
          setDeleteTarget(null);
          await loadTickets();
        }}
      />
    </div>
  );
}
