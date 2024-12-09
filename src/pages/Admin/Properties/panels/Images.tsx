import { HStack, Stack } from "@chakra-ui/react";
import { ReactDropzone } from "@realState/components/Form";
import { Button } from "@realState/components/ui/button";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const Images = () => {
  const { id } = useParams<{ id: string }>();

  const defaultValues = {
    image: "",
    images: [] as string[],
  };

  const { control, handleSubmit, reset } = useForm({
    defaultValues,
  });

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  return (
    <Stack gap={4} asChild>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <ReactDropzone
          control={control}
          name="image"
          label="Image"
          options={{
            accept: { "image/*": [] },
          }}
        />
        <ReactDropzone
          control={control}
          name="images"
          label="Images"
          options={{ accept: { "image/*": [] } }}
          isMultiple
          w={"full"}
          message="Upload multiple images"
        />
        <HStack mt={4} align={"center"} gap={4}>
          <Button type="submit">Save & Next</Button>
        </HStack>
      </form>
    </Stack>
  );
};

export default Images;
