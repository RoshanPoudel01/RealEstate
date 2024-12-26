import { NAVIGATION_ROUTES } from "@realState/pages/App/navigationRoutes";
import { t } from "i18next";

export const navLinks = [
  {
    label: t("navbar:home"),
    href: NAVIGATION_ROUTES.HOME,
  },
  {
    label: t("navbar:properties"),
    href: NAVIGATION_ROUTES.PROPERTIES,
  },
  {
    label: t("navbar:gallery"),
    href: NAVIGATION_ROUTES.GALLERY,
  },
  {
    label: t("navbar:about"),
    href: NAVIGATION_ROUTES.ABOUT,
  },
  {
    label: t("navbar:contact"),
    href: NAVIGATION_ROUTES.CONTACT,
  },
];
