import markerSvg from "../assets/icons/marker.svg";
import markerFinishSvg from "../assets/icons/markerFinish.svg";
import markerStartSvg from "../assets/icons/markerStart.svg";

export const useMarkers = () => ({
  default: markerSvg,
  start: markerStartSvg,
  finish: markerFinishSvg,
});
