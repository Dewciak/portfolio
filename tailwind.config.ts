import type {Config} from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        MylightGray: "#b0adac",
        ForegroundColor: "var(--Foreground-Color)",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        rockSalt: ['"Rock Salt"', "cursive"],
      },
    },
  },
  plugins: [],
} satisfies Config;
