import { lazy } from "react";

const SLIDERS = lazy(() => import("@realState/pages/Admin/Sliders"));
const SLIDER_FORM = lazy(() => import("@realState/pages/Admin/Sliders/Form"));
const CATEGORIES = lazy(() => import("@realState/pages/Admin/Category"));
const CATEGORY_FORM = lazy(
  () => import("@realState/pages/Admin/Category/Form")
);
const SERVICES = lazy(() => import("@realState/pages/Admin/Services"));
const SERVICE_FORM = lazy(() => import("@realState/pages/Admin/Services/Form"));
const TEAMS = lazy(() => import("@realState/pages/Admin/Teams"));
const TEAM_FORM = lazy(() => import("@realState/pages/Admin/Teams/Form"));
const SETTINGS = lazy(() => import("@realState/pages/Admin/Settings"));
const PROPERTYPAGE = lazy(
  () => import("@realState/pages/User/Properties/PropertyPage"));
const PROPERTIES = lazy(() => import("@realState/pages/Admin/Properties"));
const PROPERTY_FORM = lazy(
  () => import("@realState/pages/Admin/Properties/Form")
);
export const NAVIGATION_PAGES = {
  SLIDERS,
  SLIDER_FORM,
  CATEGORIES,
  CATEGORY_FORM,
  SERVICES,
  SERVICE_FORM,
  TEAMS,
  TEAM_FORM,
  SETTINGS,
  PROPERTYPAGE,
  PROPERTIES,
  PROPERTY_FORM,
};
