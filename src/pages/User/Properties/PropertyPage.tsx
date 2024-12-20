import {
  Card,
  Container,
  GridItem,
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
  MapPin,
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
import Related from "./Related";

const PropertyFeature = ({
  label,
  isAvailable,
  value,
}: {
  label: string;
  isAvailable?: boolean;
  value?: string;
}) => {
  return (
    <HStack>
      <Text fontWeight={500} fontSize={"16px"}>
        {label}:
      </Text>
      {!value && (
        <Icon boxSize={6} asChild>
          {isAvailable ? (
            <CheckCircle weight="fill" color="green" />
          ) : (
            <XCircle weight="fill" color="red" />
          )}
        </Icon>
      )}
      {value && (
        <Text fontWeight={500} fontSize={"16px"}>
          {value}
        </Text>
      )}
    </HStack>
  );
};

const PropertyPage = () => {
  const { id } = useParams();

  const currenLanguage = localStorage.getItem("language") ?? "en";

  const {
    data: propertyDetail,
    isPending,
    isFetching,
  } = useGetPropertyDetails(id, currenLanguage);

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
        <Stack w={"full"}>
          <Image
            src={mainImage}
            alt={propertyDetail?.data?.title}
            maxH={"500px"}
            aspectRatio={16 / 9}
            w={"full"}
          />
          {(propertyDetail?.data?.images?.length ?? 0) > 0 && (
            <Container maxW={{ base: "100vw", md: "80vw", xl: "75vw" }}>
              <HStack
                pos={"relative"}
                w={"full"}
                justify={"center"}
                maxW={"95dvw"}
                mx={"auto"}
              >
                <HStack
                  css={{
                    "&::-webkit-scrollbar": {
                      display: "none",
                    },
                  }}
                  ref={imageContainerRef}
                  maxW={"95dvw"}
                  overflowX={"auto"}
                >
                  <IconButton
                    position="absolute"
                    left={-4}
                    top="50%"
                    transform="translateY(-50%)"
                    float={"left"}
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
                    zIndex={999999}
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
              </HStack>

              {/* <div>
                <Image
                  src="https://via.placeholder.com/200"
                  alt="Property Image"
                />
              </div> */}
            </Container>
          )}
        </Stack>

        <HStack
          justify={"space-between"}
          flexWrap={"wrap"}
          align={"start"}
          gap={4}
          w={"100%"}
        >
          <Stack>
            <Text textStyle={"heading"}>{propertyDetail?.data?.title}</Text>
            <HStack>
              <Icon asChild boxSize={6}>
                <MapPin />
              </Icon>
              <Text>{propertyDetail?.data?.address}</Text>
            </HStack>
          </Stack>
          <Text textStyle={"heading"}>Rs. {propertyDetail?.data?.price}</Text>
        </HStack>

        <SimpleGrid columns={{ base: 1, md: 3 }} gap={5}>
          <GridItem colSpan={2} order={{ base: 2, md: 1 }}>
            <Text fontWeight={500} fontSize={"20px"}>
              {currenLanguage === "en" ? "Description" : "विवरण"}
            </Text>
            <Text textAlign={"start"} fontSize={"16px"}>
              {parse(propertyDetail?.data?.description ?? "")}
            </Text>
          </GridItem>
          <GridItem colSpan={1} order={{ base: 1, md: 2 }}>
            <Card.Root shadow={"xs"}>
              <Card.Body>
                <SimpleGrid
                  minChildWidth={"150px"}
                  columns={{ base: 2, md: 4 }}
                  gap={5}
                >
                  <PropertyFeature
                    label={
                      currenLanguage === "en" ? "Built Year" : "निर्माण वर्ष"
                    }
                    value={propertyDetail?.data?.built_year}
                  />
                  <PropertyFeature
                    label={
                      currenLanguage === "en" ? "Land Area" : "जग्गा क्षेत्रफल"
                    }
                    value={propertyDetail?.data?.land_area}
                  />

                  <PropertyFeature
                    label={currenLanguage === "en" ? "Floors" : "तल"}
                    value={propertyDetail?.data?.floor}
                  />

                  <PropertyFeature
                    label={
                      currenLanguage === "en" ? "Road Access" : "सडक पहुँच"
                    }
                    isAvailable={
                      propertyDetail?.data?.is_road_access ? true : false
                    }
                  />
                  <PropertyFeature
                    label={
                      currenLanguage === "en" ? "Parking Space" : "पार्किंग"
                    }
                    isAvailable={
                      propertyDetail?.data?.is_parking ? true : false
                    }
                  />
                  <PropertyFeature
                    label={currenLanguage === "en" ? "Garden" : "बगैंचा"}
                    isAvailable={propertyDetail?.data?.is_garden ? true : false}
                  />
                  <PropertyFeature
                    label={currenLanguage === "en" ? "Furnished" : "सुसज्जित"}
                    isAvailable={
                      propertyDetail?.data?.is_furnished ? true : false
                    }
                  />
                </SimpleGrid>
              </Card.Body>
            </Card.Root>
          </GridItem>
        </SimpleGrid>
      </Container>
      <FAQs faqs={propertyDetail?.data?.faqs ?? []} />
      <Related />
      <Queries />
    </Stack>
  );
};

export default PropertyPage;
