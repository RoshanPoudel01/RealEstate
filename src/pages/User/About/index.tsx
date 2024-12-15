import { Flex, Heading, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { imageAssets } from "@realState/assets/images";
import { SocialButton } from "@realState/components/Footer";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const About = () => {
  const socialLinks = [
    { icon: <FaFacebook size="20px" />, href: "#" },
    { icon: <FaInstagram size="20px" />, href: "#" },
    { icon: <FaYoutube size="20px" />, href: "#" },
  ];
  return (
    <Stack
      paddingX={{
        base: "20px",
        sm: "40px",
        lg: "90px",
      }}
      gap={4}
    >
      <Stack
        textAlign={"center"}
        color={"#141B2D"}
        py={{
          base: "10px",
          md: "50px",
        }}
        gap={0}
      >
        <Text fontSize={"50px"} lineHeight={"69px"} fontWeight={700}>
          About Us
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
      <Heading
        fontSize={"35px"}
        lineHeight={"69px"}
        textAlign={"center"}
        color={"red.400"}
      >
        Our Team
      </Heading>
      {[1, 2].map(() => (
        <Stack
          flexDir={{
            base: "column",
            md: "row",
          }}
          gap={10}
        >
          <Image src={imageAssets.Logo} height={"350px"} objectFit={"cover"} />
          <Stack justifyContent={"center"}>
            <Stack>
              <Text fontSize={"17px"} fontWeight={400}>
                Something Something
              </Text>
              <Text fontSize={"12px"} fontWeight={500}>
                Founder and CEO
              </Text>
            </Stack>
            <Text lineHeight={"22px"}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
              officiis aperiam veritatis maxime magnam ea delectus quis porro
              consequatur nisi accusamus fugiat obcaecati aliquid, perspiciatis,
              minima error blanditiis impedit. Repudiandae. Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Corrupti officiis aperiam
              veritatis maxime magnam ea delectus quis porro consequatur nisi
              accusamus fugiat obcaecati aliquid, perspiciatis, minima error
              blanditiis impedit. Repudiandae. Description of the team member's
              role and contributions to the company.
            </Text>
            <Flex gap={4}>
              {socialLinks.map((social, index) => (
                <SocialButton
                  key={index}
                  icon={social.icon}
                  href={social.href ?? "#"}
                />
              ))}
            </Flex>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};

export default About;
