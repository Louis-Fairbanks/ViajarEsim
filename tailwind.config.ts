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
        'yellow': '#E1DD7D',
        'payment-methods': '#F8F8FB',
        'whatsapp-green': '#25D366',
        'button-hover': '#8F9FEC',
        'button-pressed': '#3A55D6',
        'button-focused': '#A3B2FE',
        'card-pressed': '#3E3E3E',
        'button-light-deactivated' : '#DDDDDD',
        'alert': '#AA4F4F'
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
        'large-heading': '2rem',
        'hero': '3.5rem',
        'small': '.75rem'
      },
      lineHeight: {
        'body': '1.5'
      },
      spacing: {
        '1': '1px',
        '2': '2px',
        '2.5':'2.5px', 
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
        '128': '128px',
        '256': '256px',
        'fullx2': '200%'
      },
      boxShadow: {
        'input': '0 6px 24px 0 rgba(0, 0, 0, 0.1)'
      },
      scale: {
        '200' : '2',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, #E2E7FF 0%, #C5CCF1 100%)',
        'green-gradient': 'linear-gradient(90deg, #E2FFF6 0%, #C5F1D9 100%)',
        'yellow-gradient': 'linear-gradient(90deg, #FEFFE2 0%, #F9FCDD 100%)',
        'gray-gradient': 'linear-gradient(90deg, #D6D6D6 0%, #C8C8C8 100%)'
      },
      maxHeight: {
        '0': '0'
      }
    },
  },
  plugins: [],
};
export default config;
