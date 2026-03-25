import { useState, useEffect, useRef, useMemo } from 'react';
import client from './contentful';
import isEqual from 'lodash/isEqual';

const EMPTY_RESULT = { data: null, loading: false, error: null };

const useContentful = (queries) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const previousQueriesRef = useRef();

  // Stabilize: skip fetch when queries is empty
  const hasQueries = Array.isArray(queries) && queries.length > 0;

  useEffect(() => {
    if (!hasQueries) {
      setLoading(false);
      return;
    }

    if (isEqual(previousQueriesRef.current, queries)) return;
    previousQueriesRef.current = queries;

    let cancelled = false;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await Promise.all(
          queries.map((query) => client.getEntries(query))
        );
        if (cancelled) return;
        const dataObject = results.reduce((acc, result, index) => {
          const contentType = queries[index]?.content_type;
          if (contentType && result.items) {
            acc[contentType] = result.items;
          }
          return acc;
        }, {});
        setData(dataObject);
      } catch (err) {
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => { cancelled = true; };
  }, [queries, hasQueries]);

  return useMemo(
    () =>
      hasQueries
        ? { data: Object.keys(data).length > 0 ? data : null, loading, error }
        : EMPTY_RESULT,
    [data, loading, error, hasQueries]
  );
};

export default useContentful;
