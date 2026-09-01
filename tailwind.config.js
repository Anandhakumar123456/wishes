/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wedding: {
          bg: '#FAF7F2',
          card: '#FDFBF7',
          maroon: {
            DEFAULT: '#4A0E17',
            deep: '#36090F',
            light: '#6B1124',
            accent: '#800020'
          },
          gold: {
            light: '#FCE7AC',
            DEFAULT: '#D4AF37',
            dark: '#AA771C',
            accent: '#E5C158',
            metallic: '#B38728'
          },
          blush: {
            light: '#FFF5F7',
            DEFAULT: '#FCE4EC',
            dark: '#F4C2C2'
          },
          ivory: {
            DEFAULT: '#FAF7F2',
            warm: '#F7F3EB'
          }
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', '"Alex Brush"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif']
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)',
        'maroon-gradient': 'linear-gradient(135deg, #4A0E17 0%, #6B1124 50%, #36090F 100%)',
        'blush-gradient': 'linear-gradient(180deg, #FFF5F7 0%, #FAF7F2 100%)',
        'glass-card': 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(253, 251, 247, 0.4) 100%)',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 30s linear infinite',
        'shimmer': 'shimmer 2.5s infinite',
        'heartbeat': 'heartbeat 1.8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 15px rgba(212, 175, 55, 0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 25px rgba(212, 175, 55, 0.8))' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' }
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.15)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.15)' },
          '70%': { transform: 'scale(1)' },
        }
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(212, 175, 55, 0.3)',
        'maroon-glow': '0 10px 30px -10px rgba(74, 14, 23, 0.4)',
        'card-soft': '0 15px 35px -5px rgba(74, 14, 23, 0.05), 0 5px 15px -5px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}
