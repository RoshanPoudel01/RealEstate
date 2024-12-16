import { Container, HStack, Stack, Text } from "@chakra-ui/react";
import OurTeam from "./OurTeam";

const About = () => {
  const currentLanguage = localStorage.getItem("language");

  return (
    <Container maxW={"container.xl"} gap={4}>
      <Stack
        textAlign={"center"}
        color={"#141B2D"}
        py={{
          base: "10px",
          md: "50px",
        }}
        gap={0}
      >
        <Text
          fontSize={"50px"}
          lineHeight={"69px"}
          color={"primary.400"}
          fontWeight={700}
        >
          {currentLanguage === "np" ? "हाम्रो बारेमा" : "About Us"}
        </Text>
      </Stack>
      <HStack w={"full"} justifyContent={"space-evenly"} gap={8}>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure qui
          autem nulla commodi corrupti a.
        </Text>
        <Text>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          iure id et sed. Aliquid odio nobis fuga.
        </Text>
      </HStack>
      <HStack gap={6} w={"full"} justifyContent={"space-evenly"}>
        {[1, 2, 3, 4, 5]?.map((item, index, array) => (
          <Stack
            p={4}
            pr={8}
            borderRight={
              index !== array.length - 1 ? "1px solid #cdcdcd" : "none"
            }
          >
            <Text textAlign={"center"} fontSize={"20px"}>
              500+
            </Text>
            <Text fontWeight={500}>Houses Sold</Text>
          </Stack>
        ))}
      </HStack>

      <OurTeam />
    </Container>
  );
};

export default About;
