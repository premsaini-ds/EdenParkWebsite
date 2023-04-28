const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./node_modules/@yext/search-ui-react/**/*.{js,ts,jsx,tsx}", // New
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    screens: {
      xs: "576px",
      sm: "640px",
      md: "767px",
      lg: "1025px",
      xl: "1280px",
      "2xl": "1536px",
    },
    colors: {
      transparent: "transparent",
      white: "#ffffff",
      offWhite: "#B8B9BA",
      black: "#000000",
      lightBlack: "#333333",
      grey: "#F6F4F4",
      borderGray: "#E6E5E5",
      textGray: "#808080",
      footerTextGray: "#5F5F5F",
      footerStripGray: "#F8F8F8",
      golden: "#CBB081",
      lightWhite: "#FBF9F9",
      red: "red",
      green: "#2E5538",
      cookieConsentText: "#696969"
    },
    fontFamily: {
      fontPrimary: ['"Apercu Pro", Georgia, sans-serif'],
      saintGermain: ['"Diptyque Saint-Germain", Georgia, sans-serif'],
      fontCalluna: ['"Calluna", Georgia, sans-serif'],
      fontIcomoon: ['"icomoon-diptyque", Georgia, sans-serif'],
      fontLumaIcons: ['"luma-icons", Georgia, sans-serif'],
      raleway: ["Georgia, Arial, sans-serif"],
      bebas_neue: ["Georgia, Arial, sans-serif"],
    },
    extend: {
      backgroundImage: {
        plus: "url('images/plus.svg')",
        minus: "url('images/minus.svg')",
        filter: "url('images/Filters.svg')",
        checkmark: "url('images/checkmark.svg')",
        arrowUpwards: "url('images/ArrowUpwards.svg')",
        sliderArrow: "url('images/slider-arrow.svg')",
        arrowSliderMobile: "url('images/arrowSliderMobile.svg')",
        navToggle: "url('images/nav-toggle.png')",
        navClose: "url('images/menu-close.png')",
        locationMarkerOnMobile: "url('images/location-marker.png')",
        arrowSwitcher: "url('images/arrow-switcher.png')",
      },
      cursor: {
        'ArrowLeft': 'url(Contextual.png), pointer',
        'ArrowRight': 'url(Contextual.png), pointer',
      }
    },
  },
  plugins: [],
};
