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
          blue: '#007BFF',
          'blue-dark': '#0056b3',
          'blue-light': '#EBF5FF',
          navy: '#0B1A2B',
          'navy-dark': '#07101C',
          dark: '#080B0B',
          gray: '#6B7280',
          'gray-light': '#F4F6FA',
          border: '#E2E8F0',
        },
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'Montserrat', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 123, 255, 0.08)',
        'glass-card': '0 10px 30px -5px rgba(11, 26, 43, 0.07)',
        glow: '0 0 25px rgba(0, 123, 255, 0.35)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(244, 246, 250, 0.8) 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
