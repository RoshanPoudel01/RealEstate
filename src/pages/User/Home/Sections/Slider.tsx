import { Box, Flex, Separator, Text } from "@chakra-ui/react";
import LazyLoadImage from "@realState/components/Image";
import SectionWrapper from "@realState/components/Wrapper/SectionWrapper";
import { useFetchFrontSliders } from "@realState/services/service-sliders";
import Carousel from "react-multi-carousel";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const responsive = {
  all: {
    breakpoint: { max: 4000, min: 0 },
    items: 1,
  },
};

const SliderSection = () => {
  const { data: sliders, isLoading } = useFetchFrontSliders();
  const currenLanguage = localStorage.getItem("language");
  return (
    <SectionWrapper
      title={
        currenLanguage === "en"
          ? "Explore Our Latest Updates"
          : "हाम्रा पछिल्ला अपडेटहरू हेर्नुहोस्"
      }
      heading={
        currenLanguage === "en"
          ? "Our Featured Highlights"
          : "हाम्रा प्रमुख झलकहरू"
      }
      content={
        <Box pos={"relative"} my={10} w={"full"} maxW={"95dvw"}>
          {(sliders?.data?.rows.length ?? 0 > 0) && !isLoading ? (
            <Carousel
              responsive={responsive}
              autoPlaySpeed={4000}
              slidesToSlide={1}
              infinite
              autoPlay
              arrows={false}
              // removeArrowOnDeviceType={["tablet", "mobile"]}
              containerClass="container"
              transitionDuration={4000}
            >
              {sliders?.data?.rows?.map((slider, index) => (
                <Box key={index} mx={2} pos={"relative"}>
                  <LazyLoadImage
                    aspectRatio={21 / 9}
                    src={slider.image ?? ""}
                    key={index}
                  />
                  <Flex
                    pos={"absolute"}
                    bottom={{ base: 2, sm: 6 }}
                    left={4}
                    bg={"whiteAlpha.900"}
                    color={"#000"}
                    p={2}
                    fontSize={"md"}
                    textAlign={"center"}
                    w={"max-content"}
                    maxW={"90%"}
                  >
                    <Separator
                      borderColor={"#000"}
                      orientation={"vertical"}
                      mx={2}
                      borderWidth={2}
                      height={"20px"}
                    />
                    <Text fontSize={{ base: "sm", sm: "md" }}>
                      {currenLanguage === "en"
                        ? slider.title_en
                        : slider.title_np}
                    </Text>
                  </Flex>
                </Box>
              ))}
            </Carousel>
          ) : null}
        </Box>
      }
    />
  );
};

export default SliderSection;
