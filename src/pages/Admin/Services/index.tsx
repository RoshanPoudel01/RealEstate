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
  ServiceResponse,
  useDeleteService,
  useFetchServices,
} from "@realState/services/service-services";
import PageHeader from "@realState/utils/PageHeader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const { pageIndex, setPageIndex, keyword, setKeyword } =
    useSearchParamsState();
  const navigate = useNavigate();
  const columns = [
    {
      header: "S.N",
      accessorKey: "s.no",
      cell: ({ row }: IRow<ServiceResponse>) => {
        const { index } = row;
        return <Text>{(pageIndex - 1) * 10 + index + 1}</Text>;
      },
    },
    {
      header: "Title (EN)",
      accessorKey: "title_en",
      cell: ({ row }: IRow<ServiceResponse>) => {
        const { title_en } = row.original;
        return <Text>{title_en}</Text>;
      },
      enableSorting: false,
    },
    {
      header: "Title (NP)",
      accessorKey: "title_np",
      cell: ({ row }: IRow<ServiceResponse>) => {
        const { title_np } = row.original;
        return <Text>{title_np}</Text>;
      },
      enableSorting: false,
    },

    {
      header: "Description (EN)",
      accessorKey: "description_en",
      cell: ({ row }: IRow<ServiceResponse>) => {
        const { description_en } = row.original;
        return (
          <Text
            minW={"300px"}
            maxW={"300px"}
            wordBreak={"break-word"}
            lineClamp={2}
            mx={"auto"}
          >
            {description_en}
          </Text>
        );
      },
      enableSorting: false,
    },
    {
      header: "Description (NP)",
      accessorKey: "description_np",
      cell: ({ row }: IRow<ServiceResponse>) => {
        const { description_np } = row.original;
        return (
          <Text
            minW={"300px"}
            maxW={"300px"}
            wordBreak={"break-word"}
            lineClamp={2}
            mx={"auto"}
          >
            {description_np}
          </Text>
        );
      },
      enableSorting: false,
    },
    {
      header: "Display Order",
      accessorKey: "display_order",
      cell: ({ row }: IRow<ServiceResponse>) => {
        const { display_order } = row.original;
        return <Text>{display_order}</Text>;
      },
      enableSorting: false,
    },
    {
      header: "Image",
      accessorKey: "image",
      cell: ({ row }: IRow<ServiceResponse>) => {
        const { image } = row.original;
        return image ? (
          <LazyLoadImage src={image ?? ""} alt="service" />
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
      cell: ({ row }: IRow<ServiceResponse>) => {
        const { id, is_active } = row.original;
        return (
          <StatusSwitch
            isActive={is_active ? true : false}
            model="service"
            rowId={id}
          />
        );
      },
      enableSorting: false,
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: ({ row }: IRow<ServiceResponse>) => {
        const { id } = row.original;
        const [open, setOpen] = useState(false);
        const { mutateAsync: deleteService, isPending: isDeleting } =
          useDeleteService();
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
              heading="Delete Service"
              description="Are you sure you want to delete this service?"
              onConfirm={async () => {
                await deleteService({ id });
                setOpen(false);
              }}
            />
          </HStack>
        );
      },
    },
  ];

  const {
    data: services,
    isPending,
    isFetching,
    refetch,
  } = useFetchServices({ page: pageIndex, keyword });

  useEffect(() => {
    refetch();
  }, [pageIndex, keyword, refetch]);

  return (
    <DataTable
      columns={columns}
      data={services?.data.rows ?? []}
      isLoading={isPending || isFetching}
      count={services?.data.count ?? 0}
      pagination={{
        manual: true,
        pageCount: services?.data.pagination?.last_page ?? 1,
        totalRows: services?.data.pagination?.total ?? 0,
        pageParams: {
          pageIndex,
          setPageIndex,
        },
      }}
    >
      <PageHeader heading="Services" description="Manage your services here" />
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
        <Button onClick={() => navigate("create")}>Add Service</Button>
      </HStack>
    </DataTable>
  );
};

export default Services;
