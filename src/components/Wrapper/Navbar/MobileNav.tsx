import { Icon, IconButton } from "@chakra-ui/react";
import { List } from "@phosphor-icons/react";
import {
  DrawerBackdrop,
  DrawerContent,
  DrawerRoot,
  DrawerTrigger,
} from "@realState/components/ui/drawer";
import { useState } from "react";
import Sidebar from "../Sidebar";

const MobileNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <DrawerRoot
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      size={"xs"}
      placement={"start"}
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
        <Sidebar onClick={() => setOpen(false)} />
      </DrawerContent>
    </DrawerRoot>
  );
};

export default MobileNav;
