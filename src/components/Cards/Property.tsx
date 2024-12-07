import { Card, Stack } from "@chakra-ui/react";
import LazyLoadImage from "../Image";
interface PropertyCardProps {
  img: string;
  title: string;
  price: string;
}
const PropertyCard = ({ img, title, price }: PropertyCardProps) => {
  return (
    <Card.Root border={"none"} borderRadius={"2px"}>
      <Card.Body gap={6} display={"flex"} flexDir={"column"}>
        <LazyLoadImage
          src={img}
          alt={title}
          borderRadius={"24px"}
          //   height={"382px"}
          w={"full"}
          aspectRatio={4 / 3}
        />
        <Stack gap={2}>
          <Card.Title
            color={"#0E1735"}
            fontSize={"24px"}
            fontWeight={600}
            lineHeight={"32px"}
          >
            {title}
          </Card.Title>
          <Card.Description
            color={"#3C4563"}
            fontSize={"20px"}
            lineHeight={"32px"}
          >
            {price}
          </Card.Description>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};

export default PropertyCard;
