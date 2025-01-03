import { HStack, Stack } from "@chakra-ui/react";
import { ReactDropzone } from "@realState/components/Form";
import { Button } from "@realState/components/ui/button";
import { toFormData } from "@realState/services/service-axios";
import { useFetchImages, useFetchPropertyById, useUpdateImages } from "@realState/services/service-properties";
import Loader from "@realState/utils/Loader";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

interface ImagesProps {
  setTabValue: (value: string) => void;
}

const Images:FC<ImagesProps> = (
  { setTabValue },
) => {
  const { id } = useParams<{ id: string }>();

  const defaultValues = {
    image: "",
    images: [] as string[],
  };




  const { control, handleSubmit } = useForm({
    defaultValues,
  });

  const {
    data: property,
  } = useFetchPropertyById(id!);


  console.log({})

  const [prevFiles, setPrevFiles] = useState<{id:number, url: string}[]>([]);
  const [deleteImages, setDeleteImages] = useState<string[]>([]);
  const [removeImage, setRemoveImage] = useState<boolean>(false);

  const {data: images, isPending: isImagesPending, isFetching: isImagesFetching} = useFetchImages (id!);
  useEffect(() => {
    if(images?.data) {
      setPrevFiles(images?.data?.rows.map((image: any) => ({id: image.id, url: image.image})));
    }
  }, [images]);


  const {mutateAsync: createImages, isPending: isCreatingImages} = useUpdateImages();

  const onSubmit = async (data: any) => {

    const formData = toFormData(data);
    if(deleteImages.length> 0) {
      formData.append("deleted_images", JSON.stringify(deleteImages));
  }
  if(removeImage) {
    formData.append("remove_image", "1");
  }
    const response = await createImages({id, data: formData});
    if(response.data.status) {
      setTabValue("faqs");
    }
  };

  return (
   !!id && ( isImagesPending || isImagesFetching) ? <Loader /> :
    <Stack gap={4} asChild>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
      
      <ReactDropzone
          control={control}
          name="image"
          label="Image"
          options={{ accept: { "image/*": [] } }}
          file={property?.data?.image ?? ""}
          setRemoveImage={setRemoveImage}
          w={"full"}
          message="Upload thumbnail"
        />


        <ReactDropzone
          control={control}
          name="images"
          label="Images"
          options={{ accept: { "image/*": [] } }}
          isMultiple
          prevFiles={prevFiles}
          setPrevFiles={setPrevFiles}
          setDeleteImages={setDeleteImages}
          
          w={"full"}
          message="Upload multiple images"
        />
        <HStack mt={4} align={"center"} gap={4}>
          <Button 
          variant={"outline"}
          onClick={() => setTabValue("amenities")}>Back</Button>

          <Button 
          loading={isCreatingImages}
          type="submit">Save & Next</Button>
        </HStack>
      </form>
    </Stack>
  );
};

export default Images;
