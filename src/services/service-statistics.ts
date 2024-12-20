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

export interface StatisticsFrontResponse {
  id: number;
  value: string;
  slug: string;
  title: string;
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

const useFetchFrontStatistics = (lang = "en") => {
  return useFetch<RootResponse<StatisticsFrontResponse>>({
    url: api.statistics.front(lang),
    queryKey: ["statistics"],
  });
};

export {
  useFetchFrontStatistics,
  useFetchStatistics,
  useFetchStatisticsById,
  useUpdateStatistics,
};
