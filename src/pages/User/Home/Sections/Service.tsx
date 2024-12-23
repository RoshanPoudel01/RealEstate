import { Card } from "@chakra-ui/react";
import LoadingCard from "@realState/components/Cards/LoadingCard";
import LazyLoadImage from "@realState/components/Image";
import SectionWrapper from "@realState/components/Wrapper/SectionWrapper";
import { useFetchFrontServices } from "@realState/services/service-services";
import Masonry from "react-layout-masonry";

const Service = () => {
  const currentLanguage = localStorage.getItem("language") ?? "en";

  const { data: services, isLoading } = useFetchFrontServices({
    page: 1,
    perPage: 4,
    language: currentLanguage,
  });

  return (
    <SectionWrapper
      title={currentLanguage === "en" ? "Our Services" : "हाम्रो सेवाहरू"}
      heading={
        currentLanguage === "en"
          ? "We provide the best services for our customers"
          : "हामी हाम्रा ग्राहकहरूका लागि सर्वोत्तम सेवाहरू प्रदान गर्दछौं"
      }
      content={
        <Masonry columns={{ 0: 1, 480: 2, 1060: 4 }} gap={10}>
          {isLoading ? (
            <>{...Array(4).map((_, index) => <LoadingCard key={index} />)}</>
          ) : (
            services?.data?.rows.map((service) => (
              <Card.Root bg={"transparent"} border={"none"} key={service.id}>
                <Card.Header>
                  <LazyLoadImage
                    w={"150px"}
                    aspectRatio={4 / 3}
                    borderRadius={0}
                    src={service.image}
                    alt={service.title}
                    alignSelf={"center"}
                  />
                </Card.Header>
                <Card.Body textAlign={"center"}>
                  <Card.Title>{service.title}</Card.Title>
                  <Card.Description>{service.description}</Card.Description>
                </Card.Body>
              </Card.Root>
            ))
          )}
        </Masonry>
      }
    />
  );
};

export default Service;
