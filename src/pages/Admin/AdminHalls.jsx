import React, { useState, useEffect } from 'react';
import { hallService } from '../../services/hallService';
import { Plus, Trash2, Edit2, Loader2, Users, Calendar, Mail, Phone, MessageSquare, ExternalLink, Filter } from 'lucide-react';
import ImageUploadField from '../../components/Admin/ImageUploadField';
import { formatINRFromPaise } from '../../services/api';

const AdminHalls = () => {
    const [activeTab, setActiveTab] = useState('packages'); // 'packages' or 'enquiries'
    const [packages, setPackages] = useState([]);
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPackage, setCurrentPackage] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image_url: '',
        capacity: 0,
        starting_price: 0,
        suitable_for: [],
        features: [],
        sort_order: 0,
        is_active: true
    });

    useEffect(() => {
        if (activeTab === 'packages') {
            loadPackages();
        } else {
            loadEnquiries();
        }
    }, [activeTab]);

    const loadPackages = async () => {
        try {
            setLoading(true);
            const data = await hallService.adminListPackages();
            setPackages(data || []);
        } catch (err) {
            console.error("Load packages failed:", err);
        } finally {
            setLoading(false);
        }
    };

    const loadEnquiries = async () => {
        try {
            setLoading(true);
            const { items } = await hallService.listEnquiries();
            setEnquiries(items || []);
        } catch (err) {
            console.error("Load enquiries failed:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (pkg = null) => {
        if (pkg) {
            setCurrentPackage(pkg);
            setFormData({ 
                ...pkg,
                suitable_for: Array.isArray(pkg.suitable_for) ? pkg.suitable_for : [],
                features: Array.isArray(pkg.features) ? pkg.features : []
            });
        } else {
            setCurrentPackage(null);
            setFormData({
                title: '',
                description: '',
                image_url: '',
                capacity: 0,
                starting_price: 0,
                suitable_for: [],
                features: [],
                sort_order: 0,
                is_active: true
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentPackage) {
                await hallService.updatePackage(currentPackage.id, formData);
            } else {
                await hallService.createPackage(formData);
            }
            setIsModalOpen(false);
            loadPackages();
        } catch (err) {
            alert(err.message || "Operation failed");
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            await hallService.updateEnquiryStatus(id, { status });
            loadEnquiries();
        } catch (err) {
            alert("Status update failed");
        }
    };

    return (
        <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Events & Halls</h1>
                    <p className="text-slate-500 font-medium mt-1">Manage banquet packages and booking leads</p>
                </div>
                <div className="flex items-center gap-4 bg-white p-2 rounded-[24px] border border-slate-100 shadow-sm">
                    <button 
                        onClick={() => setActiveTab('packages')}
                        className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                            activeTab === 'packages' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'
                        }`}
                    >
                        Packages
                    </button>
                    <button 
                        onClick={() => setActiveTab('enquiries')}
                        className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                            activeTab === 'enquiries' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'
                        }`}
                    >
                        Enquiries
                    </button>
                </div>
            </div>

            {activeTab === 'packages' ? (
                <div className="space-y-6">
                    <div className="flex justify-end">
                        <button 
                            onClick={() => handleOpenModal()}
                            className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-700 transition-all shadow-xl shadow-orange-200"
                        >
                            <Plus size={18} />
                            Create Package
                        </button>
                    </div>

                    {loading ? (
                        <div className="h-64 flex items-center justify-center">
                            <Loader2 className="animate-spin text-orange-600" size={40} />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {packages.map((pkg) => (
                                <div key={pkg.id} className="group bg-white rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all overflow-hidden">
                                    <div className="aspect-video relative overflow-hidden">
                                        <img src={pkg.image_url} alt={pkg.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                                        <div className="absolute bottom-4 left-6">
                                            <div className="text-white font-black text-xl">{pkg.title}</div>
                                            <div className="text-orange-400 text-xs font-black uppercase tracking-widest mt-1">Starts from {formatINRFromPaise(pkg.starting_price)}</div>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-lg text-[10px] font-black uppercase text-slate-500">
                                                <Users size={12} />
                                                {pkg.capacity} Capacity
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                                pkg.is_active ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'
                                            }`}>
                                                {pkg.is_active ? 'Active' : 'Disabled'}
                                            </span>
                                        </div>
                                        <p className="text-slate-500 text-sm line-clamp-2 mb-6">{pkg.description}</p>
                                        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Order: {pkg.sort_order}</div>
                                            <div className="flex items-center gap-1">
                                                <button onClick={() => handleOpenModal(pkg)} className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                                                    <Edit2 size={18} />
                                                </button>
                                                <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Enquirer</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Event Details</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Date</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {enquiries.map((enq) => (
                                <tr key={enq.id} className="hover:bg-slate-50/30 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="font-black text-slate-900">{enq.name}</div>
                                        <div className="flex items-center gap-3 mt-1 text-xs text-slate-400 font-medium">
                                            <span className="flex items-center gap-1"><Phone size={12} /> {enq.phone}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="text-sm font-bold text-slate-700">{enq.event_type}</div>
                                        <div className="text-xs text-slate-400 mt-0.5">{enq.expected_guests} Expected Guests</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="text-sm font-bold text-slate-700">{new Date(enq.preferred_date).toLocaleDateString()}</div>
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Preferred</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <select 
                                            value={enq.status}
                                            onChange={(e) => handleStatusUpdate(enq.id, e.target.value)}
                                            className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl outline-none transition-all ${
                                                enq.status === 'new' ? 'bg-blue-100 text-blue-600' :
                                                enq.status === 'contacted' ? 'bg-amber-100 text-amber-600' :
                                                enq.status === 'converted' ? 'bg-emerald-100 text-emerald-600' :
                                                'bg-slate-100 text-slate-400'
                                            }`}
                                        >
                                            <option value="new">New</option>
                                            <option value="contacted">Contacted</option>
                                            <option value="converted">Converted</option>
                                            <option value="lost">Lost</option>
                                        </select>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                                            <MessageSquare size={18} />
                                        </button>
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
                                <h2 className="text-2xl font-black text-slate-900">{currentPackage ? 'Edit Package' : 'New Package'}</h2>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Event hosting parameters</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                                <Plus size={24} className="rotate-45" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                            <ImageUploadField 
                                label="Cover Image"
                                value={formData.image_url}
                                folder="halls"
                                onChange={(url) => setFormData({...formData, image_url: url})}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">Package Title</label>
                                    <input 
                                        type="text" 
                                        value={formData.title}
                                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                                        className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-orange-500 focus:bg-white outline-none transition-all font-bold text-slate-900"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">Capacity</label>
                                    <input 
                                        type="number" 
                                        value={formData.capacity}
                                        onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})}
                                        className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-orange-500 focus:bg-white outline-none transition-all font-bold text-slate-900"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Starting Price (Paise)</label>
                                <input 
                                    type="number" 
                                    value={formData.starting_price}
                                    onChange={(e) => setFormData({...formData, starting_price: parseInt(e.target.value)})}
                                    className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-orange-500 focus:bg-white outline-none transition-all font-bold text-slate-900"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Description</label>
                                <textarea 
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    rows="3"
                                    className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-orange-500 focus:bg-white outline-none transition-all font-bold text-slate-900 resize-none"
                                ></textarea>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-3xl">
                                <div className="flex items-center gap-3">
                                    <input 
                                        type="checkbox" 
                                        id="hall_is_active"
                                        checked={formData.is_active}
                                        onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                                        className="w-5 h-5 rounded-lg border-2 border-slate-300 text-orange-600 focus:ring-orange-500"
                                    />
                                    <label htmlFor="hall_is_active" className="text-xs font-black text-slate-700 uppercase tracking-widest">Active Package</label>
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
                                className="w-full py-4 bg-slate-900 text-white rounded-3xl font-black uppercase tracking-[0.2em] text-xs hover:bg-orange-600 transition-all shadow-xl shadow-slate-200"
                            >
                                {currentPackage ? 'Update Package' : 'Create Package'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminHalls;
