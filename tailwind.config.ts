import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        turquoise: {
          DEFAULT: "#2EC4B6",
          50: "#E8FAF8",
          100: "#C5F0EB",
          200: "#9EE5DC",
          300: "#6FD9CC",
          400: "#2EC4B6",
          500: "#25A89C",
          600: "#1D8C82",
          700: "#167068",
          800: "#0F544E",
          900: "#083834",
        },
        seafoam: "#A8E6CF",
        mint: "#98FF98",
        aqua: "#7FDBDA",
        teal: "#008080",
        lagoon: "#006D77",
        peacock: "#005F73",
        petrol: "#003D4D",
        atlantic: "#001F3F",
        abyss: "#0A1628",
        vanilla: "#FDF6E3",
        butter: "#FFF8DC",
        lemon: "#FFF44F",
        daffodil: "#FFD700",
        canary: "#FFEF00",
        honey: "#FFB347",
        ochre: "#CC7722",
        saffron: "#F4C430",
        gold: "#D4AF37",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        persian: ["var(--font-vazirmatn)", "Tahoma", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(46, 196, 182, 0.15)",
        card: "0 2px 12px -2px rgba(10, 22, 40, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
