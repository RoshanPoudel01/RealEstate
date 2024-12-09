import {
  chakra,
  Flex,
  HStack,
  Icon,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { colorScheme } from "@realState/theme/colorScheme";
import { Dispatch, SetStateAction, useEffect } from "react";
import { NavLink } from "react-router-dom";

export interface NavItemProps {
  icon?: any;
  href: string;
  code?: string;
  label: string;
  collapsed?: boolean;
  isNotLink?: boolean;
  childNav?: NavItemProps[];
  isChild?: boolean;
  parentNav?: string;
  active?: {
    activeLink: string;
    setActiveLink: Dispatch<SetStateAction<string>>;
    activeCollapse: string;
    setActiveCollapse: Dispatch<SetStateAction<string>>;
  };
  onCloseDrawer?: () => void;
}

export default function NavItem({
  href,
  label,
  collapsed,
  isNotLink,
  childNav,
  parentNav,
  isChild,
  active,
  onCloseDrawer,
}: NavItemProps) {
  const { open, onToggle, onClose, onOpen } = useDisclosure();

  const Link = chakra(NavLink);

  useEffect(() => {
    if (label != active?.activeCollapse && active?.activeCollapse != "") {
      onClose();
    } else if (isNotLink && label == active?.activeCollapse) onOpen();
  }, [active?.activeCollapse]);

  const handleNavLinkClick = (e: React.MouseEvent) => {
    onCloseDrawer && onCloseDrawer();

    if (isNotLink) {
      e.preventDefault();
      onToggle();
    } else {
      if (isChild) {
        active?.setActiveCollapse(parentNav ?? "");
      } else {
        active?.setActiveCollapse("");
      }
      active?.setActiveLink(label);
    }
  };

  // Determine if the current link is active
  const isCurrentLinkActive =
    active?.activeLink === label &&
    (window.location.pathname === "/"
      ? false
      : window.location.href.includes(href));

  return (
    <VStack>
      <Link
        as={NavLink}
        end={!isNotLink}
        to={isNotLink ? "#" : href}
        {...(isNotLink ? {} : { onClick: handleNavLinkClick })}
        data-active={isCurrentLinkActive}
        css={{
          position: "relative",
          width: "100%",
          padding: "0.5rem 1rem",
          transition: "all 0.3s ease-in-out",
          // Base hover styles
          '&[data-active="true"]': {
            "&:after": {
              width: "73%",
              bg: "gray.800",
            },
          },
          "&:hover": {
            borderRadius: "10px",
            "& p": {
              color: { base: "black", md: colorScheme.white },
            },
            "&:after": {
              width: "73%",
            },
          },
          "&:after": {
            position: "absolute",
            content: '""',
            bottom: 0,
            mx: "auto",
            width: 0,
            left: 3,
            height: "2px",
            bg: "gray.500",
            transition: "all 0.4s ease-in-out",
          },
        }}
        _hover={{
          textDecoration: "none",
        }}
      >
        <HStack justifyContent="space-between">
          <HStack alignItems="center" flex={1}>
            <HStack
              justifyContent={"space-between"}
              alignItems={"center"}
              w={"100%"}
            >
              {isNotLink ? (
                <MenuRoot>
                  <MenuTrigger color={colorScheme.white}>
                    <Flex gap={2}>
                      {label}
                      <Icon
                        height={"20px"}
                        width={"20px"}
                        transform={open ? "rotate(90deg)" : ""}
                      />
                    </Flex>
                  </MenuTrigger>
                  <Stack bg={"primary.300"} minW={"auto"}>
                    {childNav?.map((child, index) => (
                      <MenuItem
                        key={`child-nav${index}`}
                        bg={"primary.300"}
                        value={label}
                      >
                        <NavItem
                          {...child}
                          isChild
                          active={active}
                          parentNav={label}
                        />
                      </MenuItem>
                    ))}
                  </Stack>
                </MenuRoot>
              ) : (
                <Text
                  color={{ base: "black", md: colorScheme.white }}
                  textStyle={"normalStyle"}
                  fontSize={"14px"}
                  whiteSpace="nowrap"
                  visibility={collapsed ? "hidden" : "visible"}
                >
                  {label}
                </Text>
              )}
            </HStack>
          </HStack>
        </HStack>
      </Link>
    </VStack>
  );
}
