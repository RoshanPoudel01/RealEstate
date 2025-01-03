import { Flex, HStack, SimpleGrid } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ReactDropzone, TextInput } from "@realState/components/Form";
import StatusRadio from "@realState/components/Form/StatusRadio";
import { Button } from "@realState/components/ui/button";
import useGetDirtyData from "@realState/hooks/useGetDirtyData";
import useGetErrors from "@realState/hooks/useGetErrors";
import { toFormData } from "@realState/services/service-axios";
import {
  useCreateSlider,
  useFetchSliderById,
  useUpdateSlider,
} from "@realState/services/service-sliders";
import Loader from "@realState/utils/Loader";
import PageHeader from "@realState/utils/PageHeader";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

const schema = yup.object().shape({
  title_en: yup.string().required("Title is required"),
  title_np: yup.string().required("Title is required"),
  caption_en: yup.string().required("Caption is required"),
  caption_np: yup.string().required("Caption is required"),
  image: yup.mixed().required("Image is required"),
  is_active: yup.string().required("Status is required"),
});

type SliderFormValues = yup.InferType<typeof schema>;

const SliderForm = () => {
  const defaultValues: SliderFormValues = {
    title_en: "",
    title_np: "",
    caption_en: "",
    caption_np: "",
    image: "",
    is_active: "1",
  };

  const { id } = useParams();

  const {
    data: slider,
    isPending: isSliderPending,
    isFetching: isSliderFetching,
  } = useFetchSliderById(id!);

  useEffect(() => {
    if (slider?.data) {
      reset({ ...slider?.data, is_active: slider?.data.is_active ? "1" : "0" });
    } else {
      reset(defaultValues);
    }
  }, [slider]);

  const navigate = useNavigate();

  const { control, handleSubmit, reset, formState } = useForm<SliderFormValues>(
    {
      defaultValues,
      resolver: yupResolver(schema),
    }
  );

  const {
    mutateAsync: addSlider,
    isPending: isAdding,
    isError: isAddError,
    error: addError,
  } = useCreateSlider();

  const {
    mutateAsync: updateSlider,
    isPending: isUpdating,
    isError: isUpdateError,
    error: updateError,
  } = useUpdateSlider();

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

  const onSubmit = async (data: SliderFormValues) => {
    const formData = toFormData(id ? useGetDirtyData(formState, data) : data);
    if (removeImage) {
      formData.append("remove_image", "1");
    }

    if (id) {
      const response = await updateSlider({ data: formData, id });
      if (response.data.status) {
        reset(defaultValues);
        navigate("/admin/sliders");
      }
    } else {
      const response = await addSlider({ data: formData });
      if (response.data.status) {
        reset(defaultValues);
        navigate("/admin/sliders");
      }
    }
  };

  return (
    <>
      {!!id && (isSliderPending || isSliderFetching) ? (
        <Loader />
      ) : (
        <Flex flexDir={"column"} gap={8}>
          <SimpleGrid
            alignItems={"start"}
            columns={{ base: 1, md: 2 }}
            gap={4}
            asChild
          >
            <form id="slider-form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <PageHeader heading="Add Slider" description="Add new slider" />
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
                backendError={backendError.caption_en}
                name="caption_en"
                label="Caption (EN)"
              />
              <TextInput
                control={control}
                required
                backendError={backendError.caption_np}
                name="caption_np"
                label="Caption (NP)"
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
                file={slider?.data?.image ?? ""}
                setRemoveImage={setRemoveImage}
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
            </form>
          </SimpleGrid>
          <HStack align={"center"}>
            <Button onClick={() => navigate(-1)} variant="outline">
              Cancel
            </Button>
            <Button
              form="slider-form"
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

export default SliderForm;
