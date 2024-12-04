import { PageNotFound } from "@realState/components/Common/PageNotFound";
import AdminWrapper from "@realState/components/Wrapper/AdminWrapper";
import Dashboard from "../Admin/Dashboard";
import Login from "../Admin/Login";
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
      {
        path: NAVIGATION_ROUTES.LOGIN2,
        element: <Login />,
      },

      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
];
