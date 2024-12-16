import { Box, Flex, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { imageAssets } from "@realState/assets/images";
import InfoCard from "@realState/components/Cards/InfoCard";
import { Button } from "@realState/components/ui/button";
import { Link } from "react-router-dom";
import Featured from "./Sections/Featured";
import New from "./Sections/New";
import Service from "./Sections/Service";
import Statistics from "./Sections/Statistics";
import TestimonialSection from "./Sections/Testimonials";

const Home = () => {
  return (
    <Stack p={0} gap={9}>
      <Box position={"relative"} zIndex={2}>
        <HStack gap={0}>
          <Box bg="#E4E3E8" height={"700px"} w={"900px"} />
          <Image
            height={"700px"}
            w={"full"}
            src={imageAssets.BackgroundImage}
            alt="background"
          />
        </HStack>
        <Stack
          position={"absolute"}
          top={{
            base: "17%",
            md: "20%",
          }}
          left={"13%"}
        >
          <Text
            fontSize={{
              base: "35px",
              md: "50px",
            }}
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
            colorPalette={"primary"}
            size={"lg"}
            fontSize={"20px"}
            display={{
              base: "none",
              md: "flex",
            }}
            asChild
          >
            <Link to="/all-properties">View Properties</Link>
          </Button>
        </Stack>
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
        gap={12}
      >
        <Statistics />
        <Featured />
        <TestimonialSection />
        <Service />
        <New />
      </Stack>
    </Stack>
  );
};

export default Home;
