import { Center, Container, Icon, Stack, Text } from "@chakra-ui/react";
import { Images } from "@phosphor-icons/react";
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
      alignContent={"center"}
      py={10}
    >
      {isLoading ? (
        <SkeletonText alignSelf={"center"} w={"300px"} noOfLines={2} />
      ) : (
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
            {gallery?.data.title}
          </Text>
          <Text fontSize={"21px"} fontWeight={400} lineHeight={"35px"}>
            {gallery?.data.description}
          </Text>
        </Stack>
      )}
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
              <LazyLoadImage
                key={index}
                alt={item.image ?? ""}
                src={item.image ?? ""}
              />
            ))}
      </Masonry>
    </Container>
  );
};

export default GalleryDetails;
