/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6", // Azul principal
        background: "#0a0a0a", // Fondo base
        card: "#111111", // Color de tarjetas
      },
    },
  },
  plugins: [],
};

