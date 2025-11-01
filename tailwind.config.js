/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#43008a",
          dark: "#320066",
          light: "#5a00b3",
        },
        background: {
          light: "#f7f5f8",
          dark: "#190f23",
        },
        card: {
          light: "#FFFFFF",
          dark: "#2a1f38",
        },
        text: {
          light: "#140c1d",
          dark: "#f0e7f9",
          muted: {
            light: "#7145a1",
            dark: "#b08ccf",
          },
        },
        border: {
          light: "#dbcdea",
          dark: "#4a3b5a",
        },
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
      },
      boxShadow: {
        soft: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)",
        card: "0 4px 12px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
