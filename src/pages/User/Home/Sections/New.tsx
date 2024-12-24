import { Center, Heading, HStack } from "@chakra-ui/react";
import LoadingCard from "@realState/components/Cards/LoadingCard";
import PropertyCard from "@realState/components/Cards/Property";
import SectionWrapper from "@realState/components/Wrapper/SectionWrapper";
import { useFetchAllProperties } from "@realState/services/service-properties";
import Masonry from "react-layout-masonry";

const New = () => {
  const currenLanguage = localStorage.getItem("language");
  const { data: newProperties, isLoading } = useFetchAllProperties({
    propertyType: "new",
    language: currenLanguage ?? "en",
  });
  return (
    <>
      <SectionWrapper
        title={currenLanguage === "en" ? "Recently Added" : "हालै थपिएका"}
        heading={currenLanguage === "en" ? "New Houses" : "नयाँ घरहरू"}
        viewAllText={currenLanguage === "en" ? "View All" : "सबै हेर्नुहोस्"}
        viewAllNavigation="/all-properties/new"
        content={
          <>
            <HStack>
              {isLoading &&
                [1, 2, 3].map((_, index) => <LoadingCard key={index} />)}
            </HStack>
            {newProperties?.data?.count === 0 && (
              <Center>
                <Heading>No New Properties...</Heading>
              </Center>
            )}
            <Masonry columns={{ 0: 1, 480: 2, 1060: 4 }} gap={12}>
              {newProperties?.data?.rows
                ?.map((item, index) => (
                  <PropertyCard
                    key={index}
                    property={{
                      ...item,
                      is_new: true,
                      is_featured: false,
                      is_trending: false,
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

export default New;
