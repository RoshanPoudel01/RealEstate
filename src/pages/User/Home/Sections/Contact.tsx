import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { imageAssets } from "@realState/assets/images";
import { Button } from "@realState/components/ui/button";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <Flex
      bg={`url(${imageAssets.BackgroundImage})`}
      bgSize={"cover"}
      py={10}
      w={"full"}
      align={"center"}
      justify={"center"}
      minH={"400px"}
      pos={"relative"}
    >
      {/* Overlay */}
      <Box
        position={"absolute"}
        top={0}
        left={0}
        width={"100%"}
        height={"100%"}
        bg={"blackAlpha.700"} // Adjust opacity as needed
        zIndex={1}
      />
      <Stack textAlign={"center"} align={"center"} zIndex={2} gap={4}>
        <Text fontSize={"3xl"} color={"white"}>
          Have a question?
        </Text>
        <Text fontSize={"lg"} color={"white"}>
          We are here to help
        </Text>
        <Button
          className="dark"
          variant={"outline"}
          colorPalette={"gray"}
          size="lg"
          asChild
        >
          <Link to="/contact">Contact Us</Link>
        </Button>
      </Stack>
    </Flex>
  );
};

export default Contact;
