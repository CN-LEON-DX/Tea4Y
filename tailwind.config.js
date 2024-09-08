module.exports = {
  content: ["./views/**/*.pug", "./public/**/*.html", "./src/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
