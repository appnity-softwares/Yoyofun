/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      /* =========================
         FONTS
      ========================= */
      fontFamily: {
        heading: ["'Baloo 2'", "cursive"],
        body: ["Inter", "sans-serif"],
      },

      /* =========================
         KEYFRAMES
      ========================= */
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        popIn: {
          "0%": { opacity: "0", transform: "scale(0.85)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        marquee: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },

      /* =========================
         ANIMATIONS
      ========================= */
      animation: {
        fadeIn: "fadeIn 0.8s ease-in-out forwards",
        fadeUp: "fadeUp 0.9s ease-out forwards",
        popIn: "popIn 0.7s ease-out forwards",
        marquee: "marquee 30s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
// Brand text one-by-one animation


