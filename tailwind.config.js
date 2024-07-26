/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(31, 41, 55)",
        secondary: "rgb(17, 24, 39)",
        text: "rgb(107, 114, 128)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
