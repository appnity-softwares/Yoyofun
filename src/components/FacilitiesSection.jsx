import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FacilitiesSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* LEFT CONTENT */
      gsap.from(".fac-left", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      /* COLLAGE ENTER */
      gsap.from(".collage-img", {
        opacity: 0,
        y: 60,
        rotation: -5,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      /* COLLAGE FLOAT */
      gsap.to(".collage-img", {
        y: -14,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.4,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 overflow-hidden bg-gradient-to-br from-[#0a0f1d] via-[#1e4ed8] to-[#2563eb]"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* TOP GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div className="fac-left">
            <span className="inline-block mb-4 rounded-md bg-blue-400/20 border border-blue-400/30 px-4 py-1 text-xs font-bold uppercase text-white tracking-widest">
              Facilities
            </span>

            <h2 className="font-heading text-[2.8rem] leading-tight font-extrabold text-white md:text-[3.4rem]">
              Discover the Spaces <br />
              That Make YOYO Special
            </h2>

            <p className="mt-6 max-w-md text-white/90 text-sm md:text-base font-medium">
              From waterfronts to cozy cabins and lively activity hubs, our park
              ensures excitement and well-being around every corner.
            </p>
          </div>

          {/* RIGHT – PHOTO COLLAGE */}
          <div className="relative hidden lg:flex justify-center items-center h-[420px]">
            <div className="relative w-[520px] h-[320px]">

              <img
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=600&auto=format&fit=crop"
                className="collage-img left-0 top-20 rotate-[-8deg] shadow-2xl"
                alt=""
              />

              <img
                src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=600&auto=format&fit=crop"
                className="collage-img left-28 top-0 rotate-[6deg] shadow-2xl"
                alt=""
              />

              <img
                src="https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=600&auto=format&fit=crop"
                className="collage-img left-56 top-20 rotate-[-4deg] shadow-2xl"
                alt=""
              />

              <img
                src="https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=600&auto=format&fit=crop"
                className="collage-img left-80 top-6 rotate-[8deg] shadow-2xl"
                alt=""
              />

            </div>
          </div>
        </div>

        {/* CARDS */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Water Adventure",
              img: "https://images.unsplash.com/photo-1707575561373-d868bc04d593?q=80&w=687&auto=format&fit=crop",
            },
            {
              title: "Relaxation Hubs",
              img: "https://images.unsplash.com/photo-1707575532556-9e4febd8c171?w=500&auto=format&fit=crop&q=60",
            },
            {
              title: "Inviting Spaces to Play",
              img: "https://images.unsplash.com/photo-1723524993962-0234edebe0cf?q=80&w=735&auto=format&fit=crop",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-[40px] shadow-2xl shadow-black/10"
            >
              <img
                src={card.img}
                className="h-[380px] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt=""
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-80" />
              <h4 className="absolute bottom-10 left-10 text-xl font-bold text-white tracking-tight">
                {card.title}
              </h4>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24 flex justify-center">
          <Link
            to="/tickets"
            className="rounded-full bg-white px-12 py-5 text-sm font-black text-blue-600 hover:bg-gray-100 hover:scale-110 transition-all shadow-2xl active:scale-95 uppercase tracking-widest"
          >
            Book Tickets Now
          </Link>
        </div>
      </div>
    </section>
  );
}
