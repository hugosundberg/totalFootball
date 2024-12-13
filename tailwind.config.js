/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "custom-fixture": "minmax(50px, 1fr) 25px 50px 25px minmax(50px, 1fr)",
        "custom-stats": "120px, 200px, 120px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
