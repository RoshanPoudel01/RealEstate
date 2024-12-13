import { formatSelectOptions, ISelectOptions } from "@/utils/format";
import Loader from "@/utils/Loader";
import PageHeader from "@/utils/PageHeader";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Flex,
    HStack,
    Icon,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { XCircle } from "@phosphor-icons/react";
import EmptyState from "@realState/components/EmptyState";
import { CheckboxInput, SearchInput, SelectInput } from "@realState/components/Form";
import { useGetErrors } from "@realState/hooks";
import { useFetchCategoryList } from "@realState/services/service-category";
import {
    useAddFeaturedProperties,
    useFetchFeaturedProperties
} from "@realState/services/service-properties";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
const tHeads = ["S.N", "Product Name", "Action"];

const comboSchema = yup.object().shape({
  products: yup.array().min(1, "At least one product is required"),
});

type featuredData = yup.InferType<typeof comboSchema>;
interface IProduct {
  id: number;
  name?: string;
}

const Featured = () => {
  const defaultValues: featuredData = {
    products: [],
  };
  const navigate = useNavigate();

  const {
    mutateAsync: addFeatured,
    isPending: isAdding,
    isError: isAddError,
    error: addError,
  } = useAddFeaturedProperties();

  const { control, setValue, handleSubmit, reset, formState } = useForm({
    defaultValues,
    resolver: yupResolver(comboSchema),
  });
  const { data: categoryList } = useFetchCategoryList();
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [keyword, setKeyword] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([]);
  const [backendError, setBackendError] = useState<Record<string, string[]>>(
    {}
  );
  const categoryOptions = formatSelectOptions({
    data: categoryList?.data?.rows,
    valueKey: "id",
    labelKey: "name",
  });

  const {
    data: productList,
    isFetching,
    isPending,
  } = useFetchProductList({
    categoryId: categoryId!,
    keyword,
  });

  const { data: featured } = useFetchFeaturedProperties();
  useEffect(() => {
    if (featured?.data) {
      setSelectedProducts(
        featured?.data.rows.map((product) => ({
          id: product.id,
          name: product.name,
        }))
      );
    }
  }, [featured?.data, reset]);

  useEffect(() => {
    if (isAddError) {
      setBackendError(useGetErrors(addError));
    }
  }, [isAddError, addError]);

  // Function to handle adding/removing products based on checkbox change
  const handleCheckboxChange = (productId: number, isChecked: boolean) => {
    setSelectedProducts((prev) => {
      if (isChecked) {
        // Add product if checked and not already selected
        const selectedProduct = productList?.data?.rows?.find(
          (product) => product.id === productId
        );
        if (selectedProduct && !prev.some((p) => p.id === selectedProduct.id)) {
          const updatedProducts = [
            ...prev,
            { id: selectedProduct.id, name: selectedProduct.name },
          ];
          setValue(
            "products",
            updatedProducts.map((product) => product.id.toString())
          );
          return updatedProducts;
        }
      } else {
        // Remove product if unchecked
        const updatedProducts = prev.filter(
          (product) => product.id !== productId
        );
        setValue(
          "products",
          updatedProducts.map((product) => product.id.toString())
        );
        return updatedProducts;
      }
      return prev;
    });
  };

  const handleRemoveProduct = (productId: number) => {
    setSelectedProducts((prev) => {
      const updatedProducts = prev.filter((p) => p.id !== productId);
      setValue(
        "products",
        updatedProducts.map((product) => product.id.toString())
      );
      return updatedProducts;
    });
  };

  useEffect(() => {
    setValue(
      "products",
      selectedProducts.map((product) => product.id.toString())
    );
  }, [selectedProducts, setValue]);

  const onSubmit = async (data: typeof defaultValues) => {
    const response = await addFeatured({ data });
    if (response.data.status) {
      navigate("/product/featured");
    }
  };

  return (
    <Flex
      direction="column"
      gap={8}
      as={"form"}
      onSubmit={handleSubmit(onSubmit)}
      id="new-arrival-form"
      noValidate
    >
      <PageHeader
        heading="Featured"
        description="Select products to add as featured"
      />
      <HStack
        align={"center"}
        gap={2}
        flexWrap={{ base: "wrap", sm: "nowrap" }}
        justify={"space-between"}
      >
        <SearchInput
          placeholder="Search product"
          onSearch={(keyword) => setKeyword(keyword)}
          maxW={{ base: "full", sm: "300px" }}
        />
        <SelectInput
          isControlled={false}
          name="category"
          placeholder="Select Category"
          options={categoryOptions ?? []}
          handleChange={(option: ISelectOptions<string>) =>
            setCategoryId(option.value)
          }
          maxW={{ base: "full", sm: "300px" }}
        />
      </HStack>
      {isPending || isFetching ? (
        <Loader height={"10dvh"} width={{ md: "70dvw" }} />
      ) : productList?.data?.count ?? 0 > 0 ? (
        <CheckboxInput
          name="products"
          backendError={backendError.products}
          control={control}
          options={
            productList?.data?.rows?.map((product) => ({
              label: product.name,
              value: product.id.toString(),
            })) ?? []
          }
          onChange={(e) => {
            const productId = parseInt(e.target.value);
            const isChecked = e.target.checked;
            handleCheckboxChange(productId, isChecked);
          }}
        />
      ) : (
        <EmptyState
          icon={<Icon as={XCircle} boxSize={16} />}
          title="No products found"
          description="Select a category to list products."
        />
      )}
      {(!isPending || !isFetching) && (
        <Card>
          <CardBody>
            <TableContainer>
              <Table>
                {formState.errors?.products && (
                  <TableCaption color="red.500">
                    {formState.errors.products.message}
                  </TableCaption>
                )}
                <Thead>
                  <Tr>
                    {tHeads.map((tHead) => (
                      <Th key={tHead}>{tHead}</Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  {selectedProducts.length > 0 ? (
                    selectedProducts.map((product, index) => (
                      <Tr key={product.id}>
                        <Td>{index + 1}</Td>
                        <Td>{product.name}</Td>
                        <Td>
                          <Icon
                            as={XCircle}
                            boxSize={6}
                            onClick={() => {
                              handleRemoveProduct(product.id);
                            }}
                          />
                        </Td>
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td py={10} colSpan={3} textAlign={"center"}>
                        No products selected
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
          <CardFooter>
            <Flex flexDir={"column"} gap={4} w={"full"}>
              <Button
                isLoading={isAdding}
                colorScheme="primary"
                type="submit"
                form="new-arrival-form"
              >
                Submit
              </Button>
            </Flex>
          </CardFooter>
        </Card>
      )}
    </Flex>
  );
};

export default Featured;