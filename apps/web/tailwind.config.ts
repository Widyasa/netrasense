import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FBFAF7",
        surface: "#FFFFFF",
        alt: "#F4F2ED",
        line: "#E6E2DA",
        ink: "#14181F",
        "ink-2": "#4A5462",
        "ink-3": "#495260",
        "ink-disabled": "#8A93A1",
        amber: {
          tint: "#FFF3D1",
          DEFAULT: "#FFC53D",
          deep: "#6B4900",
        },
        teal: {
          tint: "#DCF1F6",
          DEFAULT: "#17A2BD",
          deep: "#0B5566",
        },
        violet: {
          tint: "#EBE5FE",
          DEFAULT: "#7C5CE0",
          deep: "#4B33A8",
        },
        green: {
          tint: "#DFF4E7",
          DEFAULT: "#22A45D",
          deep: "#0A5A30",
        },
        orange: {
          tint: "#FCEBDC",
          DEFAULT: "#EE7B22",
          deep: "#85390A",
        },
        red: {
          tint: "#FBE6E6",
          DEFAULT: "#D22B2B",
          deep: "#8F1F1F",
        },
        dark: {
          bg: "#0D1420",
          text: "#F2F5F9",
          violet: "#B49CFC",
        },
      },
      fontFamily: {
        sans: ["var(--font-atkinson)", "sans-serif"],
        display: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      fontSize: {
        display: ["40px", { lineHeight: "1.10", fontWeight: "700" }],
        "title-lg": ["30px", { lineHeight: "1.20", fontWeight: "700" }],
        title: ["24px", { lineHeight: "1.25", fontWeight: "700" }],
        "body-lg": ["20px", { lineHeight: "1.55", fontWeight: "400" }],
        body: ["18px", { lineHeight: "1.55", fontWeight: "400" }],
        label: ["16px", { lineHeight: "1.40", fontWeight: "700" }],
        caption: ["14px", { lineHeight: "1.45", fontWeight: "400" }],
      },
      spacing: {
        "4": "4px",
        "8": "8px",
        "12": "12px",
        "16": "16px",
        "24": "24px",
        "32": "32px",
        "48": "48px",
        "64": "64px",
        "88": "88px",
        "96": "96px",
      },
      borderRadius: {
        small: "12px",
        button: "14px",
        card: "24px",
      },
    },
  },
  plugins: [],
};

export default config;
