import {
  Container,
  Flex,
  HStack,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";

import LazyLoadImage from "@realState/components/Image";
import { SkeletonText } from "@realState/components/ui/skeleton";
import { useFetchFrontSection } from "@realState/services/service-sections";
import {
  StatisticsFrontResponse,
  useFetchFrontStatistics,
} from "@realState/services/service-statistics";
import Counter from "@realState/utils/Counter";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import OurTeam from "./OurTeam";

const About = () => {
  const currentLanguage = localStorage.getItem("language");
  const { data: statistics, isLoading } = useFetchFrontStatistics(
    currentLanguage ?? "en"
  );

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const { data: aboutSection, isLoading: isLoadingSection } =
    useFetchFrontSection("about-section", currentLanguage ?? "en");

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [data, setData] = useState<StatisticsFrontResponse[]>([]);

  useEffect(() => {
    if (statistics) {
      const filterData = statistics?.data?.rows.filter(
        (stat) =>
          stat.slug !== "sold-monthly" && stat.slug !== "satisfied-customers"
      );
      setData(filterData ?? []);
    }
  }, [statistics]);
  return (
    <Stack>
      <Flex pos={"relative"} bg={"blackAlpha.300"}>
        <LazyLoadImage
          aspectRatio={{ base: "16/9", md: 21 / 9 }}
          src={aboutSection?.data?.image ?? ""}
          alt={"About Us"}
          minH={"300px"}
          maxH={"700px"}
        />
      </Flex>
      <Flex
        align={"center"}
        justify={"center"}
        maxW={"90dvw"}
        mx={"auto"}
        flexDir={windowWidth < 860 ? "column" : "row"}
        bg={"whiteAlpha.900"}
        borderRadius={12}
        p={{ base: 4, md: 10 }}
        gap={12}
        flexWrap={"wrap"}
        boxShadow={"xl"}
        transform={windowWidth < 860 ? "translateY(-10%)" : "translateY(-60%)"}
      >
        {isLoadingSection || isLoading
          ? [...Array(3)].fill(2).map((_, index) => (
              <HStack key={index} gap={12}>
                <SkeletonText w={"200px"} noOfLines={3} />
                <Separator
                  display={index === 2 || windowWidth < 860 ? "none" : "block"}
                  orientation={"vertical"}
                  h={"100px"}
                  borderColor={"blackAlpha.300"}
                />
              </HStack>
            ))
          : data?.map((item, index) => (
              <HStack gap={12} key={index}>
                <Stack align={"center"}>
                  <Counter initialValue={item.value} />

                  <Text
                    fontSize={{ base: "18px", sm: "20px", md: "22px" }}
                    fontWeight={500}
                    textAlign={"center"}
                  >
                    {item.title}
                  </Text>
                </Stack>
                <Separator
                  display={
                    data?.length - 1 === index || windowWidth < 860
                      ? "none"
                      : "block"
                  }
                  orientation={"vertical"}
                  h={"100px"}
                  borderColor={"blackAlpha.300"}
                />
              </HStack>
            ))}
      </Flex>
      <Container
        transform={windowWidth < 860 ? "translateY(0%)" : "translateY(-2%)"}
        maxW={"container.xl"}
        gap={4}
      >
        <Stack>
          <Text textAlign={"center"} textStyle={"heading"} fontWeight={700}>
            {aboutSection?.data?.title}
          </Text>
          <Text textAlign={"center"} textStyle={"caption"}>
            {aboutSection?.data?.caption}
          </Text>
        </Stack>
        <Text textStyle={"body"} py={10} as={"div"}>
          {parse(aboutSection?.data?.description ?? "")}
        </Text>
        <OurTeam />
      </Container>
    </Stack>
  );
};

export default About;
