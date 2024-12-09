import { HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { imageAssets } from "@realState/assets/images";
import PropertyCard from "@realState/components/Cards/Property";

const Featured = () => {
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
            View All
          </Text>
          <Text color={"#263640"} fontSize={"16px"} fontWeight={"bolder"}>
            View All
          </Text>
        </HStack>
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
          {[1, 2, 3, 4].map((item) => (
            <PropertyCard
              title={"Roselands House"}
              price="$ 350000000"
              img={imageAssets.Logo}
              description="This is a beautiful house"
              address="Roselands House"
              city="Lagos"
              status="For Sale"
            />
          ))}
        </SimpleGrid>
      </Stack>
    </Stack>
  );
};

export default Featured;
