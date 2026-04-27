import React, { useState } from 'react';
import { Image as ImageIcon, Upload, X, Search } from 'lucide-react';
import MediaPicker from './MediaPicker';

const ImageUploadField = ({ label, value, onChange, folder = "general", placeholder = "Select or upload image" }) => {
    const [isPickerOpen, setIsPickerOpen] = useState(false);

    const handleClear = (e) => {
        e.stopPropagation();
        onChange("");
    };

    return (
        <div className="space-y-2">
            {label && <label className="text-xs font-black uppercase tracking-widest text-slate-400">{label}</label>}
            
            <div 
                onClick={() => setIsPickerOpen(true)}
                className="group relative w-full h-48 rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all overflow-hidden"
            >
                {value ? (
                    <>
                        <img 
                            src={value} 
                            alt="Selected" 
                            className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-all flex items-center justify-center">
                            <div className="bg-white text-slate-900 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                Change Image
                            </div>
                        </div>
                        <button 
                            onClick={handleClear}
                            className="absolute top-4 right-4 p-2 bg-white/90 text-slate-400 hover:text-red-600 rounded-full shadow-lg backdrop-blur-sm transition-all hover:scale-110"
                        >
                            <X size={16} />
                        </button>
                    </>
                ) : (
                    <div className="flex flex-col items-center gap-3 text-slate-400 group-hover:text-blue-500">
                        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center transition-transform group-hover:scale-110">
                            <Upload size={24} />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-black uppercase tracking-widest">{placeholder}</p>
                            <p className="text-[10px] font-bold mt-1 opacity-60">JPG, PNG, WEBP, SVG (Max 5MB)</p>
                        </div>
                    </div>
                )}
            </div>

            {isPickerOpen && (
                <MediaPicker 
                    currentUrl={value}
                    folder={folder}
                    onClose={() => setIsPickerOpen(false)}
                    onSelect={(url) => {
                        onChange(url);
                        setIsPickerOpen(false);
                    }}
                />
            )}
        </div>
    );
};

export default ImageUploadField;
