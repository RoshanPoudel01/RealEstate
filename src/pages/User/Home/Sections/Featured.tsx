import { Center, Heading, HStack, SimpleGrid } from "@chakra-ui/react";
import { imageAssets } from "@realState/assets/images";
import LoadingCard from "@realState/components/Cards/LoadingCard";
import PropertyCard from "@realState/components/Cards/Property";
import SectionWrapper from "@realState/components/Wrapper/SectionWrapper";
import { useFetchAllProperties } from "@realState/services/service-properties";

const Featured = () => {
  const currenLanguage = localStorage.getItem("language");
  const { data: featuredProperties, isLoading } = useFetchAllProperties({
    propertyType: "featured",
  });
  return (
    <>
      <SectionWrapper
        title="Our Recommendations"
        heading="Featured Houses"
        filterText="Filter"
        viewAllText="View All"
        content={
          <>
            <HStack>{isLoading && [1, 2, 3].map(() => <LoadingCard />)}</HStack>
            {featuredProperties?.data?.count === 0 && (
              <Center>
                <Heading>No Featured Properties...</Heading>
              </Center>
            )}
            <SimpleGrid
              columns={{
                base: 1,
                sm: 2,
                md: 4,
              }}
              gap={{
                base: 2,
                sm: 5,
                md: 12,
              }}
            >
              {featuredProperties?.data?.rows
                ?.map((item) => (
                  <PropertyCard
                    id={item?.id}
                    title={
                      currenLanguage === "en" ? item?.title_en : item?.title_np
                    }
                    price={item?.price}
                    img={item?.image ?? imageAssets.Logo}
                    address={
                      currenLanguage === "en"
                        ? item?.address_en
                        : item?.address_np
                    }
                    city={
                      currenLanguage === "en" ? item?.city_en : item?.city_np
                    }
                    status={item?.status}
                  />
                ))
                .slice(0, 4)}
            </SimpleGrid>
          </>
        }
      />
    </>
  );
};

export default Featured;
