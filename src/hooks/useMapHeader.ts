import { useMeasure } from "@uidotdev/usehooks";
import { useIsMobile } from "./useIsMobile";

const FALLBACK_HEADER_PX = 100;

export const useMapHeader = () => {
  const isMobile = useIsMobile();
  
  const [refHeader, { height: headerHeight }] = useMeasure();
  const [refMapContainer, { height: mapContainerHeight }] = useMeasure();


  const targetHeaderFraction = isMobile ? 0.25 : 0.15;
  const viewportHeight = typeof window !== "undefined" ? window.innerHeight : FALLBACK_HEADER_PX / targetHeaderFraction;
  const fallbackHeaderHeightPx = viewportHeight * targetHeaderFraction || FALLBACK_HEADER_PX;
  const effectiveHeaderHeight = headerHeight || fallbackHeaderHeightPx;
  const mapHeightStyle = `calc(100vh - ${effectiveHeaderHeight}px)`;
  const mapHeight = mapContainerHeight || mapHeightStyle;

  return {
    refHeader,
    refMapContainer,
    targetHeaderFraction,
    effectiveHeaderHeight,
    mapHeight,
  };
};
