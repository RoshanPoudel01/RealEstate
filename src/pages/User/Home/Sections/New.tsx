import { Center, Heading, HStack, SimpleGrid } from "@chakra-ui/react";
import { imageAssets } from "@realState/assets/images";
import LoadingCard from "@realState/components/Cards/LoadingCard";
import PropertyCard from "@realState/components/Cards/Property";
import SectionWrapper from "@realState/components/Wrapper/SectionWrapper";
import { useFetchAllProperties } from "@realState/services/service-properties";

const New = () => {
  const currenLanguage = localStorage.getItem("language");
  const { data: newProperties, isLoading } = useFetchAllProperties({
    propertyType: "new",
    language: currenLanguage ?? "en",
  });
  return (
    <>
      <SectionWrapper
        title="Recently Added"
        heading="New Houses"
        filterText="Filter"
        viewAllText="View All"
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
            <SimpleGrid
              columns={{
                base: 1,
                sm: 2,
                lg: 3,
                xl: 4,
              }}
              gap={{
                base: 2,
                md: 5,
                xl: 12,
              }}
            >
              {newProperties?.data?.rows
                ?.map((item, index) => (
                  <PropertyCard
                    id={item?.id}
                    key={index}
                    title={item?.title}
                    price={item?.price}
                    img={item?.image ?? imageAssets.Logo}
                    objectFit={item?.image ? "cover" : "contain"}
                    address={item?.address}
                    city={item?.city}
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

export default New;
