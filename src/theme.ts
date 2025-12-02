export interface ThemeColors {
  primary: string;
  primaryMuted: string;
  accent: string;
  surface: string;
}

export interface ThemeMarker {
  outer: string;
  inner: string;
  startInner: string;
  finishInner: string;
}

export interface ThemeDots {
  mapActive: string;
  chart: string;
  chartActive: string;
}

export interface ThemeShadows {
  map: string;
}

export interface Theme {
  colors: ThemeColors;
  marker: ThemeMarker;
  dots: ThemeDots;
}

export interface PartialTheme {
  colors?: Partial<ThemeColors>;
  marker?: Partial<ThemeMarker>;
  dots?: Partial<ThemeDots>;
}

export const theme: Theme = {
  colors: {
    primary: "rgba(14, 165, 233, 1)",
    primaryMuted: "rgba(14, 165, 233, 0.7)",
    accent: "rgba(132, 204, 22, 1)",
    surface: "rgba(248, 250, 252, 1)",
  },
  marker: {
    outer: "rgba(132, 204, 22, 1)",
    inner: "rgba(248, 250, 252, 1)",
    startInner: "rgba(34, 197, 94, 1)",
    finishInner: "rgba(239, 68, 68, 1)",
  },
  dots: {
    mapActive: "rgba(132, 204, 22, 1)",
    chart: "rgba(132, 204, 22, 1)",
    chartActive: "rgba(132, 204, 22, 1)",
  }
};
