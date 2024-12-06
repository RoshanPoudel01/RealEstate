import { Flex, HStack, SimpleGrid } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ReactDropzone, TextInput } from "@realState/components/Form";
import StatusRadio from "@realState/components/Form/StatusRadio";
import { Button } from "@realState/components/ui/button";
import useGetDirtyData from "@realState/hooks/useGetDirtyData";
import useGetErrors from "@realState/hooks/useGetErrors";
import { toFormData } from "@realState/services/service-axios";
import {
  useCreateService,
  useFetchServiceById,
  useUpdateService,
} from "@realState/services/service-services";
import Loader from "@realState/utils/Loader";
import PageHeader from "@realState/utils/PageHeader";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

const schema = yup.object().shape({
  title_en: yup.string().required("Title is required"),
  title_np: yup.string().required("Title is required"),
  description_en: yup.string().required("Description is required"),
  description_np: yup.string().required("Description is required"),
  image: yup.mixed().required("Image is required"),
  is_active: yup.string().required("Status is required"),
  display_order: yup
    .number()
    .required("Display Order is required")
    .typeError("Display Order must be a number"),
});

type ServiceFormValues = yup.InferType<typeof schema>;

const ServiceForm = () => {
  const defaultValues: ServiceFormValues = {
    title_en: "",
    title_np: "",
    description_en: "",
    description_np: "",
    image: "",
    is_active: "1",
    display_order: "" as never as number,
  };

  const { id } = useParams();

  const {
    data: service,
    isPending: isServicePending,
    isFetching: isServiceFetching,
  } = useFetchServiceById(id!);

  useEffect(() => {
    if (service?.data) {
      reset({
        ...service?.data,
        is_active: service?.data.is_active ? "1" : "0",
      });
    } else {
      reset(defaultValues);
    }
  }, [service]);

  const navigate = useNavigate();

  const { control, handleSubmit, reset, formState } =
    useForm<ServiceFormValues>({
      defaultValues,
      resolver: yupResolver(schema),
    });

  const {
    mutateAsync: addService,
    isPending: isAdding,
    isError: isAddError,
    error: addError,
  } = useCreateService();

  const {
    mutateAsync: updateService,
    isPending: isUpdating,
    isError: isUpdateError,
    error: updateError,
  } = useUpdateService();

  const [backendError, setBackendError] = useState<Record<string, string[]>>(
    {}
  );

  const [removeImage, setRemoveImage] = useState(false);

  useEffect(() => {
    if (isAddError) {
      setBackendError(useGetErrors(addError));
    } else if (isUpdateError) {
      setBackendError(useGetErrors(updateError));
    }
  }, [isAddError, addError, isUpdateError, updateError]);

  const onSubmit = async (data: ServiceFormValues) => {
    console.log({
      dirtyData: useGetDirtyData(formState, data),
    });

    const formData = toFormData(id ? useGetDirtyData(formState, data) : data);
    if (removeImage) {
      formData.append("remove_image", "1");
    }

    if (id) {
      const response = await updateService({ data: formData, id });
      if (response.data.status) {
        reset(defaultValues);
        navigate("/admin/services");
      }
    } else {
      const response = await addService({ data: formData });
      if (response.data.status) {
        reset(defaultValues);
        navigate("/admin/services");
      }
    }
  };

  return (
    <>
      {!!id && (isServicePending || isServiceFetching) ? (
        <Loader />
      ) : (
        <Flex flexDir={"column"} gap={8}>
          <SimpleGrid
            alignItems={"start"}
            columns={{ base: 1, md: 2 }}
            gap={4}
            asChild
          >
            <form
              id="service-form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <PageHeader heading="Add Service" description="Add new service" />
              <TextInput
                control={control}
                required
                backendError={backendError.title_en}
                name="title_en"
                label="Title (EN)"
              />
              <TextInput
                control={control}
                required
                backendError={backendError.title_np}
                name="title_np"
                label="Title (NP)"
              />
              <TextInput
                control={control}
                required
                backendError={backendError.description_en}
                name="description_en"
                label="Description (EN)"
                type="textarea"
              />
              <TextInput
                control={control}
                required
                backendError={backendError.description_np}
                name="description_np"
                label="Description (NP)"
                type="textarea"
              />
              <TextInput
                control={control}
                required
                backendError={backendError.display_order}
                name="display_order"
                label="Display Order"
                type="number"
              />
              <StatusRadio
                control={control}
                required
                name="is_active"
                label="Status"
                options={[
                  { label: "Active", value: "1" },
                  { label: "Inactive", value: "0" },
                ]}
              />
              <ReactDropzone
                control={control}
                required
                backendError={backendError.image}
                name="image"
                label="Image"
                options={{
                  accept: { "image/*": [] },
                  maxSize: 5,
                }}
                file={service?.data?.image ?? ""}
                setRemoveImage={setRemoveImage}
              />
            </form>
          </SimpleGrid>
          <HStack align={"center"}>
            <Button onClick={() => navigate(-1)} variant="outline">
              Cancel
            </Button>
            <Button
              form="service-form"
              loading={isAdding || isUpdating}
              type="submit"
            >
              Submit
            </Button>
          </HStack>
        </Flex>
      )}
    </>
  );
};

export default ServiceForm;
