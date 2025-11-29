import { useMemo } from "react";
import {
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { markers } from "../../../constants";
import { useTheme } from "../../../theme-provider";
import type { RouteConfig } from "../../../types";
import { DistanceTick } from "./DistanceTick";
import { ElevationTick } from "./ElevationTick";
import {
  computeMarkerPoints,
  computeMinMax,
  computeRoundedDomainAndTicks,
} from "./utils";

interface ElevationChartProps {
  route: RouteConfig;
}

const MarkerShape = (props: any) => {
  const { cx, cy, fill, name } = props;
  const size = 33;
  if (cx === undefined || cy === undefined) return null;
  const words =
    typeof name === "string"
      ? name
          .split(/\s+/)
          .map((w) => w.trim())
          .filter(Boolean)
      : [];
  return (
    <g>
      <circle cx={cx} cy={cy} r={3} fill={fill} opacity={0.9} />
      <image
        x={cx - size / 2}
        y={cy - size / 2 - 20}
        width={size}
        height={size}
        href={markers.default}
      />
      {name ? (
        <text
          y={cy - words.length * 10}
          fill={fill || "#fff"}
          fontSize={12}
          fontWeight={300}
          letterSpacing={2}
        >
          {words.map((word, idx) => (
            <tspan key={`${word}-${idx}`} x={cx + 15} dy={idx === 0 ? 0 : 12}>
              {word}
            </tspan>
          ))}
        </text>
      ) : null}
    </g>
  );
};

export const ElevationChart = ({ route }: ElevationChartProps) => {
  const theme = useTheme();
  const points = useMemo(() => {
    const raw =
      (route.geoJson as any)?.properties?.elevationProfile?.points || [];
    return [...raw].sort(
      (a: any, b: any) => (a?.distance ?? 0) - (b?.distance ?? 0)
    );
  }, [route.geoJson]);
  const markers = useMemo(
    () => computeMarkerPoints(points, route.geoJson),
    [points, route.geoJson]
  );
  const maxDistance = points.length ? points[points.length - 1].distance : 0;
  const hasData = points.length > 1;

  const [min, max] = computeMinMax(points);
  const [minY, maxY, tickVals] = useMemo(
    () => computeRoundedDomainAndTicks([min, max]),
    [min, max]
  );

  if (!hasData) {
    return null;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={points}
        margin={{ top: 4, right: 8, bottom: 4, left: 8 }}
      >
        <defs>
          <linearGradient id="elevationGradient" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={theme.colors.primary}
              stopOpacity={0.6}
            />
            <stop
              offset="100%"
              stopColor={theme.colors.primaryMuted}
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
        <XAxis
          dataKey="distance"
          type="number"
          domain={[0, maxDistance]}
          tick={<DistanceTick />}
          stroke="rgba(226, 232, 240, 0.7)"
        />
        <YAxis
          dataKey="elevation"
          tick={<ElevationTick />}
          domain={[minY, maxY] as any}
          ticks={tickVals as any}
          stroke="rgba(226, 232, 240, 0.7)"
          width={60}
        />
        <Tooltip
          contentStyle={{ background: "rgba(15,23,42,0.9)", border: "none" }}
          labelStyle={{ color: "#e2e8f0" }}
          cursor={{ stroke: "rgba(226,232,240,0.4)", strokeWidth: 1 }}
          formatter={(value: any, name, props) => {
            // console.log({ value, name, props });
            if (name === "elevation") {
              const markerName = (props?.payload as any)?.name;

              console.log({ markerName });

              return [
                `${Math.round(value as number)} m${
                  markerName ? ` • ${markerName}` : ""
                }`,
                "Elevation",
              ];
            }
            return value;
          }}
          labelFormatter={(label) =>
            `${Math.round((label as number) / 1000)} km`
          }
          itemStyle={{ color: theme.colors.accent }}
        />
        <Line
          type="monotone"
          dataKey="elevation"
          stroke={theme.colors.primary}
          strokeWidth={1}
          dot={false}
          activeDot={{ r: 3, fill: theme.colors.accent, strokeWidth: 0 }}
          fill="url(#elevationGradient)"
          isAnimationActive={false}
        />
        {markers.length > 0 &&
          markers.map((m, idx) => (
            <ReferenceDot
              key={`${m.distance}-${idx}`}
              x={m.distance}
              y={m.elevation}
              r={7}
              shape={(props) => (
                <MarkerShape
                  {...props}
                  name={m.name}
                  fill={theme.colors.accent}
                />
              )}
            />
          ))}
      </ComposedChart>
    </ResponsiveContainer>
  );
};
