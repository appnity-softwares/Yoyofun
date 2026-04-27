import { useState } from "react";

const emptyTicket = {
  title: "",
  slug: "",
  description: "",
  price: "",
  original_price: "",
  category: "",
  features: "",
  validity: "Valid for selected visit date",
  stock: 0,
  is_active: true,
  sort_order: 0,
};

export default function TicketForm({ ticket, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState(() => ticket ? {
    title: ticket.title || "",
    slug: ticket.slug || "",
    description: ticket.description || "",
    price: ticket.price || "",
    original_price: ticket.original_price || "",
    category: ticket.category || "",
    features: Array.isArray(ticket.features) ? ticket.features.join("\n") : "",
    validity: ticket.validity || "Valid for selected visit date",
    stock: ticket.stock || 0,
    is_active: Boolean(ticket.is_active),
    sort_order: ticket.sort_order || 0,
  } : emptyTicket);

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const submit = (event) => {
    event.preventDefault();
    onSubmit({
      ...form,
      price: Number(form.price),
      original_price: form.original_price ? Number(form.original_price) : null,
      stock: Number(form.stock),
      sort_order: Number(form.sort_order),
      features: form.features.split("\n").map((item) => item.trim()).filter(Boolean),
    });
  };

  return (
    <form onSubmit={submit} className="space-y-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">Title</span>
          <input value={form.title} onChange={(event) => update("title", event.target.value)} required className="w-full rounded-lg border border-slate-200 p-3 font-bold outline-none focus:border-blue-500" />
        </label>
        <label className="space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">Slug</span>
          <input value={form.slug} onChange={(event) => update("slug", event.target.value)} className="w-full rounded-lg border border-slate-200 p-3 font-bold outline-none focus:border-blue-500" />
        </label>
      </div>
      <label className="block space-y-2">
        <span className="text-xs font-black uppercase tracking-widest text-slate-400">Description</span>
        <textarea value={form.description} onChange={(event) => update("description", event.target.value)} rows="4" className="w-full rounded-lg border border-slate-200 p-3 font-bold outline-none focus:border-blue-500" />
      </label>
      <div className="grid gap-5 md:grid-cols-4">
        <label className="space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">Price</span>
          <input type="number" min="1" value={form.price} onChange={(event) => update("price", event.target.value)} required className="w-full rounded-lg border border-slate-200 p-3 font-bold outline-none focus:border-blue-500" />
        </label>
        <label className="space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">Original</span>
          <input type="number" min="0" value={form.original_price || ""} onChange={(event) => update("original_price", event.target.value)} className="w-full rounded-lg border border-slate-200 p-3 font-bold outline-none focus:border-blue-500" />
        </label>
        <label className="space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">Stock</span>
          <input type="number" min="0" value={form.stock} onChange={(event) => update("stock", event.target.value)} className="w-full rounded-lg border border-slate-200 p-3 font-bold outline-none focus:border-blue-500" />
        </label>
        <label className="space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">Sort</span>
          <input type="number" value={form.sort_order} onChange={(event) => update("sort_order", event.target.value)} className="w-full rounded-lg border border-slate-200 p-3 font-bold outline-none focus:border-blue-500" />
        </label>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">Category</span>
          <input value={form.category} onChange={(event) => update("category", event.target.value)} className="w-full rounded-lg border border-slate-200 p-3 font-bold outline-none focus:border-blue-500" />
        </label>
        <label className="space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">Validity</span>
          <input value={form.validity} onChange={(event) => update("validity", event.target.value)} className="w-full rounded-lg border border-slate-200 p-3 font-bold outline-none focus:border-blue-500" />
        </label>
      </div>
      <label className="block space-y-2">
        <span className="text-xs font-black uppercase tracking-widest text-slate-400">Features</span>
        <textarea value={form.features} onChange={(event) => update("features", event.target.value)} rows="4" className="w-full rounded-lg border border-slate-200 p-3 font-bold outline-none focus:border-blue-500" placeholder="One feature per line" />
      </label>
      <label className="flex items-center gap-3 text-sm font-black text-slate-600">
        <input type="checkbox" checked={form.is_active} onChange={(event) => update("is_active", event.target.checked)} className="h-5 w-5 rounded border-slate-300 text-blue-600" />
        Active ticket
      </label>
      <div className="flex justify-end gap-3">
        <button type="button" onClick={onCancel} className="rounded-lg border border-slate-200 px-5 py-3 text-sm font-black text-slate-600 hover:bg-slate-50">
          Cancel
        </button>
        <button disabled={submitting} className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700 disabled:opacity-60">
          {submitting ? "Saving..." : "Save Ticket"}
        </button>
      </div>
    </form>
  );
}
