import { api } from "./service-api";
import { useFetch, useMutate } from "./service-form-methods";
import { RootResponse, SingleResponse } from "./service-interface";
import { StatisticsBackResponse } from "./service-statistics";

export interface SettingResponse {
  id: number;
  email: string;
  facebook: string;
  instagram: string;
  youtube: string;
  google_map: string;
  name: string;
  phone: string;
  address: string;
  description: string;
  logo: string;
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
  return useFetch<RootResponse<StatisticsBackResponse>>({
    url: api.settings.statistics,
    queryKey: ["statistics"],
  });
};

export { useFetchSetting, useFetchStatistics, useUpdateSetting };
