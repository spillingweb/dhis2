import { useState, useEffect, useCallback } from "react";

async function sendHttpRequest(url: string) {
  const response = await fetch(url);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(
      resData.message || "Something went wrong, failed to send request"
    );
  }

  return resData;
}

export default function useHttp(url : string, filter: string) {
  const [data, setData] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState('');

  const sendRequest = useCallback(
    async function sendRequest() {
      setIsFetching(true);
      try {
        const resData = await sendHttpRequest(url);
        console.log('sendt an http request!', resData[filter]);
        setData(resData[filter]);
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
};
