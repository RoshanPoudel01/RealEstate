import { lazy } from "react";

const SLIDERS = lazy(() => import("@realState/pages/Admin/Sliders"));
const SLIDERFORM = lazy(() => import("@realState/pages/Admin/Sliders/Form"));
const CATEGORIES = lazy(() => import("@realState/pages/Admin/Category"));
const CATEGORYFORM = lazy(() => import("@realState/pages/Admin/Category/Form"));
const SERVICES = lazy(() => import("@realState/pages/Admin/Services"));
const SERVICEFORM = lazy(() => import("@realState/pages/Admin/Services/Form"));
const TEAMS = lazy(() => import("@realState/pages/Admin/Teams"));
const TEAMFORM = lazy(() => import("@realState/pages/Admin/Teams/Form"));
const SETTINGS = lazy(() => import("@realState/pages/Admin/Settings"));
const PROPERTYPAGE = lazy(
  () => import("@realState/pages/User/Properties/PropertyPage")
);
export const NAVIGATION_PAGES = {
  SLIDERS,
  SLIDERFORM,
  CATEGORIES,
  CATEGORYFORM,
  SERVICES,
  SERVICEFORM,
  TEAMS,
  TEAMFORM,
  SETTINGS,
  PROPERTYPAGE,
};
