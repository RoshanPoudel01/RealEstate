import { Flex, SimpleGrid } from "@chakra-ui/react";
import { ReactDropzone, TextInput } from "@realState/components/Form";
import { Button } from "@realState/components/ui/button";
import {
  useFetchSection,
  useUpdateSection,
} from "@realState/services/service-sections";
import { toFormData } from "axios";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";

interface FormProps {
  slug: string;
}

const SectionFrom: FC<FormProps> = ({ slug }) => {
  const defaultValues = {
    id: "" as never as number,
    title_en: "",
    title_np: "",
    description_en: "",
    description_np: "",
    image: "",
    caption_en: "",
    caption_np: "",
  };

  const { control, handleSubmit, reset } = useForm({ defaultValues });

  const { data: section } = useFetchSection(slug);

  const { mutateAsync: updateSection, isPending } = useUpdateSection();

  useEffect(() => {
    if (section) {
      reset({
        id: section.data.id,
        title_en: section.data.title_en,
        title_np: section.data.title_np,
        description_en: section.data.description_en,
        description_np: section.data.description_np,
        image: section.data.image,
        caption_en: section.data.caption_en,
        caption_np: section.data.caption_np,
      });
    } else {
      reset(defaultValues);
    }
  }, [section, reset]);

  const onSubmit = async (data: any) => {
    const { id, ...rest } = data;
    const formData = toFormData(rest);

    await updateSection({
      id,
      data: formData,
    });
  };

  return (
    <Flex flexDir={"column"} gap={4}>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} asChild>
        <form id={`section-form-${slug}`} onSubmit={handleSubmit(onSubmit)}>
          <TextInput name="id" label="ID" control={control} hidden />
          <TextInput name="title_en" label="Title (En)" control={control} />
          <TextInput name="title_np" label="Title (Np)" control={control} />
          <TextInput
            name="description_en"
            label="Description (En)"
            control={control}
            type="textarea"
          />
          <TextInput
            name="description_np"
            label="Description (Np)"
            control={control}
            type="textarea"
          />
          <TextInput name="caption_en" label="Caption (En)" control={control} />
          <TextInput name="caption_np" label="Caption (Np)" control={control} />
          {(slug === "hero-section" ||
            slug === "statistics-section" ||
            slug === "contact-section") && (
            <ReactDropzone
              name="image"
              label="Image"
              control={control}
              options={{
                accept: {
                  "image/*": ["*.jpg", "*.jpeg", "*.png"],
                },
              }}
              file={section?.data.image ?? ""}
            />
          )}
        </form>
      </SimpleGrid>
      <Button form={`section-form-${slug}`} loading={isPending} type="submit">
        Submit
      </Button>
    </Flex>
  );
};

export default SectionFrom;