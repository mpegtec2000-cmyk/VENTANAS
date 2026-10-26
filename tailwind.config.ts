import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0052CC',
          'blue-hover': '#0040A8',
          'blue-dark': '#072A60',
          'blue-light': '#F0F5FF',
          'blue-accent': '#1D72FE',
          
          navy: '#0B1A2B',
          'navy-deep': '#060F1A',
          'navy-card': '#0F243E',
          
          slate: '#475569',
          border: '#E2E8F0',
        },
      },
      fontFamily: {
        sans: ['Schibsted Grotesk', 'Archivo', 'Space Grotesk', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        heading: ['Schibsted Grotesk', 'Archivo', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 82, 204, 0.08)',
        'glass-card': '0 10px 30px -5px rgba(11, 26, 43, 0.06)',
        card: '0 4px 20px -2px rgba(11, 26, 43, 0.05)',
      },
    },
  },
  plugins: [],
};

export default config;
