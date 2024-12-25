import { Flex, HStack, SimpleGrid } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ReactDropzone, TextInput } from "@realState/components/Form";
import StatusRadio from "@realState/components/Form/StatusRadio";
import { Button } from "@realState/components/ui/button";
import useGetErrors from "@realState/hooks/useGetErrors";
import { toFormData } from "@realState/services/service-axios";
import {
  useCreateCategory,
  useFetchCategoryById,
  useUpdateCategory,
} from "@realState/services/service-category";
import Loader from "@realState/utils/Loader";
import PageHeader from "@realState/utils/PageHeader";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

const schema = yup.object().shape({
  name_en: yup.string().required("Name is required"),
  name_np: yup.string().required("Name is required"),
  description_en: yup.string().required("Description is required"),
  description_np: yup.string().required("Description is required"),
  image: yup.mixed().required("Image is required"),
  display_order: yup
    .number()
    .required("Display Order is required")
    .typeError("Display Order must be a number"),
  is_active: yup.string().required(),
});

type CategoryFormValues = yup.InferType<typeof schema>;

const CategoryForm = () => {
  const defaultValues = {
    name_en: "",
    name_np: "",
    description_en: "",
    description_np: "",
    image: "",
    display_order: "" as never as number,
    is_active: "1",
  };

  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { id } = useParams();

  const {
    data: category,
    isPending: isCategoryPending,
    isFetching: isCategoryFetching,
  } = useFetchCategoryById(id!);

  const [removeImage, setRemoveImage] = React.useState(false);

  useEffect(() => {
    if (id) {
      reset({
        name_en: category?.data.name_en ?? "",
        name_np: category?.data.name_np ?? "",
        description_en: category?.data.description_en ?? "",
        description_np: category?.data.description_np ?? "",

        image: category?.data.image,
        is_active: category?.data.is_active ? "1" : "0",
        display_order: category?.data.display_order,
      });
    } else {
      reset(defaultValues);
    }
  }, [id, category]);

  const {
    mutateAsync: addCategory,
    isPending: isAdding,
    isError: isAddError,
    error: addError,
  } = useCreateCategory();

  const {
    mutateAsync: updateCategory,
    isPending: isUpdating,
    isError: isUpdateError,
    error: updateError,
  } = useUpdateCategory();

  const [backendError, setBackendError] = React.useState<
    Record<string, string[]>
  >({});

  useEffect(() => {
    if (isAddError) {
      setBackendError(useGetErrors(addError));
    } else if (isUpdateError) {
      setBackendError(useGetErrors(updateError));
    }
  }, [isAddError, addError, isUpdateError, updateError]);

  const onSubmit = async (data: CategoryFormValues) => {
    const formData = toFormData(data);

    if (removeImage) {
      formData.append("remove_image", "1");
    }

    if (id) {
      const response = await updateCategory({ data: formData, id });
      if (response.data.status) {
        reset(defaultValues);
        navigate("/admin/category");
      }
    } else {
      const response = await addCategory({ data: formData });
      if (response.data.status) {
        reset(defaultValues);
        navigate("/admin/category");
      }
    }
  };

  return !!id && (isCategoryPending || isCategoryFetching) ? (
    <Loader />
  ) : (
    <Flex flexDir={"column"} gap={4}>
      <PageHeader
        heading={id ? "Edit Category" : "Add Category"}
        description={
          id ? "Edit the category details" : "Add the category details"
        }
      />
      <SimpleGrid
        alignItems={"start"}
        columns={{ base: 1, md: 2 }}
        gap={4}
        asChild
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate id={"category-form"}>
          <TextInput
            control={control}
            required
            backendError={backendError.name_en}
            name={"name_en"}
            label={"Name (En)"}
          />
          <TextInput
            control={control}
            required
            name="name_np"
            label="Name (Np)"
            backendError={backendError.name_np}
          />
          <TextInput
            control={control}
            required
            name="description_en"
            label="Description (En)"
            type="textarea"
            backendError={backendError.description_en}
          />

          <TextInput
            control={control}
            required
            name="description_np"
            label="Description (Np)"
            type="textarea"
            backendError={backendError.description_np}
          />

          <TextInput
            control={control}
            required
            name="display_order"
            label="Display Order"
            backendError={backendError.display_order}
            type="number"
          />
          <StatusRadio control={control} name="is_active" label="Status" />
          <ReactDropzone
            name="image"
            control={control}
            required
            backendError={backendError.image}
            label="Image"
            file={category?.data.image ?? ""}
            setRemoveImage={setRemoveImage}
            options={{
              accept: { "image/*": [] },
              maxSize: 5,
            }}
            message="Drop image here or click to upload"
          />
        </form>
      </SimpleGrid>
      <HStack mt={4}>
        <Button
          variant={"outline"}
          colorPalette={"gray"}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        <Button
          type="submit"
          form="category-form"
          colorPalette={"primary"}
          color={"white"}
          loading={isAdding || isUpdating}
        >
          Submit
        </Button>
      </HStack>
    </Flex>
  );
};

export default CategoryForm;
