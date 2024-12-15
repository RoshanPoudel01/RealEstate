import { Card, Flex, HStack, Icon, IconButton, Table } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { XCircle } from "@phosphor-icons/react";
import { SearchInput } from "@realState/components/Form";
import { Button } from "@realState/components/ui/button";
import { CheckboxCard } from "@realState/components/ui/checkbox-card";
import { EmptyState } from "@realState/components/ui/empty-state";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@realState/components/ui/native-select";
import { ProgressBar, ProgressRoot } from "@realState/components/ui/progress";
import useGetErrors from "@realState/hooks/useGetErrors";
import { useSearchParamsState } from "@realState/hooks/useSearchParamState";
import { useFetchCategoryList } from "@realState/services/service-category";
import {
  useAddFeaturedProperties,
  useFetchFeaturedProperties,
  useFetchPropertyList,
} from "@realState/services/service-properties";
import PageHeader from "@realState/utils/PageHeader";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
const tHeads = ["S.N", "Property Name", "Action"];

const featuredSchema = yup.object().shape({
  properties: yup.array().min(1, "Select at least one property."),
});

type featuredData = yup.InferType<typeof featuredSchema>;
interface IProperty {
  id: number;
  title_en?: string;
}

const Featured = () => {
  const defaultValues: featuredData = {
    properties: [],
  };
  const navigate = useNavigate();
  const { keyword, setKeyword } = useSearchParamsState();
  const {
    mutateAsync: addFeatured,
    isPending: isAdding,
    isError: isAddError,
    error: addError,
  } = useAddFeaturedProperties();

  const { setValue, handleSubmit, reset, formState } = useForm({
    defaultValues,
    resolver: yupResolver(featuredSchema),
  });
  const { data: categoryList } = useFetchCategoryList();
  const [categoryId, setCategoryId] = useState<string | null>(null);

  const [selectedProperties, setSelectedProperties] = useState<IProperty[]>([]);
  const [backendError, setBackendError] = useState<Record<string, string[]>>(
    {}
  );

  const {
    data: propertyList,
    isFetching,
    isPending,
    refetch,
  } = useFetchPropertyList({
    categoryId: categoryId!,
    keyword,
  });

  useEffect(() => {
    refetch();
  }, [categoryId, keyword, refetch]);

  const { data: featured } = useFetchFeaturedProperties();
  useEffect(() => {
    if (featured?.data) {
      setSelectedProperties(
        featured?.data.rows.map((property) => ({
          id: property.id,
          title_en: property.title_en,
        }))
      );
    }
  }, [featured?.data, reset]);

  useEffect(() => {
    if (isAddError) {
      setBackendError(useGetErrors(addError));
    }
  }, [isAddError, addError]);

  // Function to handle adding/removing properties based on checkbox change
  const handleCheckboxChange = (propertyId: number, isChecked: boolean) => {
    setSelectedProperties((prev) => {
      if (isChecked) {
        // Add property if checked and not already selected
        const selectedProperty = propertyList?.data?.rows?.find(
          (property) => property.id === propertyId
        );
        if (
          selectedProperty &&
          !prev.some((p) => p.id === selectedProperty.id)
        ) {
          const updatedProperties = [
            ...prev,
            { id: selectedProperty.id, title_en: selectedProperty.title_en },
          ];
          setValue(
            "properties",
            updatedProperties.map((property) => property.id.toString())
          );
          return updatedProperties;
        }
      } else {
        // Remove property if unchecked
        const updatedProperties = prev.filter(
          (property) => property.id !== propertyId
        );
        setValue(
          "properties",
          updatedProperties.map((property) => property.id.toString())
        );
        return updatedProperties;
      }
      return prev;
    });
  };

  const handleRemoveProperty = (propertyId: number) => {
    setSelectedProperties((prev) => {
      const updatedProperties = prev.filter((p) => p.id !== propertyId);
      setValue(
        "properties",
        updatedProperties.map((property) => property.id.toString())
      );
      return updatedProperties;
    });
  };

  useEffect(() => {
    setValue(
      "properties",
      selectedProperties.map((property) => property.id.toString())
    );
  }, [selectedProperties, setValue]);

  const onSubmit = async (data: typeof defaultValues) => {
    console.log({ data });
    const response = await addFeatured({
      data: { properties: JSON.stringify(data.properties) },
    });
    if (response.data.status) {
      navigate("/admin/properties/featured");
    }
  };

  return (
    <Flex direction="column" gap={8} asChild>
      <form onSubmit={handleSubmit(onSubmit)} id="new-arrival-form" noValidate>
        <PageHeader
          heading="Featured"
          description="Select properties to add as featured"
        />
        <HStack
          align={"center"}
          gap={2}
          w={"full"}
          flexWrap={{ base: "wrap", sm: "nowrap" }}
          justify={"space-between"}
        >
          <SearchInput
            placeholder="Search property"
            onSearch={(keyword) => setKeyword(keyword)}
            maxW={{ base: "full", sm: "300px" }}
            w={"full"}
          />
          <NativeSelectRoot size={"lg"} maxW={{ base: "full", sm: "300px" }}>
            <NativeSelectField
              value={categoryId ?? ""}
              onChange={(e) => {
                const categoryId = e.currentTarget.value;
                setCategoryId(categoryId);
              }}
            >
              <option value="" disabled>
                Select Category
              </option>
              {categoryList?.data?.rows?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name_en}
                </option>
              ))}
            </NativeSelectField>
          </NativeSelectRoot>
        </HStack>
        {isPending || isFetching ? (
          <Flex height={"10dvh"} w={"full"} justify={"center"} align={"center"}>
            <ProgressRoot
              colorPalette={"primary"}
              w={"full"}
              maxW="240px"
              value={null}
            >
              <ProgressBar />
            </ProgressRoot>
          </Flex>
        ) : (propertyList?.data?.count ?? 0 > 0) ? (
          <HStack flexWrap={"wrap"} gap={4}>
            {propertyList?.data?.rows?.map((property) => (
              <CheckboxCard
                maxW={"200px"}
                name="properties"
                colorPalette={"primary"}
                key={property.id}
                label={property.title_en}
                checked={selectedProperties.some((p) => p.id === property.id)}
                onCheckedChange={(e) => {
                  handleCheckboxChange(property.id, e.checked as boolean);
                }}
              />
            ))}
          </HStack>
        ) : (
          <EmptyState
            icon={
              <Icon asChild boxSize={16}>
                <XCircle />
              </Icon>
            }
            title="No properties found"
            description="Select a category to list properties."
          />
        )}
        {(!isPending || !isFetching) && (
          <Card.Root>
            <Card.Body>
              <Table.ScrollArea>
                <Table.Root captionSide={"top"}>
                  {formState.errors?.properties && (
                    <Table.Caption color="red.500">
                      {backendError?.properties ??
                        formState.errors.properties.message}
                    </Table.Caption>
                  )}
                  <Table.Header>
                    <Table.Row>
                      {tHeads.map((tHead) => (
                        <Table.ColumnHeader textAlign={"center"} key={tHead}>
                          {tHead}
                        </Table.ColumnHeader>
                      ))}
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {selectedProperties.length > 0 ? (
                      selectedProperties.map((property, index) => (
                        <Table.Row textAlign={"center"} key={property.id}>
                          <Table.Cell textAlign="center">
                            {index + 1}
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            {property.title_en}
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            <IconButton
                              onClick={() => {
                                handleRemoveProperty(property.id);
                              }}
                              variant={"surface"}
                              colorPalette={"red"}
                            >
                              <Icon asChild boxSize={6}>
                                <XCircle />
                              </Icon>
                            </IconButton>
                          </Table.Cell>
                        </Table.Row>
                      ))
                    ) : (
                      <Table.Row>
                        <Table.Cell py={10} colSpan={3} textAlign={"center"}>
                          No properties selected
                        </Table.Cell>
                      </Table.Row>
                    )}
                  </Table.Body>
                </Table.Root>
              </Table.ScrollArea>
            </Card.Body>
            <Card.Footer>
              <Flex flexDir={"column"} gap={4} w={"full"}>
                <Button
                  loading={isAdding}
                  loadingText="Adding..."
                  colorScheme="primary"
                  type="submit"
                  form="new-arrival-form"
                >
                  Submit
                </Button>
              </Flex>
            </Card.Footer>
          </Card.Root>
        )}
      </form>
    </Flex>
  );
};

export default Featured;
