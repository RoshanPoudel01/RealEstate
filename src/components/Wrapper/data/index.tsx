import {
  Building,
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
    to: "/admin",
  },
  {
    title: "Sliders",
    icon: <Images />,
    to: "/admin/sliders",
  },
  {
    title: "Sections",
    icon: <Rectangle />,
    to: "/admin/sections",
  },

  {
    title: "Category",
    icon: <SquaresFour />,
    to: "/admin/category",
  },
  {
    title: "Services",
    icon: <Package />,
    to: "/admin/services",
  },

  {
    title: "Teams",
    icon: <Users />,
    to: "/admin/teams",
  },
  {
    title: "Properties",
    icon: <Building />,
    to: "/admin/properties",
  },
];
