import plugin from "tailwindcss/plugin";
import forms from "@tailwindcss/forms";

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#BFC4CD",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
          950: "#030712",
        },
        violet: {
          50: "#F1EEFF",
          100: "#E6E1FF",
          200: "#D2CBFF",
          300: "#B7ACFF",
          400: "#9C8CFF",
          500: "#8470FF",
          600: "#755FF8",
          700: "#5D47DE",
          800: "#4634B1",
          900: "#2F227C",
          950: "#1C1357",
        },
        sky: {
          50: "#E3F3FF",
          100: "#D1ECFF",
          200: "#B6E1FF",
          300: "#A0D7FF",
          400: "#7BC8FF",
          500: "#67BFFF",
          600: "#56B1F3",
          700: "#3193DA",
          800: "#1C71AE",
          900: "#124D79",
          950: "#0B324F",
        },
        black:{
          50:'#333847',
          100:'#2B2F3B',
          200:'#23262F',
          300:'#21232B',
          400:'#1B1C23',
          500:'#121217',
        }
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.5" }],
        sm: ["0.875rem", { lineHeight: "1.5715" }],
        base: ["1rem", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
        lg: ["1.125rem", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
        xl: ["1.25rem", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
        "2xl": ["1.5rem", { lineHeight: "1.33", letterSpacing: "-0.01em" }],
        "3xl": ["1.88rem", { lineHeight: "1.33", letterSpacing: "-0.01em" }],
        "4xl": ["2.25rem", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
        "5xl": ["3rem", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
        "6xl": ["3.75rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
      },
      screens: {
        xs: "480px",
      },
      borderWidth: {
        3: "3px",
      },
      minWidth: {
        36: "9rem",
        44: "11rem",
        56: "14rem",
        60: "15rem",
        72: "18rem",
        80: "20rem",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
      zIndex: {
        60: "60",
      },
    },
  },
  plugins: [
    forms,
    function ({ addBase }) {
      addBase({
        ":root":{
          '--item-secondary-bg-color':'#fff',
        },
        ":root.dark": {
          "--item-bg-color":"#21232B",
          "--item-color-primary":"#9B51F5",
          '--item-secondary-bg-color':'#000',
          "--item-overlay-color":"#21232B",
        },
      });
    },
  ],
};
