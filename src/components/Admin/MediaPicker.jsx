import React, { useState, useEffect } from 'react';
import { uploadService } from '../../services/uploadService';
import { X, Upload, Trash2, CheckCircle2, Image as ImageIcon, Search, Loader2 } from 'lucide-react';

const MediaPicker = ({ onSelect, onClose, currentUrl, folder = "general" }) => {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        loadMedia();
    }, [page, folder]);

    const loadMedia = async () => {
        try {
            setLoading(true);
            const { items, total_count } = await uploadService.listMedia({ page, limit: 20, folder });
            setAssets(items || []);
            setTotal(total_count);
        } catch (err) {
            console.error("Failed to load media:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setUploading(true);
            const asset = await uploadService.upload(file, folder);
            setAssets([asset, ...assets]);
            onSelect(asset.url);
        } catch (err) {
            alert(err.message || "Upload failed");
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        if (!window.confirm("Delete this asset permanently?")) return;
        try {
            await uploadService.deleteMedia(id);
            setAssets(assets.filter(a => a.id !== id));
        } catch (err) {
            alert("Delete failed");
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-5xl h-[85vh] rounded-[40px] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                        <h3 className="text-xl font-black text-slate-900">Media Library</h3>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Select or upload assets</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all cursor-pointer shadow-lg shadow-blue-200">
                            {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                            {uploading ? "Uploading..." : "Upload New"}
                            <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
                        </label>
                        <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    {loading && assets.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400">
                            <Loader2 size={40} className="animate-spin mb-4 text-blue-600" />
                            <p className="font-bold">Scanning library...</p>
                        </div>
                    ) : assets.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-300">
                            <ImageIcon size={64} className="mb-4" />
                            <p className="text-xl font-black">No assets found</p>
                            <p className="text-sm font-medium mt-1">Upload your first image to get started.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {assets.map((asset) => (
                                <div 
                                    key={asset.id}
                                    onClick={() => onSelect(asset.url)}
                                    className={`group relative aspect-square rounded-3xl overflow-hidden border-4 transition-all cursor-pointer ${
                                        currentUrl === asset.url ? "border-blue-600 ring-4 ring-blue-100" : "border-slate-100 hover:border-blue-200"
                                    }`}
                                >
                                    <img 
                                        src={asset.url} 
                                        alt={asset.filename} 
                                        className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                                    />
                                    <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/20 transition-all flex items-center justify-center">
                                        {currentUrl === asset.url && (
                                            <div className="bg-blue-600 text-white p-2 rounded-full shadow-lg scale-110">
                                                <CheckCircle2 size={24} />
                                            </div>
                                        )}
                                        <button 
                                            onClick={(e) => handleDelete(e, asset.id)}
                                            className="absolute bottom-3 right-3 p-2 bg-white/90 text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 hover:text-white"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-[10px] font-black uppercase text-slate-600">
                                        {asset.mime_type.split('/')[1]}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-400">Showing {assets.length} of {total} assets</p>
                    <div className="flex gap-2">
                         <button 
                            disabled={page === 1}
                            onClick={() => setPage(p => p - 1)}
                            className="px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-600 disabled:opacity-30"
                         >
                            Prev
                         </button>
                         <button 
                            disabled={assets.length < 20}
                            onClick={() => setPage(p => p + 1)}
                            className="px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-600 disabled:opacity-30"
                         >
                            Next
                         </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MediaPicker;
