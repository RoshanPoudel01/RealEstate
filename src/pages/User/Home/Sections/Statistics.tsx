import { Card, SimpleGrid } from "@chakra-ui/react";
import { useFetchStatistics } from "@realState/services/service-setting";

const StatisticCard = ({ title, value }: { title: string; value: number }) => {
  return (
    <Card.Root textAlign={"center"} alignItems={"center"}>
      <Card.Header>
        <Card.Description color={"primary.500"}>{title}</Card.Description>
      </Card.Header>
      <Card.Body py={4} color={"red.400"}>
        <Card.Title>{value}</Card.Title>
      </Card.Body>
    </Card.Root>
  );
};

const Statistics = () => {
  const { data: statistics } = useFetchStatistics();
  console.log({ statistics });
  return (
    <SimpleGrid columns={{ base: 2, md: 4, xl: 6 }} gap={4}>
      {statistics?.data?.map((statistic, index) => (
        <StatisticCard
          title={statistic.title_en}
          value={statistic.value}
          key={index}
        />
      ))}
    </SimpleGrid>
  );
};

export default Statistics;
