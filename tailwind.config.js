/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "azul-standart": "#005ca9",
        "laranja-standart": "#f39200",
        "cinza-standart": "#d0e0e3",
        "amarelo-standart": "#ffd000",
      },
      backgroundImage: {
        casalCarro: "url('/imagem-carro-2.jpg')",
        familiaCarro: "url('/imagem-carro-1.jpg')",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
  ],
};
