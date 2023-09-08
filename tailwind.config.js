/** @type {import('https://esm.sh/tailwindcss@3.3.2').Config} */

module.exports = {
  content: [
    "./components/**/*.{tsx,ts}",
    "./islands/**/*.{tsx,ts}",
    "./routes/**/*.{tsx,ts}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
    },
  },

  // daisy UI config
  daisyui: {
    styled: true,
    themes: ["light"],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "light",
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
