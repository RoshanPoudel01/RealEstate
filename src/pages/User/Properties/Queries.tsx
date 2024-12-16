import { Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { imageAssets } from "@realState/assets/images";
import { TextInput } from "@realState/components/Form";
import { Button } from "@realState/components/ui/button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
const defaultValue = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const Queries = () => {
  const contactSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email().required("Email is required"),
    phone: yup
      .string()
      .required("Phone is required")
      .matches(/^\d{10}$/, "Please enter a 10 digit valid phone number"),
    message: yup.string().required("Message is required"),
  });

  const currentLanguage = localStorage.getItem("language");

  const { control, handleSubmit } = useForm({
    defaultValues: defaultValue,
    resolver: yupResolver(contactSchema),
  });

  const submitContactForm = (data: any) => {
    console.log(data);
  };
  return (
    <Flex
      flexDirection={"column"}
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      bg={"gray.100"}
      gap={{
        base: 5,
        md: 10,
      }}
      w={"full"}
      mt={10}
      py={10}
    >
      <Stack
        w={"full"}
        maxW={{
          base: "90%",
          md: "70%",
          xl: "60%",
          "2xl": "50%",
        }}
        align={"center"}
        gap={4}
      >
        <Heading color={"primary.500"} fontSize={{ base: "xl", md: "3xl" }}>
          {currentLanguage === "en" ? "Have any queries?" : "कुनै प्रश्न छ?"}
        </Heading>
        <Text>
          {currentLanguage === "en"
            ? " Our Team will try to address your query regarding this particular product as soon as you enquire about product"
            : "तपाईंले उत्पादनको बारेमा सोधपुछ गर्ने बित्तिकै हाम्रो टोलीले यस विशेष उत्पादनको बारेमा तपाईंको प्रश्नलाई सम्बोधन गर्ने प्रयास गर्नेछ"}
        </Text>
        <Image
          boxSize={20}
          src={imageAssets.QuestionMark}
          alt="Question Mark"
        />
        <Stack
          asChild
          align={{
            base: "center",
            md: "flex-end",
          }}
          w={"full"}
          gap={4}
          mt={4}
        >
          <form onSubmit={handleSubmit(submitContactForm)}>
            <TextInput
              placeholder={"Name"}
              type="text"
              name="name"
              control={control}
              size={"lg"}
            />
            <TextInput
              type="text"
              placeholder={"Email"}
              name="email"
              control={control}
              size={"lg"}
            />
            <TextInput
              type="number"
              placeholder={"Phone"}
              name="phone"
              control={control}
              size={"lg"}
            />
            <TextInput
              type="textarea"
              placeholder={"Message"}
              name="message"
              control={control}
              size={"lg"}
            />
            <Button type="submit" size={"lg"} w={"full"}>
              Submit
            </Button>
          </form>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default Queries;
