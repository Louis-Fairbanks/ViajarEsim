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
        'light-button-border': '#C7C7C7',
        'text-faded': '#898989',
        'yellow': '#FFC659'
      },
      borderRadius: {
        'custom': '8px'
      },
      borderWidth: {
        'custom': '2px',
      },
      fontFamily: {
        'sans': ['Poppins', 'sans-serif']
      },
      fontSize: {
        'body': '1rem',
        'subheading': '1.25rem',
        'heading': '1.5rem',
        'hero': '3.5rem',
        'small': '.75rem'
      },
      lineHeight: {
        'body': '1.5'
      },
      spacing: {
        '1': '1px',
        '2': '2px',
        '6': '6px',
        '8': '8px',
        '9': '9px',
        '10': '10px',
        '12': '12px',
        '16': '16px',
        '18': '18px',
        '24': '24px',
        '32': '32px',
        '48': '48px',
        '64': '64px',
        '65': '65px !important',
        '90': '90px',
        '128': '128px'
      },
      boxShadow: {
        'input': '0 6px 24px 0 rgba(0, 0, 0, 0.1)'
      },
      scale: {
        '200' : '2',
      }
    },
  },
  plugins: [],
};
export default config;
