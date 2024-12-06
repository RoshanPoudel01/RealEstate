import { Card, Stack } from "@chakra-ui/react";
import { Avatar } from "@realState/components/ui/avatar";
interface InfoCardProps {
  img: string;
  title: string;
  description: string;
}
const InfoCard = ({ img, title, description }: InfoCardProps) => {
  return (
    <Card.Root
      bg={"FFF"}
      boxShadow="0px 11px 48px 0px rgba(51, 51, 51, 0.06)"
      border={"none"}
      borderRadius={"32px"}
    >
      <Card.Body
        px={6}
        py={4}
        gap={4}
        display={"flex"}
        flexDir={"row"}
        alignItems={"center"}
      >
        <Avatar
          src={img}
          name={description}
          size="lg"
          borderRadius={"24px"}
          height={"56px"}
          w={"56px"}
          flexShrink={0}
          //   border="3px solid #FFF"
          //   boxShadow="0px 9px 32px 0px rgba(89, 92, 219, 0.10)"
        />
        <Stack gap={0}>
          <Card.Title color={"#1B1C57"} fontSize={"17px"} fontWeight={600}>
            {title}
          </Card.Title>
          <Card.Description
            color={"#68799F"}
            fontSize={"14px"}
            lineHeight={"20px"}
          >
            {description}
          </Card.Description>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};

export default InfoCard;
