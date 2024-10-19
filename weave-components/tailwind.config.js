/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        fill: "-webkit-fill-available",
      },
      height: {
        fill: "-webkit-fill-available",
      },
      colors: {
        primary: {
          red: "#E1251B",
          black: "#212121",
          white: "#FFFFFF",
          pink: "#FBCFC8",
        },
        secondary: {
          brown: "#521207",
          rose: "#FDE8E5",
          coral: "#F58E7D",
          orange: "#FDD1B0",
          gold: "#FFC709",
          cream: "#FFF0D8",
          green: "#144B2D",
          sage: "#C6DCD8",
          blue: "#0F3A85",
          azure: "#99BFE5",
          grey: "#8A969E",
          stone: "#E4EBF1",
        },
        tint: {
          rose: "#FFF9F9",
          cream: "#FFFAF2",
          stone: "#F9FBFC",
          sage: "#F7FFFC",
        },
      },
      screens: {
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideOut: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        slideIn: "slideIn 0.5s ease-out forwards",
        slideOut: "slideOut 0.5s ease-in forwards",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          /* Hide scrollbar for Chrome, Safari and Opera */
          "&::-webkit-scrollbar": {
            display: "none",
          },
          /* Hide scrollbar for IE, Edge and Firefox */
          "-ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
        },
      });
    },
  ],
};

