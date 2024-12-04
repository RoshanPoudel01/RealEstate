import {
  House,
  Images,
  Package,
  Rectangle,
  SquaresFour,
  Users,
} from "@phosphor-icons/react";

export const sidebarItems = [
  {
    title: "Dashboard",
    icon: <House />,
    to: "/",
  },
  {
    title: "Sliders",
    icon: <Images />,
    to: "/sliders",
  },
  {
    title: "Sections",
    icon: <Rectangle />,
    to: "/sections",
  },

  {
    title: "Category",
    icon: <SquaresFour />,
    to: "/category",
  },
  {
    title: "Services",
    icon: <Package />,
    to: "/services",
  },

  {
    title: "Teams",
    icon: <Users />,
    to: "/teams",
  },
];
