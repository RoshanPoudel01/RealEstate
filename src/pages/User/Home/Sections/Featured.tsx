import { Center, Heading, HStack } from "@chakra-ui/react";
import LoadingCard from "@realState/components/Cards/LoadingCard";
import PropertyCard from "@realState/components/Cards/Property";
import SectionWrapper from "@realState/components/Wrapper/SectionWrapper";
import { useFetchAllProperties } from "@realState/services/service-properties";
import Masonry from "react-layout-masonry";

const Featured = () => {
  const currenLanguage = localStorage.getItem("language");
  const { data: featuredProperties, isLoading } = useFetchAllProperties({
    propertyType: "featured",
    language: currenLanguage ?? "en",
  });
  return (
    <>
      <SectionWrapper
        title={
          currenLanguage === "en" ? "Our Recommendations" : "हाम्रो सिफारिसहरू"
        }
        heading={currenLanguage === "en" ? "Featured Houses" : "विशेष घरहरू"}
        viewAllText={currenLanguage === "en" ? "View All" : "सबै हेर्नुहोस्"}
        viewAllNavigation="/all-properties/featured"
        content={
          <>
            <HStack>
              {isLoading &&
                [1, 2, 3].map((_, index) => <LoadingCard key={index} />)}
            </HStack>
            {featuredProperties?.data?.count === 0 && (
              <Center>
                <Heading>No Featured Properties...</Heading>
              </Center>
            )}
            <Masonry columns={{ 0: 1, 480: 2, 1060: 4 }} gap={12}>
              {featuredProperties?.data?.rows
                ?.map((item, index) => (
                  <PropertyCard key={index} property={item} />
                ))
                .slice(0, 4)}
            </Masonry>
          </>
        }
      />
    </>
  );
};

export default Featured;
