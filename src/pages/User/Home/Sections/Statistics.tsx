import { Card, SimpleGrid } from "@chakra-ui/react";
import LazyLoadImage from "@realState/components/Image";
import { useFetchStatistics } from "@realState/services/service-setting";

const StatisticCard = ({
  image,
  title,
  value,
}: {
  image?: string;
  title: string;
  value: number | string;
}) => {
  return (
    <Card.Root
      textAlign={"center"}
      flexDir={{ base: "column", sm: "row" }}
      alignItems={"center"}
      w={"100%"}
    >
      <Card.Header py={2}>
        <LazyLoadImage
          src={image ?? ""}
          alt={title}
          w={"50px"}
          aspectRatio={1}
          rounded={"full"}
        />
      </Card.Header>
      <Card.Body color={"red.400"}>
        <Card.Description color={"primary.500"}>{title}</Card.Description>
        <Card.Title>{value}</Card.Title>
      </Card.Body>
    </Card.Root>
  );
};

const Statistics = () => {
  const { data: statistics } = useFetchStatistics();
  console.log({ statistics });
  return (
    <SimpleGrid
      px={{
        base: "10px",
        md: "80px",
      }}
      columns={{ base: 2, lg: 4 }}
      gap={4}
    >
      {statistics?.data?.rows.map((statistic, index) => (
        <StatisticCard
          image={statistic.image}
          title={statistic.title_en}
          value={statistic.value}
          key={index}
        />
      ))}
    </SimpleGrid>
  );
};

export default Statistics;
