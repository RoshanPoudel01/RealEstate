import {
  DrawerBody,
  DrawerHeader,
  Icon,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { List } from "@phosphor-icons/react";
import {
  DrawerBackdrop,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerRoot,
  DrawerTrigger,
} from "@realState/components/ui/drawer";
import { Switch } from "@realState/components/ui/switch";
import { useState } from "react";
import NavItem from "./NavItem";
import { navLinks } from "./navLinks";

const MobileNav = () => {
  const [open, setOpen] = useState(false);

  const changeLanguageHandler = () => {
    const lang = localStorage.getItem("language") === "np" ? "en" : "np";
    localStorage.setItem("language", lang);
    // i18next.changeLanguage(lang);
    window.location.reload();
  };
  return (
    <DrawerRoot
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      size={"xs"}
      placement={"end"}
      restoreFocus={false}
    >
      <DrawerTrigger hideFrom={"md"} asChild>
        <IconButton variant={"outline"}>
          <Icon boxSize={6} asChild>
            <List />
          </Icon>
        </IconButton>
      </DrawerTrigger>

      <DrawerBackdrop />
      <DrawerContent w={"full"} maxW={"250px"}>
        <DrawerHeader>
          <DrawerCloseTrigger />
        </DrawerHeader>
        <DrawerBody>
          <Stack
            flexDir={{
              base: "column",
              md: "row",
            }}
            align={"center"}
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
                  />
                </Stack>
              );
            })}
          </Stack>
        </DrawerBody>
        <DrawerFooter>
          <Switch
            hideBelow={"md"}
            colorPalette="primary"
            size="lg"
            trackLabel={{
              on: <Text>NP</Text>,
              off: <Text>EN</Text>,
            }}
            checked={localStorage.getItem("language") === "np"}
            onChange={changeLanguageHandler}
          />
        </DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
  );
};

export default MobileNav;
