import { PageNotFound } from "@realState/components/Common/PageNotFound";
import AdminWrapper from "@realState/components/Wrapper/AdminWrapper";
import LayoutWrapper from "@realState/components/Wrapper/LayoutWrapper";
import Dashboard from "../Admin/Dashboard";
import About from "../User/About";
import Home from "../User/Home";
import Properties from "../User/Properties";
import { NAVIGATION_PAGES } from "./navigationPages";
import { NAVIGATION_ROUTES } from "./navigationRoutes";

export const appRoutes = [
  {
    path: "/admin",
    element: <AdminWrapper />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },

      {
        path: NAVIGATION_ROUTES.SLIDERS,

        element: <NAVIGATION_PAGES.SLIDERS />,
      },
      {
        path: NAVIGATION_ROUTES.SLIDERS + "/create",
        element: <NAVIGATION_PAGES.SLIDERFORM />,
      },
      {
        path: NAVIGATION_ROUTES.SLIDERS + "/edit/:id",
        element: <NAVIGATION_PAGES.SLIDERFORM />,
      },
      {
        path: NAVIGATION_ROUTES.CATEGORY,
        element: <NAVIGATION_PAGES.CATEGORIES />,
      },
      {
        path: NAVIGATION_ROUTES.CATEGORY + "/create",
        element: <NAVIGATION_PAGES.CATEGORYFORM />,
      },
      {
        path: NAVIGATION_ROUTES.CATEGORY + "/edit/:id",
        element: <NAVIGATION_PAGES.CATEGORYFORM />,
      },
      {
        path: NAVIGATION_ROUTES.SERVICES,
        element: <NAVIGATION_PAGES.SERVICES />,
      },
      {
        path: NAVIGATION_ROUTES.SERVICES + "/create",
        element: <NAVIGATION_PAGES.SERVICEFORM />,
      },
      {
        path: NAVIGATION_ROUTES.SERVICES + "/edit/:id",
        element: <NAVIGATION_PAGES.SERVICEFORM />,
      },
      {
        path: NAVIGATION_ROUTES.TEAMS,
        element: <NAVIGATION_PAGES.TEAMS />,
      },
      {
        path: NAVIGATION_ROUTES.TEAMS + "/create",
        element: <NAVIGATION_PAGES.TEAMFORM />,
      },
      {
        path: NAVIGATION_ROUTES.TEAMS + "/edit/:id",
        element: <NAVIGATION_PAGES.TEAMFORM />,
      },
      {
        path: NAVIGATION_ROUTES.SETTINGS,
        element: <NAVIGATION_PAGES.SETTINGS />,
      },
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
