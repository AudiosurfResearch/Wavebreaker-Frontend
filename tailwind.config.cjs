/* eslint-disable @typescript-eslint/no-var-requires */
//it is what it is
const daisyui = require("daisyui");
const typography = require("@tailwindcss/typography");

const wavebreakerBrandColor = "#009EFF";

/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    fontFamily: {
      'sans': ['Inter', 'system-ui', 'sans-serif'],
    },
    extend: {}
  },
  daisyui: {
    themes: [{
      dark: {
        ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
        primary: wavebreakerBrandColor,
        neutral: "#212337",
        "base-100": "#1B1E2B",
        "base-content": "#c8d3f5"
      },
    },
    {
      light: {
        ...require("daisyui/src/colors/themes")["[data-theme=light]"],
        primary: wavebreakerBrandColor,
        "base-content": "#000000"
      },
    },
    ],
  },
  plugins: [typography, daisyui]
};

module.exports = config;