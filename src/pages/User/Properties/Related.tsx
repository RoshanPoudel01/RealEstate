import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { imageAssets } from "@realState/assets/images";
import LoadingCard from "@realState/components/Cards/LoadingCard";
import PropertyCard from "@realState/components/Cards/Property";
import { useFetchRelatedProperties } from "@realState/services/service-properties";
import { t } from "i18next";
import Carousel from "react-multi-carousel";
import { useParams } from "react-router-dom";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1280 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1280, min: 480 },
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
      <Box>
        <Carousel
          responsive={responsive}
          showDots
          renderDotsOutside
          autoPlaySpeed={5000}
          slidesToSlide={1}
          infinite
          rewind
          rewindWithAnimation
          arrows
          autoPlay
          transitionDuration={2000}
        >
          {isLoading
            ? [...Array(3)]
                .fill(0)
                .map((_, index) => <LoadingCard key={index} />)
            : relatedProperties?.data.rows.map((item, index) => (
                <PropertyCard
                  key={index}
                  id={item?.id}
                  title={item?.title}
                  price={item?.price}
                  img={item?.image ?? imageAssets.Logo}
                  objectFit={item?.image ? "cover" : "contain"}
                  address={item?.address}
                  city={item?.city}
                  status={item.status}
                />
              ))}
        </Carousel>
      </Box>
    </Stack>
  );
};

export default Related;