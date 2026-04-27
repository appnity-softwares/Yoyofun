import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function DiscoverSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 🌊 CONTENT – SOFT WAVY ENTRY (ONCE)
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true, // 🔥 plays only once
        },
      });

      // 🌊 FLOATING IMAGES – WAVY REVEAL (ONCE)
      gsap.utils.toArray(".wave-float").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: i % 2 === 0 ? 80 : -80,
          x: i % 2 === 0 ? -40 : 40,
          rotation: i % 2 === 0 ? -6 : 6,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true, // 🔥 plays once
          },
        });
      });

      // 🌿 LEAVES – QUICK SOFT SWAY (ONCE)
      gsap.from(".leaf", {
        opacity: 0,
        rotation: -20,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.15,
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
 <section
  id="about"
  ref={sectionRef}
  className="relative bg-[#F3FAE8] py-28 overflow-hidden scroll-mt-32"
>

      {/* Floating circles */}
      <img
        src="https://images.unsplash.com/photo-1705829512772-e0ba43a72dd9?q=80&w=1331&auto=format&fit=crop"
        className="wave-float absolute left-16 top-24 h-50 w-50 rounded-full object-cover"
        alt=""
      />

      <img
        src="https://images.unsplash.com/photo-1727994962758-ac74defe0bb9?w=500&auto=format&fit=crop&q=60"
        className="wave-float absolute right-54 top-24 h-50 w-50 rounded-full object-cover"
        alt=""
      />

      <img
        src="https://images.unsplash.com/photo-1706843540950-04827b1aa919?w=500&auto=format&fit=crop&q=60"
        className="wave-float absolute right-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full object-cover"
        alt=""
      />

      <img
        src="https://images.unsplash.com/photo-1628950992435-9f3acaf1adbe?w=500&auto=format&fit=crop&q=60"
        className="wave-float absolute right-54 bottom-2 h-50 w-50 rounded-full object-cover"
        alt=""
      />

      <img
        src="https://plus.unsplash.com/premium_photo-1661575521274-b5bfae7e3af4?w=500&auto=format&fit=crop&q=60"
        className="wave-float absolute left-24 bottom-5 h-50 w-50 rounded-full object-cover"
        alt=""
      />

      {/* Decorative leaves */}
      <span className="leaf absolute right-[35%] top-[35%] h-3 w-6 rotate-12 rounded-full bg-green-400"></span>
      <span className="leaf absolute right-[33%] top-[37%] h-3 w-6 rotate-[-20deg] rounded-full bg-green-400"></span>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
      >
        <h2 className="text-[2.5rem] leading-tight font-extrabold uppercase text-[#1F4D2B] md:text-[3.2rem]">
          Discovering Wonder,
          <br />
          Friendship, Adventure,
          <br />
          And Life-Long Memories
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-sm text-[#3F5F4C] md:text-base">
          Every moment is an opportunity to explore, connect, and create
          memories that last a lifetime, while making friends, discovering new
          passions, and embracing the beauty of nature.
        </p>

        <button className="mt-10 rounded-full bg-orange-500 px-8 py-4 text-sm font-semibold text-white transition hover:bg-orange-600">
          Explore Our Programs
        </button>
      </div>
    </section>
  );
}
