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

const WhatsAppLogo = ({ size = 20 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.891 11.892-11.891 3.181 0 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.481 8.414 0 6.556-5.332 11.892-11.893 11.892-1.99 0-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.591 5.457 0 9.894-4.437 9.894-9.893 0-2.642-1.029-5.125-2.897-6.993-1.868-1.869-4.35-2.898-6.993-2.898-5.457 0-9.894 4.437-9.894 9.894 0 2.235.614 3.911 1.72 5.805l-1.11 4.053 4.223-1.106c1.332.812 2.723 1.293 4.153 1.293h.001zm11.233-1.43c-.242-.12-.141-.429-.484-.6s-2.046-1.006-2.363-1.123-.544-.177-.771.163-.878 1.102-1.077 1.331-.399.256-.812.057c-.413-.199-1.742-.643-3.32-2.051-1.228-1.096-2.058-2.45-2.299-2.863-.242-.413-.026-.637.174-.835.18-.178.413-.485.62-.727.206-.242.275-.413.413-.687.138-.275.069-.515-.034-.727-.104-.212-.878-2.115-1.203-2.898-.316-.762-.642-.659-.878-.671l-.746-.013c-.256 0-.672.096-1.025.485-.353.388-1.345 1.316-1.345 3.208 0 1.893 1.378 3.719 1.572 3.978.194.259 2.712 4.143 6.571 5.806.917.395 1.635.631 2.193.809.921.293 1.76.252 2.423.153.739-.11 2.274-.929 2.593-1.826.319-.896.319-1.662.224-1.826-.095-.164-.351-.263-.593-.383z" />
  </svg>
);

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
            Central India's favorite waterpark. Experience thrilling rides, massive wave pools, and the perfect family getaway.
          </p>
          <div className="flex flex-col gap-4 items-start pt-2">
            <Link
              to="/tickets"
              className="inline-block rounded-full bg-blue-600 px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 transition-all duration-300 active:scale-95"
            >
              Plan Your Visit
            </Link>
            <a href="https://wa.me/919752586956?text=Hi%20YOYO%2C%20I%20want%20to%20book%20tickets" target="_blank" rel="noopener noreferrer" className="text-sm font-black text-[#25D366] hover:text-white transition-all flex items-center gap-2 group">
              <span className="bg-[#25D366]/20 rounded-full p-2 group-hover:scale-110 transition-transform">
                <WhatsAppLogo size={18} />
              </span> 
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* NAVIGATION */}
        <div>
          <h4 className="mb-8 text-lg font-bold text-white">Resort Services</h4>
          <ul className="space-y-4 text-[15px] font-medium text-gray-400">
            <li><a href="/#restaurant" className="hover:text-blue-400 transition-colors">Food & Restaurant</a></li>
            <li><a href="/#suites" className="hover:text-blue-400 transition-colors">Suites & Stay</a></li>
            <li><a href="/#hall-booking" className="hover:text-blue-400 transition-colors">Banquet & Halls</a></li>
            <li><Link to="/gallery" className="hover:text-blue-400 transition-colors">Waterpark Rides</Link></li>
            <li><Link to="/tickets" className="hover:text-blue-400 transition-colors">Ticket Pricing</Link></li>
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
              <span className="p-2 bg-white/5 rounded-lg text-lg">📞</span>
              {phoneNumbers[0]}
            </p>
            <p className="flex items-center gap-3">
              <span className="p-2 bg-white/5 rounded-lg text-lg">✉️</span>
              {settings?.contact_email || "hello@yoyofun.com"}
            </p>
            <p className="flex items-center gap-3 leading-relaxed">
              <span className="p-2 bg-white/5 rounded-lg text-xl">📍</span>
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
