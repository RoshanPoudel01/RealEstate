import { Flex, Heading, Text } from "@chakra-ui/react";
import { DataTable } from "@realState/components/DataTable";
import LazyLoadImage from "@realState/components/Image";
import { IRow } from "@realState/services/service-interface";
import {
  PropertyFrontResponse,
  useFetchProperties,
} from "@realState/services/service-properties";
import PageHeader from "@realState/utils/PageHeader";

const Dashboard = () => {
  const columns = [
    {
      header: "S.N",
      accessorKey: "sn",
      cell: ({ row }: IRow<PropertyFrontResponse>) => (
        <Text>{row.index + 1}</Text>
      ),
    },
    {
      header: "Title (EN)",
      accessorKey: "title_en",
      cell: ({ row }: IRow<PropertyFrontResponse>) => (
        <Text>{row.original.title_en}</Text>
      ),
    },
    {
      header: "Title (NP)",
      accessorKey: "title_np",
      cell: ({ row }: IRow<PropertyFrontResponse>) => (
        <Text>{row.original.title_np}</Text>
      ),
    },
    {
      header: "Price",
      accessorKey: "price",
      cell: ({ row }: IRow<PropertyFrontResponse>) => (
        <Text>Rs. {row.original.price}</Text>
      ),
    },
    {
      header: "Image",
      accessorKey: "image",
      cell: ({ row }: IRow<PropertyFrontResponse>) => {
        const { image } = row.original;
        return image ? (
          <LazyLoadImage w="100px" h="100px" src={image ?? ""} alt="property" />
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
    },
  ];

  const { data: properties } = useFetchProperties({
    perPage: 5,
    page: 1,
  });

  return (
    <>
      <PageHeader heading="Dashboard" description="Welcome to the dashboard" />
      <DataTable
        columns={columns}
        data={properties?.data?.rows ?? []}
        showPagination={false}
      >
        <Heading size="md">Recent Properties</Heading>
      </DataTable>
    </>
  );
};

export default Dashboard;
