import { PageNotFound } from "@realState/components/Common/PageNotFound";
import AdminWrapper from "@realState/components/Wrapper/AdminWrapper";
import LayoutWrapper from "@realState/components/Wrapper/LayoutWrapper";
import Dashboard from "../Admin/Dashboard";
import About from "../User/About";
import Home from "../User/Home";
import Properties from "../User/Properties";
import { NAVIGATION_PAGES } from "./navigationPages";
import { NAVIGATION_ROUTES } from "./navigationRoutes";

export const adminRoutes = [
  {
    path: "/admin",
    element: <AdminWrapper />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },

      {
        path: NAVIGATION_ROUTES.ADMIN_SLIDERS,

        element: <NAVIGATION_PAGES.SLIDERS />,
      },
      {
        path: NAVIGATION_ROUTES.ADMIN_SLIDERS + "/create",
        element: <NAVIGATION_PAGES.SLIDER_FORM />,
      },
      {
        path: NAVIGATION_ROUTES.ADMIN_SLIDERS + "/edit/:id",
        element: <NAVIGATION_PAGES.SLIDER_FORM />,
      },
      {
        path: NAVIGATION_ROUTES.ADMIN_CATEGORY,
        element: <NAVIGATION_PAGES.CATEGORIES />,
      },
      {
        path: NAVIGATION_ROUTES.ADMIN_CATEGORY + "/create",
        element: <NAVIGATION_PAGES.CATEGORY_FORM />,
      },
      {
        path: NAVIGATION_ROUTES.ADMIN_CATEGORY + "/edit/:id",
        element: <NAVIGATION_PAGES.CATEGORY_FORM />,
      },
      {
        path: NAVIGATION_ROUTES.ADMIN_SERVICES,
        element: <NAVIGATION_PAGES.SERVICES />,
      },
      {
        path: NAVIGATION_ROUTES.ADMIN_SERVICES + "/create",
        element: <NAVIGATION_PAGES.SERVICE_FORM />,
      },
      {
        path: NAVIGATION_ROUTES.ADMIN_SERVICES + "/edit/:id",
        element: <NAVIGATION_PAGES.SERVICE_FORM />,
      },
      {
        path: NAVIGATION_ROUTES.ADMIN_TEAMS,
        element: <NAVIGATION_PAGES.TEAMS />,
      },
      {
        path: NAVIGATION_ROUTES.ADMIN_TEAMS + "/create",
        element: <NAVIGATION_PAGES.TEAM_FORM />,
      },
      {
        path: NAVIGATION_ROUTES.ADMIN_TEAMS + "/edit/:id",
        element: <NAVIGATION_PAGES.TEAM_FORM />,
      },
      {
        path: NAVIGATION_ROUTES.ADMIN_SETTINGS,
        element: <NAVIGATION_PAGES.SETTINGS />,
      },

      {
        path: NAVIGATION_ROUTES.ADMIN_PROPERTIES,
        element: <NAVIGATION_PAGES.PROPERTIES />,
      },
      {
        path: NAVIGATION_ROUTES.ADMIN_PROPERTIES + "/create",
        element: <NAVIGATION_PAGES.PROPERTY_FORM />,
      },
      {
        path: NAVIGATION_ROUTES.ADMIN_PROPERTIES + "/create/:id",
        element: <NAVIGATION_PAGES.PROPERTY_FORM />,
      },
      {
        path: NAVIGATION_ROUTES.ADMIN_PROPERTIES + "/edit/:id",
        element: <NAVIGATION_PAGES.PROPERTY_FORM />,
      },
      {
        path: NAVIGATION_ROUTES.ADMIN_PROPERTIES + "/featured",
        element: <NAVIGATION_PAGES.ADD_FEATURED />,
      },
      {
        path: NAVIGATION_ROUTES.ADMIN_PROPERTIES + "/trending",
        element: <NAVIGATION_PAGES.ADD_TRENDING />,
      },
      {
        path: NAVIGATION_ROUTES.ADMIN_PROPERTIES + "/new",
        element: <NAVIGATION_PAGES.ADD_NEW />,
      },
      {
        path: NAVIGATION_ROUTES.ADMIN_TESTIMONIALS,
        element: <NAVIGATION_PAGES.TESTIMONIALS />,
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
        path: NAVIGATION_ROUTES.PROPERTY_DETAILS,
        element: <NAVIGATION_PAGES.PROPERTYPAGE />,
      },
      {
        path: NAVIGATION_ROUTES.CONTACT,
        element: <NAVIGATION_PAGES.CONTACT />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
];
