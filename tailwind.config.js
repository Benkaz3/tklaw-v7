/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Core palette
        navy: {
          950: "#060B18",
          900: "#0C1222",
          800: "#131D35",
          700: "#1B2A4A",
          600: "#243660",
        },
        gold: {
          DEFAULT: "#C8A951",
          light: "#E8D5A3",
          dark: "#A68B3C",
          muted: "#BDA86E",
        },
        warm: {
          50: "#FDFCFA",
          100: "#FAF8F3",
          200: "#F0EBE0",
          300: "#E2D9C8",
          400: "#C4B89E",
        },
        // Functional
        muted: "#8B8B8B",
        "section-alt": "#F4F2ED",
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        serif: ["Noto Serif", "Georgia", "serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.5rem, 3vw, 2.5rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "display-sm": ["clamp(1.25rem, 2vw, 1.75rem)", { lineHeight: "1.3" }],
      },
      maxWidth: {
        "content": "75rem",
        "narrow": "48rem",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-in": "slideIn 0.5s ease-out forwards",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideIn: {
          from: { opacity: "0", transform: "translateX(-16px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(ellipse at center, var(--tw-gradient-stops))",
        "gradient-hero": "linear-gradient(135deg, #060B18 0%, #1B2A4A 50%, #0C1222 100%)",
        "gradient-gold": "linear-gradient(135deg, #C8A951 0%, #E8D5A3 100%)",
        "gradient-dark": "linear-gradient(180deg, #0C1222 0%, #131D35 100%)",
      },
    },
  },
  plugins: [],
};
