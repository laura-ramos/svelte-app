module.exports = {
  content: ['./src/**/*.svelte', './src/**/*.html'],
  theme: {
    extend: {
      width: {
        '640': '40rem',
      }
    },
  },
  plugins: [
    require("daisyui")
  ],
  /*daisyui: {
    themes: ["cupcake", "dark", "cmyk"],
  },*/
}
