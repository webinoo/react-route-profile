export const theme = {
  colors: {
    primary: "rgba(14, 165, 233, 1)",
    primaryMuted: "rgba(14, 165, 233, 0.7)",
    accent: "rgba(132, 204, 22, 1)",
    surface: "rgba(248, 250, 252, 1)",
  },
  shadows: {
    map: "0 10px 30px rgba(15, 23, 42, 0.16)",
  },
} as const;

export type Theme = typeof theme;
