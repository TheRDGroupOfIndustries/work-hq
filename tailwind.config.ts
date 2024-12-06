import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-sky-blue": "var(--primary-sky-blue)",
        "primary-blue": "var(--primary-blue)",
        "primary-vendor": "var(--primary-vendor)",
        "dark-gray" : 'var(--dark-gray)',
        "dark-blue" : 'var(--dark-blue)',
        "light-gray" : 'var(--light-gray)',
        "primary-green": "#2fff00",
        "vendor-dark" : "var(--vendor-dark)",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        slideUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(100px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        slideDown: {
          "0%": {
            opacity: "0",
            transform: "translateY(-100px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        slideRight: {
          "0%": {
            opacity: "0",
            transform: "translateX(-100px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-in-out",
        "slide-down": "slideDown 0.8s ease-in-out",
        "slide-up": "slideUp 0.8s ease-in-out",
        "slide-right": "slideRight 0.8s ease-in-out",
      },
      dropShadow: {
"neuro-9": "-5px -5px 10px 0 #ffffff,-5px -5px 10px 0 #ffffff, 5px 5px 10px 0 rgba(120, 155, 211, 0.8), inset -5px -5px 20px 0 rgba(255, 255, 255, 0.2), inset 5px 5px 15px 0 rgba(0, 40, 121, 1)",
        "neuro-3": "-3px -3px 10px 0 #ffffff, 3px 3px 10px 0 rgba(120, 155, 211, 0.6)",
      },
      boxShadow: {
        "neuro-9": "-5px -5px 10px 0 #ffffff,-5px -5px 10px 0 #ffffff, 5px 5px 10px 0 rgba(120, 155, 211, 0.8), inset -5px -5px 20px 0 rgba(255, 255, 255, 0.2), inset 5px 5px 15px 0 rgba(0, 40, 121, 1)",
        "neuro-3": "-3px -3px 10px 0 #ffffff, 3px 3px 10px 0 rgba(120, 155, 211, 0.6)",
        "neuro-11": "inset 4px 4px 10px 0 rgba(182, 206,242, 0.6),inset -4px -4px 10px 0 rgba(255, 255,255, 0.3), -4px -4px 10px 0 rgba(255, 255,255, 1), 4px 4px 10px 0 rgba(182, 206,242, 1)",

        "neuro-1" : "var(--neuro-1)",
        "neuro-4" : "var(--neuro-4)",
        "neuro-5" : "var(--neuro-5)",
        // "neuro-9" : "var(--neuro-9)",
        "neuro-8" : "var(--neuro-8)",
        "neuro-10" : "var(--neuro-10)",

        "dark-neuro-1" : "var(--dark-neuro-1)",

        "vendor-neuro-1" : "var(--vendor-neuro-1)",
        "vendor-neuro-2" : "var(--vendor-neuro-2)",
        "vendor-neuro-3" : "var(--vendor-neuro-3)",
        "vendor-neuro-5" : "var(--vendor-neuro-5)",
        "vendor-neuro-6" : "var(--vendor-neuro-6)",
        "vendor-neuro-7" : "var(--vendor-neuro-7)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
export default config;
