import { useStoreInitData } from "@realState/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { api } from "./service-api";
import { RealStateHttpClient, baseURL } from "./service-axios";
import TokenService from "./service-token";
export const authTokenKey = "authTokenKey";
export const authTokenDetails = "authTokenDetails";
export const Authorities = {
  superadmin: "superadmin",
  admin: "admin",
};
export interface ILogin {
  email: string;
  password: string;
}

const initLogin = (data: ILogin) => {
  return RealStateHttpClient.post(api.auth.login, data);
};

const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: [api.auth.login],
    mutationFn: initLogin,
    onSuccess: (response) => {
      const token = {
        token: response.data.token,
        expiresIn: new Date().getTime() + 60 * 60 * 1000,
      };
      TokenService.setToken(token);
      queryClient.setQueryData([authTokenKey], () => true);
      navigate("/", { replace: true });
    },
    onError: (error) => {
      const err = error as AxiosError<{ error: string; message: string }>;

      toast.error(
        err.response?.data.message ?? err.response?.data.error ?? "Login Failed"
      );
    },
  });
};

const initLogout = () => {
  try {
    TokenService.clearToken();
    return Promise.resolve(true);
  } catch (error) {
    return Promise.resolve(false);
  }
};

const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: initLogout,
    onSuccess: () => {
      queryClient.clear();
      queryClient.setQueryData([authTokenKey], () => false);
      navigate("/login", { replace: true });
    },
    onError: () => {
      toast.error("Logout Failed");
    },
  });
};

const checkAuthentication = async () => {
  if (TokenService.isAuthenticated()) {
    const tokenInfo = TokenService.getToken();
    if (tokenInfo && tokenInfo.expiresIn > Date.now()) {
      return Promise.resolve(true);
    } else {
      TokenService.clearToken();
      return Promise.resolve(false);
    }
  } else {
    return Promise.resolve(false);
  }
};

/**
 * Check if user is authenticated
 * @returns boolean
 */

const useAuthentication = () => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: [authTokenKey],
    queryFn: async () => {
      const authStatus = await checkAuthentication();
      const tokenDetails = TokenService.getToken();
      if (tokenDetails) {
        queryClient.setQueryData([authTokenDetails], {
          ...tokenDetails,
        });
      }
      return authStatus;
    },
  });
};

const fetchInitData = () => {
  return RealStateHttpClient.get(`${baseURL}/${api.auth.me}`);
};

const useFetchInitData = (enabled: boolean) => {
  const { setInitData } = useStoreInitData();

  return useQuery({
    queryKey: ["initData"],
    queryFn: async () => {
      const initData = await fetchInitData();
      setInitData(initData?.data?.user);
      return initData?.data;
    },
    enabled,
    retry: 1,
  });
};

export {
  checkAuthentication,
  useAuthentication,
  useFetchInitData,
  useLogin,
  useLogoutMutation,
};
