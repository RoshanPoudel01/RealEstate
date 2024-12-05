import { Icon } from "@chakra-ui/react";
import { SignOut, User } from "@phosphor-icons/react";
import { Avatar } from "@realState/components/ui/avatar";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@realState/components/ui/menu";
import { useLogoutMutation } from "@realState/services/service-auth";
import { Link } from "react-router-dom";

const UserMenu = () => {
  const { mutateAsync: logout } = useLogoutMutation();
  return (
    <MenuRoot
      lazyMount
      positioning={{
        placement: "bottom-end",
      }}
    >
      <MenuTrigger cursor={"pointer"}>
        <Avatar name="Aadarsh" />
      </MenuTrigger>
      <MenuContent spaceY={1} minW={"150px"}>
        <MenuItem
          asChild
          cursor={"pointer"}
          _hover={{ bg: "bg.emphasized" }}
          value="profile"
          borderRadius={5}
          p={2}
          alignContent={"center"}
        >
          <Link to="/profile">
            <Icon asChild boxSize={5} mr={2}>
              <User />
            </Icon>
            Profile
          </Link>
        </MenuItem>
        <MenuItem
          cursor={"pointer"}
          color="fg.error"
          borderRadius={5}
          _hover={{ bg: "bg.error", color: "fg.error" }}
          onClick={async () => await logout()}
          value="signout"
        >
          <Icon asChild boxSize={5} mr={2}>
            <SignOut />
          </Icon>
          Sign Out
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};

export default UserMenu;
