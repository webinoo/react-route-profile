export const DistanceTick = (props: any) => {
  const { x, y, payload } = props;
  const km = Math.round((payload?.value ?? 0) / 1000);
  return (
    <text
      x={x}
      y={y}
      fill="rgba(226, 232, 240, 0.7)"
      fontSize={12}
      textAnchor="middle"
      dy={12}
    >
      <tspan>{km}</tspan>
      <tspan fontSize={10} dx={2}>
        km
      </tspan>
    </text>
  );
};
