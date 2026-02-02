import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <header className="fixed top-6 left-1/2 z-50 w-[90%] max-w-7xl -translate-x-1/2">
      <div
        className="
          flex items-center justify-between
          rounded-full
          bg-white/30
          px-8 py-4
          backdrop-blur-xl
          border border-white/30
          shadow-[0_8px_30px_rgb(0,0,0,0.12)]
        "
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Amusement Park"
            className="h-12 w-28 object-contain"
          />
          <span className="font-bold tracking-wide text-blue-500">
            YOYO <span className="font-semibold text-gray-800">FUN 'N' FOODS</span>
          </span>
        </div>

        {/* Menu */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-800">
          <a className="text-white-500" href="#">Home</a>
          <a className="hover:text-black transition" href="#">About</a>
          <a className="hover:text-black transition" href="#">Services</a>
          <a className="hover:text-black transition" href="#">Gallery</a>
          {/* <a className="hover:text-black transition" href="#">Blog</a>
          <a className="hover:text-black transition" href="#">Contact</a> */}
        </nav>

        {/* CTA */}
        <button
          className="
            rounded-full
            bg-black/80
            px-6 py-2
            text-sm font-semibold text-white
            backdrop-blur-md
            transition
            hover:bg-black
          "
        >
          Contact Us
        </button>
      </div>
    </header>
  );
}
