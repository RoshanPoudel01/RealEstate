import {
  Building,
  Chat,
  FireSimple,
  House,
  Images,
  Package,
  QuestionMark,
  Rectangle,
  SquaresFour,
  Star,
  User,
  Users,
} from "@phosphor-icons/react";
import { ChartLine } from "@phosphor-icons/react/dist/ssr";

export const sidebarItems = [
  {
    title: "Dashboard",
    icon: <House />,
    to: "/admin",
  },
  {
    title: "Master",
    icon: <Rectangle />,
    to: "/admin/master",
    subItems: [
      {
        title: "Category",
        icon: <SquaresFour />,
        to: "/admin/category",
      },
      {
        title: "Statistics",
        icon: <ChartLine />,
        to: "/admin/statistics",
      },
      {
        title: "Services",
        icon: <Package />,
        to: "/admin/services",
      },
    ],
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
      },
      {
        title: "Enquiries",
        icon: <QuestionMark />,
        to: "/admin/properties/enquiries",
      },
    ],
  },
  {
    title: "Sections",
    icon: <Rectangle />,
    to: "/admin/sections",
  },

  {
    title: "Sliders",
    icon: <Images />,
    to: "/admin/sliders",
  },

  {
    title: "Teams",
    icon: <Users />,
    to: "/admin/teams",
  },

  {
    title: "Testimonials",
    icon: <User />,
    to: "/admin/testimonials",
  },

  {
    title: "Messages",
    icon: <Chat />,
    to: "/admin/messages",
  },
];
