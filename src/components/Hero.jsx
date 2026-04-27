import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    image: "https://images.unsplash.com/photo-1708157730402-67cc5b19e335?q=80&w=1600&auto=format&fit=crop",
    title: "YOYO FUN",
    subtitle: "N' FOODS",
    desc: "A welcoming place where joy, adventure, and unforgettable memories come together for everyone.",
  },
  {
    image: "https://images.unsplash.com/photo-1739295194212-0602c4d1e797?q=80&w=1600&auto=format&fit=crop",
    title: "EXPERIENCE",
    subtitle: "THE THRILL",
    desc: "From adrenaline-pumping rides to relaxing pools, there’s something for everyone.",
  },
  {
    image: "https://images.unsplash.com/photo-1707575878561-794d400bbb1e?q=80&w=1600&auto=format&fit=crop",
    title: "CREATE",
    subtitle: "MEMORIES",
    desc: "Moments that stay with you forever, shared with family and friends.",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  const heroRef = useRef(null);
  const contentRef = useRef(null);

  // SLIDER (unchanged)
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // PREMIUM SCROLL ANIMATION
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        y: 120,
        opacity: 0,
        duration: 1.4,
        ease: "power4.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 75%",
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Images */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${i === index ? "opacity-100" : "opacity-0"
            }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        />
      ))}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-end pb-24 md:pb-32">
        <div
          ref={contentRef}
          key={index}
          className="mx-auto w-full max-w-7xl px-6 text-center text-white"
        >
          <h1 className="font-extrabold uppercase tracking-tight leading-none text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[8rem]">
            {slides[index].title}
            <br />
            <span className="block">{slides[index].subtitle}</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm md:text-base text-gray-200">
            {slides[index].desc}
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              to="/tickets"
              className="rounded-full bg-blue-600 px-10 py-4 text-sm font-bold tracking-widest uppercase transition-all hover:bg-white hover:text-black hover:scale-110 active:scale-95 shadow-2xl shadow-blue-500/20"
            >
              Book Tickets →
            </Link>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-10 bg-blue-500" : "w-2 bg-white/50 hover:bg-white"
              }`}
          />
        ))}
      </div>
    </section>
  );
}
