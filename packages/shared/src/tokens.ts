export const colors = {
  paper: "#FBFAF7",
  surface: "#FFFFFF",
  alt: "#F4F2ED",
  line: "#E6E2DA",
  ink: "#14181F",
  ink2: "#4A5462",
  ink3: "#495260",
  inkDisabled: "#8A93A1",
  amber: {
    tint: "#FFF3D1",
    solid: "#FFC53D",
    deep: "#6B4900",
  },
  teal: {
    tint: "#DCF1F6",
    solid: "#17A2BD",
    deep: "#0B5566",
  },
  violet: {
    tint: "#EBE5FE",
    solid: "#7C5CE0",
    deep: "#4B33A8",
  },
  green: {
    tint: "#DFF4E7",
    solid: "#22A45D",
    deep: "#0A5A30",
  },
  orange: {
    tint: "#FCEBDC",
    solid: "#EE7B22",
    deep: "#85390A",
  },
  red: {
    tint: "#FBE6E6",
    solid: "#D22B2B",
    deep: "#8F1F1F",
  },
} as const;

export const typography = {
  display: { size: "40px", lineHeight: 1.1, weight: 700 },
  titleLg: { size: "30px", lineHeight: 1.2, weight: 700 },
  title: { size: "24px", lineHeight: 1.25, weight: 700 },
  bodyLg: { size: "20px", lineHeight: 1.55, weight: 400 },
  body: { size: "18px", lineHeight: 1.55, weight: 400 },
  label: { size: "16px", lineHeight: 1.4, weight: 700 },
  caption: { size: "14px", lineHeight: 1.45, weight: 400 },
} as const;

export const spacing = {
  4: "4px",
  8: "8px",
  12: "12px",
  16: "16px",
  24: "24px",
  32: "32px",
  48: "48px",
  64: "64px",
  88: "88px",
  96: "96px",
} as const;

export const radii = {
  small: "12px",
  button: "16px",
  card: "24px",
} as const;

export type ColorToken = keyof typeof colors;
export type TypographyToken = keyof typeof typography;
export type SpacingToken = keyof typeof spacing;
