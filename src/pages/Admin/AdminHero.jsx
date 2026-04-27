import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Save, X, MoveUp, MoveDown, Image as ImageIcon } from 'lucide-react';
import { heroService } from '../../services/heroService';

export default function AdminHero() {
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingSlide, setEditingSlide] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState({
        image_url: '',
        headline: '',
        subheadline: '',
        cta_url: '',
        cta_text: 'Book Tickets Now',
        is_active: true,
        sort_order: 0
    });

    useEffect(() => {
        fetchSlides();
    }, []);

    const fetchSlides = async () => {
        try {
            setLoading(true);
            const data = await heroService.adminList();
            setSlides(data || []);
        } catch (error) {
            console.error('Failed to fetch slides:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (editingSlide) {
                await heroService.update(editingSlide.id, formData);
            } else {
                await heroService.create(formData);
            }
            setIsAdding(false);
            setEditingSlide(null);
            setFormData({ image_url: '', headline: '', subheadline: '', cta_url: '', cta_text: 'Book Tickets Now', is_active: true, sort_order: 0 });
            fetchSlides();
        } catch (error) {
            alert('Failed to save slide: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this slide?')) return;
        try {
            await heroService.delete(id);
            fetchSlides();
        } catch (error) {
            alert('Failed to delete slide');
        }
    };

    const startEdit = (slide) => {
        setEditingSlide(slide);
        setFormData({
            image_url: slide.image_url,
            headline: slide.headline,
            subheadline: slide.subheadline,
            cta_url: slide.cta_url,
            cta_text: slide.cta_text,
            is_active: slide.is_active,
            sort_order: slide.sort_order
        });
        setIsAdding(true);
    };

    if (loading) return <div className="p-8">Loading slides...</div>;

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Hero Landing Page</h1>
                    <p className="text-gray-500 font-medium mt-1">Manage dynamic carousel slides and CTAs.</p>
                </div>
                {!isAdding && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                    >
                        <Plus size={20} /> Add New Slide
                    </button>
                )}
            </div>

            {isAdding && (
                <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl mb-12 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-black text-gray-900">{editingSlide ? 'Edit Slide' : 'Create New Slide'}</h2>
                        <button onClick={() => { setIsAdding(false); setEditingSlide(null); }} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
                    </div>

                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Background Image URL</label>
                                <input
                                    type="url"
                                    value={formData.image_url}
                                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                    className="w-full p-4 bg-gray-50 rounded-2xl border-none ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-600 outline-none transition-all font-bold"
                                    placeholder="https://images.unsplash.com/..."
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Main Headline</label>
                                <input
                                    type="text"
                                    value={formData.headline}
                                    onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                                    className="w-full p-4 bg-gray-50 rounded-2xl border-none ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-600 outline-none transition-all font-bold"
                                    placeholder="Best Water Park for Family..."
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Sub-headline</label>
                            <textarea
                                value={formData.subheadline}
                                onChange={(e) => setFormData({ ...formData, subheadline: e.target.value })}
                                className="w-full p-4 bg-gray-50 rounded-2xl border-none ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-600 outline-none transition-all font-bold resize-none"
                                placeholder="Slides, wave pools, and more..."
                                rows="2"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">CTA Button Text</label>
                                <input
                                    type="text"
                                    value={formData.cta_text}
                                    onChange={(e) => setFormData({ ...formData, cta_text: e.target.value })}
                                    className="w-full p-4 bg-gray-50 rounded-2xl border-none ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-600 outline-none transition-all font-bold"
                                    placeholder="Book Now"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">CTA Destination URL</label>
                                <input
                                    type="text"
                                    value={formData.cta_url}
                                    onChange={(e) => setFormData({ ...formData, cta_url: e.target.value })}
                                    className="w-full p-4 bg-gray-50 rounded-2xl border-none ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-600 outline-none transition-all font-bold"
                                    placeholder="/tickets"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Sort Order</label>
                                <input
                                    type="number"
                                    value={formData.sort_order}
                                    onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) })}
                                    className="w-full p-4 bg-gray-50 rounded-2xl border-none ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-600 outline-none transition-all font-bold"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="is_active"
                                checked={formData.is_active}
                                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                className="w-5 h-5 rounded-md border-gray-300 text-blue-600 focus:ring-blue-600"
                            />
                            <label htmlFor="is_active" className="text-sm font-bold text-gray-700">Slide is Active</label>
                        </div>

                        <div className="pt-4 flex gap-4">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-all flex items-center gap-2"
                            >
                                <Save size={18} /> {editingSlide ? 'Update Slide' : 'Create Slide'}
                            </button>
                            <button
                                type="button"
                                onClick={() => { setIsAdding(false); setEditingSlide(null); }}
                                className="bg-gray-100 text-gray-600 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-200 transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 gap-6">
                {slides.map((slide) => (
                    <div key={slide.id} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-8 group">
                        <div className="relative w-full md:w-48 h-32 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                            {slide.image_url ? (
                                <img src={slide.image_url} alt="" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300"><ImageIcon size={32} /></div>
                            )}
                            {!slide.is_active && (
                                <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center">
                                    <span className="text-[10px] font-black uppercase text-white tracking-widest">Inactive</span>
                                </div>
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Slide #{slide.sort_order}</span>
                            </div>
                            <h3 className="text-xl font-black text-gray-900 truncate">{slide.headline}</h3>
                            <p className="text-sm text-gray-500 font-medium truncate mb-2">{slide.subheadline}</p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-gray-50 text-gray-500 rounded-full text-[10px] font-bold uppercase tracking-widest border border-gray-100">
                                    Btn: {slide.cta_text}
                                </span>
                                <span className="px-3 py-1 bg-gray-50 text-gray-500 rounded-full text-[10px] font-bold uppercase tracking-widest border border-gray-100">
                                    Link: {slide.cta_url}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => startEdit(slide)}
                                className="p-3 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                            >
                                <Edit2 size={18} />
                            </button>
                            <button
                                onClick={() => handleDelete(slide.id)}
                                className="p-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}

                {slides.length === 0 && !isAdding && (
                    <div className="text-center py-20 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
                        <ImageIcon className="mx-auto text-gray-300 mb-4" size={48} />
                        <p className="text-gray-500 font-medium">No dynamic slides yet. Add your first one to customize the Hero section.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
