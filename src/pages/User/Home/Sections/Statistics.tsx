import {
  Card,
  CardRootProps,
  GridItem,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { imageAssets } from "@realState/assets/images";
import LazyLoadImage from "@realState/components/Image";
import { SkeletonText } from "@realState/components/ui/skeleton";
import { useFetchFrontSection } from "@realState/services/service-sections";
import {
  StatisticsFrontResponse,
  useFetchFrontStatistics,
} from "@realState/services/service-statistics";
import Counter from "@realState/utils/Counter";
import { FC, useEffect, useState } from "react";

interface StatisticProps {
  title: string;
  value: number | string;
}

const StatisticCard: FC<StatisticProps & CardRootProps> = ({
  title,
  value,
  ...rest
}) => {
  return (
    <Card.Root
      bg={"transparent"}
      textAlign={"center"}
      alignItems={"center"}
      h={"full"}
      w={"full"}
      flexShrink={0}
      {...rest}
    >
      <Card.Body px={0} py={2} color={"red.400"}>
        <Counter initialValue={value} />
      </Card.Body>
      <Card.Header px={0} py={2} alignContent={"center"}>
        <Card.Description color={"primary.500"}>{title}</Card.Description>
      </Card.Header>
    </Card.Root>
  );
};

const Statistics = () => {
  const currentLang = localStorage.getItem("language") || "en";

  const { data: statSection, isLoading } = useFetchFrontSection(
    "statistics-section",
    currentLang
  );
  const { data: statistics } = useFetchFrontStatistics(currentLang);

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
    <SimpleGrid
      columns={{ base: 1, lg: 2 }}
      gap={12}
      maxW={"90dvw"}
      mx="auto"
      alignItems={"center"}
    >
      <GridItem colSpan={1} w={"full"}>
        <LazyLoadImage
          src={statSection?.data?.image ?? imageAssets.Logo}
          w={"full"}
          aspectRatio={4 / 3}
          maxH={"500px"}
        />
      </GridItem>
      <GridItem colSpan={1}>
        {isLoading ? (
          <SkeletonText w={"full"} noOfLines={4} />
        ) : (
          <Stack gap={4}>
            <Text
              fontSize={{
                base: "24px",
                lg: "32px",
              }}
              fontWeight={600}
            >
              {statSection?.data?.title}
            </Text>
            <Text
              fontSize={{
                base: "16px",
                lg: "20px",
              }}
            >
              {statSection?.data?.description}
            </Text>
            <HStack justify={"space-between"} flexWrap={"wrap"}>
              {data?.map((statistic) => (
                <StatisticCard
                  flexBasis={{ sm: "32%" }}
                  key={statistic.id}
                  title={statistic.title}
                  value={statistic.value}
                />
              ))}
            </HStack>
          </Stack>
        )}
      </GridItem>
    </SimpleGrid>
  );
};

export default Statistics;
