import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TrustSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".trust-fade", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      gsap.from(".trust-image", {
        opacity: 0,
        scale: 1.05,
        duration: 1.2,
        ease: "power2.out",
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
    <section
      ref={sectionRef}
      className="py-28 bg-gradient-to-br from-[#0F3D6E] via-[#1E5FA8] to-[#3FA9F5]"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* LEFT CONTENT */}
          <div>
            <span className="trust-fade inline-block mb-6 -rotate-6 rounded-md bg-yellow-400 px-4 py-1 text-xs font-bold uppercase text-black">
              Why Parents Trust Us
            </span>

            <h2 className="trust-fade font-heading text-[3rem] leading-tight font-extrabold text-white md:text-[3.6rem]">
              Care You Can <br />
              Count On, Every <br />
              Step Of The Way!
            </h2>

            {/* LEFT IMAGE */}
            <div className="trust-image mt-10 overflow-hidden rounded-[28px]">
              <img
                src="https://images.unsplash.com/photo-1706843541054-21217423f177?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="h-[360px] w-full object-cover"
                alt=""
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div>
            {/* CURVED IMAGE */}
            <div className="trust-image relative overflow-hidden rounded-t-[180px] rounded-b-[28px]">
              <img
                src="https://images.unsplash.com/photo-1564248516232-ea0616eff02e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fHdhdGVycGFya3xlbnwwfHwwfHx8MA%3D%3D"
                className="h-[460px] w-full object-cover"
                alt=""
              />

              {/* TAGS */}
              <div className="absolute bottom-6 left-6 flex gap-2">
                <span className="rounded-md bg-lime-400 px-3 py-1 text-xs font-bold text-black">
                  Experienced Staff
                </span>
                <span className="rounded-md bg-yellow-400 px-3 py-1 text-xs font-bold text-black">
                  Safety First
                </span>
                <span className="rounded-md bg-orange-500 px-3 py-1 text-xs font-bold text-white">
                  Engaging Learning
                </span>
              </div>
            </div>

            {/* TEXT */}
            <p className="trust-fade mt-6 max-w-md text-sm text-white/80">
              Families choose us for safety, growth, and fun every summer.
              Caring staff help children thrive, explore, and grow with
              confidence and joy.
            </p>

            {/* CTA */}
            <button className=" mt-6 rounded-full bg-orange-500 px-8 py-4 text-sm font-semibold text-white transition hover:bg-orange-600">
              Explore Our Programs
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
