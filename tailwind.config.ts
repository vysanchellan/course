import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#171310",
        parchment: "#F3EEE1",
        parchment2: "#EAE2CE",
        dusk: "#0B0B0D",
        panel: "#151417",
        panelborder: "#28262B",
        gold: "#C9A24B",
        goldsoft: "#DEC17B",
        diffadd: "#3FB97E",
        muteddark: "#8B8981",
      },
      fontFamily: {
        serif: ["Fraunces", "Georgia", "serif"],
        sans: ["Inter", "Arial", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      maxWidth: {
        reader: "42rem",
        "reader-wide": "52rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
