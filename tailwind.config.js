/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fixxly: {
          navy: {
            DEFAULT: '#0b1d3a',
            dark: '#071326',
            light: '#132c54',
            surface: '#183461'
          },
          orange: {
            DEFAULT: '#ff6b00',
            hover: '#e55f00',
            light: '#fff4eb',
            dark: '#cc5500',
            muted: '#ffedd5'
          },
          green: {
            DEFAULT: '#16a34a',
            dark: '#15803d',
            light: '#dcfce7'
          },
          gray: {
            bg: '#f8f9fa',
            border: '#e5e7eb',
            text: '#111827',
            secondary: '#6b7280',
            subtle: '#9ca3af'
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        dropdown: '0 12px 36px -4px rgba(11, 29, 58, 0.18), 0 4px 12px -2px rgba(11, 29, 58, 0.08)',
        card: '0 2px 8px -1px rgba(0, 0, 0, 0.06), 0 1px 4px -1px rgba(0, 0, 0, 0.04)',
        cardHover: '0 10px 25px -5px rgba(11, 29, 58, 0.12), 0 8px 10px -6px rgba(11, 29, 58, 0.08)',
        pill: '0 2px 4px rgba(255, 107, 0, 0.15)',
        sheet: '0 -8px 30px rgba(11, 29, 58, 0.2)'
      },
      animation: {
        'slide-down': 'slideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.15s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 2s infinite',
      },
      keyframes: {
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px) scale(0.99)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        }
      }
    },
  },
  plugins: [],
}
