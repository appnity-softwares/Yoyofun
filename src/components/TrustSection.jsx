import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ShieldCheck, Heart, Award, Zap } from "lucide-react";

export default function TrustSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".trust-el", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-gray-50 border-y border-gray-100">
      <div className="mx-auto max-w-7xl px-6">
        {/* PHASE 7: BADGE CLEANUP (Row Format) */}
        <div className="mb-24 flex flex-wrap justify-center items-center gap-6 md:gap-16 border-b border-gray-200 pb-12">
          {[
            { icon: "⭐", text: "4.8/5 Rating" },
            { icon: "🎢", text: "15+ Rides" },
            { icon: "👨‍👩‍👧", text: "Family Safe" },
            { icon: "⚡", text: "Easy Booking" },
          ].map((badge, i) => (
            <div key={i} className="trust-el flex items-center gap-3 text-sm font-black text-gray-500 uppercase tracking-widest whitespace-nowrap">
              <span className="text-xl grayscale group-hover:grayscale-0 transition-all">{badge.icon}</span>
              {badge.text}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT: SOCIAL PROOF IMAGES */}
          <div className="trust-el relative grid grid-cols-2 gap-4">
             <div className="space-y-4">
               <img 
                 src="https://images.unsplash.com/photo-1706843541054-21217423f177?q=80&w=800&auto=format&fit=crop" 
                 className="w-full h-64 object-cover rounded-[32px] shadow-lg"
                 alt="Family fun"
               />
               <div className="bg-blue-600 p-8 rounded-[32px] text-white">
                 <h4 className="text-4xl font-black mb-2">1000+</h4>
                 <p className="text-sm font-bold opacity-80 uppercase tracking-widest">Happy Visitors Weekly</p>
               </div>
             </div>
             <div className="pt-12 space-y-4">
               <div className="bg-white p-8 rounded-[32px] border border-gray-200 shadow-xl">
                 <div className="flex gap-1 text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                 </div>
                 <p className="text-gray-600 font-medium italic mb-4 leading-relaxed">
                   "Best weekend trip from Indore. The kids zone is actually safe and very clean!"
                 </p>
                 <p className="text-gray-900 font-black text-xs uppercase tracking-widest">— Sharma Family</p>
               </div>
               <img 
                 src="https://images.unsplash.com/photo-1564248516232-ea0616eff02e?w=800&auto=format&fit=crop" 
                 className="w-full h-64 object-cover rounded-[32px] shadow-lg"
                 alt="Waterpark fun"
               />
             </div>
          </div>

          {/* RIGHT: TRUST SIGNALS */}
          <div className="trust-el space-y-10">
            <div className="space-y-4">
              <span className="text-blue-600 text-xs font-black uppercase tracking-[0.3em] block">Our Safety Commitment</span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                Your Safety is Our <span className="text-blue-600 italic">Top Priority</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { 
                  icon: <ShieldCheck className="text-emerald-500" />, 
                  title: "Certified Lifeguards", 
                  desc: "Every pool is monitored by trained professionals 24/7." 
                },
                { 
                  icon: <Zap className="text-blue-500" />, 
                  title: "Hygiene Protocol", 
                  desc: "Daily water testing and continuous filtration cycles." 
                },
                { 
                  icon: <Heart className="text-red-500" />, 
                  title: "Family Friendly", 
                  desc: "Dedicated lockers and private changing rooms for families." 
                },
                { 
                  icon: <Award className="text-purple-500" />, 
                  title: "Award Winning", 
                  desc: "Ranked #1 for safety and cleanliness in the region." 
                }
              ].map((item, i) => (
                <div key={i} className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h5 className="font-black text-gray-900">{item.title}</h5>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-4">
               <Link to="/tickets" className="inline-block bg-gray-900 text-white px-10 py-4 rounded-full text-sm font-black uppercase tracking-widest hover:bg-blue-600 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-gray-900/20">
                 Secure Your Entry Now
               </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Star({ size, fill }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill={fill} 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
