import { api } from "./service-api";
import { useFetch, useMutate } from "./service-form-methods";
import { RootResponse, SingleResponse } from "./service-interface";

export interface StatisticsBackResponse {
  id: number;
  value: string;
  title_en: string;
  title_np: string;
  image: string;
}

const useFetchStatistics = () => {
  return useFetch<RootResponse<StatisticsBackResponse>>({
    url: api.statistics.index,
    queryKey: ["statistics"],
  });
};

const useFetchStatisticsById = (id: string | undefined) => {
  return useFetch<SingleResponse<StatisticsBackResponse>>({
    url: api.statistics.byId.replace(":id", id ?? ""),
    queryKey: ["statistic"],
    enabled: !!id,
  });
};

const useUpdateStatistics = () => {
  return useMutate({
    url: api.statistics.byId,
    method: "POST",
    invalidates: ["statistics"],
  });
};

export { useFetchStatistics, useFetchStatisticsById, useUpdateStatistics };
