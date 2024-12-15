import { useStoreSettingData } from "@realState/store";
import { useQuery } from "@tanstack/react-query";
import { api } from "./service-api";
import { baseURL, RealStateHttpClient } from "./service-axios";
import { SingleResponse } from "./service-interface";
import { SettingResponse } from "./service-setting";

export interface Module {
  moduleCode: string;
  moduleName: string;
  scopes: string;
}
export interface ISettingData {
  name: string;
  role: string;
  moduleList: any[];
}

const fetchSettingData = (language: string) => {
  return RealStateHttpClient.get<SingleResponse<SettingResponse>>(
    `${baseURL}/${api.settings.front}`,
    {
      params: {
        lang: language,
      },
    }
  );
};

const useFetchSettingData = (language: string) => {
  const { setSettingData } = useStoreSettingData();

  return useQuery({
    queryKey: ["settingData"],
    queryFn: async () => {
      const settingData = await fetchSettingData(language);
      setSettingData(settingData?.data?.data);
      return settingData?.data;
    },
    retry: 1,
  });
};

export { useFetchSettingData };
