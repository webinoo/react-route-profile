export const ElevationTick = (props: any) => {
  const { x, y, payload } = props;
  const m = Math.round(payload?.value ?? 0);
  return (
    <text
      x={x}
      y={y}
      fill="rgba(226, 232, 240, 0.7)"
      fontSize={12}
      textAnchor="end"
      dy={4}
    >
      <tspan>{m}</tspan>
      <tspan fontSize={10} dx={2}>
        m
      </tspan>
    </text>
  );
};
