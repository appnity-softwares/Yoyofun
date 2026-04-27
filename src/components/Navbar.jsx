import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Facebook, Instagram } from "lucide-react";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll effect for sticky/shrink navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-1/2 z-50 w-[90%] max-w-7xl -translate-x-1/2 transition-all duration-500 ${isScrolled ? "top-4" : "top-8"
        }`}
    >
      <div
        className={`
          relative flex items-center justify-between
          rounded-full
          transition-all duration-500
          ${isScrolled
            ? "bg-white/80 py-3 px-6 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/50"
            : "bg-white/40 py-5 px-8 backdrop-blur-xl border border-white/30 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
          }
        `}
      >
        {/* Subtle Gradient Glow (Progressive Glassmorphism) */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/5 to-purple-500/5 pointer-events-none" />

        {/* Logo Section (Dynamic Interaction) */}
        <Link
          to="/"
          className="group relative flex items-center gap-3 transition-transform duration-300 hover:scale-105 active:scale-95"
        >
          <img
            src={logo}
            alt="Amusement Park"
            className="h-10 w-24 object-contain transition-transform duration-500 group-hover:rotate-3"
          />
          <span className="hidden lg:block font-bold tracking-tight text-blue-600">
            YOYO <span className="font-semibold text-gray-800">FUN 'N' FOODS</span>
          </span>
        </Link>

        {/* Desktop Navigation (Active Link Highlighting) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-10 text-[15px] font-medium text-gray-700">
          {[
            { name: "Home", path: "/" },
            { name: "Gallery", path: "/gallery" },
            { name: "Contact", path: "/contact" },
            { name: "FAQ", path: "/faq" },
            { name: "Admin", path: "/admin/login" },
          ].map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => `
                relative transition-colors hover:text-blue-600
                ${isActive ? "text-blue-600 font-bold" : "hover:text-black"}
                after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 
                after:bg-blue-600 after:transition-all after:duration-300
                ${isActive ? "after:w-full" : "hover:after:w-full"}
              `}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Right Section: Socials + CTA + Mobile Toggle */}
        <div className="flex items-center gap-3 lg:gap-5">
          {/* Social Icons (Quick-Links) */}
          <div className="hidden lg:flex items-center gap-4 text-gray-600">
            <a href="#" className="hover:text-[#1877F2] transition-colors"><Facebook size={18} /></a>
            <a href="#" className="hover:text-[#E4405F] transition-colors"><Instagram size={18} /></a>
          </div>

          <div className="h-6 w-[1px] bg-gray-200 hidden lg:block" />

          {/* CTA Button (Interactive Animation) */}
          <Link
            to="/tickets"
            className="
              relative group overflow-hidden
              rounded-full
              bg-blue-600
              px-5 py-2 lg:px-7 lg:py-2.5
              text-sm font-bold text-white
              transition-all duration-300
              hover:bg-blue-700 hover:shadow-lg hover:scale-105
              active:scale-95
            "
          >
            <span className="relative z-10">Book Tickets</span>
            {/* Pulse effect overlay */}
            <span className="absolute inset-0 bg-white/20 scale-0 rounded-full group-hover:animate-ping opacity-0 group-hover:opacity-100 transition-all duration-500" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-800 transition-colors hover:bg-black/5 rounded-full"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu (Animated Hamburger) */}
      <div
        className={`
          absolute top-full left-0 right-0 mt-4 
          overflow-hidden rounded-3xl
          bg-white/95 backdrop-blur-2xl shadow-2xl border border-white/50
          transition-all duration-500 ease-in-out md:hidden
          ${isMenuOpen ? "max-h-[400px] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-4"}
        `}
      >
        <div className="p-6 flex flex-col gap-4">
          <NavLink to="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold py-2 border-b border-gray-100">Home</NavLink>
          <NavLink to="/gallery" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold py-2 border-b border-gray-100">Gallery</NavLink>
          <NavLink to="/contact" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold py-2 border-b border-gray-100">Contact</NavLink>
          <NavLink to="/faq" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold py-2 border-b border-gray-100">FAQ</NavLink>
          <NavLink to="/admin/login" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold py-2 border-b border-gray-100">Admin</NavLink>

          <div className="flex items-center gap-6 pt-2 text-gray-600">
            <a href="#" className="flex items-center gap-2 hover:text-[#1877F2]">
              <Facebook size={20} /> <span className="text-sm">Facebook</span>
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-[#E4405F]">
              <Instagram size={20} /> <span className="text-sm">Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
