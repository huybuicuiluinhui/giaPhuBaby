module.exports = {
  purge: {
    enabled: true,
    content: ["./src/**/*.{js,jsx,ts,tsx,vue}"],
  },
  theme: {
    extend: {
      colors: {
        blue: "#01B2FF",
        main: "#01B2FF",
        textBold: "#df4f5b",
      },
    },
  },
};
