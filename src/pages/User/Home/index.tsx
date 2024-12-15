import { Box, Flex, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { imageAssets } from "@realState/assets/images";
import InfoCard from "@realState/components/Cards/InfoCard";
import { Button } from "@realState/components/ui/button";
import Featured from "./Sections/Featured";
import TestimonialSection from "./Sections/Testimonials";

const Home = () => {
  return (
    <Stack p={0} gap={9}>
      <Box position={"relative"}>
        <HStack gap={0}>
          <Box bg="#E4E3E8" height={"700px"} w={"900px"} />
          <Image
            height={"700px"}
            w={"full"}
            src={imageAssets.BackgroundImage}
            alt="background"
          />
        </HStack>
        <Text
          position={"absolute"}
          top={{
            base: "5%",
            md: "20%",
          }}
          left={"13%"}
          fontSize={"50px"}
          fontWeight={"bold"}
          textAlign={"start"}
          maxW={"550px"}
          lineHeight={{
            base: "1.2",
            md: "1.5",
          }}
          color={"primary.500"}
        >
          Find the place to live your dreams easily here
        </Text>
        <Text
          position={"absolute"}
          top={{
            base: "40%",
            md: "52%",
          }}
          left={"13%"}
          maxW={"550px"}
          lineHeight={"28px"}
          color={"#7591A3"}
          fontSize={"18px"}
        >
          Everything you need about finding your place to live will be here,
          where it will be easier for you. Everything you need about finding
          your place to live will be here, where it will be easier for you
        </Text>
        <Button
          position={"absolute"}
          top={"70%"}
          left={"13%"}
          bg={"#263640"}
          size={"lg"}
          fontSize={"20px"}
          display={{
            base: "none",
            md: "block",
          }}
        >
          View Properties
        </Button>
        <Flex
          flexDir={{
            base: "column",
            md: "row",
          }}
          position={"absolute"}
          bottom={{
            base: "4%",
            md: "12%",
          }}
          right={"18%"}
          gap={10}
        >
          <InfoCard
            img={imageAssets.Logo}
            title="56 Houses"
            description="Sold Monthly"
          />
          <InfoCard
            img={imageAssets.Logo}
            title="200"
            description="Satisfied Customer"
          />
        </Flex>
      </Box>
      <Stack
        px={{
          base: "10px",
          md: "80px",
        }}
        gap={9}
      >
        <Featured />
        <TestimonialSection />
      </Stack>
    </Stack>
  );
};

export default Home;
