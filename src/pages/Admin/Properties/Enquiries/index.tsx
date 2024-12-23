import { Text } from "@chakra-ui/react";
import { DataTable } from "@realState/components/DataTable";
import { SearchInput } from "@realState/components/Form";
import { useSearchParamsState } from "@realState/hooks/useSearchParamState";
import {
  EnquiryResponse,
  useFetchEnquiries,
} from "@realState/services/service-enquiries";
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
      cell: ({ row }: IRow<EnquiryResponse>) => {
        return <Text>{(pageIndex - 1) * 10 + row.index + 1}</Text>;
      },
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }: IRow<EnquiryResponse>) => {
        return <Text>{row.original.name}</Text>;
      },
    },
    {
      header: "Email",
      accessorKey: "email",
      cell: ({ row }: IRow<EnquiryResponse>) => {
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
      cell: ({ row }: IRow<EnquiryResponse>) => {
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
      header: "Property",
      accessorKey: "property",
      cell: ({ row }: IRow<EnquiryResponse>) => {
        const { property } = row.original;
        return (
          <Text mx={"auto"} maxW={"500px"} wordBreak={"break-word"}>
            {property?.name}
          </Text>
        );
      },
    },
    {
      header: "Question",
      accessorKey: "question",
      cell: ({ row }: IRow<EnquiryResponse>) => {
        const { question } = row.original;
        return (
          <Text mx={"auto"} maxW={"500px"} wordBreak={"break-word"}>
            {question}
          </Text>
        );
      },
    },
  ];

  const {
    data: enquiries,
    isLoading,
    refetch,
  } = useFetchEnquiries({
    page: pageIndex,
    keyword,
  });

  useEffect(() => {
    refetch();
  }, [pageIndex, keyword]);

  return (
    <DataTable
      isLoading={isLoading}
      columns={columns}
      data={enquiries?.data?.rows ?? []}
      count={enquiries?.data?.count ?? 0}
      pagination={{
        manual: true,
        pageCount: enquiries?.data?.pagination?.last_page ?? 1,
        totalRows: enquiries?.data?.pagination?.total ?? 0,
        pageParams: {
          pageIndex,
          setPageIndex,
        },
      }}
    >
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
