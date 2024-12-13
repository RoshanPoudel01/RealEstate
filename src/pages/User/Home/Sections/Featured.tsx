import {
  Center,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { imageAssets } from "@realState/assets/images";
import LoadingCard from "@realState/components/Cards/LoadingCard";
import PropertyCard from "@realState/components/Cards/Property";
import { useFetchAllProperties } from "@realState/services/service-properties";

const Featured = () => {
  const currenLanguage = localStorage.getItem("language");
  const { data: featuredProperties, isLoading } = useFetchAllProperties({
    propertyType: "featured",
  });
  return (
    <Stack
      px={{
        base: "10px",
        md: "80px",
      }}
    >
      <Text color={"#263640"} fontSize={"14px"} fontWeight={"bolder"}>
        Our Recommendations
      </Text>
      <Stack
        px={{
          base: "0",
          md: "70px",
        }}
      >
        <HStack justifyContent={"space-between"}>
          <Text color={"primary.500"} fontSize={"20px"} fontWeight={"bolder"}>
            Featured Houses
          </Text>
          <Text color={"#263640"} fontSize={"16px"} fontWeight={"bolder"}>
            Filter according to some option
          </Text>
          <Text color={"#263640"} fontSize={"16px"} fontWeight={"bolder"}>
            View All
          </Text>
        </HStack>
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
          {featuredProperties?.data?.rows?.map((item) => (
            <PropertyCard
              title={currenLanguage === "en" ? item?.title_en : item?.title_np}
              price={item?.price}
              img={imageAssets.Logo}
              address={
                currenLanguage === "en" ? item?.address_en : item?.address_np
              }
              city={currenLanguage === "en" ? item?.city_en : item?.city_np}
              status={item?.status}
            />
          ))}
        </SimpleGrid>
      </Stack>
    </Stack>
  );
};

export default Featured;
