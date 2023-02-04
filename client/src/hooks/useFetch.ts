import { useEffect, useState } from "react";

export const useFetch = (
  endpoint: string,
  queryFunction: () => Promise<any>,
  onSuccess?: () => void
) => {
  const [result, setResult] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getData = async () => {
    try {
      setIsLoading(true);
      const data = await queryFunction();
      if (data) {
        setIsLoading(false);
        setResult(data);
        onSuccess && onSuccess();
      }
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return { isLoading, isError, result };
};
