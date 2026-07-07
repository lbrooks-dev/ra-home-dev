/** @type {import('tailwindcss').Config} */
// Brand tokens are the single source of truth for the Revenue Architects site.
// Never hard-code hex values in pages or components — use these token classes.
// Colors below are the FINALIZED Palette Works values (2026-07-07), generated
// by running ra-palette_paletteworks.json through the tool's own color engine.
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        // Revenue Strategy / CTAs — finalized RA orange (Palette Works "Brand1", base #c23a00)
        orange: {
          100: '#ffe5dd',
          200: '#fcb9a4',
          300: '#ea9176',
          400: '#d76847',
          500: '#c23a00',
          600: '#992d01',
          700: '#732002',
          800: '#4e1302',
          900: '#2d0700',
          DEFAULT: '#c23a00',
        },
        // Revenue Platform / headings & structure — Palette Works "Brand2" ramp (base #2a5194).
        // DEFAULT is set to the palette's heading/contrast navy (#1f3a63) so `text-navy`
        // headings match the palette; lighter/darker steps come from the Brand2 ramp.
        navy: {
          100: '#e8f1ff',
          200: '#b2c8eb',
          300: '#839fce',
          400: '#5678b1',
          500: '#2a5194',
          600: '#244784',
          700: '#1e3e75',
          800: '#193566',
          900: '#132c57',
          DEFAULT: '#1f3a63',
        },
        // Revenue Production / secondary — Palette Works "Brand3" ramp (base #129aa1).
        // Note: teal-600 (#057176) is ~the old site teal; eyebrows use teal-600.
        teal: {
          100: '#e6feff',
          200: '#b7e5e8',
          300: '#8bccd0',
          400: '#5bb3b8',
          500: '#129aa1',
          600: '#057176',
          700: '#094a4d',
          800: '#022628',
          900: '#000808',
          DEFAULT: '#129aa1',
        },
        ink: '#3a3a4a',
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
