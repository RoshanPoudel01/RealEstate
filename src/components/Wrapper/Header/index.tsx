import { Flex, Stack, Text } from "@chakra-ui/react";
import { useStoreHeaderData } from "@realState/store";
import MobileNav from "./MobileNav";
import UserMenu from "./UserMenu";

const Header = () => {
  const { headerData } = useStoreHeaderData();

  return (
    <Flex w={"full"} justify={"space-between"}>
      <MobileNav />
      <Stack gap={0} textAlign={{ base: "center", md: "start" }}>
        <Text
          fontSize={{ base: "xl", sm: "2xl", lg: "4xl" }}
          fontWeight={"bold"}
        >
          {headerData?.heading}
        </Text>
        <Text color={"gray.500"} fontSize={{ base: "sm", md: "md" }}>
          {headerData?.description}
        </Text>
      </Stack>
      <UserMenu />
    </Flex>
  );
};

export default Header;
