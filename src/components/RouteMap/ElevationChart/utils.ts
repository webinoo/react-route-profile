export const computeMinMax = (points: Array<{ elevation: number }>) => {
  const elevations = points.map((p) => p.elevation);
  const min = Math.min(...elevations);
  const max = Math.max(...elevations);
  const pad = Math.max(10, (max - min) * 0.05);
  return [Math.floor(min - pad), Math.ceil(max + pad)];
};

export const computeRoundedDomainAndTicks = (
  minMax: [number, number]
) => {
    const [min, max] = minMax;
    const step = Math.max(10, Math.round((max - min) / 6 / 10) * 10 || 50);
    const start = Math.floor(min / step) * step;
    const end = Math.ceil(max / step) * step;
    const ticks: number[] = [];
    for (let v = start; v <= end; v += step) {
      ticks.push(v);
    }
    return [start, end, ticks];
};
