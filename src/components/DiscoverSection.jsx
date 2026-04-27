import { Zap, Waves as Wave, Heart, Star, Anchor, Sun, ArrowRight } from "lucide-react";

const attractions = [
  {
    title: "Giant Slides",
    description: "Experience 50+ feet of pure adrenaline with our high-speed vertical drops.",
    image: "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=800&auto=format&fit=crop",
    icon: <Zap size={24} />,
    tag: "Thrills",
    color: "blue"
  },
  {
    title: "Massive Wave Pool",
    description: "Indore's largest wave pool with state-of-the-art ocean tide simulation.",
    image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=800&auto=format&fit=crop",
    icon: <Wave size={24} />,
    tag: "Family",
    color: "cyan"
  },
  {
    title: "Kids Fantasy Zone",
    description: "A safe, magical water playground designed exclusively for our little guests.",
    image: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?q=80&w=800&auto=format&fit=crop",
    icon: <Heart size={24} />,
    tag: "Kids",
    color: "pink"
  },
  {
    title: "Cyclone Funnel",
    description: "Spiral through the massive funnel at high speeds for a dizzying splashdown.",
    image: "https://images.unsplash.com/photo-1596131397999-bb01570bacf8?q=80&w=800&auto=format&fit=crop",
    icon: <Star size={24} />,
    tag: "Thrills",
    color: "purple"
  },
  {
    title: "Lazy River",
    description: "Relax and float along our 400ft tropical river with gentle currents.",
    image: "https://images.unsplash.com/photo-1629113645366-3d71206637ba?q=80&w=800&auto=format&fit=crop",
    icon: <Anchor size={24} />,
    tag: "Relax",
    color: "emerald"
  },
  {
    title: "Rain Dance Arena",
    description: "Dance to the latest hits under high-tech water sprinklers and disco lights.",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800&auto=format&fit=crop",
    icon: <Sun size={24} />,
    tag: "Fun",
    color: "amber"
  }
];

export default function DiscoverSection() {
  // Triple the items to ensure the loop is seamless even on large screens
  const doubledAttractions = [...attractions, ...attractions, ...attractions];

  return (
    <section id="attractions" className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <div className="inline-block px-4 py-1.5 bg-blue-50 rounded-full text-blue-600 text-[10px] font-black uppercase tracking-[0.3em] mb-6 animate-fadeSlide">
          World Class Attractions
        </div>
        <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter">
          Endless Adventure for Every Age
        </h2>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
          From high-speed thrills to relaxed family zones, we've designed every corner
          of YOYO Fun N Foods for maximum joy and safety.
        </p>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative group">
        {/* Left/Right Overlays for "Fade" Effect */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex animate-infinite-scroll hover:[animation-play-state:paused] gap-8 py-10 px-4 w-max">
          {doubledAttractions.map((item, idx) => (
            <div
              key={idx}
              className="w-[380px] h-[520px] relative rounded-[3rem] overflow-hidden group/card shadow-2xl transition-transform duration-700 hover:scale-[1.02]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              {/* Badge */}
              <div className="absolute top-8 left-8">
                <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {item.tag}
                </span>
              </div>

              {/* Content */}
              <div className="absolute bottom-10 left-10 right-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white`}>
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight">
                    {item.title}
                  </h3>
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-6 line-clamp-2 font-medium">
                  {item.description}
                </p>
                <button className="flex items-center gap-2 text-white text-xs font-black uppercase tracking-widest group/btn">
                  Explore More
                  <div className="h-0.5 w-8 bg-blue-500 transition-all duration-300 group-hover/btn:w-16" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
