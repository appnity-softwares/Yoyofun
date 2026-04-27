import React, { useState, useEffect } from 'react';
import { galleryService } from '../../services/galleryService';
import { Plus, Trash2, Edit2, Search, Filter, Loader2, Image as ImageIcon, ExternalLink, MoreVertical } from 'lucide-react';
import ImageUploadField from '../../components/Admin/ImageUploadField';

const AdminGallery = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image_url: '',
        category: 'Park',
        sort_order: 0,
        is_active: true
    });

    useEffect(() => {
        loadGallery();
    }, []);

    const loadGallery = async () => {
        try {
            setLoading(true);
            const data = await galleryService.adminList();
            setItems(data || []);
        } catch (err) {
            console.error("Load failed:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (item = null) => {
        if (item) {
            setCurrentItem(item);
            setFormData({ ...item });
        } else {
            setCurrentItem(null);
            setFormData({
                title: '',
                description: '',
                image_url: '',
                category: 'Park',
                sort_order: 0,
                is_active: true
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentItem) {
                await galleryService.update(currentItem.id, formData);
            } else {
                await galleryService.create(formData);
            }
            setIsModalOpen(false);
            loadGallery();
        } catch (err) {
            alert(err.message || "Operation failed");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this gallery item?")) return;
        try {
            await galleryService.delete(id);
            loadGallery();
        } catch (err) {
            alert("Delete failed");
        }
    };

    return (
        <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Gallery</h1>
                    <p className="text-slate-500 font-medium mt-1">Manage visual assets across the platform</p>
                </div>
                <button 
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-all shadow-xl shadow-blue-200"
                >
                    <Plus size={18} />
                    Add Item
                </button>
            </div>

            {loading ? (
                <div className="h-64 flex items-center justify-center">
                    <Loader2 className="animate-spin text-blue-600" size={40} />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {items.map((item) => (
                        <div key={item.id} className="group bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                            <div className="relative aspect-[4/3]">
                                <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                    <button onClick={() => handleOpenModal(item)} className="p-2 bg-white/90 backdrop-blur-md text-slate-600 rounded-xl hover:text-blue-600 shadow-lg transition-all">
                                        <Edit2 size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(item.id)} className="p-2 bg-white/90 backdrop-blur-md text-red-500 rounded-xl hover:bg-red-500 hover:text-white shadow-lg transition-all">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                <div className="absolute bottom-4 left-4">
                                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest rounded-lg text-slate-900 shadow-sm">
                                        {item.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="font-black text-slate-900 mb-1">{item.title || "Untitled"}</h3>
                                <p className="text-xs text-slate-500 font-medium line-clamp-2">{item.description || "No description provided."}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">{currentItem ? 'Edit Item' : 'New Item'}</h2>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Fill in the details below</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                                <Plus size={24} className="rotate-45" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <ImageUploadField 
                                label="Gallery Image"
                                value={formData.image_url}
                                folder="gallery"
                                onChange={(url) => setFormData({...formData, image_url: url})}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">Title</label>
                                    <input 
                                        type="text" 
                                        value={formData.title}
                                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                                        className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-900"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">Category</label>
                                    <select 
                                        value={formData.category}
                                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                                        className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-900"
                                    >
                                        <option value="Park">Park</option>
                                        <option value="Resort">Resort</option>
                                        <option value="Restaurant">Restaurant</option>
                                        <option value="Events">Events</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Description</label>
                                <textarea 
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    rows="3"
                                    className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-900 resize-none"
                                ></textarea>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-3xl">
                                <div className="flex items-center gap-3">
                                    <input 
                                        type="checkbox" 
                                        id="is_active"
                                        checked={formData.is_active}
                                        onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                                        className="w-5 h-5 rounded-lg border-2 border-slate-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <label htmlFor="is_active" className="text-sm font-black text-slate-700 uppercase tracking-widest">Active Status</label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <label className="text-[10px] font-black uppercase text-slate-400">Sort Order</label>
                                    <input 
                                        type="number" 
                                        value={formData.sort_order}
                                        onChange={(e) => setFormData({...formData, sort_order: parseInt(e.target.value)})}
                                        className="w-16 px-3 py-1 rounded-lg bg-white border border-slate-200 text-center font-bold"
                                    />
                                </div>
                            </div>

                            <button 
                                type="submit"
                                className="w-full py-4 bg-slate-900 text-white rounded-3xl font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-600 transition-all shadow-xl shadow-slate-200"
                            >
                                {currentItem ? 'Update Gallery Item' : 'Create Gallery Item'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminGallery;
