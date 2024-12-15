import { Flex, Image, Link, Stack, Text } from "@chakra-ui/react";
import { imageAssets } from "@realState/assets/images";
import { useFetchSettingData } from "@realState/services/service-init";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const SocialButton = ({ icon, href }: { icon: JSX.Element; href: string }) => {
  return (
    <Link href={href} _hover={{ opacity: 0.8 }}>
      {icon}
    </Link>
  );
};
const Footer = () => {
  const { data: settingData } = useFetchSettingData();

  const currentLanguage = localStorage.getItem("language");
  const navigate = useNavigate();
  //   const navigate = useNavigate();
  const socialLinks = [
    { icon: <FaFacebook size="20px" />, href: settingData?.data?.facebook },
    { icon: <FaInstagram size="20px" />, href: settingData?.data?.instagram },
    { icon: <FaYoutube size="20px" />, href: settingData?.data?.youtube },
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
        {
          text:
            currentLanguage === "en"
              ? settingData?.data?.phone_en
              : settingData?.data?.phone_np,
          href: `tel:${settingData?.data?.phone_en ?? ""}`,
        },
        {
          text: settingData?.data?.email,
          href: `mailto:${settingData?.data?.email}`,
        },
        {
          text:
            currentLanguage === "en"
              ? settingData?.data?.address_en
              : settingData?.data?.address_np,
          href: "#",
        },
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
    <Stack as="footer" bg={"primary.50"}>
      <Flex
        direction={"column"}
        w={"100%"}
        paddingX={{
          base: "20px",
          sm: "40px",
          lg: "60px",
        }}
        py={"40px"}
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
                src={settingData?.data?.logo ?? imageAssets.Logo}
                objectFit="contain"
                cursor={"pointer"}
                onClick={() => navigate("/")}
              />
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

            {footerSections.map((section, index) => (
              <Stack key={index} minW={{ base: "150px", md: "auto" }} gap={6}>
                <Text fontWeight="600" color={"red.400"} fontSize="md">
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
