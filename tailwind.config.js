// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

module.exports = {
  theme: {
    extend: {
      boxShadow: {
        outline: "0 0 0 1px rgba(66, 153, 225, 0.5)",
      },
      colors: {
        "orange-button": "#FF872E",
        "green-button": "#1ABC9C",
        "purple-hover": "#4C52F8",
        "purple-hover-stroke": "#8286FF",
        "purple-progress": "#3B41E3",
      },
      borderRadius: {
        20: "20px",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  content: {
    files: [
      // all directories and extensions will correspond to your Nuxt config
      "{srcDir}/components/**/*.{vue,js,jsx,mjs,ts,tsx}",
      "{srcDir}/layouts/**/*.{vue,js,jsx,mjs,ts,tsx}",
      "{srcDir}/pages/**/*.{vue,js,jsx,mjs,ts,tsx}",
      "{srcDir}/plugins/**/*.{js,ts,mjs}",
      "{srcDir}/composables/**/*.{js,ts,mjs}",
      "{srcDir}/utils/**/*.{js,ts,mjs}",
      "{srcDir}/{A,a}pp.{vue,js,jsx,mjs,ts,tsx}",
      "{srcDir}/{E,e}rror.{vue,js,jsx,mjs,ts,tsx}",
      "{srcDir}/app.config.{js,ts,mjs}",
      "{srcDir}/app/spa-loading-template.html",
    ],
  },
  plugins: [],
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: [
      "./src/**/*.html",
      "./src/**/*.vue",
      "./src/**/*.jsx",
      "./src/**/*.js",
      "./src/**/*.ts",
      "./src/**/*.tsx",
    ],
  },
};
