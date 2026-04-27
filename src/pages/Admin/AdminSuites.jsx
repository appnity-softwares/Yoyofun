import React, { useState, useEffect } from 'react';
import { suiteService } from '../../services/suiteService';
import { Plus, Trash2, Edit2, Loader2, Bed, Users, IndianRupee, Layers, CheckCircle2, XCircle } from 'lucide-react';
import ImageUploadField from '../../components/Admin/ImageUploadField';
import { formatINRFromPaise } from '../../services/api';

const AdminSuites = () => {
    const [suites, setSuites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSuite, setCurrentSuite] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
        image_url: '',
        price_per_night: 0,
        max_guests: 2,
        amenities: [],
        sort_order: 0,
        is_active: true
    });

    useEffect(() => {
        loadSuites();
    }, []);

    const loadSuites = async () => {
        try {
            setLoading(true);
            const data = await suiteService.adminList();
            setSuites(data || []);
        } catch (err) {
            console.error("Load failed:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (suite = null) => {
        if (suite) {
            setCurrentSuite(suite);
            setFormData({ 
                ...suite,
                amenities: Array.isArray(suite.amenities) ? suite.amenities : []
            });
        } else {
            setCurrentSuite(null);
            setFormData({
                title: '',
                slug: '',
                description: '',
                image_url: '',
                price_per_night: 0,
                max_guests: 2,
                amenities: [],
                sort_order: 0,
                is_active: true
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentSuite) {
                await suiteService.update(currentSuite.id, formData);
            } else {
                await suiteService.create(formData);
            }
            setIsModalOpen(false);
            loadSuites();
        } catch (err) {
            alert(err.message || "Operation failed");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this suite permanently?")) return;
        try {
            await suiteService.delete(id);
            loadSuites();
        } catch (err) {
            alert("Delete failed");
        }
    };

    const toggleAmenity = (amenity) => {
        const current = [...formData.amenities];
        if (current.includes(amenity)) {
            setFormData({...formData, amenities: current.filter(a => a !== amenity)});
        } else {
            setFormData({...formData, amenities: [...current, amenity]});
        }
    };

    const commonAmenities = ["King Bed", "Private Balcony", "Air Conditioning", "Flat-screen TV", "Mini Bar", "Free Wi-Fi", "Room Service", "Luxury Toiletries"];

    return (
        <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Suites & Rooms</h1>
                    <p className="text-slate-500 font-medium mt-1">Manage luxury accommodation inventory</p>
                </div>
                <button 
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200"
                >
                    <Plus size={18} />
                    New Suite
                </button>
            </div>

            {loading ? (
                <div className="h-64 flex items-center justify-center">
                    <Loader2 className="animate-spin text-indigo-600" size={40} />
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {suites.map((suite) => (
                        <div key={suite.id} className="group bg-white rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col md:flex-row">
                            <div className="md:w-72 h-64 md:h-auto overflow-hidden relative">
                                <img src={suite.image_url} alt={suite.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                <div className="absolute top-4 left-4">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg backdrop-blur-md ${
                                        suite.is_active ? 'bg-emerald-500/90 text-white' : 'bg-slate-500/90 text-white'
                                    }`}>
                                        {suite.is_active ? 'Available' : 'Disabled'}
                                    </span>
                                </div>
                            </div>
                            <div className="flex-1 p-8 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-2xl font-black text-slate-900">{suite.title}</h3>
                                            <p className="text-slate-400 text-sm font-bold mt-1">/{suite.slug}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-black text-indigo-600">{formatINRFromPaise(suite.price_per_night)}</div>
                                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Per Night</div>
                                        </div>
                                    </div>
                                    <p className="text-slate-500 mt-4 line-clamp-2">{suite.description}</p>
                                    <div className="flex flex-wrap gap-2 mt-6">
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-xl text-[10px] font-black uppercase text-slate-600">
                                            <Users size={12} />
                                            {suite.max_guests} Guests
                                        </div>
                                        {Array.isArray(suite.amenities) && suite.amenities.map(a => (
                                            <div key={a} className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase">
                                                <CheckCircle2 size={12} />
                                                {a}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-slate-50">
                                    <button onClick={() => handleOpenModal(suite)} className="flex items-center gap-2 px-4 py-2 text-xs font-black uppercase text-slate-600 hover:text-indigo-600 transition-colors">
                                        <Edit2 size={14} />
                                        Edit Details
                                    </button>
                                    <button onClick={() => handleDelete(suite.id)} className="flex items-center gap-2 px-4 py-2 text-xs font-black uppercase text-red-500 hover:bg-red-50 rounded-xl transition-all">
                                        <Trash2 size={14} />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[40px] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
                        <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">{currentSuite ? 'Edit Suite' : 'New Suite'}</h2>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Accommodation profile</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                                <Plus size={24} className="rotate-45" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <ImageUploadField 
                                    label="Main Suite Image"
                                    value={formData.image_url}
                                    folder="suites"
                                    onChange={(url) => setFormData({...formData, image_url: url})}
                                />
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-400">Suite Title</label>
                                        <input 
                                            type="text" 
                                            value={formData.title}
                                            onChange={(e) => setFormData({...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-')})}
                                            className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white outline-none transition-all font-bold text-slate-900"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-slate-400">Slug</label>
                                            <input 
                                                type="text" 
                                                value={formData.slug}
                                                onChange={(e) => setFormData({...formData, slug: e.target.value})}
                                                className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white outline-none transition-all font-bold text-slate-900"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-slate-400">Max Guests</label>
                                            <input 
                                                type="number" 
                                                value={formData.max_guests}
                                                onChange={(e) => setFormData({...formData, max_guests: parseInt(e.target.value)})}
                                                className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white outline-none transition-all font-bold text-slate-900"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-400">Price Per Night (Paise)</label>
                                        <input 
                                            type="number" 
                                            value={formData.price_per_night}
                                            onChange={(e) => setFormData({...formData, price_per_night: parseInt(e.target.value)})}
                                            className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white outline-none transition-all font-bold text-slate-900"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Description</label>
                                <textarea 
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    rows="4"
                                    className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white outline-none transition-all font-bold text-slate-900 resize-none"
                                ></textarea>
                            </div>

                            <div className="space-y-4">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Amenities</label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {commonAmenities.map(amenity => (
                                        <button
                                            key={amenity}
                                            type="button"
                                            onClick={() => toggleAmenity(amenity)}
                                            className={`px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                                formData.amenities.includes(amenity)
                                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'
                                                    : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                                            }`}
                                        >
                                            {amenity}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[32px]">
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-3">
                                        <input 
                                            type="checkbox" 
                                            id="suite_is_active"
                                            checked={formData.is_active}
                                            onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                                            className="w-6 h-6 rounded-lg border-2 border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <label htmlFor="suite_is_active" className="text-sm font-black text-slate-700 uppercase tracking-widest">Listed on Site</label>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <label className="text-[10px] font-black uppercase text-slate-400">Sort Position</label>
                                    <input 
                                        type="number" 
                                        value={formData.sort_order}
                                        onChange={(e) => setFormData({...formData, sort_order: parseInt(e.target.value)})}
                                        className="w-20 px-4 py-2 rounded-xl bg-white border border-slate-200 text-center font-bold"
                                    />
                                </div>
                            </div>

                            <div className="pt-4">
                                <button 
                                    type="submit"
                                    className="w-full py-5 bg-slate-900 text-white rounded-[24px] font-black uppercase tracking-[0.3em] text-xs hover:bg-indigo-600 transition-all shadow-2xl shadow-slate-200"
                                >
                                    {currentSuite ? 'Save Changes' : 'Create Suite'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminSuites;
