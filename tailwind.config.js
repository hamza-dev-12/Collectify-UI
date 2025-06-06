// tailwind.config.js
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // This line is critical!
  ],
  theme: {
    extend: {
      colors: {
        background: "#F9FAFB",
        card: "#FFFFFF",
        textPrimary: "#1F2937",
        textSecondary: "#4B5563",
        accent: "#2563EB",
        success: "#16A34A",
        error: "#DC2626",
        warning: "#D97706",
        muted: "#E5E7EB",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
