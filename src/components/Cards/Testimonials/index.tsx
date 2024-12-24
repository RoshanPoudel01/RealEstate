import { Card, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { Star } from "@phosphor-icons/react";
import { Avatar } from "@realState/components/ui/avatar";
import { TestimonialResponse } from "@realState/services/service-testimonial";

const TestimonialCard = ({ data }: { data: TestimonialResponse }) => {
  return (
    <Card.Root w={"full"} borderRadius={"16px"}>
      <Card.Header pt={6}>
        <Card.Title color={"1B1C57"}>{data.title}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Description lineHeight={1.5} color={"#626687"}>
          {data.message}
        </Card.Description>
      </Card.Body>
      <Card.Footer pb={6} justifyContent={"space-between"} gap={6}>
        <Avatar
          size={"lg"}
          src={data.image}
          fallback={<Avatar />}
          name={data.name}
          boxShadow=" 0px 9px 32px 0px rgba(89, 92, 219, 0.10)"
        />
        <Stack align={"flex-start"} w={"full"} gap={0}>
          <Text
            fontSize={"14px"}
            lineHeight={"22px"}
            fontWeight={500}
            color={"#0E1735"}
          >
            {data.name}
          </Text>
        </Stack>
        <HStack>
          <Icon boxSize={6} color={"#FFB946"} asChild>
            <Star weight="fill" />
          </Icon>
        </HStack>
      </Card.Footer>
    </Card.Root>
  );
};

export default TestimonialCard;
