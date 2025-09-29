/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderWidth: {
        '3': '3px',
      },
      colors: {
        'bg-dark': '#0f0f23',
        'surface-dark': 'rgba(30, 41, 59, 0.8)',
        'surface-light': 'rgba(148, 163, 184, 0.1)',
        'card-bg': 'rgba(30, 41, 59, 0.9)',
        'glass-bg': 'rgba(30, 41, 59, 0.6)',
        'text-primary': '#f1f5f9',
        'text-secondary': '#cbd5e1',
        'text-accent': '#a78bfa',
        'text-muted': '#64748b',
        'moon-white': '#fefefe',
        'moon-silver': '#e2e8f0',
        'cosmic-purple': '#8b5cf6',
        'mystic-blue': '#6366f1',
        'star-gold': '#fbbf24',
      },
      boxShadow: {
        'cosmic': '0 20px 25px -5px rgba(139, 92, 246, 0.3)',
        'moon': '0 10px 15px -3px rgba(248, 250, 252, 0.1)',
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.5)',
        'glow-moon': '0 0 30px rgba(248, 250, 252, 0.3)',
      },
      borderRadius: {
        'cosmic': '20px',
        'cosmic-sm': '12px',
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        'moon-gradient': 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        'shadow-gradient': 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        'cosmic-gradient': 'linear-gradient(135deg, #312e81 0%, #1e1b4b 100%)',
      },
      animation: {
        'cosmic-pulse': 'cosmicPulse 8s ease-in-out infinite alternate',
        'stars-twinkle': 'starsTwinkle 20s linear infinite',
        'header-glow': 'headerGlow 6s ease-in-out infinite alternate',
        'moon-glow': 'moonGlow 4s ease-in-out infinite alternate',
        'fade-in': 'fadeIn 0.6s ease-out',
      },
      keyframes: {
        cosmicPulse: {
          '0%': { opacity: 0.3, transform: 'scale(1)' },
          '100%': { opacity: 0.7, transform: 'scale(1.05)' },
        },
        starsTwinkle: {
          '0%': { transform: 'translateY(0px) translateX(0px)' },
          '33%': { transform: 'translateY(-30px) translateX(20px)' },
          '66%': { transform: 'translateY(-15px) translateX(-15px)' },
          '100%': { transform: 'translateY(0px) translateX(0px)' },
        },
        headerGlow: {
          '0%': { opacity: 0.3 },
          '100%': { opacity: 0.8 },
        },
        moonGlow: {
          '0%': { boxShadow: '0 0 30px rgba(248, 250, 252, 0.3)' },
          '100%': { boxShadow: '0 0 50px rgba(248, 250, 252, 0.5)' },
        },
        fadeIn: {
          'from': { opacity: 0, transform: 'translateY(20px)' },
          'to': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      transitionProperty: {
        'cosmic': 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
