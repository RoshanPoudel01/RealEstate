import { Flex, HStack, Text } from "@chakra-ui/react";
import { ActionColumn, DataTable } from "@realState/components/DataTable";
import { SearchInput } from "@realState/components/Form";
import LazyLoadImage from "@realState/components/Image";
import { Button } from "@realState/components/ui/button";
import { useSearchParamsState } from "@realState/hooks/useSearchParamState";
import { IRow } from "@realState/services/service-interface";
import {
  StatisticsBackResponse,
  useFetchStatistics,
} from "@realState/services/service-statistics";
import PageHeader from "@realState/utils/PageHeader";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Statistics = () => {
  const { keyword, setKeyword } = useSearchParamsState();
  const navigate = useNavigate();
  const columns = [
    {
      header: "S.N",
      accessorKey: "s.no",
      cell: ({ row }: IRow<StatisticsBackResponse>) => {
        const { index } = row;
        return <Text>{index + 1}</Text>;
      },
    },
    {
      header: "Title (EN)",
      accessorKey: "title_en",
      cell: ({ row }: IRow<StatisticsBackResponse>) => {
        const { title_en } = row.original;
        return <Text>{title_en}</Text>;
      },
      enableSorting: false,
    },
    {
      header: "Title (NP)",
      accessorKey: "title_np",
      cell: ({ row }: IRow<StatisticsBackResponse>) => {
        const { title_np } = row.original;
        return <Text>{title_np}</Text>;
      },
      enableSorting: false,
    },

    {
      header: "Value",
      accessorKey: "value",
      cell: ({ row }: IRow<StatisticsBackResponse>) => {
        const { value } = row.original;
        return <Text>{value}</Text>;
      },
      enableSorting: false,
    },
    {
      header: "Image",
      accessorKey: "image",
      cell: ({ row }: IRow<StatisticsBackResponse>) => {
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
      header: "Action",
      accessorKey: "action",
      cell: ({ row }: IRow<StatisticsBackResponse>) => {
        const { id } = row.original;
        return (
          <HStack w={"max-content"} mx={"auto"}>
            <ActionColumn handleEdit={() => navigate(`${id}/edit`)} />
          </HStack>
        );
      },
    },
  ];

  const { data: statistics, isLoading, refetch } = useFetchStatistics();

  useEffect(() => {
    refetch();
  }, [keyword, refetch]);

  return (
    <DataTable
      columns={columns}
      data={statistics?.data.rows ?? []}
      count={statistics?.data.count ?? 0}
      isLoading={isLoading}
      showPagination={false}
    >
      <PageHeader
        heading="Statistics"
        description="Manage your statistics here"
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
        <Button onClick={() => navigate("create")}>Add Slider</Button>
      </HStack>
    </DataTable>
  );
};

export default Statistics;
