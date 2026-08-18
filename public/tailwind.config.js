/** @type {import('tailwindcss').Config} */

/*  SMG CMMS — design tokens
 *
 *  Drop-in replacement for tailwind.config.js.
 *
 *  The palette below REDEFINES Tailwind's built-in `blue`, `gray` and `slate`
 *  scales. Every existing utility in the app — bg-gray-50, text-blue-600,
 *  border-gray-200 and so on — repoints to these values automatically.
 *  No component changes are required for the palette to take effect.
 *
 *  Colours:
 *    blue-*   = SMG "Sky" accent. Interface fills, links, focus, selection.
 *    brand-*  = SMG logo blue (#0080ea). Logo mark and primary actions only.
 *    gray-* / slate-* = cool blue-biased neutrals that sit correctly under
 *               translucent panels. A pure grey reads muddy behind glass.
 */

const sky = {
  50: '#f2f9fe',
  100: '#dceffb',   // SMG Sky 1
  200: '#c3e5f8',
  300: '#a9d8f5',   // SMG Sky 2
  400: '#86c5ec',
  500: '#62b0e2',   // SMG Sky 3
  600: '#4295cd',
  700: '#1f78b6',   // SMG Sky 4
  800: '#1a6191',
  900: '#164e74',
  950: '#0e3149',
};

const neutral = {
  50: '#f6f8fa',
  100: '#eef2f6',
  200: '#dfe6ed',
  300: '#cad5df',
  400: '#98a8b8',
  500: '#6d7f90',
  600: '#536472',
  700: '#3e4c58',
  800: '#29333c',
  900: '#182028',
  950: '#0e141a',
};

const brand = {
  50: '#e9f4fe',
  100: '#cbe6fd',
  200: '#98cdfa',
  300: '#5fb0f5',
  400: '#2a95f0',
  500: '#0080ea',   // SMG logo blue
  600: '#0069c2',
  700: '#00539b',
  800: '#003f76',
  900: '#002d55',
  950: '#001a33',
};

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: sky,
        gray: neutral,
        slate: neutral,
        brand,
      },

      fontFamily: {
        sans: ['"Segoe UI Variable Text"', '"Segoe UI"', 'system-ui',
          '-apple-system', 'Helvetica Neue', 'sans-serif'],
        mono: ['"Cascadia Mono"', 'ui-monospace', 'SFMono-Regular',
          'Consolas', 'Liberation Mono', 'monospace'],
      },

      /* Display type runs light; data type stays normal weight.
         200 is beautiful at 38px and unreadable at 12px in a table cell. */
      fontSize: {
        'display-lg': ['38px', { lineHeight: '1.06', letterSpacing: '-0.022em', fontWeight: '200' }],
        'display': ['30px', { lineHeight: '1.1', letterSpacing: '-0.018em', fontWeight: '200' }],
        'display-sm': ['22px', { lineHeight: '1.15', letterSpacing: '-0.012em', fontWeight: '300' }],
        'label': ['11px', { lineHeight: '1.4', letterSpacing: '0.11em', fontWeight: '500' }],
      },

      borderRadius: {
        lg: '14px',   // pickers, inline panels
        xl: '20px',   // cards
        '2xl': '24px', // modals
      },

      /* Hairline borders read as glass; 1px reads as a box. */
      borderWidth: {
        hairline: '0.5px',
      },

      boxShadow: {
        glass: '0 20px 50px -22px rgba(90,120,170,0.34), inset 0 1px 0 rgba(255,255,255,0.75)',
        'glass-lg': '0 34px 70px -26px rgba(90,120,170,0.42), inset 0 1px 0 rgba(255,255,255,0.85)',
        'glass-dark': '0 22px 54px -24px rgba(0,0,0,0.70), inset 0 1px 0 rgba(255,255,255,0.09)',
        'glass-dark-lg': '0 36px 76px -28px rgba(0,0,0,0.80), inset 0 1px 0 rgba(255,255,255,0.12)',
      },

      backdropBlur: {
        glass: '22px',
      },

      backdropSaturate: {
        glass: '1.6',
      },
    },
  },
  plugins: [],
};
