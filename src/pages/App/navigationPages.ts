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
  () => import("@realState/pages/User/Properties/PropertyPage")
);
const PROPERTIES = lazy(() => import("@realState/pages/Admin/Properties"));
const PROPERTY_FORM = lazy(
  () => import("@realState/pages/Admin/Properties/Form")
);
const TESTIMONIALS = lazy(() => import("@realState/pages/Admin/Testimonials"));
const ADD_FEATURED = lazy(
  () => import("@realState/pages/Admin/Properties/Featured")
);
const ADD_TRENDING = lazy(
  () => import("@realState/pages/Admin/Properties/Trending")
);
const ADD_NEW = lazy(() => import("@realState/pages/Admin/Properties/New"));
const CONTACT = lazy(() => import("@realState/pages/User/Contact"));
const ENQUIRIES = lazy(
  () => import("@realState/pages/Admin/Properties/Enquiries")
);
const MESSAGES = lazy(() => import("@realState/pages/Admin/Messages"));
const STATISTICS = lazy(() => import("@realState/pages/Admin/Statistics"));
const STATISTICS_FORM = lazy(
  () => import("@realState/pages/Admin/Statistics/Form")
);
const SECTIONS = lazy(() => import("@realState/pages/Admin/Sections"));
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
  TESTIMONIALS,
  ADD_FEATURED,
  ADD_TRENDING,
  ADD_NEW,
  CONTACT,
  ENQUIRIES,
  MESSAGES,
  STATISTICS,
  STATISTICS_FORM,
  SECTIONS,
};
