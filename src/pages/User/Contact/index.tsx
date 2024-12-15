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
import { useStoreSettingData } from "@realState/store";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
const defaultValues = {
  fullName: "",
  email: "",
  phone: "",
  message: "",
};
const Contact = () => {
  const { settingData } = useStoreSettingData();
  const schema = yup.object().shape({
    fullName: yup.string().required("Full name is required"),
    email: yup.string().email().required("Email is required"),
    phone: yup.string().required("Phone number is required"),
    message: yup.string().required("Message is required"),
  });
  const { control, handleSubmit } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const submitFrm = (data: typeof defaultValues) => {
    console.log(data);
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
        <Text fontSize={"50px"} lineHeight={"69px"} fontWeight={700}>
          Contact Us
        </Text>
        <Text fontSize={"21px"} fontWeight={400} lineHeight={"35px"}>
          Get in touch with us
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
              Questions, comments, or suggestions? Simply fill in the form and
              we'll be in touch shortly.
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
                name="fullName"
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
                name="message"
                type="textarea"
                placeholder="Message"
                control={control}
                required
              />
              <Button type="submit" w={"full"}>
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
