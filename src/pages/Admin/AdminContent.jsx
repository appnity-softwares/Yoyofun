import React, { useState, useEffect } from 'react';
import { contentService } from '../../services/contentService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { FileText, Save, Eye, CheckCircle2, AlertCircle } from 'lucide-react';

const AdminContent = () => {
    const [pages, setPages] = useState([]);
    const [selectedPage, setSelectedPage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        is_published: truea
    });

    useEffect(() => {
        loadPages();
    }, []);

    const loadPages = async () => {
        try {
            setLoading(true);
            const data = await contentService.adminList();
            setPages(data);
            if (data.length > 0) {
                handleSelectPage(data[0]);
            }
        } catch (err) {
            setError("Failed to load content pages.");
        } finally {
            setLoading(false);
        }
    };

    const handleSelectPage = (page) => {
        setSelectedPage(page);
        setFormData({
            title: page.title,
            content: page.content,
            is_published: page.is_published
        });
        setSuccess("");
        setError("");
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setSuccess("");
        setError("");

        try {
            const updated = await contentService.adminUpdate(selectedPage.slug, formData);
            setSuccess(`"${updated.title}" updated successfully!`);
            // Update local list
            setPages(pages.map(p => p.slug === updated.slug ? updated : p));
            setSelectedPage(updated);
        } catch (err) {
            setError(err.message || "Failed to update content.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <LoadingSpinner label="Loading content management..." />;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <p className="text-xs font-black uppercase tracking-widest text-blue-600">CMS</p>
                    <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Content Management</h2>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar - Page List */}
                <div className="lg:col-span-1 space-y-2">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 px-2 mb-4">Legal & Info Pages</p>
                    {pages.map((page) => (
                        <button
                            key={page.slug}
                            onClick={() => handleSelectPage(page)}
                            className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl text-sm font-black transition-all ${
                                selectedPage?.slug === page.slug 
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                            }`}
                        >
                            <FileText size={18} />
                            <span className="truncate">{page.title}</span>
                            {!page.is_published && (
                                <span className="ml-auto w-2 h-2 rounded-full bg-amber-400" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Editor Area */}
                <div className="lg:col-span-3">
                    {selectedPage ? (
                        <form onSubmit={handleSave} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-slate-900">{selectedPage.title}</h3>
                                        <p className="text-xs font-bold text-slate-400 italic">slug: {selectedPage.slug}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <a 
                                        href={`/${selectedPage.slug}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-600 hover:text-blue-600 transition-colors"
                                    >
                                        <Eye size={16} /> View Live
                                    </a>
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all disabled:opacity-50 shadow-lg shadow-blue-200"
                                    >
                                        {saving ? "Saving..." : <><Save size={16} /> Save Changes</>}
                                    </button>
                                </div>
                            </div>

                            <div className="p-8 space-y-6">
                                {error && (
                                    <div className="flex items-center gap-3 p-4 bg-red-50 text-red-700 rounded-2xl text-sm font-bold border border-red-100 animate-in fade-in slide-in-from-top-2">
                                        <AlertCircle size={18} /> {error}
                                    </div>
                                )}
                                {success && (
                                    <div className="flex items-center gap-3 p-4 bg-emerald-50 text-emerald-700 rounded-2xl text-sm font-bold border border-emerald-100 animate-in fade-in slide-in-from-top-2">
                                        <CheckCircle2 size={18} /> {success}
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">Display Title</label>
                                    <input 
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                                        className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-50 font-bold transition-all"
                                        placeholder="Enter page title..."
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-400">Page Content (Markdown Supported)</label>
                                        <span className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-2 py-1 rounded">Markdown Ready</span>
                                    </div>
                                    <textarea 
                                        value={formData.content}
                                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                                        className="w-full min-h-[400px] px-5 py-5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-50 font-medium transition-all resize-y text-slate-700 leading-relaxed"
                                        placeholder="Write your page content here..."
                                        required
                                    />
                                </div>

                                <div className="flex items-center gap-4 pt-4">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            checked={formData.is_published}
                                            onChange={(e) => setFormData({...formData, is_published: e.target.checked})}
                                            className="sr-only peer" 
                                        />
                                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        <span className="ms-3 text-sm font-black text-slate-700 uppercase tracking-widest">Published</span>
                                    </label>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <div className="h-full min-h-[500px] bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-12">
                            <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center text-slate-300 mb-6">
                                <FileText size={40} />
                            </div>
                            <h4 className="text-xl font-black text-slate-900">Select a page to edit</h4>
                            <p className="mt-2 text-slate-400 font-medium max-w-xs">Choose one of your legal or info pages from the sidebar to start editing.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminContent;
