import { Flex, HStack, Image } from "@chakra-ui/react";
import { imageAssets } from "@realState/assets/images";
import { NAVIGATION_ROUTES } from "@realState/pages/App/navigationRoutes";
import { NavLink } from "react-router-dom";
import MobileNav from "./MobileNav";

const Navbar = () => {
  return (
    <Flex w={"full"} justify={"space-between"}>
      <HStack
        textAlign={{ base: "center", md: "start" }}
        justifyContent={"space-between"}
      >
        <Image src={imageAssets.Logo} height={"50px"} />
        <HStack>
          <NavLink to={NAVIGATION_ROUTES.PROPERTIES}>Properties</NavLink>
        </HStack>
      </HStack>
      <MobileNav />
    </Flex>
  );
};

export default Navbar;
