import {
  Box,
  Button,
  Card,
  CardRootProps,
  Flex,
  HStack,
  Icon,
  Table,
  Text,
} from "@chakra-ui/react";
import { ArrowDown, ArrowUp } from "@phosphor-icons/react";
import { EmptyState } from "@realState/components/ui/empty-state";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPageText,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@realState/components/ui/pagination";
import { Skeleton } from "@realState/components/ui/skeleton";
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Dispatch, FC, ReactNode, SetStateAction, useState } from "react";

interface IDataTable {
  data: Record<string, any>[];
  count?: number;
  children?: ReactNode;
  columns: ColumnDef<any, any>[];
  isLoading?: boolean;
  showPagination?: boolean;
  pagination?: {
    manual?: boolean;
    pageCount?: number;
    totalRows?: number;
    pageParams?: {
      pageSize?: number;
      pageIndex: number;
      setPageIndex: Dispatch<SetStateAction<number>>;
    };
  };
  filter?: {
    globalFilter: string;
    setGlobalFilter: Dispatch<SetStateAction<string>>;
  };

  handlePageSize?: (pageSize: number) => void;
}

const filterFunction: FilterFn<any> = (rows, id, value) => {
  const rowValue = String(rows.original[id]).toLowerCase();
  const filterStatusValue = value.toLowerCase();
  // return rowValue.includes(filterStatusValue);

  // Split the rowValue by spaces to check for individual words
  const words = rowValue.split(" ");

  // Check if any word starts with the filterValue
  const match = words.some((word) => word.startsWith(filterStatusValue));

  return match;
};

const DataTable: FC<IDataTable & CardRootProps> = ({
  data,
  columns,
  count,
  children,
  isLoading,
  showPagination = true,
  pagination,
  filter,
  ...rest
  // handlePageSize,
}) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, _] = useState<number>(10);
  const table = useReactTable({
    columns,
    data,
    manualPagination: pagination?.manual,
    state: {
      columnFilters,
      globalFilter: filter?.globalFilter?.trim() || "",
      pagination: pagination?.manual
        ? {
            pageIndex: pagination?.pageParams?.pageIndex ?? 1,
            pageSize: pagination?.pageParams?.pageSize ?? 10,
          }
        : {
            pageIndex: page - 1,
            pageSize: pageSize ?? 10,
          },
    },
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    globalFilterFn: filterFunction,
    onGlobalFilterChange: filter?.setGlobalFilter,
  });

  return (
    <Card.Root {...rest}>
      {children && <Card.Header>{children}</Card.Header>}
      <Card.Body>
        <Table.ScrollArea>
          <Table.Root>
            <Table.Header>
              {table.getHeaderGroups().map((headerGroup) => {
                return (
                  <Table.Row bg={"gray.200"} key={headerGroup.id} mb={2}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <Table.ColumnHeader
                          colSpan={header.colSpan}
                          key={header.id}
                          textTransform="capitalize"
                          whiteSpace="nowrap"
                          mb={10}
                          borderColor={"gray.200"}
                          style={{
                            width:
                              header.getSize() !== 150
                                ? header.getSize()
                                : "auto",

                            textAlign: "center",
                            padding: "20px",
                            fontWeight: 600,
                          }}
                          fontFamily={"Inter Variable"}
                          cursor={
                            header.column.getCanSort() ? "pointer" : "default"
                          }
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <Flex gap={2} justify={"center"} align={"center"}>
                            <Text
                              textAlign={"center"}
                              fontSize={{
                                base: "sm",
                                lg: "md",
                              }}
                            >
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                            </Text>
                            {header.column.getCanSort() ? (
                              header.column.getIsSorted().valueOf() ===
                              "desc" ? (
                                <Icon asChild boxSize={4}>
                                  <ArrowUp weight="bold" />
                                </Icon>
                              ) : header.column.getIsSorted().valueOf() ===
                                "asc" ? (
                                <Icon asChild boxSize={4}>
                                  <ArrowDown weight="bold" />
                                </Icon>
                              ) : null
                            ) : null}
                          </Flex>
                        </Table.ColumnHeader>
                      );
                    })}
                  </Table.Row>
                );
              })}
            </Table.Header>
            <Table.Body>
              {isLoading ? (
                <>
                  {[...Array(5)].map((_, rowIndex) => (
                    <Table.Row bg={"gray.50"} key={rowIndex}>
                      {columns.map((_, columnIndex) => (
                        <Table.Cell key={columnIndex}>
                          <Skeleton height="15px" w={"full"} />
                        </Table.Cell>
                      ))}
                    </Table.Row>
                  ))}
                </>
              ) : count === 0 ? (
                <Table.Row bg={"gray.50"}>
                  <Table.Cell
                    border={0}
                    colSpan={columns.length}
                    textAlign="center"
                  >
                    <EmptyState
                      title="No data found"
                      description="No data available to show"
                    />
                  </Table.Cell>
                </Table.Row>
              ) : (
                table.getRowModel().rows.map((row) => {
                  return (
                    <Table.Row
                      _hover={{
                        bg: "gray.100",
                      }}
                      bg={"gray.50"}
                      verticalAlign={"middle"}
                      key={row.id}
                    >
                      {row.getVisibleCells()?.map((cell, index) => {
                        return (
                          <Table.Cell
                            my={2}
                            style={{
                              width: `${columns[index]?.maxSize}px`,

                              textAlign: "center",
                              overflow: "clip",
                              textOverflow: "ellipsis",
                            }}
                            borderColor={"gray.300"}
                            key={cell.id}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </Table.Cell>
                        );
                      })}
                    </Table.Row>
                  );
                })
              )}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      </Card.Body>
      {showPagination && (
        <Card.Footer>
          <PaginationRoot
            variant="solid"
            colorPalette={"primary"}
            count={pagination?.totalRows ?? table.getRowCount() ?? 0}
            page={pagination?.pageParams?.pageIndex ?? page}
            pageSize={pagination?.pageParams?.pageSize ?? pageSize}
            onPageChange={(e) =>
              pagination?.pageParams?.setPageIndex
                ? pagination?.pageParams?.setPageIndex(e.page)
                : setPage(e.page)
            }
            siblingCount={1}
            w={"full"}
          >
            <HStack justify={"space-between"} gap={4} flexWrap={"wrap"}>
              <PaginationPageText format="long" />
              <HStack>
                <PaginationPrevTrigger />
                <HStack hideBelow={"1000px"}>
                  <PaginationItems />
                </HStack>
                <Box hideFrom={"1000px"}>
                  <Button size={"sm"} colorPalette={"primary"}>
                    {pagination?.pageParams?.pageIndex ?? page}
                  </Button>
                </Box>
                <PaginationNextTrigger />
              </HStack>
            </HStack>
          </PaginationRoot>
        </Card.Footer>
      )}
    </Card.Root>
  );
};

export default DataTable;
