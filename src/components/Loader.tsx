import type { CSSProperties } from "react";

interface LoaderProps {
  message?: string;
  height?: number | string;
}

const Loader = ({ message = "Loading map...", height = "100vh" }: LoaderProps) => {
  const style: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height,
    width: "100%",
    color: "#0ea5e9",
    background: "#f8fafc",
    fontWeight: 600,
  };

  return <div style={style}>{message}</div>;
};

export default Loader;
