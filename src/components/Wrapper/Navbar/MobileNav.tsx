import {
  DrawerBody,
  DrawerHeader,
  Icon,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import { List } from "@phosphor-icons/react";
import {
  DrawerBackdrop,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerRoot,
  DrawerTrigger,
} from "@realState/components/ui/drawer";
import { useState } from "react";
import Language from "./Language";
import NavItem from "./NavItem";
import { navLinks } from "./navLinks";

const MobileNav = () => {
  const [open, setOpen] = useState(false);

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
          <Language />
        </DrawerBody>
      </DrawerContent>
    </DrawerRoot>
  );
};

export default MobileNav;
