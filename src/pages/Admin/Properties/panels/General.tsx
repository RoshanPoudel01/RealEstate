import { Flex, HStack, SimpleGrid } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextInput } from "@realState/components/Form";
import StatusRadio from "@realState/components/Form/StatusRadio";
import { Button } from "@realState/components/ui/button";
import useGetErrors from "@realState/hooks/useGetErrors";
import { useFetchCategoryList } from "@realState/services/service-category";
import {
  useCreateProperty,
  useFetchPropertyById,
  useUpdateProperty,
} from "@realState/services/service-properties";
import Loader from "@realState/utils/Loader";
import PageHeader from "@realState/utils/PageHeader";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import NotFound from "./NotFound";

const schema = yup.object().shape({
  title_en: yup.string().required("Title is required"),
  title_np: yup.string().required("Title is required"),
  address_en: yup.string().required("Address is required"),
  address_np: yup.string().required("Address is required"),
  city_en: yup.string().optional(),
  city_np: yup.string().optional(),
  map: yup.string().optional(),
  category_id: yup.string().required("Select atleast one category."),
  status: yup.string().required("Status is required").default("available"),
  land_area: yup.string().optional(),
  built_year: yup.string().optional(),
  price: yup
    .number()
    .required("Price is required")
    .typeError("Price is required"),
  is_active: yup.string().required("Status is required"),
});

type GeneralValues = yup.InferType<typeof schema>;

interface GeneralProps {
  setTabValue: (value: string) => void;
}

const General: FC<GeneralProps> = ({ setTabValue }) => {
  const defaultValues: GeneralValues = {
    title_en: "",
    title_np: "",

    address_en: "",
    address_np: "",
    city_en: "",
    city_np: "",
    category_id: "",
    map: "",
    status: "available",
    land_area: "",
    built_year: "",
    price: "" as never as number,
    is_active: "1",
  };

  const { id } = useParams();

  const { data: property, isLoading } = useFetchPropertyById(id!);

  useEffect(() => {
    if (property?.data) {
      reset({
        ...property?.data,
        category_id: property?.data.category_id.toString(),
        price: parseFloat(property?.data.price),
        is_active: property?.data.is_active ? "1" : "0",
      });
    } else {
      reset(defaultValues);
    }
  }, [property]);

  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm<GeneralValues>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { data: categories } = useFetchCategoryList();

  const categoryOptions = categories?.data?.rows.map((category) => (
    <option key={category.id} value={category.id}>
      {category.name_en}
    </option>
  ));

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

  useEffect(() => {
    if (isAddError) {
      setBackendError(useGetErrors(addError));
    } else if (isUpdateError) {
      setBackendError(useGetErrors(updateError));
    }
  }, [isAddError, addError, isUpdateError, updateError]);

  const onSubmit = async (data: GeneralValues) => {
    if (id) {
      const response = await updateProperty({ data, id });
      if (response.data.status) {
        reset(defaultValues);
        navigate(`/admin/properties/edit/${id}`);
        setTabValue("amenities");
      }
    } else {
      const response = await addProperty({ data });
      if (response.data.status) {
        const id = response.data.data.id;
        reset(defaultValues);
        navigate(`/admin/properties/create/${id}`);
        setTabValue("amenities");
      }
    }
  };

  return (
    <>
      {!!id && isLoading ? (
        <Loader />
      ) : !!id && !isLoading && !property ? (
        <NotFound />
      ) : (
        <Flex flexDir={"column"} gap={8}>
          <SimpleGrid
            alignItems={"start"}
            justifyContent={"end"}
            columns={{ base: 1, sm: 2 }}
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
                backendError={backendError.category_id}
                name="category_id"
                label="Category"
                type="select"
                options={
                  <>
                    <option value="">Select Category</option>
                    {categoryOptions}
                  </>
                }
              />
              <TextInput
                control={control}
                required
                name="price"
                label="Price"
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
                backendError={backendError.city_en}
                name="city_en"
                label="City (EN)"
              />
              <TextInput
                control={control}
                backendError={backendError.city_np}
                name="city_np"
                label="City (NP)"
              />
              <TextInput
                control={control}
                backendError={backendError.map}
                name="map"
                label="Map"
                helperText="Copy the src link from google maps iframe"
              />
              <TextInput control={control} name="land_area" label="Land Area" />
              <TextInput
                helperText="Enter the year in YYYY format (e.g. 2021)"
                control={control}
                name="built_year"
                label="Built Year"
              />

              {/* <StatusRadio
                control={control}
                name="status"
                label="Status"
                options={[
                  { label: "Available", value: "available" },
                  { label: "Rented", value: "rented" },
                  { label: "Sold", value: "sold" },
                ]}
              /> */}
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
              {/* <ReactDropzone
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
               /> */}
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
