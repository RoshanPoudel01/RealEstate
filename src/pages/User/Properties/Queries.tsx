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

  type ContactFormValues = yup.InferType<typeof contactSchema>;
  const { id } = useParams<{ id: string }>();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValue,
    resolver: yupResolver(contactSchema),
  });

  const { mutateAsync: sendEnquiry, isPending } = useSendMessage();

  const submitContactForm = async (data: ContactFormValues) => {
    const response = await sendEnquiry({ id: id!, data });
    if (response.data.status === "success") {
      reset(defaultValue);
    }
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
            <Button loading={isPending} type="submit" size={"lg"} w={"full"}>
              Submit
            </Button>
          </form>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default Queries;
