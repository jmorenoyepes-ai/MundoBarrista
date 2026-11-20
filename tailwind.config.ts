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
        // === MundoBarrista — Dark Stadium & Cafetero ===
        main: '#0B1120',
        card: '#151F32',
        'card-border': '#1E293B',
        'accent-pitch': '#10B981',
        'accent-gold': '#FACC15',
        'accent-danger': '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
