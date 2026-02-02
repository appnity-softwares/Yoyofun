import { useEffect, useRef } from "react";
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
      className="relative py-28 overflow-hidden bg-gradient-to-br from-[#0F3D6E] via-[#1E5FA8] to-[#3FA9F5]"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* TOP GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT */}
          <div className="fac-left">
            <span className="inline-block mb-4 rounded-md bg-lime-300 px-4 py-1 text-xs font-bold uppercase text-green-900">
              Facilities
            </span>

            <h2 className="font-heading text-[2.8rem] leading-tight font-extrabold text-white md:text-[3.4rem]">
              Discover the Spaces <br />
              That Make Camp Special
            </h2>

            <p className="mt-6 max-w-md text-white/90 text-sm md:text-base">
              From waterfronts to cozy cabins and lively activity hubs, our camp
              ensures excitement and well-being around every corner.
            </p>
          </div>

          {/* RIGHT – FRAMER STYLE PHOTO COLLAGE */}
          <div className="relative hidden lg:flex justify-center items-center h-[420px]">
            <div className="relative w-[520px] h-[320px]">

              <img
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=600&auto=format&fit=crop"
                className="collage-img left-0 top-20 rotate-[-8deg]"
                alt=""
              />

              <img
                src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=600&auto=format&fit=crop"
                className="collage-img left-28 top-0 rotate-[6deg]"
                alt=""
              />

              <img
                src="https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=600&auto=format&fit=crop"
                className="collage-img left-56 top-20 rotate-[-4deg]"
                alt=""
              />

              <img
                src="https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=600&auto=format&fit=crop"
                className="collage-img left-80 top-6 rotate-[8deg]"
                alt=""
              />

            </div>
          </div>
        </div>

        {/* CARDS */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Private Lakes",
              img: "https://images.unsplash.com/photo-1707575561373-d868bc04d593?q=80&w=687&auto=format&fit=crop",
            },
            {
              title: "Cozy Cabins",
              img: "https://images.unsplash.com/photo-1707575532556-9e4febd8c171?w=500&auto=format&fit=crop&q=60",
            },
            {
              title: "Inviting Spaces to Play",
              img: "https://images.unsplash.com/photo-1723524993962-0234edebe0cf?q=80&w=735&auto=format&fit=crop",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-[28px]"
            >
              <img
                src={card.img}
                className="h-[380px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt=""
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <h4 className="absolute bottom-6 left-6 text-lg font-semibold text-white">
                {card.title}
              </h4>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 flex justify-center">
          <button className="rounded-full bg-orange-500 px-12 py-4 text-sm font-semibold text-white hover:bg-orange-400 transition">
            Register Now
          </button>
        </div>
      </div>
    </section>
  );
}