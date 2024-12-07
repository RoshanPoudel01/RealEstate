import { HStack } from "@chakra-ui/react";
import { imageAssets } from "@realState/assets/images";
import PropertyCard from "@realState/components/Cards/Property";

const Featured = () => {
  return (
    <HStack px={"70px"}>
      <PropertyCard
        title={"Roselands House"}
        price="$ 350000000"
        img={imageAssets.Logo}
      />
      <PropertyCard
        title={"Roselands House"}
        price="$ 350000000"
        img={imageAssets.Logo}
      />
      <PropertyCard
        title={"Roselands House"}
        price="$ 350000000"
        img={imageAssets.Logo}
      />
      <PropertyCard
        title={"Roselands House"}
        price="$ 350000000"
        img={imageAssets.Logo}
      />
    </HStack>
  );
};

export default Featured;
