import { Box, HStack, Text } from "@chakra-ui/react";
import LazyLoadImage from "../Image";
import "./Propertycard.css";
interface PropertyCardProps {
  img: string;
  title: string;
  price: string;
  description: string;
  address: string;
  city: string;
  status: string;
  onClick?: () => void;
}

const PropertyCard = ({
  img,
  title,
  price,
  description,
  city,
  address,
  status,
  onClick,
}: PropertyCardProps) => {
  return (
    <Box className="card" onClick={onClick}>
      <Box
        className="card__img--hover"
        style={{ backgroundImage: `url(${img})` }}
      >
        <LazyLoadImage
          src={img}
          alt={title}
          className="card__img"
          height={"375px"}
          width={"100%"}
        />
        <Text className="card__status">{status}</Text>
      </Box>
      <Box className="card__info">
        <Text className="card__category">{title}</Text>
        <HStack justify={"space-between"}>
          <Text className="card__title">{description}</Text>
        </HStack>
        <Text className="card__address">{`${address}, ${city}`}</Text>
        <Text className="card__price">{price}</Text>
      </Box>
    </Box>
  );
};

export default PropertyCard;
