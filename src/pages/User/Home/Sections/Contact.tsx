import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { imageAssets } from "@realState/assets/images";
import { Button } from "@realState/components/ui/button";
import { useFetchFrontSection } from "@realState/services/service-sections";
import { Link } from "react-router-dom";

const Contact = () => {
  const currentLang = localStorage.getItem("language") || "en";

  const { data: statSection } = useFetchFrontSection(
    "statistics-section",
    currentLang
  );

  return (
    <Flex
      bg={`url(${statSection?.data?.image ?? imageAssets.BackgroundImage})`}
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
        bg={"blackAlpha.600"} // Adjust opacity as needed
        zIndex={1}
      />
      <Stack textAlign={"center"} align={"center"} zIndex={2} gap={4}>
        <Text
          maxW={{ base: "90%", md: "70%" }}
          fontSize={"3xl"}
          color={"white"}
        >
          {statSection?.data?.title}
        </Text>
        <Text fontSize={"lg"} maxW={{ base: "90%", md: "70%" }} color={"white"}>
          {statSection?.data?.description}
        </Text>
        <Button
          className="dark"
          variant={"outline"}
          colorPalette={"gray"}
          size="lg"
          _hover={{ bg: "gray.50", color: "gray.800" }}
          asChild
        >
          <Link to="/contact">
            {currentLang === "en" ? "Contact Us" : "सम्पर्क गर्नुहोस्"}
          </Link>
        </Button>
      </Stack>
    </Flex>
  );
};

export default Contact;
