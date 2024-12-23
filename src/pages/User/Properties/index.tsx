import {
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  Separator,
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
          fontSize={"50px"}
          lineHeight={"69px"}
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
        p={10}
        bg={"gray.50"}
        w={"full"}
      >
        <HStack w={"max-content"}>
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
