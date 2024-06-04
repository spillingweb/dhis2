import { useState, useEffect, useCallback } from "react";

async function sendGetRequest<T>(url: string, filter: string) {
  const response = await fetch(url);
  const resData = await response.json();
  const data: T[] = resData[filter];

  if (!response.ok) {
    throw new Error(
      resData.errorMessage || "Something went wrong, failed to send request"
    );
  }

  return data;
}

export default function useHttp<T>(filter: string, id?: string) {
  const [data, setData] = useState<T[] | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");

  const url = `https://gist.githubusercontent.com/kabaros/da79636249e10a7c991a4638205b1726/raw/fa044f54e7a5493b06bb51da40ecc3a9cb4cd3a5/${
    id ? id : filter
  }.json`;

  const sendRequest = useCallback(
    async function sendRequest() {
      setIsFetching(true);
      try {
        const filteredData = await sendGetRequest<T>(url, filter);
        setData(filteredData);
      } catch (error) {
        setError("There was a problem fetching data from the DHIS2 API");
      }
      setIsFetching(false);
    },
    [url]
  );

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  return {
    data,
    isFetching,
    error,
  };
}
