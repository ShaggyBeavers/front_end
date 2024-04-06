import * as React from 'react';
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    PaginationState,
    FilterFn,
} from '@tanstack/react-table';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table';

import Modal from 'react-modal';
import { DataTablePagination } from './DataTablePagination';
import { DataTableToolbar } from './DataTableToolbar';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import ReportAPI from '../../../src/app/api/Report/report';
import Report from '../Report/report';
import { useEffect } from 'react';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

interface Report {
    userEmail: string;
    userId: string;
    submissionDate: string;
    mapLocation: string;
    description: string;
    status: string;
    comment: string;
    infoReferences: string;
    name: string;
    imageUrl: string;
    categoryDTOs: { id: number; name: string }[];
    regionId: number;
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    // const [rowSelection, setRowSelection] = React.useState({});
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5,
    });
    ///

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [selectedReport, setSelectedReport] = React.useState<Report | null>(
        null
    );

    useEffect(() => {
        console.log(selectedReport);
    }, [selectedReport]);

    const getReport = useMutation({
        mutationFn: async (reportId: number) =>
            await ReportAPI.getReport(reportId),
        onSuccess: (response: any) => {
            console.log('Report fetched', data);
            setSelectedReport(response.data);
            setIsModalOpen(true);
        },
        onError: (error: any) => {
            console.error('Error fetching report', error);
        },
    });

    const handleRowClick = async (reportId: number) => {
        getReport.mutate(reportId);
    };
    ///
    const reports = useQuery({
        queryKey: ['reports', pagination.pageIndex, pagination.pageSize],
        queryFn: async () =>
            await ReportAPI.getAllReports(
                pagination.pageIndex,
                pagination.pageSize
            ),
        placeholderData: keepPreviousData,
    });

    const selectFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
        const selectedValues = value;
        const values: any = new Set(row.getValue(columnId) as string[]);
        const included = [...selectedValues].every((selected) =>
            Array.from(values).some((item: any) => item.name === selected)
        );

        return included;
    };

    const table = useReactTable({
        data: reports.data?.data?.content ?? [],
        columns,
        state: {
            sorting,
            columnVisibility,
            pagination,
            // rowSelection,
            // columnFilters,
        },
        filterFns: {
            select: selectFilter,
        },
        manualPagination: true,
        rowCount: reports.data?.data?.totalElements ?? 0,
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        // onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    });

    // const [modals, setModals] = useState<IModal>({isFilter,});

    return (
        <div className="space-y-4">
            {/* <Modal>{modals.content}</Modal> */}
            <DataTableToolbar table={table} />
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            colSpan={header.colSpan}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                    className="hover:bg-gray-50 cursor-pointer"
                                >
                                    {row
                                        .getVisibleCells()
                                        .map((cell, index) => (
                                            <TableCell
                                                key={cell.id}
                                                onClick={() => {
                                                    if (
                                                        index !==
                                                        row.getVisibleCells()
                                                            .length -
                                                            1
                                                    ) {
                                                        handleRowClick(
                                                            row.getValue(
                                                                'reportId'
                                                            )
                                                        );
                                                    }
                                                }}
                                                // className="first:rounded-l-2xl  last:rounded-r-2xl "
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Немає результатів.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />

            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                className="fixed inset-0 z-50 flex items-center justify-center"
                overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
            >
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                    <h2 className="text-xl font-bold mb-4">Report Details</h2>
                    {selectedReport && (
                        <div>
                            <p>User Email: {selectedReport.userEmail}</p>
                            <p>User ID: {selectedReport.userId}</p>
                            <p>
                                Submission Date: {selectedReport.submissionDate}
                            </p>
                            <p>Map Location: {selectedReport.mapLocation}</p>
                            <p>Description: {selectedReport.description}</p>
                            <p>Status: {selectedReport.status}</p>
                            <p>Comment: {selectedReport.comment}</p>
                            {/* Display other fields as needed */}
                        </div>
                    )}
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="bg-gray-200 hover:bg-gray-300 rounded px-4 py-2 mt-4"
                    >
                        Close
                    </button>
                </div>
            </Modal>
        </div>
    );
}
