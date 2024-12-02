// import { useStoreInitData } from "@neo/store/initData";
// import { AxiosError } from "axios";
// import { useQuery } from "react-query";

// export interface Module {
//   moduleCode: string;
//   moduleName: string;
//   scopes: string;
// }
// export interface IInitData {
//   name: string;
//   role: string;
//   moduleList: any[];
// }

// const fetchInitData = () => () => {
//   return NeoHttpClient.get<NeoResponse<IInitData>>(api.init);
// };

// const useFetchInitData = (enabled?: boolean) => {
//   const { setInitData } = useStoreInitData();

//   return useQuery([api.init], fetchInitData(), {
//     enabled: enabled,
//     retry: 1,
//     select: ({ data }) => data?.data || {},
//     onSuccess: (data: IInitData) => {
//       setInitData(data);
//     },
//     onError: (error: AxiosError) => {
//       console.error(error);
//     }
//   });
// };

// export { useFetchInitData };
