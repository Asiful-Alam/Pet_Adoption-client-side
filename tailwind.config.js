// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        deepPurple: '#6A0DAD',
        lightPurple: '#D6B0FF',
        magenta: '#FF00FF',
        softWhite: '#FAF9F6',
        darkSlateGray: '#2F4F4F',
        lightGray: '#D3D3D3',
        purpleGradientStart: '#6A0DAD',
        purpleGradientEnd: '#D6B0FF',
      },
      backgroundImage: {
        'purple-gradient': 'linear-gradient(90deg, #6A0DAD 0%, #D6B0FF 100%)',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
