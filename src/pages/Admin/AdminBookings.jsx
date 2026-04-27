import { useCallback, useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { adminService } from "../../services/adminService";
import { formatINRFromPaise } from "../../services/api";
import BookingDetailsModal from "../../components/Admin/BookingDetailsModal";
import DataTable from "../../components/Admin/DataTable";
import Pagination from "../../components/Admin/Pagination";
import SearchInput from "../../components/Admin/SearchInput";
import StatusBadge from "../../components/Admin/StatusBadge";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);

  const loadBookings = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await adminService.bookings({ page, search, status, payment_status: paymentStatus });
      setBookings(data.items);
      setMeta(data.meta);
    } catch (err) {
      setError(err.message || "Unable to load bookings.");
    } finally {
      setLoading(false);
    }
  }, [page, search, status, paymentStatus]);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const updateStatus = async (booking, nextStatus) => {
    try {
      await adminService.updateBookingStatus(booking.id, nextStatus);
      await loadBookings();
    } catch (err) {
      setError(err.message || "Unable to update booking.");
    }
  };

  const columns = [
    {
      key: "customer",
      label: "Customer",
      render: (booking) => (
        <div>
          <p className="font-black text-slate-900">{booking.customer_name}</p>
          <p className="text-xs font-bold text-slate-400">{booking.customer_email}</p>
        </div>
      ),
    },
    { key: "booking_id", label: "Booking ID" },
    { key: "ticket", label: "Ticket", render: (booking) => booking.ticket?.title || "-" },
    { key: "amount", label: "Amount", render: (booking) => <span className="font-black text-blue-600">{formatINRFromPaise(booking.amount)}</span> },
    { key: "payment_status", label: "Payment", render: (booking) => <StatusBadge value={booking.payment_status} /> },
    {
      key: "status",
      label: "Status",
      render: (booking) => (
        <select value={booking.status} onChange={(event) => updateStatus(booking, event.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-black outline-none">
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
          <option value="refunded">Refunded</option>
        </select>
      ),
    },
    {
      key: "actions",
      label: "View",
      render: (booking) => (
        <button onClick={() => setSelected(booking)} className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-600" title="View booking">
          <Eye size={17} />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-blue-600">Ledger</p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Bookings</h2>
      </div>
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
        <SearchInput value={search} onChange={(value) => { setSearch(value); setPage(1); }} placeholder="Search booking, customer, phone" />
        <select value={status} onChange={(event) => { setStatus(event.target.value); setPage(1); }} className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none">
          <option value="">All booking statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
          <option value="refunded">Refunded</option>
        </select>
        <select value={paymentStatus} onChange={(event) => { setPaymentStatus(event.target.value); setPage(1); }} className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none">
          <option value="">All payment statuses</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="failed">Failed</option>
          <option value="refunded">Refunded</option>
        </select>
      </div>
      {error && <div className="rounded-lg bg-red-50 p-4 text-sm font-bold text-red-700">{error}</div>}
      <DataTable columns={columns} rows={bookings} loading={loading} emptyTitle="No bookings found" />
      <Pagination meta={meta} onPageChange={setPage} />
      <BookingDetailsModal booking={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
