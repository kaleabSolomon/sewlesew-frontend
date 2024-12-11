/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      textColor: {
        customTeal: "#13adb7",
        customTealLight: "#45e4ed",
        customTealDark: "#128f96",
      },
      backgroundColor: {
        customTeal: "#13adb7",
        customTealLight: "#37b3ba",
        customTealDark: "#128f96",
      },
      borderColor: {
        customTeal: "#13adb7",
        customTealLight: "#37b3ba",
        customTealDark: "#128f96",
      },
      backgroundImage: {
        heroImg: "url('./src/assets/kenalib-hero.png')",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {},
    },
  },
  plugins: [require("tailwindcss-animate")],
};
