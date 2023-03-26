/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    extend: {
      fontFamily: {
        'default': ['"JetBrains Mono"', 'sans-serif']
      }
    }
  },
  plugins: [],
}
