import {
  Card,
  Container,
  HStack,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";

import { useFetchFrontStatistics } from "@realState/services/service-statistics";
import Counter from "@realState/utils/Counter";
import { t } from "i18next";
import OurTeam from "./OurTeam";

const About = () => {
  const currentLanguage = localStorage.getItem("language");
  const { data: statistics, isLoading } = useFetchFrontStatistics(
    currentLanguage ?? "en"
  );

  return (
    <Container maxW={"container.xl"} gap={4}>
      <Stack
        textAlign={"center"}
        color={"#141B2D"}
        py={{
          base: "10px",
          md: "50px",
        }}
        gap={8}
      >
        <Text
          fontSize={"50px"}
          lineHeight={"69px"}
          color={"primary.400"}
          fontWeight={700}
        >
          {t("about:heading")}
        </Text>
      </Stack>
      <HStack w={"full"} gap={8}>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure qui
          autem nulla commodi corrupti a.
        </Text>
      </HStack>
      <SimpleGrid
        alignItems={"start"}
        columns={{ base: 1, sm: 2, lg: 4 }}
        gap={6}
        w={"full"}
        my={10}
      >
        {isLoading
          ? [...Array(4)].map((_, index) => (
              <Card.Root key={index}>
                <Skeleton height={"100px"} />
              </Card.Root>
            ))
          : statistics?.data?.rows.map((item, index) => (
              <Stack p={4} pr={8} textAlign={"center"} key={index}>
                <Counter initialValue={item.value} />

                <Text
                  fontSize={{ base: "18px", sm: "20px", md: "22px" }}
                  fontWeight={500}
                >
                  {item.title}
                </Text>
              </Stack>
            ))}
      </SimpleGrid>

      <OurTeam />
    </Container>
  );
};

export default About;
