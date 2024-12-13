import { Flex, HStack, Text } from "@chakra-ui/react";
import {
  ActionColumn,
  DataTable,
  StatusSwitch,
} from "@realState/components/DataTable";
import { SearchInput } from "@realState/components/Form";
import { DeleteAlert } from "@realState/components/Form/Modal";
import LazyLoadImage from "@realState/components/Image";
import { Button } from "@realState/components/ui/button";
import { useSearchParamsState } from "@realState/hooks/useSearchParamState";
import {
  CategoryResponse,
  useDeleteCategory,
  useFetchCategories,
} from "@realState/services/service-category";
import { IRow } from "@realState/services/service-interface";
import PageHeader from "@realState/utils/PageHeader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const { pageIndex, setPageIndex, keyword, setKeyword } =
    useSearchParamsState();
  const navigate = useNavigate();
  const columns = [
    {
      header: "S.N",
      accessorKey: "s.no",
      cell: ({ row }: IRow<CategoryResponse>) => {
        const { index } = row;
        return <Text>{(pageIndex - 1) * 10 + index + 1}</Text>;
      },
    },
    {
      header: "Name (EN)",
      accessorKey: "name_en",
      cell: ({ row }: IRow<CategoryResponse>) => {
        const { name_en } = row.original;
        return (
          <Text>{name_en ?? ""}</Text>
        );
      },
      enableSorting: false,
    },
    {
      header: "Name (NP)",
      accessorKey: "name_np",
      cell: ({ row }: IRow<CategoryResponse>) => {
        const { name_np } = row.original;
        return (
          <Text>{name_np ?? ""}</Text>
        );
      },
      enableSorting: false,
    },

    {
      header: "Description (EN)",
      accessorKey: "description_en",
      cell: ({ row }: IRow<CategoryResponse>) => {
        const { description_en } = row.original;
        return (
          <Text maxW={"400px"} lineClamp={2} mx={"auto"}>
            {description_en ?? ""}
          </Text>
        );
      },
      enableSorting: false,
    },
    {
      header: "Description (NP)",
      accessorKey: "description_np",
      cell: ({ row }: IRow<CategoryResponse>) => {
        const { description_np } = row.original;
        return (
          <Text maxW={"400px"} lineClamp={2} mx={"auto"}>
            {description_np ?? ""}
          </Text>
        );
      },
      enableSorting: false,
    },
    {
      header: "Display Order",
      accessorKey: "display_order",
      cell: ({ row }: IRow<CategoryResponse>) => {
        const { display_order } = row.original;
        return <Text>{display_order}</Text>;
      },
      enableSorting: false,
    },
    {
      header: "Image",
      accessorKey: "image",
      cell: ({ row }: IRow<CategoryResponse>) => {
        const { image } = row.original;
        return image ? (
          <LazyLoadImage src={image ?? ""} alt="slider" />
        ) : (
          <Flex
            mx={"auto"}
            w="100px"
            h="100px"
            bg="gray.200"
            justify={"center"}
            align={"center"}
            borderRadius={5}
          >
            <Text>No Image</Text>
          </Flex>
        );
      },
      enableSorting: false,
    },
    {
      header: "Status",
      accessorKey: "is_active",
      cell: ({ row }: IRow<CategoryResponse>) => {
        const { id, is_active } = row.original;
        return (
          <StatusSwitch
            isActive={is_active ? true : false}
            model="category"
            rowId={id}
          />
        );
      },
      enableSorting: false,
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: ({ row }: IRow<CategoryResponse>) => {
        const { id } = row.original;
        const [open, setOpen] = useState(false);
        const { mutateAsync: deleteCategory, isPending: isDeleting } =
          useDeleteCategory();
        return (
          <HStack w={"max-content"} mx={"auto"}>
            <ActionColumn
              handleView={() => {}}
              handleEdit={() => navigate(`edit/${id}`)}
            />
            <DeleteAlert
              open={open}
              setOpen={setOpen}
              deleteText="Delete"
              isDeleteLoading={isDeleting}
              heading="Delete Category"
              description="Are you sure you want to delete this category?"
              onConfirm={async () => {
                await deleteCategory({ id });
                setOpen(false);
              }}
            />
          </HStack>
        );
      },
    },
  ];

  const {
    data: category,
    isPending,
    isFetching,
    refetch,
  } = useFetchCategories({ page: pageIndex, keyword });

  useEffect(() => {
    refetch();
  }, [pageIndex, keyword, refetch]);

  return (
    <DataTable
      columns={columns}
      data={category?.data.rows ?? []}
      isLoading={isPending || isFetching}
      count={category?.data.count ?? 0}
      pagination={{
        manual: true,
        pageCount: category?.data.pagination?.last_page ?? 1,
        totalRows: category?.data.pagination?.total ?? 0,
        pageParams: {
          pageIndex,
          setPageIndex,
        },
      }}
    >
      <PageHeader heading="Category" description="Manage your category here" />
      <HStack
        justify={"space-between"}
        gap={4}
        flexWrap={{ base: "wrap", sm: "nowrap" }}
      >
        <SearchInput
          onSearch={setKeyword}
          maxW={"300px"}
          placeholder="Search by title"
        />
        <Button onClick={() => navigate("create")}>Add Category</Button>
      </HStack>
    </DataTable>
  );
};

export default Category;
