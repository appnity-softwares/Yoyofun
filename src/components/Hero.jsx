import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { Clock, MapPin, Ticket, Star, ArrowRight } from "lucide-react";
import { heroService } from "../services/heroService";

const FALLBACK_SLIDES = [
  {
    image_url: "https://images.unsplash.com/photo-1708157730402-67cc5b19e335?q=80&w=1600&auto=format&fit=crop",
    headline: "Best Water Park in Indore for Family Fun & Kids Safety",
    subheadline: "Slides, wave pools, kids zone & full-day fun — starting at ₹499",
    cta_url: "/tickets",
    cta_text: "Book Tickets Now"
  },
  {
    image_url: "https://images.unsplash.com/photo-1739295194212-0602c4d1e797?q=80&w=1600&auto=format&fit=crop",
    headline: "Thrilling Slides & Massive Wave Pools Await You",
    subheadline: "Experience the ultimate adrenaline rush with 15+ world-class attractions.",
    cta_url: "/gallery",
    cta_text: "View Attractions"
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [slides, setSlides] = useState(FALLBACK_SLIDES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSlides() {
      try {
        const data = await heroService.list();
        if (data && data.length > 0) {
          setSlides(data);
        }
      } catch (error) {
        console.error("Failed to load hero slides:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative overflow-visible h-screen">
      {/* HERO MAIN */}
      <div className="relative h-full w-full overflow-hidden bg-slate-950">
        {/* ... (slides map remains same) ... */}
        {slides.map((slide, i) => (
          <div
            key={slide.id || i}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${
              i === index ? "opacity-100 scale-100" : "opacity-0 scale-110"
            }`}
            style={{ backgroundImage: `url(${slide.image_url})` }}
          >
            {/* Immersive Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/30 to-slate-950/90" />
            
            {/* Animated Water Reflections (Subtle Overlay) */}
            <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          </div>
        ))}

        {/* Content */}
        <div className="relative z-10 flex h-full items-center justify-center pt-32 pb-48">
          <div className="mx-auto max-w-6xl px-6 text-center text-white">
            {/* ... (badges, h1, p, links remain same) ... */}
            {/* Status & Trust Badge Row */}
            <div className="mb-8 flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-5 duration-1000">
              <div className="inline-flex items-center gap-2 bg-emerald-500/90 backdrop-blur-md text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-emerald-500/30 border border-emerald-400/30">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Open Today: 10 AM - 6 PM
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-lg px-5 py-2 border border-white/20 shadow-xl">
                <Star className="text-amber-400 fill-amber-400" size={14} />
                <span className="text-[10px] font-black tracking-widest uppercase text-white/90">Top Rated Family Destination</span>
              </div>
            </div>

            <h1 className="[font-family:'Outfit',sans-serif] font-black tracking-tighter leading-[1] text-4xl md:text-7xl lg:text-8xl mb-8 drop-shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              {slides[index].headline.split(' ').map((word, i) => {
                const isThrilling = word.toLowerCase().includes('thrilling');
                const isWaterpark = word.toLowerCase().includes('waterpark');
                return (
                  <span 
                    key={i} 
                    className={isThrilling || isWaterpark ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300" : "text-white"}
                  >
                    {word}{' '}
                  </span>
                );
              })}
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-base md:text-xl lg:text-2xl text-white/90 font-medium leading-relaxed opacity-90 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500 px-4">
              {slides[index].subheadline}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 px-6 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-700">
              <Link
                to={slides[index].cta_url || "/tickets"}
                className="group relative w-full sm:w-auto rounded-2xl bg-blue-600 px-10 py-5 text-[11px] font-black tracking-[0.2em] uppercase transition-all hover:bg-blue-700 hover:-translate-y-1 shadow-[0_20px_50px_rgba(37,99,235,0.4)] overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {slides[index].cta_text || "Book Tickets Now"}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                </span>
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              </Link>
              
              <Link
                to="/gallery"
                className="w-full sm:w-auto rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/20 px-10 py-5 text-[11px] font-black tracking-[0.2em] uppercase text-white transition-all hover:bg-white/10 hover:-translate-y-1 hover:border-white/30"
              >
                Explore Attractions
              </Link>
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        {slides.length > 1 && (
          <div className="absolute bottom-40 left-1/2 -translate-x-1/2 z-20 flex gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === index ? "w-12 bg-white" : "w-4 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* QUICK INFO BAR - 100vh Visibility Optimization */}
      <div className="absolute -bottom-8 md:bottom-6 left-1/2 -translate-x-1/2 w-full max-w-6xl px-4 md:px-6 z-40">
        {/* Desktop Grid Layout */}
        <div className="hidden md:grid md:grid-cols-3 gap-px rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-15px_rgba(0,0,0,0.4)] border border-white/20 bg-white/10 backdrop-blur-3xl">
          <div className="flex items-center gap-4 p-8 bg-transparent hover:bg-white/10 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
              <Ticket size={28} className="transition-transform group-hover:rotate-12" />
            </div>
            <div>
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-1">Starts From</p>
              <p className="text-2xl font-black text-white leading-none">₹499 <span className="text-sm font-medium text-white/50">/ Person</span></p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-8 bg-transparent hover:bg-white/10 transition-all group border-x border-white/10">
            <div className="w-14 h-14 rounded-2xl bg-orange-500/20 flex items-center justify-center text-orange-400 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
              <MapPin size={28} className="transition-transform group-hover:bounce" />
            </div>
            <div>
              <p className="text-[10px] font-black text-orange-400 uppercase tracking-[0.2em] mb-1">Location</p>
              <p className="text-2xl font-black text-white leading-none">Indore <span className="text-sm font-medium text-white/50">Bypass</span></p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-8 bg-transparent hover:bg-white/10 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
              <Clock size={28} className="transition-transform group-hover:scale-110" />
            </div>
            <div>
              <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-1">Status</p>
              <p className="text-2xl font-black text-white leading-none">Open <span className="text-sm font-medium text-white/50">10:00 - 18:00</span></p>
            </div>
          </div>
        </div>

        {/* Mobile Infinite Scroll Layout */}
        <div className="md:hidden w-full overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 backdrop-blur-3xl shadow-[0_32px_64px_-15px_rgba(0,0,0,0.4)]">
          <div className="flex animate-infinite-scroll py-4 no-scrollbar">
            {/* Double the list for seamless loop */}
            {[...Array(2)].map((_, groupIndex) => (
              <div key={groupIndex} className="flex gap-4 px-2">
                <div className="flex-shrink-0 w-[260px] flex items-center gap-4 p-5 bg-white/5 rounded-2xl border border-white/5 shadow-inner">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <Ticket size={22} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-0.5">Price</p>
                    <p className="text-xl font-black text-white leading-none">₹499 <span className="text-[11px] font-medium text-white/50">/ Person</span></p>
                  </div>
                </div>

                <div className="flex-shrink-0 w-[260px] flex items-center gap-4 p-5 bg-white/5 rounded-2xl border border-white/5 shadow-inner">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-orange-400 uppercase tracking-widest mb-0.5">Location</p>
                    <p className="text-xl font-black text-white leading-none">Indore <span className="text-[11px] font-medium text-white/50">Bypass</span></p>
                  </div>
                </div>

                <div className="flex-shrink-0 w-[260px] flex items-center gap-4 p-5 bg-white/5 rounded-2xl border border-white/5 shadow-inner">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Clock size={22} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-0.5">Status</p>
                    <p className="text-xl font-black text-white leading-none">Open <span className="text-[11px] font-medium text-white/50">10:00 - 18:00</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
