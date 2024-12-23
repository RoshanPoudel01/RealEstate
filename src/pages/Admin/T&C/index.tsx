import { Flex, SimpleGrid } from "@chakra-ui/react";
import { TextInput } from "@realState/components/Form";
import CkEditor from "@realState/components/Form/CkEditor";
import { Button } from "@realState/components/ui/button";
import useGetDirtyData from "@realState/hooks/useGetDirtyData";
import useGetErrors from "@realState/hooks/useGetErrors";
import {
  useFetchSection,
  useUpdateSection,
} from "@realState/services/service-sections";
import PageHeader from "@realState/utils/PageHeader";
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

const TermsAndConditions = () => {
  const slug = "terms-conditions-section";
  const defaultValues = {
    id: "" as never as number,
    title_en: "",
    title_np: "",
    description_en: "",
    description_np: "",
  };

  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues,
  });
  const { data: terms } = useFetchSection(slug);
  const [backendError, setBackendError] = useState<Record<string, string[]>>(
    {}
  );
  const {
    mutateAsync: updateTerms,
    isPending: isUpdating,
    isError,
    error,
  } = useUpdateSection();

  useEffect(() => {
    if (terms) {
      reset(terms?.data);
    }
  }, [terms]);

  useEffect(() => {
    if (isError) {
      setBackendError(useGetErrors(error));
    }
  }, [isError, error]);

  const onSubmit = async (data: FormValues) => {
    setBackendError({});

    const { id, ...rest } = data;
    const dirtyData = useGetDirtyData(formState, rest);
    const response = await updateTerms({ id, data: dirtyData });
    if (response.status === 400) {
      setBackendError({});
    }
  };

  return (
    <Flex flexDir={"column"} gap={4}>
      <PageHeader
        heading="Terms and Conditions"
        description="Manage the terms and conditions of the website"
      />
      <SimpleGrid
        alignItems={"start"}
        columns={{ base: 1, md: 2 }}
        gap={4}
        asChild
      >
        <form
          noValidate
          id="section-form-terms-conditions"
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
        </form>
      </SimpleGrid>
      <Button
        loading={isUpdating}
        type="submit"
        form="section-form-terms-conditions"
      >
        Save
      </Button>
    </Flex>
  );
};

export default TermsAndConditions;
