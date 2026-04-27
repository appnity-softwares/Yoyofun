import { Home, Hotel, ShieldCheck, Zap } from "lucide-react";

const roomCards = [
  {
    title: "AC Premium Rooms",
    desc: "Luxury air-conditioned rooms for a refreshing rest after your waterpark adventure.",
    icon: <Zap size={24} />,
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Family Suites",
    desc: "Spacious suites designed for larger families with all modern amenities.",
    icon: <Home size={24} />,
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Clean Washrooms",
    desc: "Maintaining the highest standards of sanitation and hygiene for your comfort.",
    icon: <ShieldCheck size={24} />,
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Easy Booking",
    desc: "Hassle-free reservation process with instant confirmation and support.",
    icon: <Hotel size={24} />,
    image: "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?q=80&w=800&auto=format&fit=crop",
  }
];

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
  </svg>
);

export default function SuitesSection() {
  const whatsappUrl = "https://wa.me/919752586956?text=Hi%20YOYO%2C%20I%20want%20to%20check%20room%20availability%20and%20Suite%20booking.";

  return (
    <section id="suites" className="py-24 bg-gray-50 border-y border-gray-100 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="order-2 lg:order-1 relative">
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1590490359683-658d3d23f972?q=80&w=800&auto=format&fit=crop" className="rounded-[40px] shadow-2xl h-64 object-cover mt-8" alt="Stay 1" />
              <img src="https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=800&auto=format&fit=crop" className="rounded-[40px] shadow-2xl h-64 object-cover" alt="Stay 2" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-10 rounded-[40px] shadow-2xl hidden md:block">
               <p className="text-3xl font-black mb-1 italic">Best Value</p>
               <p className="text-xs font-bold uppercase tracking-widest opacity-80">Ideal for Families & Couples</p>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-8 text-center lg:text-left">
            <div>
              <span className="text-blue-600 text-xs font-black uppercase tracking-[0.3em] mb-4 block">Premium Accommodation</span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                Suites & <span className="text-blue-600">Stay</span>
              </h2>
            </div>
            <p className="text-gray-500 font-medium text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              Extend your fun with our comfortable rooms and family suites. Ideal for outstation visitors and weekend getaways where comfort meets adventure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
               <button className="bg-blue-600 text-white px-10 py-5 rounded-full text-sm font-black uppercase tracking-widest hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-600/20">
                 Book a Suite
               </button>
               <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-10 py-5 rounded-full text-sm font-black uppercase tracking-widest hover:bg-[#128C7E] transition-all shadow-lg shadow-[#25D366]/20">
                 <WhatsAppIcon /> Check Availability
               </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {roomCards.map((card, i) => (
            <div key={i} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {card.icon}
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">{card.title}</h3>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
