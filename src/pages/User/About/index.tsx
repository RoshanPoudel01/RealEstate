import {
  Card,
  Container,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";

import {
  StatisticsFrontResponse,
  useFetchFrontStatistics,
} from "@realState/services/service-statistics";
import Counter from "@realState/utils/Counter";
import { t } from "i18next";
import { useEffect, useState } from "react";
import OurTeam from "./OurTeam";

const About = () => {
  const currentLanguage = localStorage.getItem("language");
  const { data: statistics, isLoading } = useFetchFrontStatistics(
    currentLanguage ?? "en"
  );

  const [data, setData] = useState<StatisticsFrontResponse[]>([]);

  useEffect(() => {
    if (statistics) {
      const filterData = statistics?.data?.rows.filter(
        (stat) =>
          stat.slug !== "sold-monthly" && stat.slug !== "satisfied-customers"
      );
      setData(filterData ?? []);
    }
  }, [statistics]);
  return (
    <Container maxW={"container.xl"} gap={4}>
      <Stack
        textAlign={"center"}
        color={"#141B2D"}
        py={{
          base: "10px",
          md: "50px",
        }}
        gap={4}
      >
        <Text
          fontSize={"50px"}
          lineHeight={"69px"}
          color={"primary.400"}
          fontWeight={700}
        >
          {t("about:heading")}
        </Text>
        <Text textAlign={"center"}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure qui
          autem nulla commodi corrupti a.
        </Text>
      </Stack>

      <SimpleGrid
        alignItems={"start"}
        columns={{ base: 1, sm: 2, lg: 3 }}
        gap={6}
        w={"full"}
        mb={10}
      >
        {isLoading
          ? [...Array(3)].map((_, index) => (
              <Card.Root key={index}>
                <Skeleton height={"100px"} />
              </Card.Root>
            ))
          : data?.map((item, index) => (
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
