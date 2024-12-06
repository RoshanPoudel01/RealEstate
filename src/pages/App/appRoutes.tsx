import { PageNotFound } from "@realState/components/Common/PageNotFound";
import AdminWrapper from "@realState/components/Wrapper/AdminWrapper";
import LayoutWrapper from "@realState/components/Wrapper/LayoutWrapper";
import Dashboard from "../Admin/Dashboard";
import About from "../User/About";
import Home from "../User/Home";
import Properties from "../User/Properties";
import { NAVIGATION_ROUTES } from "./navigationRoutes";

export const appRoutes = [
  {
    path: "/",
    element: <AdminWrapper />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      ,
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
];

export const userRoutes = [
  {
    path: "/",
    element: <LayoutWrapper />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: NAVIGATION_ROUTES.HOME,
        element: <Home />,
      },
      {
        path: NAVIGATION_ROUTES.PROPERTIES,
        element: <Properties />,
      },
      {
        path: NAVIGATION_ROUTES.ABOUT,
        element: <About />,
      },

      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
];
