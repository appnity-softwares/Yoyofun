import { Utensils, Coffee, Users, ShieldCheck } from "lucide-react";

const foodCards = [
  {
    title: "Family Restaurant",
    desc: "Spacious dining area with multi-cuisine options perfect for family lunches.",
    icon: <Users size={24} />,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Snacks & Beverages",
    desc: "Quick bites, refreshing mocktails, and seasonal drinks to keep you energized.",
    icon: <Coffee size={24} />,
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Group Meal Packages",
    desc: "Cost-effective and delicious buffet options for school trips and corporate groups.",
    icon: <Utensils size={24} />,
    image: "https://images.unsplash.com/photo-1547573854-74d2a71d0826?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Hygienic Kitchen",
    desc: "Strict quality controls and fresh ingredients for a safe dining experience.",
    icon: <ShieldCheck size={24} />,
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop",
  }
];

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
  </svg>
);

export default function RestaurantSection() {
  const whatsappUrl = "https://wa.me/919752586956?text=Hi%20YOYO%2C%20I%20want%20to%20enquire%20about%20Restaurant%20and%20food%20options.";

  return (
    <section id="restaurant" className="py-24 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-orange-600 text-xs font-black uppercase tracking-[0.3em] mb-4 block">Taste the Joy</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-6">
              Food & <span className="text-orange-600 italic">Restaurant</span>
            </h2>
            <p className="text-gray-500 font-medium text-lg leading-relaxed">
              Enjoy delicious meals, snacks, and refreshing drinks during your visit. From quick bites to full family feasts, our hygienic kitchen serves it all.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" 
               className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-[#128C7E] transition-all shadow-lg shadow-[#25D366]/20">
              <WhatsAppIcon /> Ask on WhatsApp
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {foodCards.map((card, i) => (
            <div key={i} className="group relative bg-gray-50 rounded-[40px] p-4 border border-gray-100 transition-all hover:bg-white hover:shadow-2xl hover:shadow-orange-600/5 hover:-translate-y-2">
              <div className="relative h-48 w-full rounded-[32px] overflow-hidden mb-6">
                <img src={card.image} alt={card.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md w-10 h-10 rounded-2xl flex items-center justify-center text-orange-600 shadow-lg">
                  {card.icon}
                </div>
              </div>
              <div className="px-4 pb-6">
                <h3 className="text-xl font-black text-gray-900 mb-3">{card.title}</h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="bg-gray-900 text-white px-10 py-5 rounded-full text-sm font-black uppercase tracking-widest hover:bg-orange-600 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-gray-900/10">
            Explore Food Options
          </button>
        </div>
      </div>
    </section>
  );
}
