import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import LoadingCard from "@realState/components/Cards/LoadingCard";
import PropertyCard from "@realState/components/Cards/Property";
import { useFetchRelatedProperties } from "@realState/services/service-properties";
import { t } from "i18next";
import Carousel from "react-multi-carousel";
import { useParams } from "react-router-dom";

const responsive = {
  wide: {
    breakpoint: { max: 3000, min: 1280 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 1280, min: 720 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 720, min: 480 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 480, min: 0 },
    items: 1,
  },
};

const Related = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return null;
  }

  const currenLanguage = localStorage.getItem("language") ?? "en";

  const { data: relatedProperties, isLoading } = useFetchRelatedProperties(
    id,
    currenLanguage
  );
  return (
    <Stack
      w={"full"}
      maxW={{ base: "95dvw", md: "90vw", xl: "85dvw" }}
      mx={"auto"}
      my={5}
      gap={8}
    >
      <Stack gap={4} align={"center"} textAlign={"center"}>
        <Heading color={"primary.500"} fontSize={{ base: "xl", md: "3xl" }}>
          {t("related:heading")}
        </Heading>
        <Text>{t("related:description")}</Text>
      </Stack>
      <Box pos={"relative"}>
        <Carousel
          responsive={responsive}
          showDots
          renderDotsOutside
          autoPlaySpeed={5000}
          slidesToSlide={1}
          infinite
          removeArrowOnDeviceType={["tablet", "mobile"]}
          autoPlay
          transitionDuration={2000}
        >
          {isLoading
            ? [...Array(3)].fill(0).map((_, index) => (
                <Box key={index} mr={4}>
                  <LoadingCard key={index} />
                </Box>
              ))
            : relatedProperties?.data.rows.map((item, index) => (
                <Box mx={"auto"} maxW={"90dvw"} mr={{ sm: 4 }} key={index}>
                  <PropertyCard key={index} property={item} />
                </Box>
              ))}
        </Carousel>
      </Box>
    </Stack>
  );
};

export default Related;
