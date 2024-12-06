import { AxiosError } from "axios";

const useGetErrors = (error?: AxiosError) => {
  return (
    (
      error?.response?.data as unknown as {
        status?: boolean;
        message?: string;
        errors?: Record<string, string[]>;
      }
    )?.errors ?? {}
  );
};

export default useGetErrors;
