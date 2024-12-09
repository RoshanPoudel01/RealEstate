import { create } from "zustand";

interface IHeaderData {
  heading?: string;
  description?: string;
}

interface IHeaderDataStore {
  headerData?: IHeaderData;
  setHeaderData: (headerData: IHeaderData) => void;
}

export const useStoreHeaderData = create<IHeaderDataStore>((set) => ({
  headerData: undefined,
  setHeaderData: (headerData) => set((state) => ({ ...state, headerData })),
}));
