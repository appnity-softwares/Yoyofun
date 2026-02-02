import { useEffect, useRef } from "react";
import { Smile, Lightbulb } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 🎥 VIDEO – BLUR TO CLEAR
      gsap.fromTo(
        videoRef.current,
        { filter: "blur(6px)", scale: 1.05 },
        {
          filter: "blur(0px)",
          scale: 1,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      // 🖼️ IMAGES – SOFT SCALE IN
      gsap.from(".soft-image", {
        scale: 1.08,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // 📝 TEXT – PURE FADE
      gsap.from(".soft-text", {
        opacity: 0,
        duration: 1,
        ease: "power1.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 overflow-hidden">
      {/* 🎥 BACKGROUND VIDEO */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/about-bg.mp4" type="video/mp4" />
      </video>

      {/* VERY LIGHT OVERLAY */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14 items-center">

          {/* LEFT IMAGE */}
          <div className="soft-image relative">
            <img
              src="https://images.unsplash.com/photo-1629834598512-77a443808b73?q=80&w=687&auto=format&fit=crop"
              className="h-[520px] w-full rounded-[40px] object-cover"
              alt=""
            />
          </div>

          {/* CENTER CONTENT */}
          <div className="text-white">
            <span className="soft-text inline-block mb-4 -rotate-6 rounded-md bg-yellow-400 px-4 py-1 text-xs font-bold text-black">
              ABOUT US
            </span>

            <h2 className="soft-text font-heading text-[2.8rem] leading-tight md:text-[3.4rem] font-extrabold">
              A Welcoming <br />
              Natural Haven <br />
              Close To Home
            </h2>

            <p className="soft-text mt-5 max-w-md text-sm text-white/80">
              At Starlight Camp, each day is an adventure of laughter and
              friendship. Campers gain confidence, joy, new skills, and
              unforgettable summer memories.
            </p>

            <hr className="soft-text my-8 border-white/30" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="soft-text flex gap-4">
                <Smile className="h-8 w-8 text-lime-300" />
                <div>
                  <h4 className="font-semibold">Safe and supportive space</h4>
                  <p className="text-sm text-white/80">
                    Our team ensures campers feel safe, welcome, and encouraged
                    to shine.
                  </p>
                </div>
              </div>

              <div className="soft-text flex gap-4">
                <Lightbulb className="h-8 w-8 text-lime-300" />
                <div>
                  <h4 className="font-semibold">Endless Adventures</h4>
                  <p className="text-sm text-white/80">
                    Exciting outdoor challenges and creative activities await
                    at every turn.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="soft-image relative hidden lg:block">
            <span className="soft-text absolute -top-4 right-10 rotate-6 rounded-md bg-lime-400 px-3 py-1 text-xs font-bold text-black">
              NATURE
            </span>

            <img
              src="https://plus.unsplash.com/premium_photo-1661378818245-0fe1239e5bdc?q=80&w=687&auto=format&fit=crop"
              className="h-[420px] w-full rounded-[40px] object-cover"
              alt=""
            />
          </div>

        </div>
      </div>
    </section>
  );
}
