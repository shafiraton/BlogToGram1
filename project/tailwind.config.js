/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFD700', // Gold
          dark: '#E6B800',
          light: '#FFE44D',
        },
        secondary: {
          DEFAULT: '#FF8C42', // Creative Orange
          dark: '#FF6B2B',
          light: '#FFAD75',
        },
        accent: {
          DEFAULT: '#9B5DE5', // Creative Purple
          dark: '#8346C4',
          light: '#B37EEA',
        },
        creative: {
          pink: '#FF69B4',
          blue: '#00C6CF',
          yellow: '#FFF338',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-creative': 'linear-gradient(45deg, var(--tw-gradient-stops))',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#333',
            h1: {
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#1a202c',
            },
            h4: {
              color: '#1a202c',
              fontWeight: '600',
            },
            p: {
              marginTop: '0.5em',
              marginBottom: '0.5em',
            },
            li: {
              marginTop: '0.25em',
              marginBottom: '0.25em',
            },
          },
        },
        sm: {
          css: {
            h1: {
              fontSize: '1.25rem',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}