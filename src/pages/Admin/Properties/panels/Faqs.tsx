import {
  Card,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { X } from "@phosphor-icons/react";
import { TextInput } from "@realState/components/Form";
import { Button } from "@realState/components/ui/button";
import {
  useFetchFaqs,
  useUpdateFaqs,
} from "@realState/services/service-properties";
import Loader from "@realState/utils/Loader";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import NotFound from "./NotFound";

interface IFaq {
  question_en: string;
  answer_en: string;
  question_np: string;
  answer_np: string;
  display_order: number;
}

const schema = yup.object().shape({
  faqs: yup.array().of(
    yup.object().shape({
      question_en: yup.string().required("Question is required"),
      answer_en: yup.string().required("Answer is required"),
      question_np: yup.string().required("Question is required"),
      answer_np: yup.string().required("Answer is required"),
      display_order: yup.number().required("Display Order is required"),
    })
  ),
});

type FAQFormValues = yup.InferType<typeof schema>;

const FAQs = () => {
  const defaultValues = {
    faqs: [
      {
        question_en: "",
        answer_en: "",
        question_np: "",
        answer_np: "",
        display_order: "" as never as number,
      },
    ] as IFaq[],
  };
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm({ defaultValues });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "faqs",
  });

  const handleAddField = () => {
    append({
      question_en: "",
      answer_en: "",
      question_np: "",
      answer_np: "",

      display_order: 0 as never as number,
    });
  };

  const handleRemoveField = (index: number) => {
    remove(index);
  };

  const { data: faqs, isLoading } = useFetchFaqs(id!);

  useEffect(() => {
    if (faqs?.data) {
      faqs.data.rows.map((faq) => {
        append({
          question_en: faq.question_en ?? "",
          answer_en: faq.answer_en ?? "",
          question_np: faq.question_np ?? "",
          answer_np: faq.answer_np ?? "",
          display_order: faq.display_order,
        });
      });
    }
  }, [faqs]);

  const { mutateAsync: update, isPending } = useUpdateFaqs();

  const onSubmit = async (data: FAQFormValues) => {
    const response = await update({ id: id!, data });
    if (response.data.status) {
      navigate("/admin/properties");
    }
  };

  return isLoading ? (
    <Loader />
  ) : !!id && !isLoading && !faqs ? (
    <NotFound />
  ) : (
    <Flex
      flexDir={"column"}
      gap={4}
      as={"form"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={4}>
        {fields.map((field, index) => (
          <Card.Root key={field.id} p={4} mb={4}>
            <Card.Header py={1}>
              <HStack justify="space-between">
                <Heading size="md">FAQ {index + 1}</Heading>
                {fields.length > 1 && (
                  <IconButton
                    variant={"surface"}
                    aria-label="Remove FAQ"
                    onClick={() => handleRemoveField(index)}
                    colorPalette="red"
                  >
                    <Icon boxSize={5} asChild>
                      <X />
                    </Icon>
                  </IconButton>
                )}
              </HStack>
            </Card.Header>
            <Card.Body py={1}>
              <Stack gap={4}>
                <TextInput
                  control={control}
                  name={`faqs[${index}].question_en`}
                  label="Question (EN)"
                  required
                />
                <TextInput
                  control={control}
                  name={`faqs[${index}].answer_en`}
                  label="Answer (EN)"
                  type="textarea"
                  required
                />
                <TextInput
                  control={control}
                  name={`faqs[${index}].question_np`}
                  label="Question (NP)"
                  required
                />
                <TextInput
                  control={control}
                  name={`faqs[${index}].answer_np`}
                  label="Answer (NP)"
                  type="textarea"
                  required
                />
                <TextInput
                  control={control}
                  name={`faqs[${index}].display_order`}
                  label="Display Order"
                />
              </Stack>
            </Card.Body>
          </Card.Root>
        ))}
      </SimpleGrid>
      <HStack align={"center"}>
        <Button variant={"outline"} onClick={handleAddField}>
          Add FAQ
        </Button>
        <Button loading={isPending} type="submit">
          Save
        </Button>
      </HStack>
    </Flex>
  );
};

export default FAQs;
