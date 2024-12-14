import { Card, Flex, HStack, Icon, Image, Stack, Text } from "@chakra-ui/react";
import { imageAssets } from "@realState/assets/images";
import Star from "@realState/assets/svgs/star.svg?react";
import { Avatar } from "@realState/components/ui/avatar";
const TestimonialCard = () => {
  return (
    <Flex
      position={"relative"}
      borderRadius={"8px"}
      height={"500px !important"}
    >
      <Image
        src={imageAssets.TestimonialBackground}
        alt="background"
        objectFit={"cover"}
        height={"400px"}
        maxW={"700px"}
      />
      <Card.Root
        position={"absolute"}
        top={"52%"}
        left={"5%"}
        maxW={"612px"}
        borderRadius={"16px"}
      >
        <Card.Body display={"flex"} flexDir={"column"} gap={4} p={8}>
          <Card.Header p={0}>
            <Card.Title color={"1B1C57"}>
              Best! I got the house I wanted{" "}
            </Card.Title>
          </Card.Header>
          <Card.Description color={"#626687"}>
            Through this website I can get a house with the type and
            specifications I want very easily, without a complicated process to
            be able to find information on the house we want.
          </Card.Description>
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
              boxShadow=" 0px 9px 32px 0px rgba(89, 92, 219, 0.10)"
            />
            <Stack align={"flex-start"} w={"full"} gap={0}>
              <Text
                fontSize={"14px"}
                lineHeight={"22px"}
                fontWeight={500}
                color={"#0E1735"}
              >
                Dianne Russell
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
              <Icon height={"29px"} width={"29px"}>
                <Star />
              </Icon>
              <Text
                fontSize={"20px"}
                lineHeight={"28px"}
                fontWeight={600}
                color={"#3C4563"}
              >
                5
              </Text>
            </HStack>
          </Card.Footer>
        </Card.Body>
      </Card.Root>
    </Flex>
  );
};

export default TestimonialCard;
