import { Card, Text, VStack } from "@chakra-ui/react";
import { NAVIGATION_ROUTES } from "@realState/pages/App/navigationRoutes";
import React from "react";
import { useNavigate } from "react-router-dom";
import LazyLoadImage from "../Image";
import { useColorModeValue } from "../ui/color-mode";

interface PropertyCardProps {
  img: string;
  title: string;
  price: string;
  address: string;
  city: string;
  status: string;
  id: number;
  objectFit?: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  img,
  title,
  price,
  city,
  address,
  status,
  id,
  objectFit,
}) => {
  const cardBg = useColorModeValue("white", "gray.700");
  const navigate = useNavigate();
  return (
    <Card.Root
      position="relative"
      width="100%"
      borderRadius="12px"
      overflow="hidden"
      // boxShadow="10px 13px 10px -7px rgba(0, 0, 0, 0.1)"
      bg={cardBg}
      border={0}
      cursor="pointer"
      transition="all 0.4s cubic-bezier(0.175, 0.885, 0, 1)"
      marginRight="25px"
      onClick={() =>
        navigate(NAVIGATION_ROUTES.PROPERTY_DETAILS?.replace(":id", id + ""))
      }
      _hover={{
        opacity: 0.8,
      }}
    >
      <Card.Header
        position="relative"
        overflow="hidden"
        borderTopRadius="12px"
        _hover={{
          opacity: 0.9,
        }}
        transition="0.5s all ease-out"
        p={0}
        borderBottom={"1ps solid"}
      >
        <LazyLoadImage
          src={img}
          alt={title}
          objectFit={objectFit}
          aspectRatio={4 / 3}
          h={"100%"}
          w={"100%"}
        />

        <Text
          position="absolute"
          bottom="12px"
          left="16px"
          bg="red.500"
          color="white"
          px="2"
          py="1"
          borderRadius="12px"
          fontSize="xs"
          fontWeight="bold"
        >
          {status.toUpperCase()}
        </Text>
      </Card.Header>

      <Card.Body
        alignItems="stretch"
        gap={3}
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
          lineClamp={1}
        >
          {title}
        </Text>

        <VStack gap={0} align="stretch">
          <Text lineClamp={1} fontSize="md" color="gray.600">
            {`${address}, ${city}`}
          </Text>
          <Text fontSize="md" fontWeight="semibold" color="gray.700">
            Rs. {price}
          </Text>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};

export default PropertyCard;
