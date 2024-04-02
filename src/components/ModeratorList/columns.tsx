/**
Columns are where you define the core of what 
your table will look like. They define the data 
that will be displayed, how it will be formatted, 
sorted and filtered.
*/

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '../ui/badge';

import { statuses, categories } from './data/reportData';
import { DataTableColumnHeader } from './DataTableColumnDropdowns';
import {
    ReportTableProps,
    categoryType,
} from '../../types/report-table-columns';
import { ShowLabels } from './DataTableShowLabels';
import { cva } from 'class-variance-authority';
import { stat } from 'fs';
import { DataTableRowActions } from './DataTableRowActions';

export const columns: any = [
    {
        // id: 'id',
        accessorKey: 'id',
        meta: 'ID',
        header: ({ column }: any) => (
            <DataTableColumnHeader column={column} title="ID" />
        ),
        cell: ({ row }: any) => (
            <div className="max-w-[500px] truncate font-medium">
                <span>{row.getValue('id')}</span>
            </div>
        ),
    },
    {
        id: 'fullName',
        accessorFn: (row: any) => `${row.firstName} ${row.lastName}`,
        // accessorKey: 'fullName',
        meta: "Ім'я",
        header: ({ column }: any) => (
            <DataTableColumnHeader column={column} title="Ім'я" />
        ),
        cell: ({ row }: any) => (
            <div className="max-w-[500px] truncate font-medium">
                <span>{row.getValue('fullName')}</span>
            </div>
        ),
    },
    {
        accessorKey: 'email',
        meta: 'Емейл',
        header: ({ column }: any) => (
            <DataTableColumnHeader column={column} title="Емейл" />
        ),
        cell: ({ row }: any) => (
            <div className="max-w-[500px] truncate font-medium">
                <span>{row.getValue('email')}</span>
            </div>
        ),
    },
    {
        accessorKey: 'categories',
        meta: 'Категорія',
        header: ({ column }: any) => (
            <DataTableColumnHeader column={column} title="Категорія" />
        ),
        cell: ({ row }: any) => {
            const categories = row.getValue('categories');
            const labels = categories.map(
                (category: categoryType) => category.name
            );
            // const labels = categories.map((category: categoryType) => {
            //     return (
            //         categories.find(
            //             (t: categoryType) =>
            //                 t.name === category.name
            //         )?.name || category.name
            //     );
            // });

            return <ShowLabels labels={labels} />;
        },
        filterFn: 'select',
    },
    {
        id: 'regions',
        accessorKey: 'regions',
        meta: 'Регіон',
        header: ({ column }: any) => (
            <DataTableColumnHeader column={column} title="Регіон" />
        ),
        cell: ({ row }: any) => {
            const regions = row.getValue('regions');
            const labels = regions.map((region: any) => region.name);
            // const labels = regions.map((region: any) => {
            //     return (
            //         categories.find(
            //             (t: categoryType) =>
            //                 t.name === category.name
            //         )?.name || category.name
            //     );
            // });

            return <ShowLabels labels={labels} />;
        },
        filterFn: 'select',
    },
    {
        accessorKey: 'ban',
        meta: 'Статус',
        header: ({ column }: any) => (
            <DataTableColumnHeader column={column} title="Статус" />
        ),
        cell: ({ row }: any) => {
            const ban = row.getValue('ban');
            return (
                <Badge
                    variant={ban ? 'destructive' : 'secondary'}
                    className="text-xs"
                >
                    {ban ? 'Заблокований' : 'Активний'}
                </Badge>
            );
        },
    },
    { id: 'action', cell: ({ row }: any) => <DataTableRowActions row={row} /> },
];
