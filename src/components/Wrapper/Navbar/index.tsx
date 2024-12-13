import { Flex, Image, Stack, Text } from "@chakra-ui/react";
import { imageAssets } from "@realState/assets/images";
import { Switch } from "@realState/components/ui/switch";
import { NAVIGATION_ROUTES } from "@realState/pages/App/navigationRoutes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavItem from "./NavItem";
import { navLinks } from "./navLinks";

// import NavItem from "./NavItem";
// import { navLinks } from "./navLinks";

interface SidebarProps {
  isCollapsed?: boolean;
  isHovered?: boolean;
  labelSideData?: string | number;
  onClose?: () => void;
}

export const parentNavRoutes = {
  account: "/account",
};

export default function NavBar({
  isCollapsed,
  onClose,
  isHovered,
}: SidebarProps) {
  const [activeLink, setActiveLink] = useState("");
  const [activeCollapse, setActiveCollapse] = useState("");
  // const { initData } = useStoreInitData();

  // parentNavList includes the collapsable sidebar elements so that when reloading we can check for and highlight the parent of selected link
  const parentNavList = [{ nav: "Account", url: parentNavRoutes.account }];

  // This useEffect sets the active sidebar link whether it is a normal link or a collapsable link or it is a child of collapsable link
  // activeCollapse checks if the url contains the parentNavList item eg http://example.com/clients/add -> here the url inclides /clients so clients is selected
  // active link selects the label from an object inside navLinks where the current window url includes the href from that object
  // if else is used to fix issue swhel reloading
  useEffect(() => {
    const url = window.location.href;
    setActiveCollapse(
      parentNavList?.find((item) => url.includes(item.url))?.nav ?? ""
    );
    if (window.location.pathname == "/") {
      setActiveLink(
        navLinks?.find((item) => url.includes(item.href))?.label ?? ""
      );
    } else {
      setActiveLink(
        navLinks?.find((item) => item.href != "/" && url.includes(item.href))
          ?.label ?? ""
      );
    }
  }, [window.location.pathname]);

  //   const labelData = [{ navName: "Example", value: 10 }];

  //   const pendingSidebarLabels = (barName: string) => {
  //     const navLabelValue = labelData?.find(item => item.navName == barName);
  //     if (navLabelValue) {
  //       return navLabelValue.value ?? null;
  //     }
  //   };
  const navigate = useNavigate();

  const changeLangugaeHandler = () => {
    const lang = localStorage.getItem("language") === "np" ? "en" : "np";
    localStorage.setItem("language", lang);
    // i18next.changeLanguage(lang);
    window.location.reload();
  };
  return (
    <Flex bg="FFFFFF" position={"sticky"} pt={8}>
      <Stack
        as="nav"
        gap={3}
        px={5}
        flexDir={{
          base: "column",
          md: "row",
        }}
        justifyContent={"space-between"}
        alignItems={"flex-start"}
        w={"full"}
      >
        <Image
          src={imageAssets.Logo}
          alt="Logo"
          height={"50px"}
          onClick={() => navigate(NAVIGATION_ROUTES.HOME)}
          cursor={"pointer"}
        />
        <Stack
          flexDir={{
            base: "column",
            md: "row",
          }}
        >
          {navLinks?.map((nav, index) => {
            return (
              <Stack
                flexDir={{
                  base: "column",
                  md: "row",
                }}
                key={index}
              >
                <NavItem
                  {...nav}
                  label={nav.label}
                  key={nav.href}
                  href={nav.href}
                  collapsed={isCollapsed && !isHovered}
                  onCloseDrawer={onClose}
                  active={{
                    activeLink,
                    setActiveLink,
                    activeCollapse,
                    setActiveCollapse,
                  }}
                />
              </Stack>
            );
          })}
        </Stack>

        <Switch
          colorPalette="blue"
          size="lg"
          trackLabel={{
            on: <Text>NP</Text>,
            off: <Text>EN</Text>,
          }}
          checked={localStorage.getItem("language") === "np"}
          onChange={changeLangugaeHandler}
        />
      </Stack>
    </Flex>
  );
}
