import { useTheme } from "../../../theme-provider";

export const ElevationDot = (props: any) => {
  const { cx, cy } = props;
  const theme = useTheme();
  if (cx === undefined || cy === undefined) return null;
  return (
    <circle cx={cx} cy={cy} r={3} fill={theme.colors.accent} opacity={0.9} />
  );
};
