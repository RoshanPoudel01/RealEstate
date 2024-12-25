import { Flex, SimpleGrid, Stack } from "@chakra-ui/react";
import { ReactDropzone, TextInput } from "@realState/components/Form";
import { Button } from "@realState/components/ui/button";
import useGetErrors from "@realState/hooks/useGetErrors";
import {
  useAddGallery,
  useFetchGalleryById,
  useUpdateGallery,
} from "@realState/services/service-gallery";
import Loader from "@realState/utils/Loader";
import PageHeader from "@realState/utils/PageHeader";
import { toFormData } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const GalleryForm = () => {
  const { id } = useParams<{ id: string }>();

  const defaultValues = {
    title_en: "",
    title_np: "",
    description_en: "",
    description_np: "",
    image: "",
    images: [],
    display_order: "" as never as number,
  };
  const navigate = useNavigate();
  const [removeImage, setRemoveImage] = useState(false);
  const [deleteImages, setDeleteImages] = useState<string[]>([]);
  const [prevFiles, setPrevFiles] = useState<{ id: number; url: string }[]>([]);
  const { control, handleSubmit, reset } = useForm({ defaultValues });
  const { data: gallery, isLoading: galleryLoading } = useFetchGalleryById(id);

  useEffect(() => {
    if (gallery) {
      reset({
        title_en: gallery.data.title_en,
        title_np: gallery.data.title_np,
        description_en: gallery.data.description_en,
        description_np: gallery.data.description_np,
        display_order: gallery.data.display_order,
        image: gallery.data.image,
        images: gallery.data.images.map((image: any) => image.image),
      });
      setPrevFiles(
        gallery.data.images.map((image: any) => ({
          id: image.id,
          url: image.image,
        }))
      );
    }
  }, [gallery, reset]);

  const {
    mutateAsync: create,
    isPending: creating,
    isError: isCreateError,
    error: createError,
  } = useAddGallery();

  const {
    mutateAsync: update,
    isPending: updating,
    isError: isUpdateError,
    error: updateError,
  } = useUpdateGallery();

  const [backendError, setBackendError] = useState<Record<string, string[]>>(
    {}
  );

  useEffect(() => {
    if (isCreateError) {
      setBackendError(useGetErrors(createError));
    } else if (isUpdateError) {
      setBackendError(useGetErrors(updateError));
    } else {
      setBackendError({});
    }
  }, [createError, updateError, isCreateError, isUpdateError]);

  const onSubmit = async (data: any) => {
    const formData = toFormData(data);
    if (deleteImages.length) {
      formData.append("delete_images", JSON.stringify(deleteImages));
    }
    if (removeImage) {
      formData.append("remove_image", "1");
    }
    if (id) {
      const response = await update({ id, data: formData });
      if (response.data.status) {
        navigate("/admin/gallery");
      }
    } else {
      const response = await create({ data: formData });
      if (response.data.status) {
        navigate("/admin/gallery");
      }
    }
  };

  return galleryLoading ? (
    <Loader />
  ) : (
    <Flex flexDir={"column"} gap={4}>
      <PageHeader heading="Gallery Form" description="Add or Edit Gallery" />
      <Stack gap={4} asChild>
        <form id="gallery-form" onSubmit={handleSubmit(onSubmit)}>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
            <TextInput
              control={control}
              label="Title (English)"
              name="title_en"
              backendError={backendError.title_en}
            />
            <TextInput
              control={control}
              label="Title (Nepali)"
              name="title_np"
              backendError={backendError.title_np}
            />
            <TextInput
              control={control}
              label="Description (English)"
              name="description_en"
              type="textarea"
              backendError={backendError.description_en}
            />
            <TextInput
              control={control}
              label="Description (Nepali)"
              name="description_np"
              type="textarea"
              backendError={backendError.description_np}
            />
            <TextInput
              control={control}
              label="Display Order"
              name="display_order"
              backendError={backendError.display_order}
              type="number"
            />
          </SimpleGrid>
          <ReactDropzone
            control={control}
            name="image"
            label="Thumbnail"
            backendError={backendError.image}
            options={{
              accept: { "image/*": [] },
            }}
            file={gallery?.data.image ?? ""}
            boxWidth={"250px"}
            boxAspectRatio={16 / 9}
            setRemoveImage={setRemoveImage}
          />
          <ReactDropzone
            control={control}
            name="images"
            label="Images"
            backendError={backendError.image}
            options={{
              accept: { "image/*": [] },
            }}
            isMultiple
            w={"full"}
            boxWidth={"250px"}
            boxAspectRatio={16 / 9}
            prevFiles={prevFiles}
            setPrevFiles={setPrevFiles}
            setDeleteImages={setDeleteImages}
          />
          <Button
            type="submit"
            form="gallery-form"
            loading={creating || updating}
          >
            Save
          </Button>
        </form>
      </Stack>
    </Flex>
  );
};

export default GalleryForm;
