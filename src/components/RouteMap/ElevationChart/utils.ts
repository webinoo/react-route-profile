export const computeMinMax = (points: Array<{ elevation: number }>) => {
  const elevations = points.map((p) => p.elevation);
  const min = Math.min(...elevations);
  const max = Math.max(...elevations);
  const pad = Math.max(10, (max - min) * 0.05);
  return [Math.floor(min - pad), Math.ceil(max + pad)];
};
