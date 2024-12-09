import {
  Box,
  Center,
  HStack,
  Separator,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { imageAssets } from "@realState/assets/images";
import PropertyCard from "@realState/components/Cards/Property";
import { TextInput } from "@realState/components/Form";
import RangeSlider from "@realState/components/Form/Slider/RangeSlider";
import { Button } from "@realState/components/ui/button";
import { NAVIGATION_ROUTES } from "@realState/pages/App/navigationRoutes";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Properties = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm();
  const submitFrm = (data: any) => {
    console.warn(data);
  };
  return (
    <Center flexDir={"column"} gap={4}>
      <Stack
        textAlign={"center"}
        color={"#141B2D"}
        py={{
          base: "10px",
          md: "50px",
        }}
        gap={0}
      >
        <Text fontSize={"50px"} lineHeight={"69px"} fontWeight={700}>
          Search for Properties
        </Text>
        <Text fontSize={"21px"} fontWeight={400} lineHeight={"35px"}>
          Choose from the most advantageous offers
        </Text>
      </Stack>
      <Stack
        as={"form"}
        onSubmit={handleSubmit(submitFrm)}
        align={"center"}
        gap={5}
        p={10}
        bg={"gray.50"}
        w={"full"}
      >
        <HStack w={"max-content"}>
          <TextInput
            placeholder={"Search for properties..."}
            name="search"
            control={control}
            size={"lg"}
          />
          <Button size={"lg"} type="submit">
            Search
          </Button>
        </HStack>
        <HStack w={"full"}>
          <Separator />
          <Text
            flexShrink="0"
            color={"#141B2D"}
            lineHeight={"35px"}
            fontSize={"16px"}
            fontWeight={300}
            px={5}
          >
            Filter settings
          </Text>
          <Separator />
        </HStack>
        <Stack
          flexDir={{
            base: "column",
            md: "row",
          }}
          gap={{
            base: 3,
            md: 5,
          }}
          w={"70%"}
        >
          {/* <Select
            control={control}
            placeholder={"Select Location"}
            name={"location"}
            collection={createListCollection({
              items: [
                { label: "React.js", value: "react" },
                { label: "Vue.js", value: "vue" },
                { label: "Angular", value: "angular" },
                { label: "Svelte", value: "svelte" },
              ],
            })}
          /> */}
          <TextInput
            name="select"
            control={control}
            type="select"
            options={
              <>
                <option value="react">React.js</option>
                <option value="js">js</option>
                <option value="er">ess</option>
              </>
            }
          />
          <TextInput
            name="select"
            control={control}
            type="select"
            options={
              <>
                <option value="react">React.js</option>
                <option value="js">js</option>
                <option value="er">ess</option>
              </>
            }
          />
          <TextInput
            name="select"
            control={control}
            type="select"
            options={
              <>
                <option value="react">React.js</option>
                <option value="js">js</option>
                <option value="er">ess</option>
              </>
            }
          />
          <TextInput
            name="select"
            control={control}
            type="select"
            options={
              <>
                <option value="react">React.js</option>
                <option value="js">js</option>
                <option value="er">ess</option>
              </>
            }
          />
        </Stack>
        <Box
          w={{
            base: "full",
            md: "40%",
          }}
        >
          <RangeSlider
            name="price"
            control={control}
            label="Price"
            defaultValue={[0, 100]}
            steps={10}
            indicators={[
              { value: 0, label: "0" },
              { value: 100, label: "100000" },
            ]}
          />
        </Box>
      </Stack>
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3 }}
        w={"full"}
        maxW={{
          base: "90%",
          md: "75%",
        }}
        gap={10}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((item) => (
          <PropertyCard
            title={"Roselands House"}
            price="$ 350000000"
            img={imageAssets.Logo}
            description="This is a beautiful house"
            address="Roselands House"
            city="Lagos"
            status="For Sale"
            onClick={() =>
              navigate(NAVIGATION_ROUTES.PROPERTY_DETAILS, {
                state: { id: item },
              })
            }
          />
        ))}
      </SimpleGrid>
    </Center>
  );
};

export default Properties;
