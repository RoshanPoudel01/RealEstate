import { Box } from "@chakra-ui/react";
import TestimonialCard from "@realState/components/Cards/Testimonials";
import SectionWrapper from "@realState/components/Wrapper/SectionWrapper";
import { useFetchAllTestimonials } from "@realState/services/service-testimonial";
import React from "react";
import Carousel from "react-multi-carousel";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1280 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1280, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const TestimonialSection: React.FC = () => {
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
        <Box mt={10} w={"full"} maxW={"95dvw"}>
          {(testimonials?.data?.rows.length ?? 0 > 0) && !isLoading ? (
            <Carousel
              responsive={responsive}
              showDots
              autoPlaySpeed={5000}
              slidesToSlide={1}
              infinite
              arrows={false}
              autoPlay
              transitionDuration={2000}
            >
              {testimonials?.data?.rows?.map((testimonial, index) => (
                <TestimonialCard data={testimonial} key={index} />
              ))}
            </Carousel>
          ) : null}
        </Box>
      }
    />
  );
};

export default TestimonialSection;
