import { Flex, HStack, SimpleGrid } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ReactDropzone, TextInput } from "@realState/components/Form";
import StatusRadio from "@realState/components/Form/StatusRadio";
import { Button } from "@realState/components/ui/button";
import useGetDirtyData from "@realState/hooks/useGetDirtyData";
import useGetErrors from "@realState/hooks/useGetErrors";
import { toFormData } from "@realState/services/service-axios";
import {
  useCreateProperty,
  useFetchPropertyById,
  useUpdateProperty,
} from "@realState/services/service-properties";
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
  address_en: yup.string().required("Address is required"),
  address_np: yup.string().required("Address is required"),
  city_en: yup.string().required("City is required"),
  city_np: yup.string().required("City is required"),
  map: yup.string().required("Map is required"),
  category_id: yup.string().required("Select atleast one category."),
  status: yup.string().required("Status is required").default("available"),
  image: yup.mixed().required("Image is required"),
  is_active: yup.string().required("Status is required"),
});

type GeneralValues = yup.InferType<typeof schema>;

<<<<<<< Updated upstream
const General = () => {
=======
interface GeneralProps {
  setTabValue: (value: string) => void;
}

const General: FC<GeneralProps> = ({ setTabValue }) => {
>>>>>>> Stashed changes
  const defaultValues: GeneralValues = {
    title_en: "",
    title_np: "",
    description_en: "",
    description_np: "",
    address_en: "",
    address_np: "",
    city_en: "",
    city_np: "",
    category_id: "",
    map: "",
    status: "available",
    image: "",
    is_active: "1",
  };

  const { id } = useParams();

  const {
    data: property,
    isPending: isPropertyPending,
    isFetching: isPropertyFetching,
  } = useFetchPropertyById(id!);

  useEffect(() => {
    if (property?.data) {
      reset({
        ...property?.data,
        is_active: property?.data.is_active ? "1" : "0",
      });
    } else {
      reset(defaultValues);
    }
  }, [property]);

  const navigate = useNavigate();

  const { control, handleSubmit, reset, formState } = useForm<GeneralValues>({
    defaultValues,
    resolver: yupResolver(schema),
  });

<<<<<<< Updated upstream
=======
  const { data: categories } = useFetchCategoryList();

  const categoryOptions = categories?.data?.rows.map((category) => (
    <option key={category.id} value={category.id}>
      {category.name_en}
    </option>
  ));

>>>>>>> Stashed changes
  const {
    mutateAsync: addProperty,
    isPending: isAdding,
    isError: isAddError,
    error: addError,
  } = useCreateProperty();

  const {
    mutateAsync: updateProperty,
    isPending: isUpdating,
    isError: isUpdateError,
    error: updateError,
  } = useUpdateProperty();

  const [backendError, setBackendError] = useState<Record<string, string[]>>(
    {}
  );

<<<<<<< Updated upstream
  const [removeImage, setRemoveImage] = useState(false);

=======
>>>>>>> Stashed changes
  useEffect(() => {
    if (isAddError) {
      setBackendError(useGetErrors(addError));
    } else if (isUpdateError) {
      setBackendError(useGetErrors(updateError));
    }
  }, [isAddError, addError, isUpdateError, updateError]);

  const onSubmit = async (data: GeneralValues) => {
<<<<<<< Updated upstream
    console.log({
      dirtyData: useGetDirtyData(formState, data),
    });

    const formData = toFormData(id ? useGetDirtyData(formState, data) : data);
    if (removeImage) {
      formData.append("remove_image", "1");
    }

    if (id) {
      //   const response = await updateProperty({ data: formData, id });
      //   if (response.data.status) {
      //     reset(defaultValues);
      //     navigate("/admin/properties");
      //   }
      console.log({ data, id });
    } else {
      //   const response = await addProperty({ data: formData });
      //   if (response.data.status) {
      //     reset(defaultValues);
      //     navigate("/admin/properties");
      //   }
=======
    const dirtyData = useGetDirtyData(formState, data);

    if (id) {
      const response = await updateProperty({ data: dirtyData, id });
      if (response.data.status) {
        reset(defaultValues);
        navigate(`/admin/properties/edit/${id}`);
        setTabValue("amenities");
      }
      console.log({ data, id });
    } else {
      const response = await addProperty({ data });
      console.log({ response });
      if (response.data.status) {
        const id = response.data.data.id;
        reset(defaultValues);
        navigate(`/admin/properties/create/${id}`);
        setTabValue("amenities");
      }
>>>>>>> Stashed changes
      console.log({ data });
    }
  };

  return (
    <>
      {!!id && (isPropertyPending || isPropertyFetching) ? (
        <Loader />
      ) : (
        <Flex flexDir={"column"} gap={8}>
          <SimpleGrid
            alignItems={"start"}
            justifyContent={"end"}
            columns={{ base: 1, md: 2 }}
            gap={4}
            asChild
          >
            <form
              id="property-form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <PageHeader
                heading="Add Property"
                description="Add new property"
              />
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
                backendError={backendError.address_en}
                name="address_en"
                label="Address (EN)"
              />
              <TextInput
                control={control}
                required
                backendError={backendError.address_np}
                name="address_np"
                label="Address (NP)"
              />

              <TextInput
                control={control}
                required
                backendError={backendError.city_en}
                name="city_en"
                label="City (EN)"
              />
              <TextInput
                control={control}
                required
                backendError={backendError.city_np}
                name="city_np"
                label="City (NP)"
              />
              <TextInput
                control={control}
                required
                backendError={backendError.map}
                name="map"
                label="Map"
              />
<<<<<<< Updated upstream
=======
              <TextInput
                control={control}
                required
                name="land_area"
                label="Land Area"
              />
              <TextInput
                helperText="Enter the year in YYYY format"
                control={control}
                required
                name="built_year"
                label="Built Year"
              />
              <TextInput
                control={control}
                required
                name="price"
                label="Price"
              />

>>>>>>> Stashed changes
              <TextInput
                control={control}
                required
                backendError={backendError.category_id}
                name="category_id"
                label="Category"
                type="select"
                options={
                  <>
                    <option value="" disabled>
                      Select Category
                    </option>
                    <option value="1">Category 1</option>
                    <option value="2">Category 2</option>
                    <option value="3">Category 3</option>
                  </>
                }
              />
              <StatusRadio
                control={control}
                required
                name="status"
                label="Status"
                options={[
                  { label: "Available", value: "available" },
                  { label: "Rented", value: "rented" },
                  { label: "Sold", value: "sold" },
                ]}
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
                file={property?.data?.image ?? ""}
                setRemoveImage={setRemoveImage}
              />
            </form>
          </SimpleGrid>
          <HStack align={"center"}>
            <Button onClick={() => navigate(-1)} variant="outline">
              Cancel
            </Button>
            <Button
              form="property-form"
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

export default General;
