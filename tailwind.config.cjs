/* eslint-disable @typescript-eslint/no-var-requires */
//it is what it is
const daisyui = require("daisyui");
const typography = require("@tailwindcss/typography");

/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    fontFamily: {
      'sans': ['Inter', 'system-ui', 'sans-serif'],
    },
    extend: {}
  },

  plugins: [typography, daisyui]
};

module.exports = config;