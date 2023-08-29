import { useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/api";
interface FetchDataResponse<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  fetchData: (body?: object | null) => Promise<void>;
}

export function useFetch<T>(url: string, method: string): FetchDataResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | any>(null);

  const fetchData = async (body?: object | null) => {
    setIsLoading(true);

    try {
      const options: RequestInit = {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
      };

      const response = await fetch(url, options);
      const responseData: T = await response.json();
      setData(responseData);
    } catch (error) {
      console.error("🚀 ~ file: useFetch.tsx:73 ~ fetchData ~ error:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { data, isLoading, error, fetchData };
}
