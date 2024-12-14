/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/App.js",
    "./src/components/EditableTable.jsx",
    "./src/components/TaskForm.jsx",
    "./src/components/FilterBar.jsx",
    "./src/components/styles.css",
    "./src/App.css",
    "./src/index.css",
    "./public/index.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};


