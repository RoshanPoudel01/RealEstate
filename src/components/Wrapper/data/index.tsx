import {
  Building,
  FireSimple,
  House,
  Images,
  Package,
  Rectangle,
  SquaresFour,
  Star,
  User,
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

    subItems: [
      {
        title: "Information",
        to: "/admin/properties",
        icon: <Building />,
      },
      {
        title: "New",
        to: "/admin/properties/new",
        icon: <Star />,
      },
      {
        title: "Featured",
        to: "/admin/properties/featured",
        icon: <Star />,
      },
      {
        title: "Trending",
        to: "/admin/properties/trending",
        icon: <FireSimple />,
      }
      
    ]
  },
  {
    title: "Testimonials",
    icon: <User />,
    to: "/admin/testimonials",
  }
];
