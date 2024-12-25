import {
  Building,
  Chat,
  FireSimple,
  House,
  Images,
  Note,
  Package,
  QuestionMark,
  Rectangle,
  ShieldCheck,
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
        title: "Services",
        icon: <Package />,
        to: "/admin/services",
      },
      {
        title: "Statistics",
        icon: <ChartLine />,
        to: "/admin/statistics",
      },

      {
        title: "T & C",
        icon: <Note />,
        to: "/admin/terms-and-conditions",
      },
      {
        title: "Privacy Policy",
        icon: <ShieldCheck />,
        to: "/admin/privacy-policy",
      },
      {
        title: "About Us",
        icon: <User />,
        to: "/admin/about-us",
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
