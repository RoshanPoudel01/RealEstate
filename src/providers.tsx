import { HStack, Text } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";

import { Button } from "@chakra-ui/react";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import { toastFail } from "./components/Toast";
import { Provider } from "./components/ui/provider";

import TokenService, { authTokenKey } from "./services/service-token";
import { globalStyles } from "./theme/global";

const ErrorFallback = () => {
  return (
    <HStack alignItems="center" justifyContent="center" role="alert">
      <Text>Ooops, something went wrong :( </Text>
      <Button
        className="mt-4"
        onClick={() => window.location.assign(window.location.origin)}
      >
        Refresh
      </Button>
    </HStack>
  );
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      staleTime: 30 * 1000,
    },
  },
  queryCache: new QueryCache({
    onError: async (error) => {
      const isAuthenticated = TokenService.isAuthenticated();
      const err = error as AxiosError;
      if (
        (err.request?.status === 401 || err.request?.status === 500) &&
        !isAuthenticated
      ) {
        queryClient.setQueryData([authTokenKey], () => false);
        setTimeout(() => {
          TokenService.clearToken();
          queryClient.clear();
          toastFail("Session Expired! Please login again!");
        }, 500);
      }
    },
  }),
});

const Providers = ({ children }: IProviders) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <BrowserRouter>
        <Provider>
          <QueryClientProvider client={queryClient}>
            <Toaster position="bottom-right" />
            <HelmetProvider>{children}</HelmetProvider>
          </QueryClientProvider>
          {globalStyles()}
        </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

interface IProviders {
  children: React.ReactNode;
}

export default Providers;
