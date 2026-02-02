import { useEffect, useRef } from "react";
import gsap from "gsap";

const galleryImages = [
  "https://images.unsplash.com/photo-1642717841683-c0323214617c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0ZXJwYXJrfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1707575878561-794d400bbb1e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2F0ZXJwYXJrfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1625254417927-3f586db72af5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHdhdGVycGFya3xlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1503505946976-e489ce29e0fd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHdhdGVycGFya3xlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1708157730402-67cc5b19e335?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHdhdGVycGFya3xlbnwwfHwwfHx8MA%3D%3D",
];

export default function Footer() {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".footer-marquee", {
        xPercent: -50,
        duration: 30,
        ease: "linear",
        repeat: -1,
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="bg-[#1E4022] text-white overflow-hidden">
      {/* IMAGE MARQUEE */}
      <div ref={marqueeRef} className="relative overflow-hidden py-10">
        <div className="footer-marquee flex gap-6 w-max">
          {[...galleryImages, ...galleryImages].map((img, i) => (
            <img
              key={i}
              src={img}
              className="h-[140px] w-[220px] rounded-2xl object-cover"
              alt=""
            />
          ))}
        </div>
      </div>

      {/* FOOTER CONTENT */}
      <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* ABOUT */}
        <div>
          <p className="text-sm text-white/80 leading-relaxed">
            YOYO FUN N FOODS offers a safe, fun place where kids grow, play,
            explore activities, enjoy delicious food, and create lasting
            memories.
          </p>

          <button className="mt-6 rounded-full bg-white px-6 py-3 text-sm font-semibold text-green-900 hover:bg-gray-100 transition">
            Register now
          </button>
        </div>

        {/* LINKS */}
        <div>
          <h4 className="mb-4 font-semibold">Home</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li>About</li>
            <li>Programs</li>
            <li>Gallery</li>
            <li>Bookings</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold">Company</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li>Team</li>
            <li>Blog</li>
            <li>FAQ</li>
            <li>Contact us</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="text-sm text-white/80 space-y-3">
          <p>📞 (123) 456-7890</p>
          <p>✉️ info@yoyofunnfoods.com</p>
          <p>📍 YOYO FUN N FOODS, India</p>
        </div>
      </div>

      {/* BIG BRAND */}
      <div className="relative bg-[#1A371E] py-10 overflow-hidden">
        <h1 className="text-center text-[3rem] md:text-[5rem] font-extrabold tracking-wide text-white">
          YOYO <span className="text-yellow-400">FUN</span> N FOODS
        </h1>
      </div>
    </footer>
  );
}
