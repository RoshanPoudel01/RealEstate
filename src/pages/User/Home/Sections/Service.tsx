import { Card } from "@chakra-ui/react";
import LoadingCard from "@realState/components/Cards/LoadingCard";
import LazyLoadImage from "@realState/components/Image";
import SectionWrapper from "@realState/components/Wrapper/SectionWrapper";
import { useFetchFrontServices } from "@realState/services/service-services";
import Masonry from "react-layout-masonry";

const Service = () => {
  const { data: services, isLoading } = useFetchFrontServices({
    page: 1,
    perPage: 4,
  });

  const currentLanguage = localStorage.getItem("language");

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
              <Card.Root key={service.id}>
                <Card.Header p={0}>
                  <LazyLoadImage
                    w={"full"}
                    aspectRatio={4 / 3}
                    borderRadius={0}
                    src={service.image}
                    alt={service.title_en}
                  />
                </Card.Header>
                <Card.Body>
                  <Card.Title>
                    {currentLanguage === "np"
                      ? service.title_np
                      : service.title_en}
                  </Card.Title>
                  <Card.Description>
                    {currentLanguage === "np"
                      ? service.description_np
                      : service.description_en}
                  </Card.Description>
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
