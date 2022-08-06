import { useState, useMemo, useEffect } from "react";

export function useCallsData(fn, valid, reload) {
  const [result, setResult] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    if (fn && valid !== false) {
      setLoading(true);
      const _result = await fn();
      setResult(_result);
      setLoading(false);
    }
  }, [fn, valid, reload]);

  return useMemo(
    () => ({
      result,
      loading,
    }),
    [result, loading]
  );
}
