import type { CSSProperties } from "react";
import styles from "./Loader.module.css";

interface LoaderProps {
  message?: string;
  height?: number | string;
}

const Loader = ({
  message = "Loading map...",
  height = "100vh",
}: LoaderProps) => {
  const style: CSSProperties = {
    height,
  };

  return (
    <div className={styles.loader} style={style}>
      {message}
    </div>
  );
};

export default Loader;
