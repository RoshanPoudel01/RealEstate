import { Flex, HStack, Image, Stack } from "@chakra-ui/react";
import { imageAssets } from "@realState/assets/images";
import { NAVIGATION_ROUTES } from "@realState/pages/App/navigationRoutes";
import { useStoreSettingData } from "@realState/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Language from "./Language";
import MobileNav from "./MobileNav";
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

  const changeLanguageHandler = () => {
    const lang = localStorage.getItem("language") === "np" ? "en" : "np";
    localStorage.setItem("language", lang);
    // i18next.changeLanguage(lang);
    window.location.reload();
  };

  const { settingData } = useStoreSettingData();

  return (
    <Flex position={"sticky"} p={4} align={"center"}>
      <HStack
        as="nav"
        gap={3}
        paddingX={{
          base: "20px",
          sm: "40px",
          lg: "60px",
        }}
        justifyContent={"space-between"}
        align={"center"}
        w={"full"}
      >
        <Image
          src={settingData?.logo ?? imageAssets.Logo}
          alt="Logo"
          height={"50px"}
          onClick={() => navigate(NAVIGATION_ROUTES.HOME)}
          cursor={"pointer"}
        />
        <MobileNav />
        <>
          <Stack
            flexDir={{
              base: "column",
              md: "row",
            }}
            hideBelow={"md"}
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

          <Language />
        </>
      </HStack>
    </Flex>
  );
}
