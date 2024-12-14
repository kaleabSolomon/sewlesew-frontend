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
      boxShadow: {
        "3xl":
          "0 -10px 20px rgba(19, 173, 183, 0.2), 10px 0 30px rgba(19, 173, 183, 0.2), 0 10px 200px rgba(19, 173, 183, 0.2)",
      },
      backgroundImage: {
        heroImg: "url('./src/assets/kenalib-hero.png')",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        customTeal: "#13adb7",
        customTealLight: "#37b3ba",
        customTealDark: "#128f96",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
