import { type CSSProperties, useMemo } from "react";
import { useGoogleMapsApi } from "../../hooks/useGoogleMapsApi";
import { useOrientation } from "../../hooks/useOrientation";
import type { RouteDetail } from "../../types";
import Loader from "../Loader";
import { GoogleMapCanvas } from "./GoogleMapCanvas";

export interface RouteMapProps {
  apiKey: string;
  route?: RouteDetail;
  height?: number | string;
  className?: string;
  style?: CSSProperties;
}

const messages = {
  apiKey: "Oops! Cannot display the map: Google Maps API key missing",
  error: "Unable to load Google Maps API. Check your API key or network.",
  resolvedRoute: "Provide a route to render the map.",
  ready: undefined
}

const RenderLoader = ({ type, height }: { type: keyof typeof messages, height?: number | string }) => 
        <div style={{ height }}>
        <Loader
          message={messages[type]}
          height={height}
        />
      </div>

export const RouteMap = ({
  apiKey,
  route,
  height = "100vh",
  className,
  style,
}: RouteMapProps) => {
  const status = useGoogleMapsApi(apiKey);
  const isHorizontal = useOrientation();

  const resolvedRoute = useMemo(() => route, [route]);


  if (!apiKey) {
    return <RenderLoader type="apiKey" height={height} />
  }

  if (status === "error") {
    return <RenderLoader type="error" height={height} />
  }

  if (status !== "ready") {
    return <RenderLoader type="ready" height={height} />
  }

  if (!resolvedRoute) {
    return <RenderLoader type="resolvedRoute" height={height} />
  }

  const containerStyle: CSSProperties = {
    height,
    width: "100%",
    ...style,
  };

  return (
    <div className={className} style={containerStyle}>
      <GoogleMapCanvas
        route={resolvedRoute}
        height={height}
        isHorizontal={isHorizontal}
      />
    </div>
  );
};
