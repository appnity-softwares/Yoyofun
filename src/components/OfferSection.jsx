import { Link } from "react-router-dom";
import { Ticket, Users, ArrowRight } from "lucide-react";

export default function OfferSection() {
  return (
    <section className="py-24 bg-blue-600 relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
              <span className="animate-pulse">🔥</span> Limited Time Offer
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
              Enjoy More, <br />
              <span className="text-blue-100">Pay Much Less.</span>
            </h2>
            
            <p className="text-blue-50 font-medium text-lg max-w-lg mx-auto lg:mx-0">
              Planning a trip with family or friends? Grab our exclusive online-only packages and skip the queue.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
               <Link 
                 to="/tickets" 
                 className="bg-white text-blue-600 px-10 py-4 rounded-full text-sm font-black uppercase tracking-widest hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 shadow-2xl"
               >
                 Get 20% Discount
               </Link>
               <Link 
                 to="/contact" 
                 className="bg-blue-700 text-white border border-blue-500 px-10 py-4 rounded-full text-sm font-black uppercase tracking-widest hover:bg-blue-800 transition-all"
               >
                 View Group Rates
               </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-[40px] shadow-2xl space-y-6 transform hover:-rotate-2 transition-transform">
               <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <Ticket size={28} />
               </div>
               <h4 className="text-2xl font-black text-gray-900">Weekday Saver</h4>
               <p className="text-gray-500 font-medium text-sm">Visit between Mon-Fri and get a flat 20% discount on all entry passes.</p>
               <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-blue-600 font-black">USE CODE: WEEKDAY20</span>
               </div>
            </div>

            <div className="bg-white p-8 rounded-[40px] shadow-2xl space-y-6 transform hover:rotate-2 transition-transform">
               <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <Users size={28} />
               </div>
               <h4 className="text-2xl font-black text-gray-900">Family Pack</h4>
               <p className="text-gray-500 font-medium text-sm">Special rates for groups of 5 or more. Includes lockers & lunch vouchers.</p>
               <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <Link to="/contact" className="text-emerald-600 font-black text-xs uppercase tracking-widest flex items-center gap-2">
                    Request Quote <ArrowRight size={14} />
                  </Link>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
