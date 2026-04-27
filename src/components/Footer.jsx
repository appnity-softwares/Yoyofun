import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { settingsService } from "../services/settingsService";

const galleryImages = [
  "https://images.unsplash.com/photo-1642717841683-c0323214617c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0ZXJwYXJrfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1707575878561-794d400bbb1e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2F0ZXJwYXJrfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1625254417927-3f586db72af5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHdhdZXJwYXJrfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1503505946976-e489ce29e0fd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHdhdZXJwYXJrfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1708157730402-67cc5b19e335?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHdhdZXJwYXJrfGVufDB8fDB8fHww",
];

export default function Footer() {
  const marqueeRef = useRef(null);
  const [settings, setSettings] = useState(null);

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

  useEffect(() => {
    let active = true;
    async function loadSettings() {
      try {
        const data = await settingsService.public();
        if (active) {
          setSettings(data);
        }
      } catch {
        if (active) {
          setSettings(null);
        }
      }
    }
    loadSettings();
    return () => {
      active = false;
    };
  }, []);

  const phoneNumbers = Array.isArray(settings?.phone_numbers) && settings.phone_numbers.length ? settings.phone_numbers : ["+91 9752586956"];

  return (
    <footer className="bg-[#0f172a] text-white overflow-hidden">
      {/* IMAGE MARQUEE */}
      <div ref={marqueeRef} className="relative overflow-hidden py-10 opacity-80 hover:opacity-100 transition-opacity duration-500">
        <div className="footer-marquee flex gap-10 w-max">
          {[...galleryImages, ...galleryImages].map((img, i) => (
            <img
              key={i}
              src={img}
              className="h-[140px] w-[260px] rounded-3xl object-cover hover:scale-105 transition-transform duration-500 shadow-2xl"
              alt=""
            />
          ))}
        </div>
      </div>

      {/* FOOTER CONTENT */}
      <div className="mx-auto max-w-7xl px-8 py-20 grid grid-cols-1 md:grid-cols-4 gap-16">
        {/* ABOUT */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
            YOYO <span className="text-blue-500">FUN</span>
          </h2>
          <p className="text-base text-gray-400 leading-relaxed max-w-[280px]">
            The ultimate destination where kids grow, play, and explore. Create lasting memories with our safe and fun-filled park experience.
          </p>
          <Link
            to="/tickets"
            className="inline-block rounded-full bg-blue-600 px-8 py-3.5 text-sm font-bold text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 transition-all duration-300"
          >
            Book Tickets
          </Link>
        </div>

        {/* NAVIGATION */}
        <div>
          <h4 className="mb-8 text-lg font-bold text-white">Quick Nav</h4>
          <ul className="space-y-4 text-[15px] font-medium text-gray-400">
            <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
            <li><Link to="/gallery" className="hover:text-blue-400 transition-colors">Gallery View</Link></li>
            <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Story</Link></li>
            <li><Link to="/tickets" className="hover:text-blue-400 transition-colors">Ticket Info</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact Support</Link></li>
          </ul>
        </div>

        {/* POLICIES */}
        <div>
          <h4 className="mb-8 text-lg font-bold text-white">Legal Hub</h4>
          <ul className="space-y-4 text-[15px] font-medium text-gray-400">
            <li><Link to="/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms-and-conditions" className="hover:text-blue-400 transition-colors">Terms of Use</Link></li>
            <li><Link to="/refund-policy" className="hover:text-blue-400 transition-colors">Refund Policy</Link></li>
            <li><Link to="/faq" className="hover:text-blue-400 transition-colors">Help & FAQ</Link></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="space-y-6">
          <h4 className="mb-8 text-lg font-bold text-white">Visit Us</h4>
          <div className="space-y-4 text-[15px] font-medium text-gray-400">
            <p className="flex items-center gap-3">
              <span className="p-2 bg-white/5 rounded-lg">📞</span>
              {phoneNumbers[0]}
            </p>
            <p className="flex items-center gap-3">
              <span className="p-2 bg-white/5 rounded-lg">✉️</span>
              {settings?.contact_email || "hello@yoyofun.com"}
            </p>
            <p className="flex items-center gap-3 leading-relaxed">
              <span className="p-2 bg-white/5 rounded-lg text-lg">📍</span>
              {settings?.address || "YOYO FUN N FOODS, Madhya Pradesh, India"}
            </p>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-white/5 bg-[#0a0f1d] py-10 px-8 text-center">
        <p className="text-sm font-medium text-gray-500">
          © {new Date().getFullYear()} YOYO FUN N FOODS. All Rights Reserved. Designed with ❤️
        </p>
      </div>
    </footer>
  );
}
