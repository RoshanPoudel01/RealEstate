import { Flex, SimpleGrid } from "@chakra-ui/react";
import { ReactDropzone, TextInput } from "@realState/components/Form";
import CkEditor from "@realState/components/Form/CkEditor";
import { Button } from "@realState/components/ui/button";
import useGetErrors from "@realState/hooks/useGetErrors";
import {
  useFetchSection,
  useUpdateSection,
} from "@realState/services/service-sections";
import PageHeader from "@realState/utils/PageHeader";
import { toFormData } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  id: yup.number().required("Id is required"),
  title_en: yup.string().required("Title is required"),
  title_np: yup.string().required("Title is required"),
  description_en: yup.string().required("Description is required"),
  description_np: yup.string().required("Description is required"),
});

type FormValues = yup.InferType<typeof schema>;

const AboutUs = () => {
  const slug = "about-section";
  const defaultValues = {
    id: "" as never as number,
    title_en: "",
    title_np: "",
    description_en: "",
    description_np: "",
    image: "",
  };

  const { control, handleSubmit, reset } = useForm({
    defaultValues,
  });
  const { data: about } = useFetchSection(slug);
  const [backendError, setBackendError] = useState<Record<string, string[]>>(
    {}
  );
  const {
    mutateAsync: updateAbout,
    isPending: isUpdating,
    isError,
    error,
  } = useUpdateSection();

  useEffect(() => {
    if (about) {
      reset(about?.data);
    }
  }, [about]);

  useEffect(() => {
    if (isError) {
      setBackendError(useGetErrors(error));
    }
  }, [isError, error]);

  const onSubmit = async (data: FormValues) => {
    setBackendError({});

    const { id, ...rest } = data;
    const formData = toFormData(rest);
    const response = await updateAbout({ id, data: formData });
    if (response.status === 400) {
      setBackendError({});
    }
  };

  return (
    <Flex flexDir={"column"} gap={4}>
      <PageHeader
        heading="About Us"
        description="Update the about us section"
      />
      <SimpleGrid
        alignItems={"start"}
        columns={{ base: 1, md: 2 }}
        gap={4}
        asChild
      >
        <form
          noValidate
          id="section-form-about-conditions"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextInput
            control={control}
            name="title_en"
            label="Title (En)"
            required
            backendError={backendError.title_en}
          />
          <TextInput
            control={control}
            name="title_en"
            label="Title (Np)"
            required
            backendError={backendError.title_en}
          />
          <CkEditor
            control={control}
            name="description_en"
            label="Description (En)"
            backendError={backendError.description_en}
          />
          <CkEditor
            control={control}
            name="description_np"
            label="Description (Np)"
            backendError={backendError.description_np}
          />
          <ReactDropzone
            control={control}
            name="image"
            label="Image"
            backendError={backendError.image}
            boxWidth={"full"}
            boxHeight={"full"}
            boxAspectRatio={21 / 9}
            options={{
              accept: { "image/*": [] },
            }}
          />
        </form>
      </SimpleGrid>
      <Button
        loading={isUpdating}
        type="submit"
        form="section-form-about-conditions"
      >
        Save
      </Button>
    </Flex>
  );
};

export default AboutUs;
