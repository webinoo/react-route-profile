import { useTheme } from "../../../theme-provider";

const Dot = (props: any) => {
  const { cx, cy, fill } = props;
  const theme = useTheme();
  if (cx === undefined || cy === undefined) return null;
  return (
    <circle cx={cx} cy={cy} r={3} fill={theme.dots.chartActive} opacity={0.9} />
  );
};

export const ElevationDot = (props: any) => {
  const theme = useTheme();
  return <Dot {...props} fill={theme.dots.chart} />;
};

export const MapDot = (props: any) => {
  const theme = useTheme();
  return <Dot {...props} fill={theme.dots.mapActive} />;
};
