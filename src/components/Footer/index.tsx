import { Flex, Image, Link, Stack, Text } from "@chakra-ui/react";
import { imageAssets } from "@realState/assets/images";
import { colorScheme } from "@realState/theme/colorScheme";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const SocialButton = ({ icon, href }: { icon: JSX.Element; href: string }) => {
  return (
    <Link href={href} _hover={{ opacity: 0.8 }}>
      {icon}
    </Link>
  );
};
const Footer = () => {
  const navigate = useNavigate();
  //   const navigate = useNavigate();
  const socialLinks = [
    { icon: <FaFacebook size="20px" />, href: "#" },
    { icon: <FaInstagram size="20px" />, href: "#" },
    { icon: <FaTwitter size="20px" />, href: "#" },
    { icon: <FaLinkedin size="20px" />, href: "#" },
    { icon: <FaYoutube size="20px" />, href: "#" },
  ];

  const footerSections = [
    {
      title: "Services",
      links: [
        { text: "Service 1", href: "#" },
        { text: "Service 2", href: "#" },
        { text: "Service 3", href: "#" },
      ],
    },
    {
      title: "Contact",
      links: [
        { text: "01-12312312, 01-123122233", href: "tel:01-12312312" },
        {
          text: "realstate@gmail.com ( Dummy Mail )",
          href: "mailto:realstate@gmail.com",
        },
        { text: "Balaju, Kathmandu", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { text: "Privacy Policy", href: "#" },
        { text: "Terms of service", href: "#" },
      ],
    },
  ];
  return (
    <Stack as="footer" bg={colorScheme.primary_50}>
      <Flex
        direction={"column"}
        w={"100%"}
        paddingX={{
          base: "20px",
          sm: "40px",
          lg: "60px",
        }}
        paddingTop={"80px"}
        paddingBottom={"20px"}
        gap={"32px"}
      >
        <Flex direction={"column"} gap={"60px"}>
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            alignItems={"flex-start"}
            gap={{
              base: "40px",
              md: "auto",
            }}
          >
            {/* Logo and Social Links Section */}
            <Stack justifyContent={"space-between"}>
              <Image
                p={2}
                alt={"neo-logo"}
                height={"90px"}
                w={"full"}
                src={imageAssets.Logo}
                objectFit="contain"
                cursor={"pointer"}
                onClick={() => navigate("/")}
              />
              <Flex gap={4}>
                {socialLinks.map((social, index) => (
                  <SocialButton
                    key={index}
                    icon={social.icon}
                    href={social.href}
                  />
                ))}
              </Flex>
            </Stack>

            {footerSections.map((section, index) => (
              <Stack key={index} minW={{ base: "150px", md: "auto" }} gap={6}>
                <Text fontWeight="600" fontSize="md">
                  {section.title}
                </Text>
                <Stack gap={2}>
                  {section.links.map((link, linkIndex) => (
                    <Link
                      key={linkIndex}
                      href={link?.href}
                      fontSize="14px"
                      color="gray.600"
                      _hover={{ color: "gray.900" }}
                    >
                      {link.text}
                    </Link>
                  ))}
                </Stack>
              </Stack>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Stack>
  );
};

export default Footer;
