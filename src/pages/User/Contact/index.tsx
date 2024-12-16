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
  const { settingData } = useStoreSettingData();
  const schema = yup.object().shape({
    name: yup.string().required("Full name is required"),
    email: yup.string().email().required("Email is required"),
    phone: yup.string().required("Phone number is required"),
    question: yup.string().required("Message is required"),
  });
  const { control, handleSubmit, reset } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const currentLanguage = localStorage.getItem("language");

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
          {currentLanguage === "en"
            ? "Contact Us"
            : "हामीलाई सम्पर्क गर्नुहोस्"}
        </Text>
        <Text fontSize={"21px"} fontWeight={400} lineHeight={"35px"}>
          {currentLanguage === "en"
            ? "Get in touch with us"
            : "हामीसँग सम्पर्क गर्नुहोस्"}
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
              >
                {settingData?.phone}
              </Text>
            </HStack>
            <HStack align={"center"}>
              <Icon asChild boxSize={8} color={"primary.500"}>
                <Envelope />
              </Icon>
              <Text
                _hover={{
                  textDecoration: "underline",
                }}
                asChild
              >
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
              md: "50%",
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
                placeholder="Full Name"
                control={control}
                required
              />
              <TextInput
                name="email"
                type="text"
                placeholder="Email"
                control={control}
                required
              />
              <TextInput
                name="phone"
                type="number"
                placeholder="Phone Number"
                control={control}
                required
              />
              <TextInput
                name="question"
                type="textarea"
                placeholder="Message"
                control={control}
                required
              />
              <Button loading={isSending} type="submit" w={"full"}>
                Send
              </Button>
            </form>
          </Stack>
        </GridItem>
      </SimpleGrid>
    </Center>
  );
};

export default Contact;
