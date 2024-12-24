import {
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  Separator,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import LoadingCard from "@realState/components/Cards/LoadingCard";
import PropertyCard from "@realState/components/Cards/Property";
import { TextInput } from "@realState/components/Form";
import { Button } from "@realState/components/ui/button";
import { CloseButton } from "@realState/components/ui/close-button";
import { useFetchAllProperties } from "@realState/services/service-properties";
import { t } from "i18next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Masonry from "react-layout-masonry";
import { useParams } from "react-router-dom";

const Properties = () => {
  const currenLanguage = localStorage.getItem("language");

  const { propertyType } = useParams();

  const [keyword, setKeyword] = useState("");
  const { control, handleSubmit } = useForm();

  const { data: properties, isLoading } = useFetchAllProperties({
    propertyType: propertyType ?? "",
    language: currenLanguage ?? "en",
    keyword,
  });

  const submitFrm = (data: any) => {
    setKeyword(data.search);
  };
  return (
    <Flex flexDir={"column"} gap={4}>
      <Stack
        textAlign={"center"}
        color={"#141B2D"}
        py={{
          base: "10px",
          md: "50px",
        }}
        gap={0}
      >
        <Text
          color={"primary.400"}
          fontSize={{ base: "32px", sm: "36px", md: "42px", xl: "50px" }}
          lineHeight={{ base: "50px", md: "69px" }}
          fontWeight={700}
        >
          {t("property:heading")}
        </Text>
        <Text fontSize={"21px"} fontWeight={400} lineHeight={"35px"}>
          {t("property:description")}
        </Text>
      </Stack>
      <Stack
        as={"form"}
        onSubmit={handleSubmit(submitFrm)}
        align={"center"}
        gap={5}
        maxW={"95dvw"}
        mx={"auto"}
        bg={"gray.50"}
        w={"full"}
      >
        <HStack>
          <TextInput
            placeholder={t("property:searchText")}
            name="search"
            control={control}
            minW={{ sm: "300px" }}
            maxW={"300px"}
            endElement={
              keyword && (
                <CloseButton
                  onClick={() => {
                    setKeyword("");
                  }}
                />
              )
            }
          />
          <Button size={"lg"} type="submit">
            {t("property:searchButton")}
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
            {t("property:filterText")}
          </Text>
          <Separator />
        </HStack>
        <SimpleGrid
          gap={{
            base: 3,
            md: 5,
          }}
          minChildWidth={{ base: "150px", md: "200px" }}
          w={"full"}
          maxW={{ md: "70%" }}
          mx={"auto"}
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
            name="location"
            control={control}
            type="select"
            onChange={(e) => console.log((e.target as HTMLSelectElement).value)}
            options={
              <>
                <option value={""} selected>
                  Select Category
                </option>
                <option value="react">Cat1</option>
                <option value="js">Cat2</option>
                <option value="er">Cat3</option>
              </>
            }
          />

          <TextInput
            name="category"
            control={control}
            type="select"
            onChange={(e) => console.log((e.target as HTMLSelectElement).value)}
            options={
              <>
                <option value={""} selected>
                  Select Location
                </option>
                <option value="react">Loc1</option>
                <option value="js">Loc2</option>
                <option value="er">Loc3</option>
              </>
            }
          />
        </SimpleGrid>
      </Stack>
      {properties?.data?.count === 0 && (
        <Center>
          <Heading>No Properties...</Heading>
        </Center>
      )}
      <Container
        maxW={{
          base: "95dvw",
          md: "85dvw",
          xl: "80dvw",
        }}
      >
        <Masonry columns={{ 0: 1, 480: 2, 900: 3, 1280: 4 }} gap={10}>
          {isLoading
            ? [1, 2, 3, 4].map((_, index) => <LoadingCard key={index} />)
            : properties?.data?.rows.map((item, index) => (
                <PropertyCard key={index} property={item} />
              ))}
        </Masonry>
      </Container>
    </Flex>
  );
};

export default Properties;
