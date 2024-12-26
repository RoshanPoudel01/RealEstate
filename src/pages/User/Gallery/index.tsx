import {
  Link as CLink,
  Container,
  HStack,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import LazyLoadImage from "@realState/components/Image";
import { Skeleton, SkeletonText } from "@realState/components/ui/skeleton";
import { useFetchFrontGalleries } from "@realState/services/service-gallery";
import { t } from "i18next";
import Masonry from "react-layout-masonry";
import { Link } from "react-router-dom";

const Gallery = () => {
  const currentLanguage = localStorage.getItem("language") ?? "en";

  const { data: galleries, isLoading } =
    useFetchFrontGalleries(currentLanguage);

  return (
    <Container
      maxW={{
        base: "90vw",
        md: "85vw",
      }}
      display="flex"
      flexDirection={"column"}
      gap={10}
      py={4}
    >
      <Stack textAlign={"center"} color={"#141B2D"} gap={0}>
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
      <Masonry gap={12} columns={{ 0: 1, 480: 2, 900: 3, 1400: 4 }}>
        {isLoading
          ? [...Array(4)].map((_, index) => (
              <Stack key={index} borderRadius={"lg"} overflow={"hidden"}>
                <Skeleton height={"200px"} />
                <SkeletonText noOfLines={2} />
              </Stack>
            ))
          : galleries?.data.rows.map((gallery, index) => (
              <LinkBox
                _hover={{
                  opacity: 0.9,
                }}
                key={index}
                overflow={"hidden"}
                borderRadius={5}
                role="group"
              >
                <LinkOverlay asChild>
                  <Link to={`${gallery.id}`} />
                </LinkOverlay>
                <Stack gap={4}>
                  <LazyLoadImage
                    src={gallery.image ?? ""}
                    title={gallery.title}
                    image={gallery.image}
                    aspectRatio={1}
                    _groupHover={{
                      transform: "scale(1.05)",
                    }}
                    transition={"transform 0.3s ease-in-out"}
                  />
                  <HStack align={"start"} w={"full"} justify={"space-between"}>
                    <Text fontSize={{ base: "14px", md: "16px" }} lineClamp={2}>
                      {gallery.title}
                    </Text>
                    <CLink
                      whiteSpace={"nowrap"}
                      fontSize={{ base: "12px", md: "14px" }}
                      asChild
                    >
                      <Link to={`${gallery.id}`}>
                        {t("gallery:viewDetail")}
                      </Link>
                    </CLink>
                  </HStack>
                </Stack>
              </LinkBox>
            ))}
      </Masonry>
    </Container>
  );
};

export default Gallery;
