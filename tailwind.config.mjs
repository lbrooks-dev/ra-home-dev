/** @type {import('tailwindcss').Config} */
// Brand tokens are the single source of truth for the Revenue Architects site.
// Never hard-code hex values in pages or components — use these token classes.
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        // Revenue Strategy / CTAs
        orange: {
          100: '#F9E9E3',
          200: '#F3D1C3',
          300: '#ECB7A0',
          400: '#E49A7B',
          500: '#D96F42',
          600: '#B65F3D',
          700: '#925038',
          800: '#6F4033',
          900: '#4B302E',
          DEFAULT: '#D96F42',
        },
        // Revenue Platform / headings & structure
        navy: {
          100: '#DDE1E8',
          200: '#B7BFCD',
          300: '#8F9CB2',
          400: '#627492',
          500: '#1F3864',
          600: '#1D3259',
          700: '#1B2C4E',
          800: '#192743',
          900: '#172137',
          DEFAULT: '#1F3864',
        },
        // Revenue Production / secondary
        teal: {
          100: '#D9EBEC',
          200: '#ADD5D6',
          300: '#80BDC0',
          400: '#4CA3A6',
          500: '#007B80',
          600: '#046970',
          700: '#075760',
          800: '#0B464F',
          900: '#0E343F',
          DEFAULT: '#007B80',
        },
        ink: '#3A3A4A',
        surface: '#FFFFFF',
      },
      fontFamily: {
        sans: [
          '"Plus Jakarta Sans"',
          'Aptos',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'sans-serif',
        ],
      },
      maxWidth: {
        content: '1280px',
        prose: '72ch',
      },
      borderRadius: {
        card: '0.75rem',
      },
      spacing: {
        section: '6rem',
      },
    },
  },
  plugins: [],
};
