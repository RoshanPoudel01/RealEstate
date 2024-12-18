import {
  Container,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  CaretLeft,
  CaretRight,
  CheckCircle,
  XCircle,
} from "@phosphor-icons/react";
import { imageAssets } from "@realState/assets/images";
import LazyLoadImage from "@realState/components/Image";
import { useGetPropertyDetails } from "@realState/services/service-properties";
import Loader from "@realState/utils/Loader";
import parse from "html-react-parser";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import FAQs from "./FAQs";
import Queries from "./Queries";

const PropertyFeature = ({
  label,
  isAvailable,
}: {
  label: string;
  isAvailable: boolean;
}) => {
  return (
    <HStack>
      <Text fontWeight={500} fontSize={"16px"}>
        {label}:
      </Text>
      <Icon boxSize={6} asChild>
        {isAvailable ? (
          <CheckCircle weight="fill" color="green" />
        ) : (
          <XCircle weight="fill" color="red" />
        )}
      </Icon>
    </HStack>
  );
};

const PropertyPage = () => {
  const { id } = useParams();

  const currenLanguage = localStorage.getItem("language");

  const {
    data: propertyDetail,
    isPending,
    isFetching,
  } = useGetPropertyDetails(id);

  const [mainImage, setMainImage] = useState<string>("");

  useEffect(() => {
    if (propertyDetail?.data?.image) {
      setMainImage(propertyDetail.data.image);
    } else if (propertyDetail?.data?.images?.length) {
      setMainImage(propertyDetail.data.images[0].image);
    } else {
      setMainImage(imageAssets.Logo);
    }
  }, [propertyDetail]);

  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Scroll handlers
  const scrollLeft = () => {
    if (imageContainerRef.current) {
      imageContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (imageContainerRef.current) {
      imageContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return isPending || isFetching ? (
    <Loader />
  ) : (
    <Stack>
      <Container
        maxW={{
          base: "90vw",
          md: "85vw",
        }}
        display="flex"
        flexDirection={"column"}
        gap={10}
      >
        <Heading textAlign={"center"}>{propertyDetail?.data?.title}</Heading>

        <Stack w={"full"}>
          <Image
            src={mainImage}
            alt={propertyDetail?.data?.title}
            maxH={"363px"}
            w={"full"}
            objectFit={"contain"}
          />
        </Stack>
        {(propertyDetail?.data?.images?.length ?? 0) > 0 && (
          <Container maxW={{ base: "100vw", md: "80vw", xl: "75vw" }}>
            <HStack
              css={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
              ref={imageContainerRef}
              maxW={"100%"}
              overflowX={"scroll"}
            >
              <IconButton
                position="absolute"
                left={-4}
                top="50%"
                transform="translateY(-50%)"
                zIndex={10}
                size={"xs"}
                variant={"surface"}
                rounded={"full"}
                onClick={scrollLeft}
              >
                <Icon boxSize={6} asChild>
                  <CaretLeft />
                </Icon>
              </IconButton>
              <IconButton
                position="absolute"
                right={-4}
                top="50%"
                transform="translateY(-50%)"
                zIndex={10}
                size={"xs"}
                variant={"surface"}
                rounded={"full"}
                aria-label="Scroll Right"
                onClick={scrollRight}
              >
                <Icon boxSize={6} asChild>
                  <CaretRight />
                </Icon>
              </IconButton>
              {propertyDetail?.data?.image ? (
                <LazyLoadImage
                  w={"100px"}
                  minW={"100px"}
                  aspectRatio={1}
                  src={propertyDetail?.data?.image ?? ""}
                  alt={"Property Image"}
                  onClick={() =>
                    setMainImage(propertyDetail?.data?.image ?? "")
                  }
                  border={
                    mainImage === propertyDetail?.data?.image
                      ? "2px solid #3182CE"
                      : "1px solid transparent"
                  }
                />
              ) : null}
              {propertyDetail?.data?.images.map((image, index) => (
                <LazyLoadImage
                  w={"100px"}
                  minW={"100px"}
                  aspectRatio={1}
                  src={image.image}
                  alt="Property Image"
                  key={index}
                  onClick={() => setMainImage(image.image ?? "")}
                  border={
                    mainImage === image.image
                      ? "1px solid #3182CE"
                      : "1px solid transparent"
                  }
                />
              ))}
            </HStack>

            {/* <div>
                <Image
                  src="https://via.placeholder.com/200"
                  alt="Property Image"
                />
              </div> */}
          </Container>
        )}
        {/* <Stack color="#141B2D" background={"#F3F3FA"} padding={"22px"} w={"70%"}>
        <Text fontWeight={400} fontSize={"17px"}>
          {" "}
          Price :
        </Text>
        <Text fontWeight={700} fontSize={"22px"}>
          Rs. 1000000
        </Text>
      </Stack> */}

        <SimpleGrid columns={{ base: 2, md: 4 }} gap={5}>
          <PropertyFeature
            label={currenLanguage === "en" ? "Road Access" : "सडक पहुँच"}
            isAvailable={propertyDetail?.data?.is_road_access ? true : false}
          />
          <PropertyFeature
            label={currenLanguage === "en" ? "Parking Space" : "पार्किंग"}
            isAvailable={propertyDetail?.data?.is_parking ? true : false}
          />
          <PropertyFeature
            label={currenLanguage === "en" ? "Garden" : "बगैंचा"}
            isAvailable={propertyDetail?.data?.is_garden ? true : false}
          />
          <PropertyFeature
            label={currenLanguage === "en" ? "Furnished" : "सुसज्जित"}
            isAvailable={propertyDetail?.data?.is_furnished ? true : false}
          />
        </SimpleGrid>

        <Text textAlign={"start"} fontSize={"16px"}>
          {parse(propertyDetail?.data?.description ?? "")}
        </Text>
      </Container>
      <FAQs
        faqs={propertyDetail?.data?.faqs ?? []}
        currentLanguage={currenLanguage}
      />
      <Queries />
    </Stack>
  );
};

export default PropertyPage;
