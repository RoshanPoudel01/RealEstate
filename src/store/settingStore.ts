import { SettingResponse } from "@realState/services/service-setting";
import { create } from "zustand";

interface ISettingDataStore {
  settingData?: SettingResponse;
  setSettingData: (settingData: SettingResponse) => void;
}

export const useStoreSettingData = create<ISettingDataStore>((set) => ({
  settingData: undefined,
  setSettingData: (settingData) => set((state) => ({ ...state, settingData })),
}));
