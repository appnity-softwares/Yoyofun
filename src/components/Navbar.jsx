import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const resortLinks = [
    { name: "Food & Restaurant", path: "/#restaurant" },
    { name: "Suites & Stay", path: "/#suites" },
    { name: "Hall Booking", path: "/#hall-booking" },
  ];

  // Logic to determine if we should show the "solid" version of the navbar
  const showSolidNavbar = isScrolled || !isHomePage;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
        showSolidNavbar 
          ? "bg-white/80 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] py-3" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <img
              src={logo}
              alt="YOYO Fun N Foods"
              className="h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-md"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className={`text-2xl font-black tracking-tighter transition-colors duration-500 ${showSolidNavbar ? "text-blue-600" : "text-white"}`}>YOYO</span>
            <span className={`text-[10px] font-bold uppercase tracking-[0.25em] transition-colors duration-500 ${showSolidNavbar ? "text-slate-400" : "text-white/60"}`}>Fun 'N' Foods</span>
          </div>
        </Link>

        {/* Center: Navigation */}
        <nav className="hidden md:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.15em]">
          <NavLink to="/" className={({ isActive }) => `relative transition-all duration-300 hover:text-blue-500 ${isActive ? "text-blue-600" : (showSolidNavbar ? "text-slate-700" : "text-white/90")} group`}>
            {({ isActive }) => (
              <>
                Home
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full ${isActive ? "w-full" : ""}`} />
              </>
            )}
          </NavLink>
          
          <NavLink to="/gallery" className={({ isActive }) => `relative transition-all duration-300 hover:text-blue-500 ${isActive ? "text-blue-600" : (showSolidNavbar ? "text-slate-700" : "text-white/90")} group`}>
            {({ isActive }) => (
              <>
                Attractions
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full ${isActive ? "w-full" : ""}`} />
              </>
            )}
          </NavLink>

          {/* Resort Dropdown */}
          <div 
            className="relative group"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className={`flex items-center gap-1.5 transition-all duration-300 hover:text-blue-500 ${showSolidNavbar ? "text-slate-700" : "text-white/90"}`}>
              Resort <ChevronDown size={14} className={`transition-transform duration-500 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <div className={`absolute top-full -left-4 w-60 bg-white/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-3xl border border-white/20 py-4 mt-2 transition-all duration-500 ${isDropdownOpen ? 'opacity-100 visible translate-y-0 scale-100' : 'opacity-0 invisible translate-y-4 scale-95'}`}>
              <div className="absolute top-0 left-8 -translate-y-full border-8 border-transparent border-b-white/95" />
              {resortLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  className="block px-6 py-3 text-[10px] font-black tracking-widest text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <NavLink to="/tickets" className={({ isActive }) => `relative transition-all duration-300 hover:text-blue-500 ${isActive ? "text-blue-600" : (showSolidNavbar ? "text-slate-700" : "text-white/90")} group`}>
            {({ isActive }) => (
              <>
                Pricing
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full ${isActive ? "w-full" : ""}`} />
              </>
            )}
          </NavLink>

          <NavLink to="/contact" className={({ isActive }) => `relative transition-all duration-300 hover:text-blue-500 ${isActive ? "text-blue-600" : (showSolidNavbar ? "text-slate-700" : "text-white/90")} group`}>
            {({ isActive }) => (
              <>
                Contact
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full ${isActive ? "w-full" : ""}`} />
              </>
            )}
          </NavLink>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-6">
          <a
            href="tel:+919752586956"
            className={`hidden lg:flex items-center justify-center w-11 h-11 rounded-2xl transition-all duration-500 ${showSolidNavbar ? "bg-slate-100 text-slate-600 hover:bg-blue-600 hover:text-white" : "bg-white/10 text-white hover:bg-white hover:text-blue-600 border border-white/10"}`}
            title="Call Us"
          >
            <Phone size={18} />
          </a>

          <Link
            to="/tickets"
            className="group relative bg-blue-600 text-white px-8 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/40 transition-all active:scale-95 overflow-hidden"
          >
            <span className="relative z-10">Book Now</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 transition-colors duration-500 ${showSolidNavbar || isMenuOpen ? "text-slate-900" : "text-white"}`}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-0 left-0 right-0 h-screen bg-white transition-all duration-700 ease-in-out md:hidden ${
          isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="pt-24 pb-12 px-8 flex flex-col h-full overflow-y-auto">
          <div className="flex flex-col gap-8 text-left">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-4xl font-black text-slate-900 tracking-tighter">Home</Link>
            <Link to="/gallery" onClick={() => setIsMenuOpen(false)} className="text-4xl font-black text-slate-900 tracking-tighter">Attractions</Link>
            
            <div className="flex flex-col gap-4">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 border-b border-blue-50 pb-2">Resort Services</p>
              {resortLinks.map((link) => (
                <a key={link.name} href={link.path} onClick={() => setIsMenuOpen(false)} className="text-2xl font-black text-slate-700 tracking-tight">{link.name}</a>
              ))}
            </div>
            
            <Link to="/tickets" onClick={() => setIsMenuOpen(false)} className="text-4xl font-black text-slate-900 tracking-tighter">Pricing</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-4xl font-black text-slate-900 tracking-tighter">Contact</Link>
          </div>

          <div className="mt-auto pt-10 border-t border-slate-100 flex flex-col gap-6">
            <a href="tel:+919752586956" className="flex items-center gap-4 text-blue-600">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                <Phone size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Support</span>
                <span className="text-xl font-black">+91 97525 86956</span>
              </div>
            </a>
            
            <Link
              to="/tickets"
              onClick={() => setIsMenuOpen(false)}
              className="w-full bg-blue-600 text-white py-6 rounded-3xl text-center text-sm font-black uppercase tracking-[0.25em] shadow-2xl shadow-blue-600/30"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
