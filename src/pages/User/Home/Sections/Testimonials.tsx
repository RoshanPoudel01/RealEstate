import { Box } from "@chakra-ui/react";
import TestimonialCard from "@realState/components/Cards/Testimonials";
import SectionWrapper from "@realState/components/Wrapper/SectionWrapper";
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

  return (
    <>
      <SectionWrapper
        title="See Our Review"
        heading="What Our Users Say About Us"
        content={
          <Box>
            <Slider {...settings}>
              <div>
                <TestimonialCard />
              </div>
              <div>
                <TestimonialCard />
              </div>
              <div>
                <TestimonialCard />
              </div>
            </Slider>
          </Box>
        }
      />
    </>
  );
};

export default TestimonialSection;
