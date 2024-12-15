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
import { IRow } from "@realState/services/service-interface";
import {
  PropertyFrontResponse,
  useDeleteProperty,
  useFetchProperties,
} from "@realState/services/service-properties";
import PageHeader from "@realState/utils/PageHeader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Properties = () => {
  const { pageIndex, setPageIndex, keyword, setKeyword } =
    useSearchParamsState();
  const navigate = useNavigate();
  const columns = [
    {
      header: "S.N",
      accessorKey: "s.no",
      cell: ({ row }: IRow<PropertyFrontResponse>) => {
        const { index } = row;
        return <Text>{(pageIndex - 1) * 10 + index + 1}</Text>;
      },
    },
    {
      header: "Title (EN)",
      accessorKey: "title_en",
      cell: ({ row }: IRow<PropertyFrontResponse>) => {
        const { title_en } = row.original;
        return <Text>{title_en}</Text>;
      },
      enableSorting: false,
    },

    {
      header: "Image",
      accessorKey: "image",
      cell: ({ row }: IRow<PropertyFrontResponse>) => {
        const { image } = row.original;
        return image ? (
          <LazyLoadImage src={image ?? ""} alt="property" />
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
      cell: ({ row }: IRow<PropertyFrontResponse>) => {
        const { id, is_active } = row.original;
        return (
          <StatusSwitch
            isActive={is_active ? true : false}
            model="property"
            rowId={id}
          />
        );
      },
      enableSorting: false,
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: ({ row }: IRow<PropertyFrontResponse>) => {
        const { id } = row.original;
        const [open, setOpen] = useState(false);
        const { mutateAsync: deleteProperty, isPending: isDeleting } =
          useDeleteProperty();
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
              heading="Delete Property"
              description="Are you sure you want to delete this property?"
              onConfirm={async () => {
                await deleteProperty({ id });
                setOpen(false);
              }}
            />
          </HStack>
        );
      },
    },
  ];

  const {
    data: properties,
    isPending,
    isFetching,
    refetch,
  } = useFetchProperties({ page: pageIndex, keyword });

  useEffect(() => {
    refetch();
  }, [pageIndex, keyword, refetch]);

  return (
    <DataTable
      columns={columns}
      data={properties?.data.rows ?? []}
      count={properties?.data.count ?? 0}
      isLoading={isPending || isFetching}
      pagination={{
        manual: true,
        pageCount: properties?.data.pagination?.last_page ?? 1,
        totalRows: properties?.data.pagination?.total ?? 0,
        pageParams: {
          pageIndex,
          setPageIndex,
        },
      }}
    >
      <PageHeader
        heading="Properties"
        description="Manage your properties here"
      />
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
        <Button onClick={() => navigate("create")}>Add Property</Button>
      </HStack>
    </DataTable>
  );
};

export default Properties;
