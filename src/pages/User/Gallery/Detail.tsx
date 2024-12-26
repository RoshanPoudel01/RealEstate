import { Center, Container, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { Images } from "@phosphor-icons/react";
import Fancybox from "@realState/components/Fancybox";
import LazyLoadImage from "@realState/components/Image";
import { EmptyState } from "@realState/components/ui/empty-state";
import { Skeleton, SkeletonText } from "@realState/components/ui/skeleton";
import { useFetchGalleryImages } from "@realState/services/service-gallery";
import Masonry from "react-layout-masonry";
import { useParams } from "react-router-dom";
const NotFound = () => {
  return (
    <Center minH={"70dvh"}>
      <EmptyState
        icon={
          <Icon asChild boxSize={12}>
            <Images />
          </Icon>
        }
        title={"Gallery Not Found"}
        description="The gallery you are looking for is not available"
      />
    </Center>
  );
};

const GalleryDetails = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <NotFound />;
  }
  const currentLanguage = localStorage.getItem("language") ?? "en";
  const { data: gallery, isLoading } = useFetchGalleryImages({
    id,
    lang: currentLanguage,
  });

  if (!isLoading && !gallery) {
    return <NotFound />;
  }

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
      {isLoading ? (
        <SkeletonText
          height={"20px"}
          alignSelf={"center"}
          w={"300px"}
          noOfLines={2}
        />
      ) : (
        <Stack textAlign={"center"} color={"#141B2yD"}>
          <Text
            color={"primary.400"}
            fontSize={"50px"}
            lineHeight={"69px"}
            fontWeight={700}
          >
            {gallery?.data.title}
          </Text>
          <Text
            fontSize={{
              base: "16px",
              lg: "18px",
            }}
            mx={"auto"}
            color={"gray.800"}
            fontWeight={400}
            maxW={{ md: "70%" }}
          >
            {gallery?.data.description}
          </Text>
        </Stack>
      )}
      <Fancybox>
        <Masonry gap={6} columns={{ 0: 1, 480: 2, 900: 3, 1400: 4 }}>
          {isLoading
            ? [...Array(4)].map((_, index) => (
                <Skeleton
                  key={index}
                  borderRadius={"lg"}
                  overflow={"hidden"}
                  height={"200px"}
                />
              ))
            : gallery?.data.images.map((item, index) => (
                <Flex borderRadius={5} key={index} overflow={"hidden"} asChild>
                  <a href={item.image} data-fancybox="gallery">
                    <LazyLoadImage
                      key={index}
                      alt={item.image ?? ""}
                      src={item.image ?? ""}
                      transition={"all 0.3s"}
                      _hover={{
                        transform: "scale(1.05)",
                      }}
                    />
                  </a>
                </Flex>
              ))}
        </Masonry>
      </Fancybox>
    </Container>
  );
};

export default GalleryDetails;