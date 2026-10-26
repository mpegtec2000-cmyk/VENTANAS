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
          // Azules Oficiales Orellana
          blue: '#007BFF',
          'blue-hover': '#0062cc',
          'blue-dark': '#004DB3',
          'blue-light': '#F0F7FF',
          'blue-soft': '#E0EFFF',
          cyan: '#0EA5E9',
          ice: '#E2F1FF',
          
          // Azules Profundos Corporativos (de las guías de branding)
          navy: '#0B1A2B',
          'navy-deep': '#060F1A',
          'navy-card': '#0F243E',
          'navy-surface': '#152942',
          
          // Neutros y Metálicos (Aluminio / Acero)
          aluminum: '#94A3B8',
          chrome: '#CBD5E1',
          slate: '#64748B',
          charcoal: '#1E293B',
          dark: '#080B0B',
          
          // Superficies y Fondos
          surface: '#F8FAFC',
          border: '#E2E8F0',
          'border-light': '#F1F5F9',
        },
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'Montserrat', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 123, 255, 0.08)',
        'glass-hover': '0 12px 40px -5px rgba(0, 123, 255, 0.16)',
        'glass-card': '0 10px 30px -5px rgba(11, 26, 43, 0.06)',
        'glass-card-hover': '0 20px 45px -10px rgba(11, 26, 43, 0.12)',
        glow: '0 0 25px rgba(0, 123, 255, 0.4)',
        'glow-cyan': '0 0 25px rgba(14, 165, 233, 0.4)',
        subtle: '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)',
        card: '0 4px 20px -2px rgba(11, 26, 43, 0.05)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'radial-gradient(120% 120% at 50% 0%, rgba(226, 241, 255, 0.7) 0%, rgba(255, 255, 255, 1) 70%)',
        'blue-gradient': 'linear-gradient(135deg, #007BFF 0%, #0056b3 100%)',
        'navy-gradient': 'linear-gradient(135deg, #0B1A2B 0%, #060F1A 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.85) 100%)',
        'card-gradient': 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
