import { Calendar, Users, Briefcase, GraduationCap, ChevronRight } from "lucide-react";

const eventTypes = [
  { title: "Birthday Parties", icon: <Users size={24} />, desc: "Celebrate your special day with custom packages, music, and great food." },
  { title: "School Trips", icon: <GraduationCap size={24} />, desc: "Safe and educational outings with full supervision and group catering." },
  { title: "Corporate Events", icon: <Briefcase size={24} />, desc: "Professional halls for meetings, team building, and company outings." },
  { title: "Family Functions", icon: <Calendar size={24} />, desc: "Large banquet halls for weddings, anniversaries, and reunions." },
];

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
  </svg>
);

export default function HallBookingSection() {
  const whatsappUrl = "https://wa.me/919752586956?text=Hi%20YOYO%2C%20I%20want%20to%20enquire%20about%20Banquet%20and%20Hall%20booking%20for%20an%20event.";

  return (
    <section id="hall-booking" className="py-24 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-20">
          <span className="text-indigo-600 text-xs font-black uppercase tracking-[0.3em] mb-4 block">Event Management</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-6">
            Banquet & <span className="text-indigo-600 italic">Hall Booking</span>
          </h2>
          <p className="text-gray-500 font-medium text-lg leading-relaxed max-w-3xl mx-auto">
            Host birthdays, family functions, school trips, and corporate events with ease. Our versatile spaces and dedicated team ensure your event is a grand success.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* LEFT: EVENT CARDS */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {eventTypes.map((event, i) => (
              <div key={i} className="p-8 rounded-[40px] bg-gray-50 border border-gray-100 transition-all hover:bg-white hover:shadow-2xl hover:shadow-indigo-600/5 group">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  {event.icon}
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3">{event.title}</h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed mb-6">{event.desc}</p>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-600 group-hover:gap-4 transition-all">
                  Book Event <ChevronRight size={16} />
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: LEAD CTA CARD */}
          <div className="bg-indigo-600 p-10 rounded-[48px] text-white shadow-2xl shadow-indigo-600/30 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            <div className="relative z-10 space-y-8">
              <h4 className="text-3xl font-black leading-tight">Get a Custom Package</h4>
              <p className="text-indigo-100 font-medium opacity-80 leading-relaxed">
                Planning a large event? Contact our event specialists for a personalized quote and custom arrangements.
              </p>
              
              <div className="space-y-4 pt-4">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" 
                   className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-[#128C7E] hover:scale-105 transition-all shadow-xl shadow-[#25D366]/20">
                  <WhatsAppIcon /> Message on WhatsApp
                </a>
                <button onClick={() => window.location.href = '#contact'} 
                   className="w-full bg-indigo-700 text-white border border-indigo-400 px-8 py-5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-indigo-800 transition-all">
                  Enquire for Booking
                </button>
              </div>

              <div className="pt-6 border-t border-indigo-500/30">
                 <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200">Ideal for 50 - 500 Guests</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
