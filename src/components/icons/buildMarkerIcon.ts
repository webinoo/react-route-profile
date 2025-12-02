import markerSvg from "../../assets/icons/marker.svg?raw";
import markerFinishSvg from "../../assets/icons/markerFinish.svg?raw";
import markerStartSvg from "../../assets/icons/markerStart.svg?raw";

const svgTemplate = (base: string, outer: string, inner: string) => {
  let fillIndex = 0;
  return base.replace(/fill="[^"]*"/g, (match) => {
    fillIndex += 1;
    if (fillIndex === 1) return `fill="${outer}"`;
    if (fillIndex === 2) return `fill="${inner}"`;
    return match;
  });
};

export const buildMarkerIcon = (outer: string, inner: string) => {
  const svg = svgTemplate(markerSvg, outer, inner).trim();
  const encoded = encodeURIComponent(svg)
    .replace(/'/g, "%27")
    .replace(/"/g, "%22");
  return `data:image/svg+xml,${encoded}`;
};

export const markers = {
  default: markerSvg,
  start: markerStartSvg,
  finish: markerFinishSvg,
};