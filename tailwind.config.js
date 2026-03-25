/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#080909",
        background: "#f6f7f9",
        primary: "#3E4F7A",
        secondary: "#94a9df",
        accent: "#668ae5",
        "shaded-accent": "#95AADF",
        "card-bg": "#EEEFF2",
        "section-bg": "#E4E9F3",
        "highlight-card-bg": "#D5D9E1",
        muted: "#7f7f7f",
        "photo-bg": "#D9D9D9",
      },
      fontFamily: {
        primary: ["Noto Serif", "serif"],
        secondary: ["Georgia", "serif"],
      },
      fontSize: {
        xs: "0.694rem",
        sm: "0.833rem",
        base: "1rem",
        lg: "1.2rem",
        xl: "1.44rem",
        "2xl": "1.728rem",
        "3xl": "2.074rem",
      },
      maxWidth: {
        "container-desktop": "75rem",
        "container-tablet": "60rem",
      },
      animation: {
        bounce: "bounce 0.6s infinite alternate",
        "bounce-200": "bounce 0.6s infinite 0.2s alternate",
        "bounce-400": "bounce 0.6s infinite 0.4s alternate",
      },
    },
  },
  plugins: [],
};
