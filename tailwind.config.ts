import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'sea-blue': 'var(--sea-blue)',
        'dark-grey': 'var(--dark-grey)',
        'off-white': 'var(--off-white)',
        'nettle-green': 'var(--nettle-green)',
        'lime-green': 'var(--lime-green)',
        'pale-orange': 'var(--pale-orange)',
        'bright-orange': 'var(--bright-orange)',
        'roadline-white': 'var(--roadline-white)',
        'roadline-yellow': 'var(--roadline-yellow)',
        'roadline-tarmac': 'var(--roadline-tarmac)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        'secondary-dark': 'var(--color-secondary-dark)',
        tertiary: 'var(--color-tertiary)',
      },
    },
  },
  plugins: [],
} satisfies Config;
