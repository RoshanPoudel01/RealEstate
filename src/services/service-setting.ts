import { api } from "./service-api";
import { useFetch, useMutate } from "./service-form-methods";
import { RootResponse, SingleResponse } from "./service-interface";

export interface SettingResponse {
  id: number;
  logo: string;
  email: string;
  facebook: string;
  instagram: string;
  youtube: string;
  google_map: string;
  name_en: string;
  name_np: string;
  phone_en: string;
  phone_np: string;
  address_en: string;
  address_np: string;
  description_en: string;
  description_np: string;
}

export interface StatisticsResponse {
  id: number;
  value: string;
  title_en: string;
  title_np: string;
}

const useFetchSetting = () => {
  return useFetch<SingleResponse<SettingResponse>>({
    url: api.settings.fetch,
    queryKey: ["settings"],
  });
};

const useUpdateSetting = () => {
  return useMutate({
    url: api.settings.update,
    method: "POST",
    invalidates: ["settings"],
  });
};

const useFetchStatistics = () => {
  return useFetch<RootResponse<StatisticsResponse>>({
    url: api.settings.statistics,
    queryKey: ["statistics"],
  });
};

export { useFetchSetting, useFetchStatistics, useUpdateSetting };
