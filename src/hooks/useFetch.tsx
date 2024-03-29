import { useState } from "react";
import axios from "axios";
import { ReturnData } from "../types/types";

axios.defaults.baseURL = "http://localhost:8080/api";

interface FetchDataResponse<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  fetchData: (body?: object | null) => Promise<void>;
  fetchDataResponse: (body?: object | null) => Promise<ReturnData>;
}

interface FetchOptions {
  method?: string;
  headers?: { [key: string]: string };
  // other options...
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
      console.error("🚀 ~ fetchData ~ error:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDataResponse = async (body?: object | null) => {
    setIsLoading(true);
    const returnResponse: ReturnData = { data: {}, error: {} };
    try {
      const options: RequestInit = {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
      };

      const response = await fetch(url, options);
      if (response.status === 200) {
        const responseData: T = await response.json();
        returnResponse.data = JSON.parse(JSON.stringify(responseData));
      } else {
        const responseData: T = await response.json();
        returnResponse.error = JSON.parse(JSON.stringify(responseData));
      }
      return returnResponse;
    } catch (error: any) {
      const errorObject: Error = {
        cause: (error as Error).cause,
        name: (error as Error).name,
        message: (error as Error).message,
        stack: (error as Error).stack,
      };
      returnResponse.error = JSON.stringify(errorObject);
      console.error("🚀 ~ fetchDataResponse ~ error:", errorObject);

      setError(errorObject);
      return returnResponse;
    } finally {
      setIsLoading(false);
      return returnResponse;
    }
  };
  return { data, isLoading, error, fetchData, fetchDataResponse };
}

export async function fetchDataHook<T>(
  url: string,
  options?: FetchOptions
): Promise<T> {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}
