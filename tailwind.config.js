/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "custom-fixture": "minmax(50px, 1fr) 25px 50px 25px minmax(50px, 1fr)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
