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
      'sans': ['Inter', 'system-ui', 'sans-serif', "FontAwesome"],
    },
    extend: {}
  },
  daisyui: {
    themes: [{
      dark: {
        //Based on the VSCode Moonlight II theme.
        ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
        primary: wavebreakerBrandColor,
        neutral: "#212337",
        "base-100": "#1E2030",
        "base-200": "#191A2A",
        "base-300": "#131421",
        "base-content": "#C8D3F5",
        "warning": "#FFC777",
        "error": "#FF5370"
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