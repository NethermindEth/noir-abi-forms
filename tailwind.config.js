/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./.storybook/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        // Background Hierarchy
        bg: {
          primary: '#18181B',    // zinc-900
          secondary: '#27272A',  // zinc-800
          tertiary: '#3F3F46',   // zinc-700
        },
        // Borders
        border: {
          primary: '#3F3F46',    // zinc-700
          hover: '#A855F7',      // purple-500
        },
        // Text Colors
        text: {
          primary: '#F4F4F5',    // zinc-100
          secondary: '#A1A1AA',  // zinc-400
          accent: '#C084FC',     // purple-400
          'accent-hover': '#D8B4FE', // purple-300
        },
        // Function Tags
        function: {
          public: {
            bg: '#064E3B',       // green-900
            text: '#6EE7B7',     // green-300
          },
          private: {
            bg: '#7F1D1D',       // red-900
            text: '#FCA5A5',     // red-300
          },
          internal: {
            bg: '#7C2D12',       // orange-900
            text: '#FDBA74',     // orange-300
          },
          external: {
            bg: '#1E3A8A',       // blue-900
            text: '#93C5FD',     // blue-300
          },
        },
        // Mutability Tags
        mutability: {
          bg: '#581C87',         // purple-900
          text: '#D8B4FE',       // purple-300
        },
        // Action Colors
        action: {
          primary: '#A855F7',    // purple-500
          danger: '#EF4444',     // red-500
        },
        // Input States
        input: {
          bg: '#18181B',         // zinc-900
          border: '#3F3F46',     // zinc-700
          focus: '#A855F7',      // purple-500
        },
      },
    },
  },
  plugins: [],
}

