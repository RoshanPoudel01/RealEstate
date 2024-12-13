import { Card, Stack, VStack } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";
import { Skeleton } from "../ui/skeleton";

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
      <Stack w={"full"} gap={2}>
        <Skeleton height="200px" />
      </Stack>

      <VStack align="stretch" gap={3} p={3} bg={cardBg}>
        <Skeleton height="5" width="100%" />
        <Skeleton height="5" width="100%" />

        <VStack gap={2} align="stretch">
          <Skeleton height="5" width="100%" />
        </VStack>
      </VStack>
    </Card.Root>
  );
};

export default LoadingCard;
