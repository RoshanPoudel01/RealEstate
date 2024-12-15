import {
  Container,
  Heading,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { CheckCircle, XCircle } from "@phosphor-icons/react";
import { imageAssets } from "@realState/assets/images";
import { useGetPropertyDetails } from "@realState/services/service-properties";
import Loader from "@realState/utils/Loader";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
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

  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 4,
        },
      },

      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 2,
        },
      },

      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          showArrows: false,
        },
      },
    ],
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
        <Heading textAlign={"center"}>
          {currenLanguage === "en"
            ? propertyDetail?.data?.title_en
            : propertyDetail?.data?.title_np}
        </Heading>

        <Stack w={"full"}>
          <Image
            src={propertyDetail?.data?.image ?? imageAssets.Logo}
            alt={propertyDetail?.data?.title_en}
            maxH={"363px"}
            w={"full"}
            objectFit={"contain"}
          />
        </Stack>
        {(propertyDetail?.data?.images?.length ?? 0) > 0 && (
          <Container maxW={{ base: "100vw", md: "80vw", xl: "75vw" }}>
            <Slider {...settings}>
              {propertyDetail?.data?.images?.map((image, index) => (
                <div key={index}>
                  <Image src={image.image} alt="Property Image" />
                </div>
              ))}
              {/* <div>
                <Image
                  src="https://via.placeholder.com/200"
                  alt="Property Image"
                />
              </div> */}
            </Slider>
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
            label="Road Access"
            isAvailable={propertyDetail?.data?.is_road_access ? true : false}
          />
          <PropertyFeature
            label="Parking"
            isAvailable={propertyDetail?.data?.is_parking ? true : false}
          />
          <PropertyFeature
            label="Garden"
            isAvailable={propertyDetail?.data?.is_garden ? true : false}
          />
          <PropertyFeature
            label="Furnished"
            isAvailable={propertyDetail?.data?.is_furnished ? true : false}
          />
        </SimpleGrid>

        <Text textAlign={"start"} fontSize={"16px"}>
          {parse(
            (currenLanguage === "en"
              ? propertyDetail?.data?.description_en
              : propertyDetail?.data?.description_np) ?? ""
          )}
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
