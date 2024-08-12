import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#6C85FF',
        'accent': '#E4E4E4',
        'text': '#121212',
        'background': '#FFFFFF',
        'background-alternate': '#E2E7FF',
        'light-button-border': '#C7C7C7'
      },
      borderRadius: {
        'custom': '8px'
      },
      borderWidth: {
        'custom': '2px'
      },
      fontFamily: {
        'sans': ['Poppins', 'sans-serif']
      },
      fontSize: {
        'body': '1rem',
        'heading': '1.5rem',
        'hero': '3.5rem',
        'small': '.75rem'
      },
      lineHeight: {
        'body': '1.5',
        'heading': '2.25',
        'hero': '5.25',
        'small': '1.125'
      },
      spacing: {
        '1': '1px',
        '2': '2px',
        '8': '8px',
        '9': '9px',
        '10': '10px',
        '12': '12px',
        '16': '16px',
        '24': '24px',
        '32': '32px',
        '64': '64px',
      },
      boxShadow: {
        'input': '0 6px 24px 0 rgba(0, 0, 0, 0.1)'
      }
    },
  },
  plugins: [],
};
export default config;
