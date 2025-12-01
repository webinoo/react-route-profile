import { useCallback, useMemo, useState } from "react";

export function useTriggerByXValue<
  T extends { distance: number; elevation: number }
>(data: T[]) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activePoint = useMemo(
    () => (activeIndex != null ? data[activeIndex] : null),
    [activeIndex, data]
  );

  const clearActiveIndex = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const triggerByXValue = useCallback(
    (distance: number) => {
      if (!data.length) return;

      // assume data sorted by distance ascending
      let lo = 0;
      let hi = data.length - 1;

      // binary search for closest distance
      while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (data[mid].distance < distance) {
          lo = mid + 1;
        } else {
          hi = mid;
        }
      }

      // lo is first >= distance; pick closer of lo and lo-1
      let bestIndex = lo;
      if (lo > 0) {
        const prev = data[lo - 1];
        const curr = data[lo];
        if (
          Math.abs(prev.distance - distance) <
          Math.abs(curr.distance - distance)
        ) {
          bestIndex = lo - 1;
        }
      }

      setActiveIndex(bestIndex);
    },
    [data]
  );

  return {
    activeIndex,
    activePoint,
    triggerByXValue,
    clearActiveIndex,
  };
}
