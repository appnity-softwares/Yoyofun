import React, { useState, useEffect } from 'react';
import { restaurantService } from '../../services/restaurantService';
import { Plus, Trash2, Edit2, Loader2, Utensils, Star, Search, Filter } from 'lucide-react';
import ImageUploadField from '../../components/Admin/ImageUploadField';
import { formatINRFromPaise } from '../../services/api';

const AdminRestaurant = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image_url: '',
        category: 'Main Course',
        price: 0,
        is_featured: false,
        sort_order: 0,
        is_active: true
    });

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = async () => {
        try {
            setLoading(true);
            const data = await restaurantService.adminListItems();
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
                category: 'Main Course',
                price: 0,
                is_featured: false,
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
                await restaurantService.updateItem(currentItem.id, formData);
            } else {
                await restaurantService.createItem(formData);
            }
            setIsModalOpen(false);
            loadItems();
        } catch (err) {
            alert(err.message || "Operation failed");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this menu item?")) return;
        try {
            await restaurantService.deleteItem(id);
            loadItems();
        } catch (err) {
            alert("Delete failed");
        }
    };

    return (
        <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Restaurant</h1>
                    <p className="text-slate-500 font-medium mt-1">Manage culinary offerings and menus</p>
                </div>
                <button 
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200"
                >
                    <Plus size={18} />
                    Add Menu Item
                </button>
            </div>

            {loading ? (
                <div className="h-64 flex items-center justify-center">
                    <Loader2 className="animate-spin text-emerald-600" size={40} />
                </div>
            ) : (
                <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Item</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Category</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Price</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {items.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50/30 transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                                                {item.image_url ? (
                                                    <img src={item.image_url} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                        <Utensils size={20} />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-black text-slate-900">{item.title}</span>
                                                    {item.is_featured && <Star size={14} className="text-amber-400 fill-amber-400" />}
                                                </div>
                                                <div className="text-xs text-slate-400 font-medium line-clamp-1">{item.description}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="px-3 py-1 bg-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-600 rounded-lg">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="font-black text-slate-900">{formatINRFromPaise(item.price)}</span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                            item.is_active ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'
                                        }`}>
                                            {item.is_active ? 'Active' : 'Hidden'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                            <button onClick={() => handleOpenModal(item)} className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                                                <Edit2 size={18} />
                                            </button>
                                            <button onClick={() => handleDelete(item.id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">{currentItem ? 'Edit Menu Item' : 'New Menu Item'}</h2>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Culinary excellence details</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                                <Plus size={24} className="rotate-45" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-8">
                                <ImageUploadField 
                                    label="Item Image"
                                    value={formData.image_url}
                                    folder="restaurant"
                                    onChange={(url) => setFormData({...formData, image_url: url})}
                                />
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-400">Title</label>
                                        <input 
                                            type="text" 
                                            value={formData.title}
                                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                                            className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white outline-none transition-all font-bold text-slate-900"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-slate-400">Price (Paise)</label>
                                            <input 
                                                type="number" 
                                                value={formData.price}
                                                onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
                                                className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white outline-none transition-all font-bold text-slate-900"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-slate-400">Category</label>
                                            <select 
                                                value={formData.category}
                                                onChange={(e) => setFormData({...formData, category: e.target.value})}
                                                className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white outline-none transition-all font-bold text-slate-900"
                                            >
                                                <option value="Starters">Starters</option>
                                                <option value="Main Course">Main Course</option>
                                                <option value="Desserts">Desserts</option>
                                                <option value="Beverages">Beverages</option>
                                                <option value="Specials">Specials</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Description</label>
                                <textarea 
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    rows="3"
                                    className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white outline-none transition-all font-bold text-slate-900 resize-none"
                                ></textarea>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-3xl">
                                    <div className="flex items-center gap-3">
                                        <input 
                                            type="checkbox" 
                                            id="is_featured"
                                            checked={formData.is_featured}
                                            onChange={(e) => setFormData({...formData, is_featured: e.target.checked})}
                                            className="w-5 h-5 rounded-lg border-2 border-slate-300 text-emerald-600 focus:ring-emerald-500"
                                        />
                                        <label htmlFor="is_featured" className="text-xs font-black text-slate-700 uppercase tracking-widest">Featured Item</label>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-3xl">
                                    <div className="flex items-center gap-3">
                                        <input 
                                            type="checkbox" 
                                            id="res_is_active"
                                            checked={formData.is_active}
                                            onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                                            className="w-5 h-5 rounded-lg border-2 border-slate-300 text-emerald-600 focus:ring-emerald-500"
                                        />
                                        <label htmlFor="res_is_active" className="text-xs font-black text-slate-700 uppercase tracking-widest">Available</label>
                                    </div>
                                </div>
                            </div>

                            <button 
                                type="submit"
                                className="w-full py-4 bg-emerald-900 text-white rounded-3xl font-black uppercase tracking-[0.2em] text-xs hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-200"
                            >
                                {currentItem ? 'Update Menu Item' : 'Create Menu Item'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminRestaurant;
