import { Flex, Spinner } from "@chakra-ui/react";

import { Suspense, useEffect } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import {
  useAuthentication,
  useLogoutMutation,
} from "../../services/service-auth";
import Login from "../Admin/Login";
import { appRoutes, userRoutes } from "./appRoutes";
import { NAVIGATION_ROUTES } from "./navigationRoutes";

export default function App() {
  const {
    // data: isAuthenticated,
    isLoading: isAuthLoading,
    refetch: checkTokenAndRefresh,
  } = useAuthentication();

  const isAuthenticated = true;
  const { mutate: logoutUser } = useLogoutMutation();

  //   const {
  //     data: initData,
  //     isLoading: isInitDataLoading,
  //     isError: isInitDataError,
  //   } = useFetchInitData(!!isAuthenticated);

  //   const pageNotFoundProps = useMemo(() => {
  //     return {
  //       isLoading: isInitDataLoading,
  //       isError: isInitDataError,
  //     };
  //   }, [isInitDataLoading, isInitDataError]);

  useEffect(() => {
    if (typeof isAuthenticated === "boolean" && !isAuthenticated) {
      localStorage.getItem("token") ? logoutUser() : null;
    }
  }, [isAuthenticated]);

  useEffect(() => {
    let iID = null as null | NodeJS.Timeout;
    if (isAuthenticated) {
      iID = setInterval(() => checkTokenAndRefresh(), 30_000);
    }

    return () => {
      if (iID) {
        clearInterval(iID);
      }
    };
  }, [isAuthenticated, checkTokenAndRefresh]);

  if (isAuthLoading) {
    return (
      <Flex justifyContent={"center"} alignItems="center" height={"100vh"}>
        <Spinner />
      </Flex>
    );
  }
  console.log(isAuthenticated);
  return (
    <Suspense
      fallback={
        <Flex justifyContent={"center"} alignItems="center" height={"100vh"}>
          <Spinner />
        </Flex>
      }
    >
      <>
        <Routes>
          {!isAuthenticated ? (
            <>
              {appRoutes.map((route, index) => {
                return (
                  <Route key={index} path={route.path} element={route.element}>
                    {route.children &&
                      route.children.map((childRoute, childIndex) => (
                        <Route
                          key={childIndex}
                          path={childRoute?.path}
                          element={childRoute?.element}
                          {...(childRoute?.index && {
                            index: childRoute.index,
                          })}
                        />
                      ))}
                  </Route>
                );
              })}
            </>
          ) : (
            <>
              <Route path="/" element={<Outlet />}>
                <Route index element={<Login />} />
                <Route path={NAVIGATION_ROUTES.LOGIN2} element={<Login />} />
              </Route>
              <Route
                path="*"
                element={<Navigate to={NAVIGATION_ROUTES.LOGIN} replace />}
              />
              {userRoutes.map((route, index) => {
                return (
                  <Route key={index} path={route.path} element={route.element}>
                    {route.children &&
                      route.children.map((childRoute, childIndex) => (
                        <Route
                          key={childIndex}
                          path={childRoute?.path}
                          element={childRoute?.element}
                          {...(childRoute?.index && {
                            index: childRoute.index,
                          })}
                        />
                      ))}
                  </Route>
                );
              })}
            </>
          )}
        </Routes>
      </>
    </Suspense>
  );
}
