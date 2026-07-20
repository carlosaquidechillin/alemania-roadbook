import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        // Fondo oscuro
        ink: {
          DEFAULT: "#0a0e12",
          900: "#0a0e12",
          800: "#121820",
          700: "#1a2129",
          600: "#232d37",
        },
        // Coral (acento principal / CTA)
        coral: {
          300: "#ffa08c",
          400: "#ff8a6d",
          500: "#ff6f57",
          600: "#f2542d",
        },
        // Turquesa (acento secundario / progreso)
        aqua: {
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
        },
      },
      boxShadow: {
        glow: "0 10px 40px -12px rgba(255,111,87,0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
