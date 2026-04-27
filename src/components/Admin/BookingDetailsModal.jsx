import { X } from "lucide-react";
import { formatINRFromPaise } from "../../services/api";
import StatusBadge from "./StatusBadge";

export default function BookingDetailsModal({ booking, onClose }) {
  if (!booking) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[180] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">Booking</p>
            <h3 className="text-xl font-black text-slate-900">{booking.booking_id}</h3>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100">
            <X size={20} />
          </button>
        </div>
        <div className="grid gap-4 p-5 md:grid-cols-2">
          {[
            ["Customer", booking.customer_name],
            ["Email", booking.customer_email],
            ["Phone", booking.customer_phone],
            ["Ticket", booking.ticket?.title],
            ["Quantity", booking.quantity],
            ["Amount", formatINRFromPaise(booking.amount)],
            ["Visit Date", new Date(booking.visit_date).toLocaleDateString("en-IN")],
            ["Razorpay Order", booking.razorpay_order_id || "-"],
            ["Payment ID", booking.razorpay_payment_id || "-"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">{label}</p>
              <p className="mt-2 break-words text-sm font-black text-slate-800">{value}</p>
            </div>
          ))}
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">Payment</p>
            <div className="mt-2"><StatusBadge value={booking.payment_status} /></div>
          </div>
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">Status</p>
            <div className="mt-2"><StatusBadge value={booking.status} /></div>
          </div>
        </div>
      </div>
    </div>
  );
}
