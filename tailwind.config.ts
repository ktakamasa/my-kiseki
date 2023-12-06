import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#484848",
        secondary: "#B4B4B4",
        tertiary: "#FFE54C",
        accent: "#FFF4B2",
      },
    },
  },
  plugins: [],
};
export default config;
