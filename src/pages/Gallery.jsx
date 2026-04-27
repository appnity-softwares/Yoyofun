import React, { useState } from 'react';
import { Camera, X, Maximize2, ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';

const galleryItems = [
    {
        id: 1,
        title: "Main Wave Pool",
        category: "Water Park",
        image: "https://images.unsplash.com/photo-1549413203-057088998da0?q=80&w=1470&auto=format&fit=crop",
        size: "large" // 2x2
    },
    {
        id: 2,
        title: "Family Dining Area",
        category: "Food",
        image: "https://images.unsplash.com/photo-1550966841-391ad55a1334?q=80&w=1470&auto=format&fit=crop",
        size: "small" // 1x1
    },
    {
        id: 3,
        title: "Giant Slide Tower",
        category: "Water Park",
        image: "https://images.unsplash.com/photo-1707575878561-794d400bbb1e?q=80&w=1470&auto=format&fit=crop",
        size: "tall" // 1x2
    },
    {
        id: 4,
        title: "Luxury Resort Suite",
        category: "Stay",
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1470&auto=format&fit=crop",
        size: "wide" // 2x1
    },
    {
        id: 5,
        title: "Night View of Park",
        category: "Events",
        image: "https://images.unsplash.com/photo-1708157730402-67cc5b19e335?q=80&w=1470&auto=format&fit=crop",
        size: "small"
    },
    {
        id: 6,
        title: "Kids Activity Zone",
        category: "Play",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1470&auto=format&fit=crop",
        size: "small"
    },
    {
        id: 7,
        title: "Poolside Cafe",
        category: "Food",
        image: "https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?q=80&w=1470&auto=format&fit=crop",
        size: "small"
    },
    {
        id: 8,
        title: "Lazy River Walk",
        category: "Water Park",
        image: "https://images.unsplash.com/photo-1625254417927-3f586db72af5?q=80&w=1470&auto=format&fit=crop",
        size: "wide"
    },
    {
        id: 9,
        title: "Birthday Celebration",
        category: "Events",
        image: "https://images.unsplash.com/photo-1530103043960-ef38714abb15?q=80&w=1470&auto=format&fit=crop",
        size: "small"
    },
];

const categories = ["All", "Water Park", "Food", "Stay", "Play", "Events"];

const Gallery = () => {
    const [filter, setFilter] = useState("All");
    const [selectedIdx, setSelectedIdx] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);

    const filteredItems = filter === "All"
        ? galleryItems
        : galleryItems.filter(item => item.category === filter);

    const handlePrevious = (e) => {
        e.stopPropagation();
        setSelectedIdx(prev => (prev === 0 ? filteredItems.length - 1 : prev - 1));
    };

    const handleNext = (e) => {
        e.stopPropagation();
        setSelectedIdx(prev => (prev === filteredItems.length - 1 ? 0 : prev + 1));
    };

    // Bento Grid Classes Mapper
    const getGridSpan = (size) => {
        switch (size) {
            case 'large': return 'md:col-span-2 md:row-span-2';
            case 'wide': return 'md:col-span-2 md:row-span-1';
            case 'tall': return 'md:col-span-1 md:row-span-2';
            default: return 'md:col-span-1 md:row-span-1';
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-24 px-4 bg-gray-50/30">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className={`text-center mb-16 space-y-4 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold tracking-widest uppercase flex items-center gap-2 w-fit mx-auto">
                        <LayoutGrid size={14} /> Bento Showcase
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter">Visual <span className="text-blue-600 italic">Bento</span></h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">A curated mosaic of adventures. Every block tells a story of joy and discovery at YOYO.</p>
                </div>

                {/* Filters */}
                <div className={`flex flex-wrap justify-center gap-3 mb-16 transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => {
                                setFilter(cat);
                                setIsLoaded(false);
                                setTimeout(() => setIsLoaded(true), 10);
                            }}
                            className={`px-8 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${filter === cat
                                    ? 'bg-gray-900 text-white shadow-2xl scale-105'
                                    : 'bg-white text-gray-400 border border-gray-100 hover:bg-blue-50 hover:text-blue-600'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* BENTO GRID */}
                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 auto-rows-[240px]">
                    {filteredItems.map((item, index) => (
                        <div
                            key={item.id}
                            className={`group relative overflow-hidden rounded-[40px] cursor-pointer shadow-sm transition-all duration-700 ${getGridSpan(item.size)} ${isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'}`}
                            style={{ transitionDelay: `${index * 50}ms` }}
                            onClick={() => setSelectedIdx(index)}
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            {/* Overlay Card */}
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10 transform translate-y-4 group-hover:translate-y-0">
                                <span className="text-blue-300 text-xs font-black uppercase tracking-[0.2em] mb-3">{item.category}</span>
                                <h3 className="text-white text-2xl font-black mb-2 leading-tight">{item.title}</h3>
                                <div className="flex items-center gap-3 text-white/70 text-sm font-bold">
                                    <div className="w-8 h-[2px] bg-blue-500" /> View Frame
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* LIGHTBOX CAROUSEL */}
                {selectedIdx !== null && (
                    <div
                        className="fixed inset-0 z-[100] bg-gray-950/98 backdrop-blur-2xl flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500"
                        onClick={() => setSelectedIdx(null)}
                    >
                        {/* Close */}
                        <button
                            className="absolute top-10 right-10 z-[110] p-4 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all hover:rotate-90"
                            onClick={() => setSelectedIdx(null)}
                        >
                            <X size={28} />
                        </button>

                        {/* Navigation */}
                        <button
                            className="absolute left-6 md:left-12 z-[110] p-6 bg-white/5 hover:bg-blue-600 rounded-full text-white transition-all group shadow-2xl"
                            onClick={handlePrevious}
                        >
                            <ChevronLeft size={32} className="group-active:-translate-x-2 transition-transform" />
                        </button>

                        <button
                            className="absolute right-6 md:right-12 z-[110] p-6 bg-white/5 hover:bg-blue-600 rounded-full text-white transition-all group shadow-2xl"
                            onClick={handleNext}
                        >
                            <ChevronRight size={32} className="group-active:translate-x-2 transition-transform" />
                        </button>

                        {/* Main Image Container */}
                        <div
                            className="relative w-[90%] max-w-6xl aspect-video md:aspect-[16/9] overflow-hidden rounded-[48px] shadow-[0_0_100px_rgba(37,99,235,0.2)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                key={selectedIdx}
                                src={filteredItems[selectedIdx].image}
                                alt={filteredItems[selectedIdx].title}
                                className="w-full h-full object-cover animate-in fade-in zoom-in-110 slide-in-from-right-10 duration-700"
                            />

                            {/* Meta Info */}
                            <div className="absolute bottom-12 left-12 right-12 flex items-end justify-between text-white">
                                <div className="space-y-2">
                                    <span className="px-4 py-1.5 bg-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">{filteredItems[selectedIdx].category}</span>
                                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter">{filteredItems[selectedIdx].title}</h2>
                                </div>
                                <div className="hidden md:flex flex-col items-end gap-3">
                                    <div className="text-right">
                                        <span className="text-lg font-black text-blue-500">{selectedIdx + 1}</span>
                                        <span className="text-white/30 font-black"> / {filteredItems.length}</span>
                                    </div>
                                    <Link to="/tickets" onClick={(e) => e.stopPropagation()} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-full font-bold uppercase tracking-widest text-xs transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20">
                                        Book Now
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Thumbnails Preview (Visual of Next Image) */}
                        <div className="absolute bottom-10 flex gap-4 opacity-50 hover:opacity-100 transition-opacity">
                            {filteredItems.map((item, idx) => (
                                <div
                                    key={idx}
                                    onClick={(e) => { e.stopPropagation(); setSelectedIdx(idx); }}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === selectedIdx ? 'w-10 bg-blue-600' : 'bg-white/30 hover:bg-white'}`}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Sticky Bottom CTA */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-xl border-t border-gray-200 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-[80] transform transition-transform duration-500 animate-in slide-in-from-bottom-full">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
                    <p className="text-gray-900 font-black text-lg md:text-xl tracking-tight">Like what you see? Experience it live.</p>
                    <Link to="/tickets" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-full font-black uppercase tracking-widest text-sm transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/20 w-full md:w-auto text-center">
                        Book Tickets Now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Gallery;
