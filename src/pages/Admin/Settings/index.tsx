import { Flex, Group, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ReactDropzone, TextInput } from "@realState/components/Form";
import LazyLoadImage from "@realState/components/Image";
import { Button } from "@realState/components/ui/button";
import useGetErrors from "@realState/hooks/useGetErrors";
import { toFormData } from "@realState/services/service-axios";
import {
  useFetchSetting,
  useUpdateSetting,
} from "@realState/services/service-setting";
import Loader from "@realState/utils/Loader";
import PageHeader from "@realState/utils/PageHeader";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name_en: yup.string().required("Name is required"),
  name_np: yup.string().required("Name is required"),
  phone_en: yup.string().required("Phone is required"),
  phone_np: yup.string().required("Phone is required"),
  address_en: yup.string().required("Address is required"),
  address_np: yup.string().required("Address is required"),
  description_en: yup.string().required("Description is required"),
  description_np: yup.string().required("Description is required"),
  email: yup.string().email().required("Email is required"),
  facebook: yup.string(),
  instagram: yup.string(),
  youtube: yup.string(),
  google_map: yup.string(),
  logo: yup.mixed(),
  // google_id: yup.string().required(),
  // google_password: yup.string().required(),
});

type SettingFormValues = yup.InferType<typeof schema>;

const Settings = () => {
  const defaultValues: SettingFormValues = {
    name_en: "",
    name_np: "",
    phone_en: "",
    phone_np: "",
    address_en: "",
    address_np: "",
    description_en: "",
    description_np: "",
    email: "",
    facebook: "",
    instagram: "",
    youtube: "",
    google_map: "",
    logo: "",
    // google_id: "",
    // google_password: "",
  };

  const [edit, setEdit] = useState(false);

  const { control, handleSubmit, reset } = useForm<SettingFormValues>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const [removeImage, setRemoveImage] = useState(false);

  const { data: setting, isPending, isFetching } = useFetchSetting();

  const {
    mutateAsync: updateSetting,
    isPending: isUpdating,
    isError,
    error,
  } = useUpdateSetting();

  const [backendError, setBackendError] = useState<Record<string, string[]>>(
    {}
  );

  useEffect(() => {
    if (isError) {
      setBackendError(useGetErrors(error));
    }
  }, [isError, error]);

  useEffect(() => {
    if (setting?.data) {
      reset(setting.data);
    }
  }, [setting]);

  const onSubmit = async (data: SettingFormValues) => {
    const formData = toFormData(data);
    if (removeImage) {
      formData.append("remove_image", "true");
    }
    const response = await updateSetting({ data: formData });
    if (response.data) {
      setEdit(false);
    }
  };

  return isPending || isFetching ? (
    <Loader />
  ) : (
    <Flex flexDir={"column"} gap={4}>
      <PageHeader
        heading="Settings"
        description="Manage your website settings here"
      />
      <SimpleGrid
        alignItems={"start"}
        columns={{ base: 1, md: 2 }}
        gap={4}
        asChild
      >
        <form id="setting-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextInput
            control={control}
            backendError={backendError.name_en}
            required={edit}
            readOnly={!edit}
            name="name_en"
            label="Name (En)"
          />
          <TextInput
            control={control}
            backendError={backendError.name_np}
            required={edit}
            readOnly={!edit}
            name="name_np"
            label="Name (Np)"
          />
          <TextInput
            control={control}
            backendError={backendError.phone_en}
            required={edit}
            readOnly={!edit}
            name="phone_en"
            label="Phone (En)"
          />
          <TextInput
            control={control}
            backendError={backendError.phone_np}
            required={edit}
            readOnly={!edit}
            name="phone_np"
            label="Phone (Np)"
          />
          <TextInput
            control={control}
            backendError={backendError.address_en}
            required={edit}
            readOnly={!edit}
            name="address_en"
            label="Address (En)"
          />
          <TextInput
            control={control}
            backendError={backendError.address_np}
            required={edit}
            readOnly={!edit}
            name="address_np"
            label="Address (Np)"
          />
          <TextInput
            control={control}
            backendError={backendError.description_en}
            name="description_en"
            label="Description (En)"
            type="textarea"
          />
          <TextInput
            control={control}
            backendError={backendError.description_np}
            name="description_np"
            label="Description (Np)"
            type="textarea"
          />
          <TextInput
            control={control}
            required={edit}
            readOnly={!edit}
            name="email"
            label="Email"
          />
          <TextInput
            control={control}
            readOnly={!edit}
            name="facebook"
            label="Facebook"
          />
          <TextInput
            control={control}
            readOnly={!edit}
            name="instagram"
            label="Instagram"
          />
          <TextInput
            control={control}
            readOnly={!edit}
            name="youtube"
            label="Youtube"
          />
          <TextInput
            control={control}
            readOnly={!edit}
            name="google_map"
            label="Google Map"
          />
        </form>
      </SimpleGrid>
      {edit ? (
        <ReactDropzone
          control={control}
          name="logo"
          label="Logo"
          options={{
            accept: { "image/*": [] },
            maxSize: 5,
          }}
          file={setting?.data.logo ?? ""}
          setRemoveImage={setRemoveImage}
        />
      ) : (
        <Stack>
          <Text>Logo</Text>
          <LazyLoadImage
            src={setting?.data.logo ?? ""}
            alt={setting?.data.name}
            w={"150px"}
          />
        </Stack>
      )}
      {edit ? (
        <Group mt={4}>
          <Button
            variant={"outline"}
            onClick={() => setEdit(false)}
            colorPalette="gray"
            size={"sm"}
          >
            Cancel
          </Button>
          <Button
            form="setting-form"
            type="submit"
            loading={isUpdating}
            size={"sm"}
          >
            Save
          </Button>
        </Group>
      ) : (
        <Button onClick={() => setEdit(true)} size={"sm"}>
          Edit
        </Button>
      )}
    </Flex>
  );
};

export default Settings;
