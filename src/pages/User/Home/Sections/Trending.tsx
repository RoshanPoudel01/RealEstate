import { Center, Heading, HStack } from "@chakra-ui/react";
import LoadingCard from "@realState/components/Cards/LoadingCard";
import PropertyCard from "@realState/components/Cards/Property";
import SectionWrapper from "@realState/components/Wrapper/SectionWrapper";
import { useFetchAllProperties } from "@realState/services/service-properties";
import Masonry from "react-layout-masonry";

const Trending = () => {
  const currenLanguage = localStorage.getItem("language");
  const { data: trendingProperties, isLoading } = useFetchAllProperties({
    propertyType: "trending",
    language: currenLanguage ?? "en",
  });
  return (
    <>
      <SectionWrapper
        title={currenLanguage === "en" ? "Trending Houses" : "ट्रेन्डिंग घरहरू"}
        heading={
          currenLanguage === "en" ? "Trending Houses" : "ट्रेन्डिंग घरहरू"
        }
        viewAllText={currenLanguage === "en" ? "View All" : "सबै हेर्नुहोस्"}
        viewAllNavigation="/all-properties/trending"
        content={
          <>
            <HStack>
              {isLoading &&
                [1, 2, 3].map((_, index) => <LoadingCard key={index} />)}
            </HStack>
            {trendingProperties?.data?.count === 0 && (
              <Center>
                <Heading>No Trending Properties...</Heading>
              </Center>
            )}
            <Masonry columns={{ 0: 1, 480: 2, 1060: 4 }} gap={12}>
              {trendingProperties?.data?.rows
                ?.map((item, index) => (
                  <PropertyCard
                    key={index}
                    property={{
                      ...item,
                      is_new: false,
                      is_trending: true,
                      is_featured: false,
                    }}
                  />
                ))
                .slice(0, 4)}
            </Masonry>
          </>
        }
      />
    </>
  );
};

export default Trending;
