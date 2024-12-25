import { HStack } from "@chakra-ui/react";
import { ActionColumn, DataTable } from "@realState/components/DataTable";
import { SearchInput } from "@realState/components/Form";
import { Button } from "@realState/components/ui/button";
import { useSearchParamsState } from "@realState/hooks/useSearchParamState";
import {
  GalleryResponse,
  useDeleteGallery,
  useFetchGalleries,
} from "@realState/services/service-gallery";
import { IRow } from "@realState/services/service-interface";
import PageHeader from "@realState/utils/PageHeader";
import { useNavigate } from "react-router-dom";

const Gallery = () => {
  const { pageIndex, setPageIndex, keyword, setKeyword } =
    useSearchParamsState();
  const navigate = useNavigate();
  const columns = [
    {
      header: "S.N",
      accessorKey: "s.n",
      cell: ({ row }: IRow<GalleryResponse>) => {
        return (pageIndex - 1) * 10 + row.index + 1;
      },
    },
    {
      header: "Title (En)",
      accessorKey: "title_en",
    },
    {
      header: "Title (Np)",
      accessorKey: "title_np",
    },
    {
      header: "Display Order",
      accessorKey: "display_order",
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: ({ row }: IRow<GalleryResponse>) => {
        const { id } = row.original;
        const { mutateAsync: deleteGallery, isPending: deleting } =
          useDeleteGallery();
        return (
          <ActionColumn
            handleEdit={() => navigate(`edit/${id}`)}
            handleDelete={async () => {
              await deleteGallery({ id });
            }}
            isDeleteLoading={deleting}
            deleteHeading="Delete Gallery"
            deleteMessage="Are you sure you want to delete this gallery?"
          />
        );
      },
    },
  ];

  const {
    data: galleries,
    isPending,
    isFetching,
  } = useFetchGalleries({
    page: pageIndex,
    keyword,
  });

  return (
    <>
      <PageHeader
        heading="Gallery"
        description="Manage your gallery images here"
      />
      <DataTable
        columns={columns}
        data={galleries?.data?.rows ?? []}
        isLoading={isPending || isFetching}
        count={galleries?.data?.count ?? 0}
        pagination={{
          manual: true,
          pageCount: galleries?.data?.pagination?.last_page ?? 0,
          totalRows: galleries?.data?.pagination?.total ?? 0,
          pageParams: {
            pageIndex,
            setPageIndex,
          },
        }}
      >
        <HStack justify={"space-between"} gap={4}>
          <SearchInput placeholder="Search" onSearch={setKeyword} />
          <Button onClick={() => navigate("create")}>Add</Button>
        </HStack>
      </DataTable>
    </>
  );
};

export default Gallery;
