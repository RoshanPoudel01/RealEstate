import {
  Center,
  Flex,
  GridItem,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Envelope, MapPin, PhoneCall } from "@phosphor-icons/react";
import { TextInput } from "@realState/components/Form";
import { Button } from "@realState/components/ui/button";
import { useSendMessage } from "@realState/services/service-enquiries";
import { useStoreSettingData } from "@realState/store";
import { t } from "i18next";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
const defaultValues = {
  name: "",
  email: "",
  phone: "",
  question: "",
};
const Contact = () => {
  const currentLanguage = localStorage.getItem("language");

  const { settingData } = useStoreSettingData();
  const schema = yup.object().shape({
    name: yup
      .string()
      .required(
        currentLanguage === "en" ? "Full name is required" : "पुरा नाम आवश्यक छ"
      ),
    email: yup
      .string()
      .email()
      .required(
        currentLanguage === "en" ? "Email is required" : "ईमेल आवश्यक छ"
      ),
    phone: yup
      .string()
      .required(
        currentLanguage === "en" ? "Phone is required" : "फोन नम्बर आवश्यक छ"
      ),
    question: yup
      .string()
      .required(
        currentLanguage === "en" ? "Message is required" : "सन्देश आवश्यक छ"
      ),
  });
  const { control, handleSubmit, reset } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { mutateAsync: send, isPending: isSending } = useSendMessage();

  const submitFrm = async (data: typeof defaultValues) => {
    const response = await send({ data });
    if (response.data.status) {
      reset(defaultValues);
    }
  };
  return (
    <Center flexDir={"column"} gap={4}>
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
          color={"primary.400"}
          fontSize={"50px"}
          lineHeight={"69px"}
          fontWeight={700}
        >
          {t("contact:heading")}
        </Text>
        <Text fontSize={"21px"} fontWeight={400} lineHeight={"35px"}>
          {t("contact:description")}
        </Text>
      </Stack>

      <SimpleGrid
        columns={{ base: 1, xl: 2 }}
        alignItems={"start"}
        gap={5}
        p={10}
        py={20}
        bg={"gray.50"}
        w={"full"}
      >
        <GridItem colSpan={1}>
          <Flex
            flexDir={"column"}
            gap={4}
            mx={"auto"}
            maxW={{
              lg: "50%",
            }}
            w={"full"}
          >
            <Text pl={3} fontSize={"md"}>
              {currentLanguage === "en"
                ? " Questions, comments, or suggestions? Simply fill in the form and we'll be in touch shortly."
                : "प्रश्नहरू, टिप्पणीहरू, वा सुझावहरू? सिम्पली फारम भर्नुहोस् र हामी थोरै गरी सम्पर्क गर्नेछौं।"}
            </Text>
            <HStack align={"center"}>
              <Icon asChild boxSize={8} color={"primary.500"}>
                <MapPin />
              </Icon>
              <Text
                _hover={{
                  textDecoration: "underline",
                }}
              >
                {settingData?.address}
              </Text>
            </HStack>
            <HStack align={"center"}>
              <Icon asChild boxSize={8} color={"primary.500"}>
                <PhoneCall />
              </Icon>
              <Text
                _hover={{
                  textDecoration: "underline",
                }}
                asChild
              >
                <Link to={`tel:${settingData?.phone}`}>
                  {settingData?.phone}
                </Link>
              </Text>
            </HStack>
            <HStack
              _hover={{
                textDecoration: "underline",
              }}
              align={"center"}
            >
              <Icon asChild boxSize={8} color={"primary.500"}>
                <Envelope />
              </Icon>
              <Text asChild>
                <Link to={`mailto:${settingData?.email}`}>
                  {settingData?.email}
                </Link>
              </Text>
            </HStack>
          </Flex>
        </GridItem>
        <GridItem colSpan={1}>
          <Stack
            maxW={{
              lg: "50%",
              xl: "70%",
            }}
            mx={"auto"}
            w={"full"}
            gap={4}
            asChild
          >
            <form onSubmit={handleSubmit(submitFrm)} noValidate>
              <TextInput
                name="name"
                type="text"
                placeholder={
                  currentLanguage === "en" ? "Full Name" : "पुरा नाम"
                }
                control={control}
                required
              />
              <TextInput
                name="email"
                type="text"
                placeholder={currentLanguage === "en" ? "Email" : "ईमेल"}
                control={control}
                required
              />
              <TextInput
                name="phone"
                type="number"
                placeholder={
                  currentLanguage === "en" ? "Phone Number" : "फोन नम्बर"
                }
                control={control}
                required
              />
              <TextInput
                name="question"
                type="textarea"
                placeholder={currentLanguage === "en" ? "Message" : "सन्देश"}
                control={control}
                required
              />
              <Button loading={isSending} type="submit" w={"full"}>
                {currentLanguage === "en" ? "Send" : "पठाउनुहोस्"}
              </Button>
            </form>
          </Stack>
        </GridItem>
      </SimpleGrid>
      <Flex
        h={{ base: "400px", md: "600px" }}
        w={"95vw"}
        align={"center"}
        justify={"center"}
        border={"2px solid #7884B6"}
        my={20}
        mx={"auto"}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.8164183874615!2d85.29420807576116!3d27.722953924802432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa0763bf23ef81bff%3A0x96ec34c32fde92fd!2sCode%20Tara!5e0!3m2!1sen!2snp!4v1734587966008!5m2!1sen!2snp"
          width="100%"
          height="100%"
          loading="lazy"
        ></iframe>
      </Flex>
    </Center>
  );
};

export default Contact;
