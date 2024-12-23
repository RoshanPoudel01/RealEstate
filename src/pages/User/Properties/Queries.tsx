import { Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { imageAssets } from "@realState/assets/images";
import { TextInput } from "@realState/components/Form";
import { Button } from "@realState/components/ui/button";
import { useSendMessage } from "@realState/services/service-enquiries";
import { t } from "i18next";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import * as yup from "yup";
const defaultValue = {
  name: "",
  email: "",
  phone: "",
  question: "",
};

const Queries = () => {
  const contactSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email().required("Email is required"),
    phone: yup
      .string()
      .required("Phone is required")
      .matches(/^\d{10}$/, "Please enter a 10 digit valid phone number"),
    question: yup.string().required("question is required"),
  });

  type ContactFormValues = yup.InferType<typeof contactSchema>;
  const { id } = useParams<{ id: string }>();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValue,
    resolver: yupResolver(contactSchema),
  });
  const currentLanguage = localStorage.getItem("language") ?? "en";
  const { mutateAsync: sendEnquiry, isPending } = useSendMessage();

  const submitContactForm = async (data: ContactFormValues) => {
    const response = await sendEnquiry({
      data: {
        ...data,
        property_id: id,
      },
    });
    if (response.data.status) {
      reset(defaultValue);
    }
  };
  return (
    <Flex
      flexDirection={"column"}
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      bg={"white"}
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
          {t("queries:heading")}
        </Heading>
        <Text>{t("queries:description")} </Text>
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
          <form id="contact-form" onSubmit={handleSubmit(submitContactForm)}>
            <TextInput
              name="name"
              type="text"
              placeholder={currentLanguage === "en" ? "Full Name" : "पुरा नाम"}
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
            <Button
              form="contact-form"
              loading={isPending}
              type="submit"
              w={"full"}
            >
              {currentLanguage === "en" ? "Send" : "पठाउनुहोस्"}
            </Button>
          </form>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default Queries;
