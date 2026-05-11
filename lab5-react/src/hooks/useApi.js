// ══════════════════════════════════════════════════════════════
//  useApi — backend-аас өгөгдөл татах hook, локал fallback дэмжсэн
// ══════════════════════════════════════════════════════════════
import { useEffect, useState } from 'react';
import { api, unwrap } from '../api.js';

export function useApi(path, fallback = null) {
  const [data, setData]       = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    if (!path) { setLoading(false); return; }
    let alive = true;
    setLoading(true);
    api.get(path)
      .then(res => { if (alive) { setData(unwrap(res)); setError(null); } })
      .catch(err => {
        if (alive) {
          setError(err);
          if (fallback !== null) setData(fallback);   // backend унтарсан үед local data
        }
      })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [path]);

  return { data, loading, error };
}
