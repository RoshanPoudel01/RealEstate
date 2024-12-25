import { Flex, HStack, SimpleGrid } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ReactDropzone, TextInput } from "@realState/components/Form";
import StatusRadio from "@realState/components/Form/StatusRadio";
import { Button } from "@realState/components/ui/button";
import useGetErrors from "@realState/hooks/useGetErrors";
import { toFormData } from "@realState/services/service-axios";
import {
  useCreateTeam,
  useFetchTeamById,
  useUpdateTeam,
} from "@realState/services/service-teams";
import Loader from "@realState/utils/Loader";
import PageHeader from "@realState/utils/PageHeader";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

const schema = yup.object().shape({
  name_en: yup.string().required("Name is required"),
  name_np: yup.string().required("Name is required"),
  description_en: yup.string().required("Description is required"),
  description_np: yup.string().required("Description is required"),
  position_en: yup.string().required("Position is required"),
  position_np: yup.string().required("Position is required"),
  image: yup.mixed().required("Image is required"),
  facebook: yup.string().url("Invalid URL"),
  instagram: yup.string().url("Invalid URL"),
  twitter: yup.string().url("Invalid URL"),
  is_active: yup.string().required("Status is required"),
  display_order: yup
    .number()
    .required("Display Order is required")
    .typeError("Display Order must be a number"),
});

type TeamsFormValues = yup.InferType<typeof schema>;

const TeamsForm = () => {
  const defaultValues: TeamsFormValues = {
    name_en: "",
    name_np: "",
    description_en: "",
    description_np: "",
    position_en: "",
    position_np: "",
    image: "",

    facebook: "",
    instagram: "",
    twitter: "",
    is_active: "1",
    display_order: "" as never as number,
  };

  const { id } = useParams();

  const {
    data: team,
    isPending: isTeamPending,
    isFetching: isTeamFetching,
  } = useFetchTeamById(id!);

  useEffect(() => {
    if (team?.data) {
      reset({
        ...team?.data,
        is_active: team?.data.is_active ? "1" : "0",
      });
    } else {
      reset(defaultValues);
    }
  }, [team]);

  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm<TeamsFormValues>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const {
    mutateAsync: addTeam,
    isPending: isAdding,
    isError: isAddError,
    error: addError,
  } = useCreateTeam();

  const {
    mutateAsync: updateTeam,
    isPending: isUpdating,
    isError: isUpdateError,
    error: updateError,
  } = useUpdateTeam();

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

  const onSubmit = async (data: TeamsFormValues) => {
    const formData = toFormData(data);
    if (removeImage) {
      formData.append("remove_image", "1");
    }

    if (id) {
      const response = await updateTeam({ data: formData, id });
      if (response.data.status) {
        reset(defaultValues);
        navigate("/admin/teams");
      }
    } else {
      const response = await addTeam({ data: formData });
      if (response.data.status) {
        reset(defaultValues);
        navigate("/admin/teams");
      }
    }
  };

  return (
    <>
      {!!id && (isTeamPending || isTeamFetching) ? (
        <Loader />
      ) : (
        <Flex flexDir={"column"} gap={8}>
          <SimpleGrid
            alignItems={"start"}
            columns={{ base: 1, md: 2 }}
            gap={4}
            asChild
          >
            <form id="team-form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <PageHeader heading="Add Team" description="Add new team" />
              <TextInput
                control={control}
                required
                backendError={backendError.name_en}
                name="name_en"
                label="Name (EN)"
              />
              <TextInput
                control={control}
                required
                backendError={backendError.name_np}
                name="name_np"
                label="Name (NP)"
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
                backendError={backendError.position_en}
                name="position_en"
                label="Position (EN)"
              />

              <TextInput
                control={control}
                required
                backendError={backendError.position_np}
                name="position_np"
                label="Position (NP)"
              />
              <TextInput
                control={control}
                backendError={backendError.facebook}
                name="facebook"
                label="Facebook"
              />
              <TextInput
                control={control}
                backendError={backendError.instagram}
                name="instagram"
                label="Instagram"
              />
              <TextInput
                control={control}
                backendError={backendError.twitter}
                name="twitter"
                label="Twitter"
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
                file={team?.data?.image ?? ""}
                setRemoveImage={setRemoveImage}
              />
            </form>
          </SimpleGrid>
          <HStack align={"center"}>
            <Button onClick={() => navigate(-1)} variant="outline">
              Cancel
            </Button>
            <Button
              form="team-form"
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

export default TeamsForm;
