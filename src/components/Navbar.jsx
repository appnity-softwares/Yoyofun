import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown, MapPin, Clock, ArrowRight } from "lucide-react";
import logo from "../assets/logo.png";
import TopTicker from "./TopTicker";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Hide WhatsApp button when mobile menu is open to prevent collision
    const whatsappBtn = document.querySelector('.floating-whatsapp');
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      if (whatsappBtn) whatsappBtn.style.opacity = '0';
    } else {
      document.body.style.overflow = 'unset';
      if (whatsappBtn) whatsappBtn.style.opacity = '1';
    }
  }, [isMenuOpen]);

  const resortLinks = [
    { name: "Food & Restaurant", path: "/#restaurant" },
    { name: "Suites & Stay", path: "/#suites" },
    { name: "Hall Booking", path: "/#hall-booking" },
  ];

  const showSolidNavbar = isScrolled || !isHomePage;

  const navLinkClass = ({ isActive }) => `
    relative py-2 text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300
    ${isActive ? "text-blue-600" : (showSolidNavbar ? "text-slate-700" : "text-white/90")}
    hover:text-blue-500 group
  `;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-700 ${
          showSolidNavbar 
            ? "bg-white/95 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)]" 
            : "bg-transparent"
        }`}
      >
        {/* Top Ticker Integrated Here to Prevent Collision */}
        {!isScrolled && isHomePage && <TopTicker />}

        {/* Upper Info Bar (Desktop Only) */}
        {!isScrolled && isHomePage && (
          <div className="hidden lg:block border-b border-white/10 py-3">
            <div className="mx-auto max-w-7xl px-8 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/60">
              <div className="flex gap-8">
                <span className="flex items-center gap-2"><MapPin size={12} className="text-blue-400" /> Madhya Pradesh, India</span>
                <span className="flex items-center gap-2"><Clock size={12} className="text-blue-400" /> Open Today: 10:00 AM - 06:00 PM</span>
              </div>
              <div className="flex gap-6">
                <Link to="/contact" className="hover:text-white transition-colors">Support</Link>
                <Link to="/gallery" className="hover:text-white transition-colors">Park Map</Link>
              </div>
            </div>
          </div>
        )}

        <div className={`mx-auto max-w-7xl px-4 lg:px-8 flex items-center justify-between transition-all duration-500 ${showSolidNavbar ? "h-16 lg:h-20" : "h-20 lg:h-24"}`}>
          {/* Left: Logo Section */}
          <Link to="/" className="flex items-center gap-2 lg:gap-4 group shrink-0">
            <div className="relative p-1">
              <div className="absolute inset-0 bg-blue-500/10 rounded-2xl blur-xl group-hover:bg-blue-500/20 transition-all duration-500" />
              <img
                src={logo}
                alt="YOYO Fun N Foods"
                className="h-8 lg:h-14 w-auto object-contain relative z-10 transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className={`text-lg lg:text-3xl font-black tracking-tighter transition-colors duration-500 ${showSolidNavbar ? "text-blue-600" : "text-white"}`}>
                YOYO
              </span>
              <span className={`text-[7px] lg:text-[10px] font-black uppercase tracking-[0.2em] lg:tracking-[0.3em] transition-colors duration-500 ${showSolidNavbar ? "text-slate-400" : "text-white/60"}`}>
                Fun 'N' Foods
              </span>
            </div>
          </Link>

          {/* Center: Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {[
              { name: "Home", path: "/" },
              { name: "Attractions", path: "/gallery" },
              { name: "Pricing", path: "/tickets" },
              { name: "Contact", path: "/contact" },
            ].map((link) => (
              <NavLink key={link.name} to={link.path} className={navLinkClass}>
                {({ isActive }) => (
                  <>
                    {link.name}
                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-blue-600 rounded-full transition-all duration-500 group-hover:w-full ${isActive ? "w-full" : "opacity-0 group-hover:opacity-100"}`} />
                  </>
                )}
              </NavLink>
            ))}

            <div 
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className={`flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 ${showSolidNavbar ? "text-slate-700" : "text-white/90"} hover:text-blue-600`}>
                Resort <ChevronDown size={14} className={`transition-transform duration-500 ${isDropdownOpen ? 'rotate-180 text-blue-600' : ''}`} />
              </button>
              
              <div className={`absolute top-full -left-8 w-64 bg-white shadow-[0_30px_90px_rgba(0,0,0,0.15)] rounded-[2.5rem] border border-slate-100 py-4 mt-4 transition-all duration-500 ${isDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'}`}>
                <div className="absolute top-0 left-12 -translate-y-full border-8 border-transparent border-b-white" />
                {resortLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.path}
                    className="group flex items-center justify-between px-6 py-4 text-[11px] font-black uppercase tracking-widest text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 transition-all"
                  >
                    {link.name}
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 scale-0 group-hover:scale-100 transition-transform duration-300" />
                  </a>
                ))}
              </div>
            </div>
          </nav>

          {/* Right: Action Area */}
          <div className="flex items-center gap-2 lg:gap-8">
            <a
              href="tel:+919752586956"
              className={`hidden md:flex items-center gap-3 px-4 py-2.5 rounded-2xl transition-all duration-500 ${
                showSolidNavbar 
                  ? "bg-slate-50 text-slate-700 hover:bg-blue-600 hover:text-white shadow-sm" 
                  : "bg-white/10 text-white hover:bg-white hover:text-blue-600 backdrop-blur-md"
              }`}
            >
              <Phone size={14} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest hidden xl:block">+91 97525 86956</span>
            </a>

            <Link
              to="/tickets"
              className="group relative bg-blue-600 text-white px-4 lg:px-10 py-2.5 lg:py-4 rounded-xl lg:rounded-2xl text-[9px] lg:text-[11px] font-black uppercase tracking-[0.15em] lg:tracking-[0.2em] shadow-[0_15px_30px_rgba(37,99,235,0.3)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.4)] hover:-translate-y-0.5 transition-all active:scale-95 overflow-hidden whitespace-nowrap"
            >
              <span className="relative z-10">Book Tickets</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
            </Link>

            <button
              onClick={() => setIsMenuOpen(true)}
              className={`p-2.5 lg:p-3 rounded-xl lg:rounded-2xl transition-all duration-500 ${
                showSolidNavbar ? "bg-slate-100 text-slate-900" : "bg-white/10 text-white backdrop-blur-md"
              }`}
            >
              <Menu size={20} className="lg:size-6" />
            </button>
          </div>
        </div>

        {/* Modern Full-Screen Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 z-[200] bg-white/95 backdrop-blur-3xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] lg:hidden ${
            isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
          }`}
        >
          {/* Decorative Gradient Blurs */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute top-1/2 -right-24 w-80 h-80 bg-cyan-600/5 rounded-full blur-[100px]" />

          {/* Mobile Header */}
          <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center border-b border-slate-100/50 relative z-10">
            <div className="flex items-center gap-3">
              <img src={logo} className="h-10 w-auto" alt="Logo" />
              <span className="text-2xl font-black tracking-tighter text-blue-600">YOYO</span>
            </div>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 active:scale-90 transition-all shadow-sm"
            >
              <X size={24} />
            </button>
          </div>

          <div className="h-full flex flex-col px-8 pt-24 pb-10 overflow-y-auto relative z-10">
            <div className="space-y-6">
              {[
                { name: "Home", path: "/" },
                { name: "Attractions", path: "/gallery" },
                { name: "Pricing", path: "/tickets" },
                { name: "Contact", path: "/contact" },
              ].map((link, i) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-5xl font-black text-slate-900 tracking-tight hover:text-blue-600 transition-all"
                  style={{ 
                    transitionDelay: `${i * 75}ms`,
                    transform: isMenuOpen ? 'translateX(0)' : 'translateX(30px)',
                    opacity: isMenuOpen ? 1 : 0
                  }}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-8 space-y-5">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600/70 border-b border-slate-100 pb-2">Exclusive Services</p>
                <div className="grid grid-cols-1 gap-4">
                  {resortLinks.map((link, i) => (
                    <a
                      key={link.name}
                      href={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="group flex items-center justify-between text-2xl font-black text-slate-500 tracking-tight hover:text-slate-900 transition-all"
                      style={{ 
                        transitionDelay: `${(i + 4) * 75}ms`,
                        transform: isMenuOpen ? 'translateX(0)' : 'translateX(30px)',
                        opacity: isMenuOpen ? 1 : 0
                      }}
                    >
                      {link.name}
                      <ArrowRight size={20} className="text-blue-600 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-auto space-y-6">
              <div className="grid grid-cols-2 gap-3">
                <a href="tel:+919752586956" className="bg-slate-50 p-5 rounded-[2rem] flex flex-col gap-2">
                  <Phone className="text-blue-600" size={18} />
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Call Us</span>
                  <span className="font-bold text-slate-900 text-sm">Contact</span>
                </a>
                <div className="bg-slate-50 p-5 rounded-[2rem] flex flex-col gap-2">
                  <MapPin className="text-blue-600" size={18} />
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Visit Us</span>
                  <span className="font-bold text-slate-900 text-sm">Map</span>
                </div>
              </div>
              
              <Link
                to="/tickets"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full bg-blue-600 text-white py-5 rounded-3xl text-center text-[12px] font-black uppercase tracking-[0.25em] shadow-2xl shadow-blue-600/30 active:scale-[0.98] transition-all"
              >
                Get Tickets Now
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
