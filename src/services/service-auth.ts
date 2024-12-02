import { AxiosError } from "axios";
import { BroadcastChannel } from "broadcast-channel";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toastFail, toastSuccess } from "../components/Toast";
import { api } from "./service-api";
import { RealStateHttpClient } from "./service-axios";
import TokenService, { StateTokenDetails } from "./service-token";

const logoutChannel = new BroadcastChannel("logout");
const loginChannel = new BroadcastChannel("login");
export interface LoginDetails {
  username: string | null;
  password: string;
}
export interface NeoToken {
  userDetails: UserDetails;
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}

export interface UserDetails {
  id: number;
  username: string;
}

export const authTokenKey = "authToken";
const authTokenDetails = "authTokenDetails";

const initLogout = () => {
  return RealStateHttpClient.get(api.auth.logout);
};

const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(initLogout, {
    onSuccess: (success) => {
      TokenService.clearToken();
      logoutChannel.postMessage("Logout");
      queryClient.clear();
      queryClient.setQueryData(authTokenKey, () => false);
      toastSuccess(success?.data?.message);
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      const logoutErr = error as AxiosError<{ message: string }>;
      toastFail(logoutErr.response?.data?.message ?? "Logout failed !");
    },
  });
};

const initLogin = (loginData: LoginDetails) => {
  return RealStateHttpClient.post(api.auth.login, {
    ...loginData,
    workspace: "INTERNAL",
  });
};

const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation(initLogin, {
    onSuccess: (response) => {
      loginChannel.postMessage("Login");
      const tokens = {
        accessToken: response?.data?.data?.accessToken,
        refreshToken: response?.data?.data?.refreshToken,
      };
      TokenService.setToken(tokens);
      queryClient.setQueryData(authTokenKey, () => true);
      navigate("/", { replace: true });
    },
    onError: (error) => {
      const loginErr = error as AxiosError<{ message: string; error: string }>;

      toastFail(loginErr.response?.data?.message ?? "Login failed !");
    },
  });
};

const initRefreshToken = async () => {
  try {
    const response = await RealStateHttpClient.post(api.auth.refreshToken, {
      refreshToken: TokenService.getToken()?.refreshToken,
    });
    const tokens = {
      accessToken: response?.data?.data?.accessToken,
      refreshToken: response?.data?.data?.refreshToken,
    };
    TokenService.setToken(tokens);
    return true;
  } catch (error) {
    return false;
  }
};

const checkAuthentication = async () => {
  if (TokenService.isAuthenticated()) {
    const tokenInfo = TokenService.getTokenDetails();

    if (tokenInfo && tokenInfo.exp * 1000 < Date.now() + 5 * 60 * 1000) {
      return initRefreshToken();
    }
    return Promise.resolve(true);
  }
  return Promise.resolve(null);
};

/**
 * Check if user is authenticated
 * @returns boolean
 */
const useAuthentication = () => {
  const queryClient = useQueryClient();

  return useQuery(authTokenKey, checkAuthentication, {
    onSuccess: () => {
      const tokenDetails = TokenService.getTokenDetails();

      if (tokenDetails) {
        queryClient.setQueryData<StateTokenDetails>(authTokenDetails, {
          ...tokenDetails,
        });
      }
    },
  });
};

const useLoginTokenDetailQuery = () => {
  return useQuery<unknown, unknown, StateTokenDetails>(authTokenDetails);
};

export {
  initLogout,
  useAuthentication,
  useLoginMutation,
  useLoginTokenDetailQuery,
  useLogoutMutation,
};
