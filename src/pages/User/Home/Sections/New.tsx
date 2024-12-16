import { Center, Heading, HStack } from "@chakra-ui/react";
import { imageAssets } from "@realState/assets/images";
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
            <Masonry columns={{ 0: 1, 480: 2, 1060: 4 }} gap={12}>
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
            </Masonry>
          </>
        }
      />
    </>
  );
};

export default New;
