import { Box } from "@chakra-ui/react";
import TestimonialCard from "@realState/components/Cards/Testimonials";
import SectionWrapper from "@realState/components/Wrapper/SectionWrapper";
import { useFetchAllTestimonials } from "@realState/services/service-testimonial";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
const TestimonialSection: React.FC = () => {
  const settings = {
    dots: true,
    centerMode: true,
    infinite: true,
    centerPadding: "10px",
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
    arrows: false,
    className: "noOverflow",
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },

      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const { data: testimonials } = useFetchAllTestimonials();
  const currenLanguage = localStorage.getItem("language");
  return (
    <>
      <SectionWrapper
        title={
          currenLanguage === "en"
            ? "See Our Review"
            : "हाम्रो समीक्षा हेर्नुहोस्"
        }
        heading={
          currenLanguage === "en"
            ? "What Our Users Say About Us"
            : "हाम्रा प्रयोगकर्ताहरूले हाम्रो बारेमा के भन्छन्"
        }
        content={
          <Box mt={10}>
            <Slider {...settings}>
              {testimonials?.data?.rows?.map((testimonial, index) => (
                <TestimonialCard data={testimonial} key={index} />
              ))}
            </Slider>
          </Box>
        }
      />
    </>
  );
};

export default TestimonialSection;
