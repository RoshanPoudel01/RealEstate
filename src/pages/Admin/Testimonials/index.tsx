import { HStack, Text } from "@chakra-ui/react";
import { DataTable } from "@realState/components/DataTable";
import { SearchInput } from "@realState/components/Form";
import { DeleteAlert } from "@realState/components/Form/Modal";
import LazyLoadImage from "@realState/components/Image";
import { useSearchParamsState } from "@realState/hooks/useSearchParamState";
import { IRow } from "@realState/services/service-interface";
import {
  TestimonialResponse,
  useDeleteTestimonial,
  useFetchTestimonials,
} from "@realState/services/service-testimonial";
import { useEffect, useState } from "react";
import TestimonialForm from "./Form";

const Testimonials = () => {
  const { pageIndex, setPageIndex, keyword, setKeyword } =
    useSearchParamsState();
  const {
    data: testimonials,
    refetch,
    isPending,
    isFetching,
  } = useFetchTestimonials({
    page: pageIndex,
    keyword,
  });
  const columns = [
    {
      header: "S.N",
      accessorKey: "s.no",
      cell: ({ row }: IRow<any>) => {
        const { index } = row;
        return <Text>{(pageIndex - 1) * 10 + index + 1}</Text>;
      },
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Title",
      accessorKey: "title",
    },
    {
      header: "Message",
      accessorKey: "message",
      cell: ({ row }: IRow<TestimonialResponse>) => {
        const { message } = row.original;
        return (
          <Text
            minW={"300px"}
            maxW={"300px"}
            lineClamp={2}
            overflowWrap={"break-word"}
            mx={"auto"}
          >
            {message}
          </Text>
        );
      },
    },
    {
      header: "Image",
      accessorKey: "image",
      cell: ({ row }: IRow<TestimonialResponse>) => {
        const { image } = row.original;
        return (
          <LazyLoadImage
            src={image}
            alt={image}
            width={"70px"}
            height={"70px"}
            mx={"auto"}
          />
        );
      },
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: ({ row }: IRow<TestimonialResponse>) => {
        const { id } = row.original;
        const [open, setOpen] = useState(false);
        const { mutateAsync: deleteTeam, isPending: isDeleting } =
          useDeleteTestimonial();
        return (
          <HStack w={"max-content"} mx={"auto"}>
            <TestimonialForm id={id} />
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

  useEffect(() => {
    refetch();
  }, [pageIndex, keyword]);

  return (
    <DataTable
      columns={columns}
      data={testimonials?.data?.rows ?? []}
      count={testimonials?.data?.count ?? 0}
      pagination={{
        manual: true,
        pageCount: testimonials?.data?.pagination?.last_page ?? 0,
        totalRows: testimonials?.data?.pagination?.total ?? 0,
        pageParams: {
          pageIndex,
          setPageIndex,
        },
      }}
      isLoading={isPending || isFetching}
    >
      <HStack justify={"space-between"} w={"full"}>
        <SearchInput
          maxW={"300px"}
          onSearch={setKeyword}
          placeholder="Search Testimonials"
        />
        <TestimonialForm />
      </HStack>
    </DataTable>
  );
};

export default Testimonials;
