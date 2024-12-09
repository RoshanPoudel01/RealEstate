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
  TeamResponse,
  useDeleteTeam,
  useFetchTeams,
} from "@realState/services/service-teams";
import PageHeader from "@realState/utils/PageHeader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Teams = () => {
  const { pageIndex, setPageIndex, keyword, setKeyword } =
    useSearchParamsState();
  const navigate = useNavigate();
  const columns = [
    {
      header: "S.N",
      accessorKey: "s.no",
      cell: ({ row }: IRow<TeamResponse>) => {
        const { index } = row;
        return <Text>{(pageIndex - 1) * 10 + index + 1}</Text>;
      },
    },
    {
      header: "Name (EN)",
      accessorKey: "name_en",
      cell: ({ row }: IRow<TeamResponse>) => {
        const { name_en } = row.original;
        return <Text>{name_en}</Text>;
      },
      enableSorting: false,
    },
    {
      header: "Name (NP)",
      accessorKey: "name_np",
      cell: ({ row }: IRow<TeamResponse>) => {
        const { name_np } = row.original;
        return <Text>{name_np}</Text>;
      },
      enableSorting: false,
    },

    {
      header: "Description (EN)",
      accessorKey: "description_en",
      cell: ({ row }: IRow<TeamResponse>) => {
        const { description_en } = row.original;
        return <Text>{description_en}</Text>;
      },
      enableSorting: false,
    },
    {
      header: "Description (NP)",
      accessorKey: "description_np",
      cell: ({ row }: IRow<TeamResponse>) => {
        const { description_np } = row.original;
        return <Text>{description_np}</Text>;
      },
      enableSorting: false,
    },
    {
      header: "Image",
      accessorKey: "image",
      cell: ({ row }: IRow<TeamResponse>) => {
        const { image } = row.original;
        return image ? (
          <LazyLoadImage src={image ?? ""} alt="team" />
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
      cell: ({ row }: IRow<TeamResponse>) => {
        const { id, is_active } = row.original;
        return (
          <StatusSwitch
            isActive={is_active ? true : false}
            model="team"
            rowId={id}
          />
        );
      },
      enableSorting: false,
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: ({ row }: IRow<TeamResponse>) => {
        const { id } = row.original;
        const [open, setOpen] = useState(false);
        const { mutateAsync: deleteTeam, isPending: isDeleting } =
          useDeleteTeam();
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
              heading="Delete Team"
              description="Are you sure you want to delete this team?"
              onConfirm={async () => {
                await deleteTeam({ id });
                setOpen(false);
              }}
            />
          </HStack>
        );
      },
    },
  ];

  const {
    data: teams,
    isPending,
    isFetching,
    refetch,
  } = useFetchTeams({ page: pageIndex, keyword });

  useEffect(() => {
    refetch();
  }, [pageIndex, keyword, refetch]);

  return (
    <DataTable
      columns={columns}
      data={teams?.data.rows ?? []}
      count={teams?.data.count ?? 0}
      isLoading={isPending || isFetching}
      pagination={{
        manual: true,
        pageCount: teams?.data.pagination?.last_page ?? 1,
        totalRows: teams?.data.pagination?.total ?? 0,
        pageParams: {
          pageIndex,
          setPageIndex,
        },
      }}
    >
      <PageHeader heading="Teams" description="Manage your teams here" />
      <HStack
        justify={"space-between"}
        gap={4}
        flexWrap={{ base: "wrap", sm: "nowrap" }}
      >
        <SearchInput
          onSearch={setKeyword}
          maxW={"300px"}
          placeholder="Search by name"
        />
        <Button onClick={() => navigate("create")}>Add Team</Button>
      </HStack>
    </DataTable>
  );
};

export default Teams;
