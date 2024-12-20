import { Card } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";
import { Skeleton, SkeletonText } from "../ui/skeleton";

const LoadingCard = () => {
  const cardBg = useColorModeValue("white", "gray.700");

  return (
    <Card.Root
      position="relative"
      width="100%"
      borderRadius="12px"
      overflow="hidden"
      bg={cardBg}
      border={"none"}
      cursor="pointer"
      transition="all 0.4s cubic-bezier(0.175, 0.885, 0, 1)"
      marginRight="25px"
      p={4}
    >
      <Card.Header p={0}>
        <Skeleton aspectRatio={4 / 3} w={"full"} />
      </Card.Header>

      <Card.Body px={0}>
        <SkeletonText noOfLines={3} />
      </Card.Body>
    </Card.Root>
  );
};

export default LoadingCard;
