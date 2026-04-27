import React, { useState, useEffect } from 'react';
import { offerService } from '../../services/offerService';
import { Plus, Trash2, Edit2, Loader2, Tag, Calendar, Percent, IndianRupee, Power, PowerOff } from 'lucide-react';
import { formatINRFromPaise } from '../../services/api';

const AdminOffers = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentOffer, setCurrentOffer] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        code: '',
        discount_type: 'percentage',
        discount_value: 0,
        starts_at: '',
        ends_at: '',
        is_active: true
    });

    useEffect(() => {
        loadOffers();
    }, []);

    const loadOffers = async () => {
        try {
            setLoading(true);
            const data = await offerService.adminList();
            setOffers(data || []);
        } catch (err) {
            console.error("Load failed:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (offer = null) => {
        if (offer) {
            setCurrentOffer(offer);
            setFormData({ 
                ...offer,
                starts_at: offer.starts_at ? new Date(offer.starts_at).toISOString().split('T')[0] : '',
                ends_at: offer.ends_at ? new Date(offer.ends_at).toISOString().split('T')[0] : ''
            });
        } else {
            setCurrentOffer(null);
            setFormData({
                title: '',
                description: '',
                code: '',
                discount_type: 'percentage',
                discount_value: 0,
                starts_at: '',
                ends_at: '',
                is_active: true
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                starts_at: formData.starts_at ? new Date(formData.starts_at).toISOString() : null,
                ends_at: formData.ends_at ? new Date(formData.ends_at).toISOString() : null
            };
            if (currentOffer) {
                await offerService.update(currentOffer.id, payload);
            } else {
                await offerService.create(payload);
            }
            setIsModalOpen(false);
            loadOffers();
        } catch (err) {
            alert(err.message || "Operation failed");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this offer?")) return;
        try {
            await offerService.delete(id);
            loadOffers();
        } catch (err) {
            alert("Delete failed");
        }
    };

    return (
        <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Promotions</h1>
                    <p className="text-slate-500 font-medium mt-1">Manage discount codes and active offers</p>
                </div>
                <button 
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 bg-rose-600 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-rose-700 transition-all shadow-xl shadow-rose-200"
                >
                    <Plus size={18} />
                    New Promo
                </button>
            </div>

            {loading ? (
                <div className="h-64 flex items-center justify-center">
                    <Loader2 className="animate-spin text-rose-600" size={40} />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {offers.map((offer) => (
                        <div key={offer.id} className={`bg-white rounded-[40px] border transition-all p-8 relative ${
                            offer.is_active ? 'border-rose-100 shadow-sm hover:shadow-xl' : 'border-slate-100 opacity-60 grayscale'
                        }`}>
                            <div className="absolute top-8 right-8">
                                <span className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest ${
                                    offer.is_active ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-400'
                                }`}>
                                    {offer.is_active ? 'Live' : 'Paused'}
                                </span>
                            </div>
                            
                            <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 mb-6">
                                <Tag size={28} />
                            </div>

                            <h3 className="text-2xl font-black text-slate-900">{offer.title}</h3>
                            <div className="mt-2 text-3xl font-black text-rose-600 tracking-tight">
                                {offer.discount_type === 'percentage' ? `${offer.discount_value}%` : formatINRFromPaise(offer.discount_value)}
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-2">Off</span>
                            </div>

                            <div className="mt-8 p-4 bg-slate-50 rounded-[24px] border border-dashed border-slate-200 flex items-center justify-between">
                                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Code</span>
                                <span className="font-black text-slate-900 text-lg uppercase">{offer.code}</span>
                            </div>

                            <div className="mt-6 space-y-3">
                                <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                                    <Calendar size={14} className="text-slate-300" />
                                    {offer.ends_at ? `Expires ${new Date(offer.ends_at).toLocaleDateString()}` : "No Expiry"}
                                </div>
                                <p className="text-xs text-slate-400 font-medium line-clamp-2">{offer.description}</p>
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-end gap-2">
                                <button onClick={() => handleOpenModal(offer)} className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                                    <Edit2 size={18} />
                                </button>
                                <button onClick={() => handleDelete(offer.id)} className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                                    <Trash2 size={18} />
                                </button>
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
                                <h2 className="text-2xl font-black text-slate-900">{currentOffer ? 'Edit Offer' : 'New Offer'}</h2>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Configure promotion rules</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                                <Plus size={24} className="rotate-45" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Offer Title</label>
                                <input 
                                    type="text" 
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-rose-500 focus:bg-white outline-none transition-all font-bold text-slate-900"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">Promo Code</label>
                                    <input 
                                        type="text" 
                                        value={formData.code}
                                        onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                                        className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-rose-500 focus:bg-white outline-none transition-all font-bold text-slate-900 uppercase"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">Active</label>
                                    <div className="flex items-center h-[52px]">
                                        <button
                                            type="button"
                                            onClick={() => setFormData({...formData, is_active: !formData.is_active})}
                                            className={`w-full h-full flex items-center justify-center gap-2 rounded-2xl transition-all font-black uppercase tracking-widest text-[10px] ${
                                                formData.is_active ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'
                                            }`}
                                        >
                                            {formData.is_active ? <Power size={14} /> : <PowerOff size={14} />}
                                            {formData.is_active ? 'Live' : 'Paused'}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">Type</label>
                                    <select 
                                        value={formData.discount_type}
                                        onChange={(e) => setFormData({...formData, discount_type: e.target.value})}
                                        className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-rose-500 focus:bg-white outline-none transition-all font-bold text-slate-900"
                                    >
                                        <option value="percentage">Percentage (%)</option>
                                        <option value="fixed">Fixed (Paise)</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">Value</label>
                                    <input 
                                        type="number" 
                                        value={formData.discount_value}
                                        onChange={(e) => setFormData({...formData, discount_value: parseInt(e.target.value)})}
                                        className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-rose-500 focus:bg-white outline-none transition-all font-bold text-slate-900"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">Starts At</label>
                                    <input 
                                        type="date" 
                                        value={formData.starts_at}
                                        onChange={(e) => setFormData({...formData, starts_at: e.target.value})}
                                        className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-rose-500 focus:bg-white outline-none transition-all font-bold text-slate-900"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">Ends At</label>
                                    <input 
                                        type="date" 
                                        value={formData.ends_at}
                                        onChange={(e) => setFormData({...formData, ends_at: e.target.value})}
                                        className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-rose-500 focus:bg-white outline-none transition-all font-bold text-slate-900"
                                    />
                                </div>
                            </div>

                            <button 
                                type="submit"
                                className="w-full py-4 bg-slate-900 text-white rounded-3xl font-black uppercase tracking-[0.2em] text-xs hover:bg-rose-600 transition-all shadow-xl shadow-slate-200"
                            >
                                {currentOffer ? 'Update Promotion' : 'Create Promotion'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminOffers;
