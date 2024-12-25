import { Card, Float, HStack, Stack, Text } from "@chakra-ui/react";
import { Avatar } from "@realState/components/ui/avatar";
import {
  Blockquote,
  BlockquoteIcon,
} from "@realState/components/ui/blockquote";
import { TestimonialResponse } from "@realState/services/service-testimonial";

const TestimonialCard = ({ data }: { data: TestimonialResponse }) => {
  return (
    <Card.Root w={"full"} variant={"subtle"} bg={"bg.muted"}>
      <Card.Header pt={6}>
        <Card.Title color={"1B1C57"}>{data.title}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Blockquote
          variant="plain"
          colorPalette="primary"
          icon={
            <Float placement="top-start" offsetY="2">
              <BlockquoteIcon />
            </Float>
          }
        >
          &nbsp; &nbsp; If anyone thinks he is something when he is nothing, he
          deceives himself. Each one should test his own actions. Then he can
          take pride in himself, without comparing himself to anyone else.
        </Blockquote>
      </Card.Body>
      <Card.Footer pb={6} justifyContent={"space-between"} gap={2}>
        <HStack>
          <Avatar src={data.image} fallback={<Avatar />} name={data.name} />
          <Stack w={"full"} gap={0}>
            <Text
              fontSize={"14px"}
              lineHeight={"22px"}
              fontWeight={500}
              color={"#0E1735"}
            >
              {data.name}
            </Text>
          </Stack>
        </HStack>
      </Card.Footer>
    </Card.Root>
  );
};

export default TestimonialCard;
