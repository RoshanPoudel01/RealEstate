import {
  Building,
  Chat,
  FireSimple,
  House,
  Images,
  Package,
  QuestionMark,
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
    title: "Statistics",
    icon: <ChartLine />,
    to: "/admin/statistics",
  },
  {
    title: "Sliders",
    icon: <Images />,
    to: "/admin/sliders",
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
      },
    ],
  },
  {
    title: "Testimonials",
    icon: <User />,
    to: "/admin/testimonials",
  },
  {
    title: "Enquiries",
    icon: <QuestionMark />,
    to: "/admin/enquiries",
  },
  {
    title: "Messages",
    icon: <Chat />,
    to: "/admin/messages",
  },
];
