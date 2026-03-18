/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans:    ["'Sora'", "system-ui", "-apple-system", "sans-serif"],
        display: ["'Sora'", "system-ui", "-apple-system", "sans-serif"],
      },
      colors: {
        // ── Single teal accent (care) ──────────────────────────────────
        care: {
          50:  "#F0FAF6", 100: "#DCFAEE", 200: "#B8F0D8", 300: "#7FDDB6",
          400: "#40C28A", 500: "#2A9872", 600: "#1E7A5A", 700: "#186249",
          800: "#164E3B", 900: "#124030",
        },

        // ── Semantic surface tokens — clean white/gray ─────────────────
        cara: {
          bg:         "#FFFFFF",
          surface:    "#FFFFFF",
          surfaceAlt: "#F9FAFB",
          border:     "#E5E7EB",
          muted:      "#F3F4F6",
          // Text — neutral grays
          text:       "#111827",
          textSub:    "#374151",
          textMute:   "#9CA3AF",
        },
      },

      boxShadow: {
        "xs":          "0 1px 2px rgba(0,0,0,0.05)",
        "sm":          "0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04)",
        "md":          "0 4px 8px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.04)",
        "lg":          "0 10px 20px rgba(0,0,0,0.09), 0 4px 8px rgba(0,0,0,0.05)",
        "xl":          "0 20px 32px rgba(0,0,0,0.10), 0 8px 12px rgba(0,0,0,0.06)",
        "2xl":         "0 32px 48px rgba(0,0,0,0.12), 0 12px 20px rgba(0,0,0,0.08)",
        "focus-care":  "0 0 0 3px rgba(42,152,114,0.25)",
      },

      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },

      animation: {
        "slide-up": "slideUp 0.22s cubic-bezier(0.2,0,0,1)",
        "fade-in":  "fadeIn 0.3s ease-out",
      },

      keyframes: {
        slideUp: { from: { opacity: "0", transform: "translateY(10px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        fadeIn:  { from: { opacity: "0" }, to: { opacity: "1" } },
      },
    },
  },
  plugins: [],
};
