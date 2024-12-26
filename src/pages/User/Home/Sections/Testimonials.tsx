import { Box } from "@chakra-ui/react";
import TestimonialCard from "@realState/components/Cards/Testimonials";
import SectionWrapper from "@realState/components/Wrapper/SectionWrapper";
import { useFetchAllTestimonials } from "@realState/services/service-testimonial";
import Carousel from "react-multi-carousel";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const responsive = {
  wide: {
    breakpoint: { max: 3000, min: 1100 },
    items: 3,
  },

  tablet: {
    breakpoint: { max: 1100, min: 480 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 480, min: 0 },
    items: 1,
  },
};

const TestimonialSection = () => {
  const { data: testimonials, isLoading } = useFetchAllTestimonials();
  const currenLanguage = localStorage.getItem("language");
  return (
    <SectionWrapper
      title={
        currenLanguage === "en" ? "See Our Review" : "हाम्रो समीक्षा हेर्नुहोस्"
      }
      heading={
        currenLanguage === "en"
          ? "What Our Users Say About Us"
          : "हाम्रा प्रयोगकर्ताहरूले हाम्रो बारेमा के भन्छन्"
      }
      content={
        <Box pos={"relative"} my={10} w={"full"} maxW={"95dvw"}>
          {(testimonials?.data?.rows.length ?? 0 > 0) && !isLoading ? (
            <Carousel
              responsive={responsive}
              slidesToSlide={1}
              infinite
              autoPlay
              arrows
              ssr={false}
              draggable
              autoPlaySpeed={5000}
              renderDotsOutside
              showDots
              // removeArrowOnDeviceType={["tablet", "mobile"]}
              containerClass="container"
            >
              {testimonials?.data?.rows?.map((testimonial, index) => (
                <Box key={index} mx={2}>
                  <TestimonialCard data={testimonial} key={index} />
                </Box>
              ))}
            </Carousel>
          ) : null}
        </Box>
      }
    />
  );
};

export default TestimonialSection;
