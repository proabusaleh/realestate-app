import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useToast } from "./ToastContext";

const CompareContext = createContext(null);

export const MAX_COMPARE = 3;

function getStoredCompare() {
  try {
    const stored = localStorage.getItem("dreamestate_compare");
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed.slice(0, MAX_COMPARE) : [];
  } catch {
    return [];
  }
}

export function CompareProvider({ children }) {
  const toast = useToast();
  const [comparedIds, setComparedIds] = useState(getStoredCompare);

  useEffect(() => {
    localStorage.setItem("dreamestate_compare", JSON.stringify(comparedIds));
  }, [comparedIds]);

  const value = useMemo(
    () => ({
      comparedIds,
      count: comparedIds.length,
      isCompared: (id) => comparedIds.includes(id),
      add: (id) => {
        if (comparedIds.includes(id)) return true;
        if (comparedIds.length >= MAX_COMPARE) {
          toast.error(`You can compare up to ${MAX_COMPARE} properties`);
          return false;
        }
        setComparedIds((prev) => [...prev, id]);
        toast.success("Added to compare");
        return true;
      },
      remove: (id) => setComparedIds((prev) => prev.filter((c) => c !== id)),
      toggle: (id) => {
        if (comparedIds.includes(id)) {
          setComparedIds((prev) => prev.filter((c) => c !== id));
          toast.info("Removed from compare");
          return true;
        }
        if (comparedIds.length >= MAX_COMPARE) {
          toast.error(`You can compare up to ${MAX_COMPARE} properties`);
          return false;
        }
        setComparedIds((prev) => [...prev, id]);
        toast.success("Added to compare");
        return true;
      },
      clear: () => setComparedIds([]),
    }),
    [comparedIds, toast]
  );

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within a CompareProvider");
  return ctx;
}
