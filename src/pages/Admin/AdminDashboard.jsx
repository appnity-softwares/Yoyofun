import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Bar, BarChart } from "recharts";
import { IndianRupee, Mail, Ticket, Users, ClipboardList } from "lucide-react";
import { adminService } from "../../services/adminService";
import { formatINRFromPaise } from "../../services/api";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import EmptyState from "../../components/common/EmptyState";
import StatCard from "../../components/Admin/StatCard";
import StatusBadge from "../../components/Admin/StatusBadge";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function loadStats() {
      try {
        const data = await adminService.dashboardStats();
        if (active) {
          setStats(data);
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Unable to load dashboard.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }
    loadStats();
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <LoadingSpinner label="Loading dashboard" />;
  }

  if (error) {
    return <div className="rounded-lg bg-red-50 p-5 text-sm font-bold text-red-700">{error}</div>;
  }

  const revenueChart = stats?.revenue_chart_data || [];
  const bookingGrowth = stats?.booking_growth_stats || [];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-blue-600">Overview</p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Performance Dashboard</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard icon={IndianRupee} label="Revenue" value={formatINRFromPaise(stats.total_revenue)} tone="green" />
        <StatCard icon={ClipboardList} label="Bookings" value={stats.total_bookings} />
        <StatCard icon={Ticket} label="Active Tickets" value={stats.active_tickets} />
        <StatCard icon={Users} label="Customers" value={stats.total_customers} />
        <StatCard icon={Mail} label="Messages" value={stats.total_messages} tone="amber" />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-black text-slate-900">Revenue</h3>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={(value) => `₹${Math.round(value / 100)}`} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(value) => formatINRFromPaise(value)} />
                <Area type="monotone" dataKey="total" stroke="#2563eb" fill="#dbeafe" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-black text-slate-900">Booking Growth</h3>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bookingGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="total" fill="#16a34a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-black text-slate-900">Recent Bookings</h3>
          <div className="mt-4 space-y-3">
            {stats.recent_bookings?.length ? (
              stats.recent_bookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between gap-4 rounded-lg bg-slate-50 p-4">
                  <div>
                    <p className="font-black text-slate-900">{booking.customer_name}</p>
                    <p className="text-xs font-bold text-slate-400">{booking.booking_id}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-slate-900">{formatINRFromPaise(booking.amount)}</p>
                    <StatusBadge value={booking.payment_status} />
                  </div>
                </div>
              ))
            ) : (
              <EmptyState title="No bookings yet" />
            )}
          </div>
        </section>
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-black text-slate-900">Low Stock Alerts</h3>
          <div className="mt-4 space-y-3">
            {stats.low_stock_tickets?.length ? (
              stats.low_stock_tickets.map((ticketItem) => (
                <div key={ticketItem.id} className="flex items-center justify-between gap-4 rounded-lg bg-amber-50 p-4">
                  <div>
                    <p className="font-black text-slate-900">{ticketItem.title}</p>
                    <p className="text-xs font-bold text-amber-700">{ticketItem.category || "General"}</p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-amber-700 ring-1 ring-amber-100">{ticketItem.stock} left</span>
                </div>
              ))
            ) : (
              <EmptyState title="Stock looks healthy" />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
