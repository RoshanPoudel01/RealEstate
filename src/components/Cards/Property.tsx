import { Box, Card, Text, VStack } from "@chakra-ui/react";
import React from "react";
import LazyLoadImage from "../Image";
import { useColorModeValue } from "../ui/color-mode";

interface PropertyCardProps {
  img: string;
  title: string;
  price: string;
  address: string;
  city: string;
  status: string;
  onClick?: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  img,
  title,
  price,
  city,
  address,
  status,
  onClick,
}) => {
  const cardBg = useColorModeValue("white", "gray.700");

  return (
    <Card.Root
      position="relative"
      width="100%"
      borderRadius="12px"
      overflow="hidden"
      // boxShadow="10px 13px 10px -7px rgba(0, 0, 0, 0.1)"
      bg={cardBg}
      border={"none"}
      cursor="pointer"
      transition="all 0.4s cubic-bezier(0.175, 0.885, 0, 1)"
      marginRight="25px"
      p={4}
      onClick={onClick}
      _hover={{
        opacity: 0.8,
      }}
    >
      <Box
        position="relative"
        overflow="hidden"
        borderTopLeftRadius="12px"
        borderTopRightRadius="12px"
        _hover={{
          height: "90%",
          opacity: 0.6,
        }}
        transition="0.5s all ease-out"
        w={"full"}
      >
        <LazyLoadImage src={img} alt={title} height={"375px"} w={"100%"} />

        <Text
          position="absolute"
          bottom="16px"
          left="16px"
          bg="red.500"
          color="white"
          px="2"
          py="1"
          borderRadius="12px"
          fontSize="sm"
          fontWeight="bold"
        >
          {status.toUpperCase()}
        </Text>
      </Box>

      <VStack
        align="stretch"
        gap={3}
        p={3}
        bg={cardBg}
        borderBottomLeftRadius="12px"
        borderBottomRightRadius="12px"
      >
        <Text
          textTransform="uppercase"
          fontSize="xs"
          letterSpacing="wider"
          fontWeight="medium"
          color="gray.500"
        >
          {title}
        </Text>

        <VStack gap={0} align="stretch">
          <Text fontSize="md" color="gray.600">
            {`${address}, ${city}`}
          </Text>
          <Text fontSize="md" fontWeight="semibold" color="gray.700">
            Rs. {price}
          </Text>
        </VStack>
      </VStack>
    </Card.Root>
  );
};

export default PropertyCard;
