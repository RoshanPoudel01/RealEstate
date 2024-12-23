import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { imageAssets } from "@realState/assets/images";
import InfoCard from "@realState/components/Cards/InfoCard";
import { Button } from "@realState/components/ui/button";
import { Skeleton } from "@realState/components/ui/skeleton";
import { useFetchFrontSection } from "@realState/services/service-sections";
import {
  StatisticsFrontResponse,
  useFetchFrontStatistics,
} from "@realState/services/service-statistics";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Contact from "./Sections/Contact";
import Featured from "./Sections/Featured";
import New from "./Sections/New";
import Service from "./Sections/Service";
import Statistics from "./Sections/Statistics";
import TestimonialSection from "./Sections/Testimonials";

const Home = () => {
  const currentLang = localStorage.getItem("language") ?? "en";

  const { data: heroSection, isLoading } = useFetchFrontSection(
    "hero-section",
    currentLang
  );

  const { data: statistics } = useFetchFrontStatistics(currentLang);
  const [data, setData] = useState<StatisticsFrontResponse[]>([]);

  useEffect(() => {
    if (statistics) {
      const filterData = statistics?.data?.rows.filter(
        (stat) =>
          stat.slug === "sold-monthly" || stat.slug === "satisfied-customers"
      );
      setData(filterData ?? []);
    }
  }, [statistics]);

  return (
    <Stack p={0} gap={9}>
      {isLoading ? (
        <Skeleton h={"700px"} />
      ) : (
        <Box
          bg={`url(${heroSection?.data?.image ?? imageAssets.BackgroundImage})`}
          position={"relative"}
          zIndex={2}
          bgRepeat={"no-repeat"}
          bgSize={"cover"}
          h={"700px"}
        >
          <Stack
            position={"absolute"}
            top={{
              base: "14%",
              md: "18%",
            }}
            left={"10%"}
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
              {heroSection?.data?.title}
            </Text>
            <Text
              maxW={"550px"}
              lineHeight={"28px"}
              color={"#7591A3"}
              fontSize={"18px"}
            >
              {heroSection?.data?.description}
            </Text>
            <Button colorPalette={"primary"} asChild>
              <Link to="/all-properties">
                {currentLang === "en"
                  ? "View All Properties"
                  : "सबै वस्तुहरू हेर्नुहोस्"}
              </Link>
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
              title={data[0]?.value}
              description={data[0]?.title}
            />
            <InfoCard
              img={imageAssets.Logo}
              title={data[1]?.value}
              description={data[1]?.title}
            />
          </Flex>
        </Box>
      )}
      <Stack gap={12}>
        <Statistics />
        <Featured />
        <TestimonialSection />
        <Service />
        <Contact />
        <New />
      </Stack>
    </Stack>
  );
};

export default Home;
