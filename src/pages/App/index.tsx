import { Flex, Spinner } from "@chakra-ui/react";

import { Suspense, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  useAuthentication,
  useLogoutMutation,
} from "../../services/service-auth";
import Login from "../Admin/Login";
import { adminRoutes, userRoutes } from "./appRoutes";
import { NAVIGATION_ROUTES } from "./navigationRoutes";

export default function App() {
  const { data: isAuthenticated, isPending: isAuthLoading } =
    useAuthentication();

  const { mutate: logoutUser } = useLogoutMutation();

  useEffect(() => {
    if (typeof isAuthenticated === "boolean" && !isAuthenticated) {
      localStorage.getItem("token") ? logoutUser() : null;
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const language = localStorage.getItem("language");
    if (!language) {
      localStorage.setItem("language", "en");
    }
  }, []);

  if (isAuthLoading) {
    return (
      <Flex justifyContent={"center"} alignItems="center" height={"100vh"}>
        <Spinner />
      </Flex>
    );
  }

  const appRoutes = isAuthenticated
    ? [...userRoutes, ...adminRoutes]
    : userRoutes;
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
          {appRoutes.map((route, index) => {
            return (
              <Route key={index} path={route?.path} element={route?.element}>
                {route?.children &&
                  route?.children.map((childRoute, childIndex) => (
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
          {!isAuthenticated && (
            <>
              <Route path={NAVIGATION_ROUTES.LOGIN2} element={<Login />} />
              <Route
                path="*"
                element={<Navigate to={NAVIGATION_ROUTES.LOGIN} replace />}
              />
            </>
          )}
        </Routes>
      </>
    </Suspense>
  );
}
