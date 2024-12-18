import { Card, Flex, HStack, Icon, Image, Stack, Text } from "@chakra-ui/react";
import { Star } from "@phosphor-icons/react";
import { imageAssets } from "@realState/assets/images";
import { Avatar } from "@realState/components/ui/avatar";
import { TestimonialResponse } from "@realState/services/service-testimonial";

const TestimonialCard = ({ data }: { data: TestimonialResponse }) => {
  return (
    <Flex
      position={"relative"}
      borderRadius={"8px"}
      flexDir={"column"}
      h={"500px"}
      mr={2}
    >
      <Image
        src={imageAssets.TestimonialBackground}
        alt="background"
        objectFit={"cover"}
        height={"400px"}
        maxW={"700px"}
      />
      <Card.Root
        w={"full"}
        pos={"absolute"}
        left={"50%"}
        bottom={"30px"}
        transform={"translateX(-50%)"}
        maxW={"512px"}
        mx={"auto"}
        borderRadius={"16px"}
        h={"max-content"}
      >
        <Card.Body gap={4} p={8}>
          <Card.Header p={0}>
            <Card.Title color={"1B1C57"}>{data.title}</Card.Title>
          </Card.Header>
          <Card.Description color={"#626687"}>{data.message}</Card.Description>
          <Card.Footer
            p={0}
            display={"flex"}
            alignContent={"flex-start"}
            justifyContent={"space-between"}
            gap={6}
          >
            <Avatar
              borderRadius={"40px"}
              height={"40px"}
              w={"40px"}
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
              <Text
                fontSize={"14px"}
                lineHeight={"22px"}
                fontWeight={500}
                color={"#888B97"}
              >
                Manager Director
              </Text>
            </Stack>
            <HStack>
              <Icon boxSize={6} color={"#FFB946"} asChild>
                <Star weight="fill" />
              </Icon>
            </HStack>
          </Card.Footer>
        </Card.Body>
      </Card.Root>
    </Flex>
  );
};

export default TestimonialCard;
