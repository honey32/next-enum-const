import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Windows で Yu Gothic UI になるのが余計なので、デフォルトに戻す。
        sans: ["sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
