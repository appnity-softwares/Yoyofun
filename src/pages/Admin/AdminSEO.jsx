import React, { useState, useEffect } from 'react';
import { seoService } from '../../services/seoService';
import { Search, Globe, Save, Loader2, AlertCircle, CheckCircle2, ChevronRight, Eye } from 'lucide-react';

const AdminSEO = () => {
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPage, setSelectedPage] = useState(null);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        page_slug: '',
        meta_title: '',
        meta_description: '',
        canonical_url: '',
        og_title: '',
        og_description: '',
        og_image: '',
        robots_index: true,
        robots_follow: true,
        schema_json: {}
    });

    const defaultPages = [
        { name: 'Homepage', slug: 'home' },
        { name: 'Water Park', slug: 'water-park' },
        { name: 'Amusement Park', slug: 'amusement-park' },
        { name: 'Resort', slug: 'resort' },
        { name: 'Restaurant', slug: 'restaurant' },
        { name: 'Contact', slug: 'contact' },
        { name: 'Gallery', slug: 'gallery' }
    ];

    useEffect(() => {
        loadSEOPages();
    }, []);

    const loadSEOPages = async () => {
        try {
            setLoading(true);
            const data = await seoService.list();
            setPages(data || []);
            if (data && data.length > 0) {
                handleSelectPage(data[0]);
            } else {
                handleSelectPage(defaultPages[0]);
            }
        } catch (err) {
            console.error("Load failed:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectPage = (page) => {
        setSelectedPage(page);
        setFormData({
            page_slug: page.page_slug || page.slug,
            meta_title: page.meta_title || '',
            meta_description: page.meta_description || '',
            canonical_url: page.canonical_url || '',
            og_title: page.og_title || '',
            og_description: page.og_description || '',
            og_image: page.og_image || '',
            robots_index: page.robots_index !== undefined ? page.robots_index : true,
            robots_follow: page.robots_follow !== undefined ? page.robots_follow : true,
            schema_json: page.schema_json || {}
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            await seoService.save(null, formData);
            loadSEOPages();
        } catch (err) {
            alert("Save failed");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="mb-10">
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">SEO Manager</h1>
                <p className="text-slate-500 font-medium mt-1">Control search engine presence and social metadata</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-4">
                    <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-4">
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-4 py-2">Site Pages</div>
                        <div className="space-y-1 mt-2">
                            {defaultPages.map((page) => (
                                <button
                                    key={page.slug}
                                    onClick={() => handleSelectPage(page)}
                                    className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl font-bold transition-all ${
                                        (formData.page_slug === page.slug)
                                            ? 'bg-slate-900 text-white shadow-xl shadow-slate-200'
                                            : 'text-slate-500 hover:bg-slate-50'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Globe size={18} className={formData.page_slug === page.slug ? 'text-blue-400' : 'text-slate-300'} />
                                        <span>{page.name}</span>
                                    </div>
                                    <ChevronRight size={16} className="opacity-40" />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-blue-50 rounded-[32px] p-6 border border-blue-100">
                        <div className="flex items-center gap-3 text-blue-600 mb-3">
                            <AlertCircle size={20} />
                            <span className="font-black text-xs uppercase tracking-widest">SEO Tip</span>
                        </div>
                        <p className="text-xs text-blue-800 font-medium leading-relaxed">
                            Optimal meta titles are between 50-60 characters. Descriptions should be 150-160 characters for maximum CTR.
                        </p>
                    </div>
                </div>

                {/* Main Form */}
                <div className="lg:col-span-8">
                    <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-blue-600">
                                    <Eye size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-slate-900">Search Preview</h2>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">How your page appears in Google</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-slate-50/50">
                            <div className="max-w-xl bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                <div className="text-sm text-[#1a0dab] font-medium hover:underline cursor-pointer truncate">
                                    {formData.meta_title || 'Please enter a meta title...'}
                                </div>
                                <div className="text-sm text-[#006621] mt-1 truncate">
                                    https://yoyofunnfood.com/{formData.page_slug}
                                </div>
                                <div className="text-sm text-[#545454] mt-1 line-clamp-2 leading-relaxed">
                                    {formData.meta_description || 'Search engines will display your page description here to help users understand your content.'}
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-8">
                            <div className="space-y-6">
                                <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                                    <div className="w-8 h-px bg-slate-100" />
                                    Meta Tags
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Meta Title</label>
                                            <span className={`text-[10px] font-bold ${formData.meta_title.length > 60 ? 'text-red-500' : 'text-slate-300'}`}>
                                                {formData.meta_title.length}/60
                                            </span>
                                        </div>
                                        <input 
                                            type="text" 
                                            value={formData.meta_title}
                                            onChange={(e) => setFormData({...formData, meta_title: e.target.value})}
                                            className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-900"
                                            placeholder="e.g. Best Water Park in Rohtak | YOYO Fun N Foods"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Meta Description</label>
                                            <span className={`text-[10px] font-bold ${formData.meta_description.length > 160 ? 'text-red-500' : 'text-slate-300'}`}>
                                                {formData.meta_description.length}/160
                                            </span>
                                        </div>
                                        <textarea 
                                            value={formData.meta_description}
                                            onChange={(e) => setFormData({...formData, meta_description: e.target.value})}
                                            rows="3"
                                            className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-900 resize-none"
                                            placeholder="Discover endless fun at YOYO Fun N Foods..."
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                                    <div className="w-8 h-px bg-slate-100" />
                                    Indexing Rules
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <button 
                                        type="button"
                                        onClick={() => setFormData({...formData, robots_index: !formData.robots_index})}
                                        className={`flex items-center justify-between px-6 py-4 rounded-2xl border-2 transition-all ${
                                            formData.robots_index ? 'border-emerald-500 bg-emerald-50/30 text-emerald-700' : 'border-slate-100 bg-slate-50 text-slate-400'
                                        }`}
                                    >
                                        <span className="font-black text-[10px] uppercase tracking-widest">Index Page</span>
                                        {formData.robots_index ? <CheckCircle2 size={20} /> : <div className="w-5 h-5 rounded-full border-2 border-slate-200" />}
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => setFormData({...formData, robots_follow: !formData.robots_follow})}
                                        className={`flex items-center justify-between px-6 py-4 rounded-2xl border-2 transition-all ${
                                            formData.robots_follow ? 'border-emerald-500 bg-emerald-50/30 text-emerald-700' : 'border-slate-100 bg-slate-50 text-slate-400'
                                        }`}
                                    >
                                        <span className="font-black text-[10px] uppercase tracking-widest">Follow Links</span>
                                        {formData.robots_follow ? <CheckCircle2 size={20} /> : <div className="w-5 h-5 rounded-full border-2 border-slate-200" />}
                                    </button>
                                </div>
                            </div>

                            <button 
                                type="submit"
                                disabled={saving}
                                className="w-full py-5 bg-slate-900 text-white rounded-[24px] font-black uppercase tracking-[0.3em] text-xs hover:bg-blue-600 transition-all shadow-2xl shadow-slate-200 flex items-center justify-center gap-3"
                            >
                                {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                                {saving ? 'Applying SEO Settings...' : 'Save SEO Configuration'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSEO;
