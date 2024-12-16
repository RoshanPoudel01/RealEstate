import { Text } from "@chakra-ui/react";
import { DataTable } from "@realState/components/DataTable";
import { SearchInput } from "@realState/components/Form";
import { useSearchParamsState } from "@realState/hooks/useSearchParamState";
import { useFetchMessages } from "@realState/services/service-enquiries";
import { IRow } from "@realState/services/service-interface";
import PageHeader from "@realState/utils/PageHeader";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Enquiries = () => {
  const { pageIndex, setPageIndex, keyword, setKeyword } =
    useSearchParamsState();
  const columns = [
    {
      header: "S.No.",
      accessorKey: "s.no",
      cell: ({ row }: IRow<any>) => {
        return <Text>{pageIndex - 1 * 10 + row.index + 1}</Text>;
      },
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }: IRow<any>) => {
        return <Text>{row.original.name}</Text>;
      },
    },
    {
      header: "Email",
      accessorKey: "email",
      cell: ({ row }: IRow<any>) => {
        const { email } = row.original;
        return (
          <Text
            _hover={{
              color: "primary.500",
              textDecoration: "underline",
            }}
            asChild
          >
            <Link to={`mailto:${email}`}>{email}</Link>
          </Text>
        );
      },
    },
    {
      header: "Phone",
      accessorKey: "phone",
      cell: ({ row }: IRow<any>) => {
        const { phone } = row.original;
        return (
          <Text
            _hover={{
              color: "primary.500",
              textDecoration: "underline",
            }}
            asChild
          >
            <Link to={`tel:${phone}`}>{phone}</Link>
          </Text>
        );
      },
    },
    {
      header: "Message",
      accessorKey: "message",
      cell: ({ row }: IRow<any>) => {
        const { message } = row.original;
        return (
          <Text>
            {message.length > 50 ? message.slice(0, 50) + "..." : message}
          </Text>
        );
      },
    },
  ];

  const {
    data: enquiries,
    isLoading,
    refetch,
  } = useFetchMessages({
    page: pageIndex,
    keyword,
  });

  useEffect(() => {
    refetch();
  }, [pageIndex, keyword]);

  return (
    <DataTable columns={columns} data={enquiries?.data?.rows ?? []}>
      <PageHeader
        heading="Enquiries"
        description="List of all the enquiries from the users."
      />
      <SearchInput
        placeholder="Search"
        maxW={"300px"}
        value={keyword}
        onSearch={setKeyword}
      />
    </DataTable>
  );
};

export default Enquiries;
