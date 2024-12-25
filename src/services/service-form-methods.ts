import { toastFail, toastSuccess } from "@realState/components/Toast";
import {
  keepPreviousData,
  MutationKey,
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { RealStateHttpClient } from "./service-axios";

interface IQueryProps {
  url: string;
  invalidates?: string[];
  defaultMessage?: boolean;
  message?: string;
  enabled?: boolean;
  queryKey?: QueryKey | MutationKey;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
}

export interface IData<T> {
  id?: string | number | null;
  data?: T;
}

//getMethod

const useFetch = <T>({ url, enabled, queryKey }: IQueryProps) => {
  const fetchData = (): Promise<AxiosResponse<T>> => {
    return RealStateHttpClient.get(url);
  };
  return useQuery({
    queryKey: queryKey ?? [url],
    queryFn: fetchData,
    select: (response) => response.data,
    placeholderData: keepPreviousData,
    enabled: enabled ?? true,
  });
};

const useMutate = <T>({
  url,
  invalidates,
  defaultMessage,
  message,
  method,
  queryKey,
}: IQueryProps) => {
  const queryClient = useQueryClient();
  const sendData = ({ id, data }: IData<T>): Promise<AxiosResponse<any>> => {
    return method === "PUT"
      ? RealStateHttpClient.put(url.replace(":id", id as string), data)
      : method === "DELETE"
        ? RealStateHttpClient.delete(url.replace(":id", id as string))
        : method === "PATCH"
          ? RealStateHttpClient.patch(url.replace(":id", id as string), data)
          : method === "POST" && id
            ? RealStateHttpClient.post(url.replace(":id", id as string), data)
            : RealStateHttpClient.post(url, data);
  };

  return useMutation({
    mutationKey: queryKey ?? [url],
    mutationFn: sendData,
    onSuccess: (response) => {
      if (invalidates) {
        invalidates.forEach((endpoint) => {
          queryClient.invalidateQueries({
            queryKey: [endpoint],
          });
        });
      }
      if (!defaultMessage && message) {
        toastSuccess(message);
      } else if (defaultMessage && !message) {
        toastSuccess((response.data as { message: string }).message);
      }
    },
    onError: (error: AxiosError<{ error: string; message: string }>) => {
      toastFail(
        error?.response?.data?.message ??
          "An error occurred. Please try again later"
      );
    },
  });
};

export { useFetch, useMutate };
