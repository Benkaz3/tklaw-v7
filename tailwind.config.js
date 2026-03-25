/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        text: "#080909", // shade of black
        background: "#f6f7f9", // tinted white/grey
        primary: "#3E4F7A", // muted blue - logo
        secondary: "#94a9df", // tinted blue
        accent: "#668ae5", // shaded blue
        shaded_accent: "#95AADF",
        card_background: "#EEEFF2", // shaded pink/purple
        section_background: "#E4E9F3", // shaded light grey/blue
        highlight_card_background: "#D5D9E1", // darker light grey/blue

        muted: "#7f7f7f", // Muted gray for less important text
        buttonBg: "#3E4F7A", // Muted dark red for button background
        navLinkAccent: "#be000c", // brighter red accent for navbar links
        secondaryButtonBg: "#535353", // Gray for secondary button background
        photoBg: "#D9D9D9", // light grey for headshot background
        whyUsBg: "#464646",
        linkActive: "#d1beb0",
        linkHover: "#a89485",
      },

      fontFamily: {
        primary: ["Noto Serif", "serif"],
        secondary: ["Georgia", "serif"],
        logo: ["Georgia", "serif"],
      },
      fontSize: {
        xs:   "0.694rem",
        sm:   "0.833rem",
        base: "1rem",
        lg:   "1.2rem",
        xl:   "1.44rem",
        "2xl":  "1.728rem",
        "3xl":  "2.074rem",
      },
      borderRadius: {
        sm: "0.3125rem", // 5px
      },
      maxWidth: {
        "container-desktop": "75rem", // 1200px
        "container-tablet": "60rem", // 960px
      },
      spacing: {
        "section-margin": "2.5rem", // 40px
        "card-padding": "1.25rem", // 20px
        "button-padding": "0.625rem", // 10px
      },
      backgroundImage: {
        "linear-primary-secondary": "linear-gradient(#3e4f7a, #95aadf)",
        "linear-primary-accent": "linear-gradient(#3e4f7a, #668ae5)",
        "linear-secondary-accent": "linear-gradient(#95aadf, #668ae5)",
        "radial-primary-secondary": "radial-gradient(#3e4f7a, #95aadf)",
        "radial-primary-accent": "radial-gradient(#3e4f7a, #668ae5)",
        "radial-secondary-accent": "radial-gradient(#95aadf, #668ae5)",
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
