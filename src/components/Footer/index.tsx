import { Flex, Image, Link, Stack, Text } from "@chakra-ui/react";
import { imageAssets } from "@realState/assets/images";
import { useFetchSettingData } from "@realState/services/service-init";
import { useFetchFrontServices } from "@realState/services/service-services";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export const SocialButton = ({
  icon,
  href,
}: {
  icon: JSX.Element;
  href: string;
}) => {
  return (
    <Link href={href} _hover={{ opacity: 0.8 }}>
      {icon}
    </Link>
  );
};
const Footer = () => {
  const currentLanguage = localStorage.getItem("language") ?? "en";
  const { data: settingData } = useFetchSettingData(currentLanguage ?? "en");

  const navigate = useNavigate();
  //   const navigate = useNavigate();
  const socialLinks = [
    { icon: <FaFacebook size="20px" />, href: settingData?.data?.facebook },
    { icon: <FaInstagram size="20px" />, href: settingData?.data?.instagram },
    { icon: <FaYoutube size="20px" />, href: settingData?.data?.youtube },
  ];

  const { data: services } = useFetchFrontServices({
    page: 1,
    perPage: 4,
    language: currentLanguage,
  });

  const footerSections = [
    {
      title: currentLanguage === "en" ? "Services" : "सेवाहरू",
      links:
        services?.data?.rows.map((service) => ({
          text: service.title,
          href: "#",
        })) ?? [],
    },
    {
      title: currentLanguage === "en" ? "Contact" : "सम्पर्क",
      links: [
        {
          text: settingData?.data?.phone,
          href: `tel:${settingData?.data?.phone ?? ""}`,
        },
        {
          text: settingData?.data?.email,
          href: `mailto:${settingData?.data?.email}`,
        },
        {
          text: settingData?.data?.address,
          href: "#",
        },
      ],
    },
    {
      title: currentLanguage === "en" ? "Legal" : "कानूनी",
      links: [
        {
          text: currentLanguage === "en" ? "Privacy Policy" : "गोपनीयता नीति",
          href: "/privacy-policy",
        },
        {
          text:
            currentLanguage === "en"
              ? "Terms and Conditions"
              : "नियम तथा शर्तहरू",
          href: "/terms-and-conditions",
        },
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
            <Stack align={"center"}>
              <Image
                p={2}
                alt={"neo-logo"}
                height={"90px"}
                w={"full"}
                src={settingData?.data?.logo ?? imageAssets.Logo1}
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
                      outline={"none"}
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
