import { useEffect, useState } from "react";
import { adminService } from "../../services/adminService";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ImageUploadField from "../../components/Admin/ImageUploadField";

const emptySettings = {
  site_name: "YOYO FUN N FOODS",
  logo_url: "",
  contact_email: "",
  phone_numbers: "",
  address: "",
  social_links: { facebook: "", instagram: "", twitter: "" },
  seo_title: "",
  seo_description: "",
  razorpay_enabled: true,
  maintenance_mode: false,
  feature_toggles: { onlineBooking: true, contactForm: true },
};

export default function AdminSettings() {
  const [form, setForm] = useState(emptySettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function loadSettings() {
      try {
        const data = await adminService.settings();
        if (active) {
          setForm({
            ...data,
            phone_numbers: Array.isArray(data.phone_numbers) ? data.phone_numbers.join("\n") : "",
            social_links: data.social_links || {},
            feature_toggles: data.feature_toggles || {},
          });
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Unable to load settings.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }
    loadSettings();
    return () => {
      active = false;
    };
  }, []);

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const updateSocial = (key, value) => setForm((current) => ({ ...current, social_links: { ...current.social_links, [key]: value } }));
  const updateToggle = (key, value) => setForm((current) => ({ ...current, feature_toggles: { ...current.feature_toggles, [key]: value } }));

  const save = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const payload = {
        ...form,
        phone_numbers: form.phone_numbers.split("\n").map((item) => item.trim()).filter(Boolean),
      };
      await adminService.updateSettings(payload);
      setMessage("Settings updated.");
    } catch (err) {
      setError(err.message || "Unable to save settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner label="Loading settings" />;
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-blue-600">Configuration</p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Settings</h2>
      </div>
      {error && <div className="rounded-lg bg-red-50 p-4 text-sm font-bold text-red-700">{error}</div>}
      {message && <div className="rounded-lg bg-green-50 p-4 text-sm font-bold text-green-700">{message}</div>}
      <form onSubmit={save} className="space-y-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">Site Name</span>
            <input value={form.site_name} onChange={(event) => update("site_name", event.target.value)} required className="w-full rounded-lg border border-slate-200 p-3 font-bold outline-none focus:border-blue-500" />
          </label>
          <ImageUploadField 
            label="Logo Image"
            value={form.logo_url}
            folder="settings"
            onChange={(url) => update("logo_url", url)}
            placeholder="Select site logo"
          />
          <label className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">Contact Email</span>
            <input type="email" value={form.contact_email || ""} onChange={(event) => update("contact_email", event.target.value)} className="w-full rounded-lg border border-slate-200 p-3 font-bold outline-none focus:border-blue-500" />
          </label>
          <label className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">SEO Title</span>
            <input value={form.seo_title || ""} onChange={(event) => update("seo_title", event.target.value)} className="w-full rounded-lg border border-slate-200 p-3 font-bold outline-none focus:border-blue-500" />
          </label>
        </div>
        <label className="block space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">Address</span>
          <textarea rows="3" value={form.address || ""} onChange={(event) => update("address", event.target.value)} className="w-full rounded-lg border border-slate-200 p-3 font-bold outline-none focus:border-blue-500" />
        </label>
        <label className="block space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">Phone Numbers</span>
          <textarea rows="3" value={form.phone_numbers} onChange={(event) => update("phone_numbers", event.target.value)} className="w-full rounded-lg border border-slate-200 p-3 font-bold outline-none focus:border-blue-500" />
        </label>
        <label className="block space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">SEO Description</span>
          <textarea rows="3" value={form.seo_description || ""} onChange={(event) => update("seo_description", event.target.value)} className="w-full rounded-lg border border-slate-200 p-3 font-bold outline-none focus:border-blue-500" />
        </label>
        <div className="grid gap-5 md:grid-cols-3">
          {["facebook", "instagram", "twitter"].map((key) => (
            <label key={key} className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">{key}</span>
              <input value={form.social_links?.[key] || ""} onChange={(event) => updateSocial(key, event.target.value)} className="w-full rounded-lg border border-slate-200 p-3 font-bold outline-none focus:border-blue-500" />
            </label>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          <label className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 text-sm font-black text-slate-600">
            <input type="checkbox" checked={form.razorpay_enabled} onChange={(event) => update("razorpay_enabled", event.target.checked)} className="h-5 w-5 rounded border-slate-300 text-blue-600" />
            Razorpay
          </label>
          <label className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 text-sm font-black text-slate-600">
            <input type="checkbox" checked={form.maintenance_mode} onChange={(event) => update("maintenance_mode", event.target.checked)} className="h-5 w-5 rounded border-slate-300 text-blue-600" />
            Maintenance
          </label>
          <label className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 text-sm font-black text-slate-600">
            <input type="checkbox" checked={Boolean(form.feature_toggles?.onlineBooking)} onChange={(event) => updateToggle("onlineBooking", event.target.checked)} className="h-5 w-5 rounded border-slate-300 text-blue-600" />
            Online Booking
          </label>
          <label className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 text-sm font-black text-slate-600">
            <input type="checkbox" checked={Boolean(form.feature_toggles?.contactForm)} onChange={(event) => updateToggle("contactForm", event.target.checked)} className="h-5 w-5 rounded border-slate-300 text-blue-600" />
            Contact Form
          </label>
        </div>
        <button disabled={saving} className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-black text-white hover:bg-blue-700 disabled:opacity-60">
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
}
