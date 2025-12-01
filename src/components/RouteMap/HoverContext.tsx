import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export enum HoverStateChangeSource {
  Chart = "chart",
  Map = "map",
}
export interface HoverState {
  lat?: number;
  lng?: number;
  source?: HoverStateChangeSource;
}

interface HoverContextValue {
  hover: HoverState;
  setHover: (state: HoverState) => void;
  clearHover: () => void;
}

const HoverContext = createContext<HoverContextValue | undefined>(undefined);

export const HoverProvider = ({ children }: { children: ReactNode }) => {
  const [hover, setHoverState] = useState<HoverState>({});

  const setHover = useCallback((state: HoverState) => setHoverState(state), []);
  const clearHover = useCallback(() => setHoverState({}), []);

  const value = useMemo(
    () => ({
      hover,
      setHover,
      clearHover,
    }),
    [hover, setHover, clearHover]
  );

  return (
    <HoverContext.Provider value={value}>{children}</HoverContext.Provider>
  );
};

export const useHover = () => {
  const ctx = useContext(HoverContext);
  if (!ctx) {
    throw new Error("useHover must be used within HoverProvider");
  }
  return ctx;
};
