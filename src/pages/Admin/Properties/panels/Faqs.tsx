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
<<<<<<< Updated upstream
=======
import { useFetchFaqs } from "@realState/services/service-properties";
import Loader from "@realState/utils/Loader";
import { useEffect } from "react";
>>>>>>> Stashed changes
import { useFieldArray, useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

interface IFaq {
  question: string;
  answer: string;
  display_order: number;
}

const schema = yup.object().shape({
  faqs: yup.array().of(
    yup.object().shape({
      question: yup.string().required("Question is required"),
      answer: yup.string().required("Answer is required"),
      display_order: yup.number().required("Display Order is required"),
    })
  ),
});

type FAQFormValues = yup.InferType<typeof schema>;

const FAQs = () => {
  const defaultValues = {
    faqs: [
      {
        question: "",
        answer: "",
        display_order: "" as never as number,
      },
    ] as IFaq[],
  };

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const productId = useParams().id || urlParams.get("id");
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm({ defaultValues });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "faqs",
  });

  const handleAddField = () => {
    append({ question: "", answer: "", display_order: 0 as never as number });
  };

  const handleRemoveField = (index: number) => {
    remove(index);
  };

<<<<<<< Updated upstream
=======
  const {
    data: faqs,
    isPending: isFaqsPending,
    isFetching: isFaqsFetching,
  } = useFetchFaqs(id!);

  useEffect(() => {
    if (faqs?.data) {
      append(faqs?.data?.rows);
    }
  }, [faqs]);

  // const {mutateAsync: createFaqs, isPending} = useUpdateFaqs();

>>>>>>> Stashed changes
  const onSubmit = async (data: FAQFormValues) => {
    // const response = await createFaqs({ id: productId, data });
    // if (response.data.status) {
    //   navigate("/product");
    // }
    console.log({ id: productId, data });
  };

<<<<<<< Updated upstream
  return (
=======
  return isFaqsFetching || isFaqsPending ? (
    <Loader />
  ) : (
>>>>>>> Stashed changes
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
                  name={`faqs[${index}].question`}
                  label="Question"
                  required
                />
                <TextInput
                  control={control}
                  name={`faqs[${index}].answer`}
                  label="Answer"
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
        <Button type="submit">Save</Button>
      </HStack>
    </Flex>
  );
};

export default FAQs;
