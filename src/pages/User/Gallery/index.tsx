import { Center, Link as CLink, HStack, Stack, Text } from "@chakra-ui/react";
import LazyLoadImage from "@realState/components/Image";
import { Skeleton, SkeletonText } from "@realState/components/ui/skeleton";
import { useFetchFrontGalleries } from "@realState/services/service-gallery";
import { t } from "i18next";
import Masonry from "react-layout-masonry";
import { Link } from "react-router-dom";

const Gallery = () => {
  const { data: galleries, isLoading } = useFetchFrontGalleries();

  return (
    <Center flexDir={"column"} gap={4}>
      <Stack
        textAlign={"center"}
        color={"#141B2D"}
        py={{
          base: "10px",
          md: "50px",
        }}
        gap={0}
      >
        <Text
          color={"primary.400"}
          fontSize={"50px"}
          lineHeight={"69px"}
          fontWeight={700}
        >
          {t("gallery:heading")}
        </Text>
        <Text fontSize={"21px"} fontWeight={400} lineHeight={"35px"}>
          {t("gallery:description")}
        </Text>
      </Stack>
      <Masonry columns={{ 0: 1, 480: 2, 900: 3, 1400: 4 }}>
        {isLoading
          ? [...Array(10)].map((_, index) => (
              <Stack key={index} borderRadius={"lg"} overflow={"hidden"}>
                <Skeleton height={"200px"} />
                <SkeletonText noOfLines={2} />
              </Stack>
            ))
          : galleries?.data.rows.map((gallery) => (
              <Stack>
                <LazyLoadImage
                  src={gallery.image ?? ""}
                  title={gallery.title}
                  image={gallery.image}
                />
                <HStack justify={"space-between"}>
                  <Text lineClamp={2}>{gallery.title}</Text>
                  <CLink asChild>
                    <Link to={`${gallery.id}`}>{t("gallery:viewDetail")}</Link>
                  </CLink>
                </HStack>
              </Stack>
            ))}
      </Masonry>
    </Center>
  );
};

export default Gallery;
