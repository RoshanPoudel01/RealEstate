import { Card, CardRootProps, ConditionalValue } from "@chakra-ui/react";
import { FC } from "react";
import { useColorModeValue } from "../ui/color-mode";
import { Skeleton, SkeletonText } from "../ui/skeleton";

interface LoadingCardProps {
  skeletonWidth?: ConditionalValue<string | number>;
  skeletonAspectRatio?: ConditionalValue<number>;
}

const LoadingCard: FC<LoadingCardProps & CardRootProps> = ({
  skeletonWidth,
  skeletonAspectRatio,
  ...rest
}) => {
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
      {...rest}
    >
      <Card.Header p={0}>
        <Skeleton
          width={skeletonWidth ?? "100%"}
          aspectRatio={skeletonAspectRatio ?? 4 / 3}
        />
      </Card.Header>

      <Card.Body px={0}>
        <SkeletonText noOfLines={3} />
      </Card.Body>
    </Card.Root>
  );
};

export default LoadingCard;
