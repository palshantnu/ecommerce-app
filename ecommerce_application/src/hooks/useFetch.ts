import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useFetch = <T = unknown>(url: string, config?: AxiosRequestConfig) => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios(url, config);
        if (isMounted) setState({ data: response.data, loading: false, error: null });
      } catch (error: any) {
        if (isMounted) setState({ data: null, loading: false, error: error.message });
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return state;
};
