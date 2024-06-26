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
import {
    keepPreviousData,
    useMutation,
    useMutationState,
    useQuery,
} from '@tanstack/react-query';
import ReportAPI from '../../../src/app/api/Report/report';
import Report from '../Report/report';
import { useEffect, useState } from 'react';
import './DataTable.css';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import RegionAPI from '../../../src/app/api/Region/region';
import { Button } from '../ui/button';
import { checkAuthRole } from '../../../src/lib/utils';
import { RoleEnum } from '../../../src/enums/roles';
import { DataTableRowActions } from './DataTableRowActions';
import { unzipSync } from 'fflate';
import RelicAPI from '../../../src/app/api/Relic/relic';
import { Buffer } from 'buffer';

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
    regionDTO?: { id: number; name: string };
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
    let isUserId = false;
    let isReportId = false;

    const isAdminOrMod = checkAuthRole([
        RoleEnum.ADMIN,
        RoleEnum.MODERATOR,
        RoleEnum.REGIONAL_MODERATOR,
    ]);
    const isUser = checkAuthRole([RoleEnum.USER]);

    if (!columns.some((column) => column.id === 'action')) {
        columns.push({
            id: 'action',
            cell: ({ row }: any) => <DataTableRowActions row={row} isUser={isUser} />,
        });
        isUserId = true;
        isReportId = true;
    }

    // const [rowSelection, setRowSelection] = React.useState({});
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({
            isUserBanned: false,
            userId: isUserId,
            reportId: isReportId,
        });
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

    const getRegionById = useMutation({
        mutationFn: async (regionId: number) =>
            await RegionAPI.getRegionById(regionId),
    });

    const getReport = useMutation({
        mutationFn: async (reportId: number) =>
            await ReportAPI.getReport(reportId),
        onSuccess: (response: any) => {
            // console.log('Report fetched', data);
            setSelectedReport(response.data);
            setIsModalOpen(true);
        },
        onError: (error: any) => {
            console.error('Error fetching report', error);
        },
    });
    const [imageNames, setImageNames] = useState<string[]>([]);
    const [images, setImages] = useState<any[]>([]);

    const getReportFiles = useMutation({
        mutationFn: async (reportId: number) =>
            await ReportAPI.getReportFiles(reportId),
        // await RelicAPI.getRelicFiles(20),
        onSuccess: (response: any) => {
            console.log('Response', response);
            const reader = new FileReader();
            reader.onloadstart = function (e) {
                console.log('Loading started');
            };
            reader.onloadend = function (e) {
                console.log('Loading ended');
            };
            reader.onabort = function (e) {
                console.log('Loading aborted');
            };
            reader.onprogress = function (e) {
                console.log('Loading in progress');
            };
            reader.onload = function (e) {
                console.log('INside loading');
                const arrayBuffer = new Uint8Array(
                    reader.result as ArrayBuffer
                );
                const imagesArray = unzipSync(arrayBuffer);
                let keys: any[] = [];
                for (const key in imagesArray) {
                    keys.push(key);
                    const newImage = Buffer.from(imagesArray[key]).toString(
                        'base64'
                    );

                    setImages((prevImages) => [...prevImages, newImage]);
                    console.log('newImage', newImage);
                    console.log('images', images);
                }
                setImageNames(keys);
            };
            reader.onerror = function (e) {
                console.error('Error reading file:', e?.target?.error);
            };
            console.log('Reached reader');
            reader.readAsArrayBuffer(response);
            console.log('Passed reader');
        },
    });

    const handleRowClick = async (reportId: number) => {
        getReport.mutate(reportId);
        getReportFiles.mutate(reportId);
    };

    const [currentPictureIndex, setCurrentPictureIndex] = useState(0);

    const handlePreviousPicture = () => {
        if (currentPictureIndex > 0) {
            setCurrentPictureIndex(currentPictureIndex - 1);
        }
    };

    const handleNextPicture = () => {
        if (currentPictureIndex < images.length - 1) {
            setCurrentPictureIndex(currentPictureIndex + 1);
        }
    };

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
                                    // data-state={
                                    //     row.getValue('isUserBanned') &&
                                    //     'selected bg-red-100'
                                    // }
                                    className={`hover:bg-gray-50 cursor-pointer ${row.getValue('isUserBanned') && 'bg-red-200/45 opacity-55'}`}
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
                {selectedReport && (
                    <div className="bg-white rounded-lg p-6  max-w-2xl mx-6">
                        <div className="report-modal">
                            <div className="report-modal-left">
                                <h2 className="text-xl font-bold mb-4">
                                    Деталі звістки
                                </h2>
                                <p className="break-word">
                                    <span className="font-bold">Назва:</span>{' '}
                                    {selectedReport.name || '-'}
                                </p>
                                <p>
                                    <span className="font-bold">
                                        Категорія:
                                    </span>{' '}
                                    {selectedReport.categoryDTOs
                                        .map((category) => category.name)
                                        .join(', ') || '-'}
                                </p>
                                <p>
                                    <span className="font-bold">Регіон:</span>{' '}
                                    {selectedReport.regionDTO?.name || '-'}
                                </p>
                                <p>
                                    <span className="font-bold">Опис: </span>{' '}
                                    {selectedReport.description || '-'}
                                </p>
                                <p>
                                    <span className="font-bold">
                                        Шляхи втрати:
                                    </span>{' '}
                                    {selectedReport.infoReferences || '-'}
                                </p>
                                <p>
                                    <span className="font-bold">
                                        Ймовірне місце розташування:
                                    </span>{' '}
                                    {selectedReport.mapLocation || '-'}
                                </p>
                            </div>
                            {images.length > 0 && (
                                <div className="report-modal-right">
                                    <img
                                        className="modal-image"
                                        src={`data:image/png;base64, ${images[currentPictureIndex]}`}
                                        alt={`Image ${currentPictureIndex + 1}`}
                                    />
                                    <div className="report-modal-btns">
                                        <button
                                            className="arrow-button"
                                            onClick={handlePreviousPicture}
                                            disabled={currentPictureIndex === 0}
                                        >
                                            <ChevronLeftIcon />
                                        </button>
                                        <button
                                            className="arrow-button"
                                            onClick={handleNextPicture}
                                            disabled={
                                                currentPictureIndex ===
                                                images.length - 1
                                            }
                                        >
                                            <ChevronRightIcon />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={() => {
                                setIsModalOpen(false);
                                setImages([]);
                            }}
                            className="bg-black text-white rounded-lg px-4 py-2 mt-6"
                        >
                            Закрити
                        </button>
                    </div>
                )}
            </Modal>
        </div>
    );
}
