import type { Config } from "tailwindcss"
import defaultConfig from "shadcn/ui/tailwind.config"

const config = {
  ...defaultConfig,
  content: [...defaultConfig.content, "./pages/**/*.{ts,tsx,jsx}", "./src/**/*.{ts,tsx,jsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    ...defaultConfig.theme,
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      ...defaultConfig.theme.extend,
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"], // Prioritize Inter, then system sans-serif
        mono: ["Fira Code", "monospace"], // Good for tech vibes
      },
      colors: {
        ...defaultConfig.theme.extend.colors,
        // Base dark theme colors
        "dark-primary": "#0A0A0A", // Very dark background
        "dark-secondary": "#1A1A1A", // Slightly lighter dark for elements
        "dark-card": "#1F1F1F", // Card background
        "dark-border": "#333333", // Subtle border color
        "dark-input": "#121212", // Input background
        "dark-hover": "#2A2A2A", // Hover state for dark elements

        // Neon accent colors
        "neon-blue": "#00F0FF", // Bright electric blue
        "neon-purple": "#A020F0", // Bright electric purple
        "neon-green": "#39FF14", // Bright electric green
        "neon-red": "#FF073A", // Bright electric red for errors

        // Existing colors, adjusted or kept for reference
        grey: "#6B7280",
        dark: "#1F2937", // This will be less used now
      },
      boxShadow: {
        ...defaultConfig.theme.extend.boxShadow,
        "neon-blue": "0 0 15px rgba(0, 240, 255, 0.5), 0 0 30px rgba(0, 240, 255, 0.2)",
        "neon-blue-md": "0 4px 10px rgba(0, 240, 255, 0.3)",
        "neon-green": "0 0 15px rgba(57, 255, 20, 0.5), 0 0 30px rgba(57, 255, 20, 0.2)",
        "neon-red": "0 0 15px rgba(255, 7, 58, 0.5), 0 0 30px rgba(255, 7, 58, 0.2)",
        inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.6)", // Darker inner shadow
      },
      keyframes: {
        ...defaultConfig.theme.extend.keyframes,
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        ...defaultConfig.theme.extend.animation,
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      maxWidth: {
        ...defaultConfig.theme.extend.maxWidth,
        custom_1: "1200px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [...defaultConfig.plugins, require("tailwindcss-animate")],
} satisfies Config

export default config
