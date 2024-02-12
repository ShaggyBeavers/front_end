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

export const columns: any = [
    {
        accessorKey: 'title',
        meta: 'Назва',
        header: ({ column }: any) => (
            <DataTableColumnHeader column={column} title="Назва" />
        ),
        cell: ({ row }: any) => (
            <div className="max-w-[500px] truncate font-medium">
                <span>{row.getValue('title')}</span>
            </div>
        ),
    },
    {
        accessorKey: 'categoryList',
        meta: 'Категорія',
        header: ({ column }: any) => (
            <DataTableColumnHeader column={column} title="Категорія" />
        ),
        cell: ({ row }: any) => {
            const categories = row.getValue('categoryList');
            const labels = categories.map((category: categoryType) => {
                return (
                    categories.find(
                        (t: categoryType) =>
                            t.categoryName === category.categoryName
                    )?.categoryName || category.categoryName
                );
            });

            return <ShowLabels labels={labels} />;
        },
        filterFn: 'select',
    },
    {
        accessorKey: 'status',
        meta: 'Cтатус',
        header: ({ column }: any) => (
            <DataTableColumnHeader column={column} title="Статус" />
        ),
        cell: ({ row }: any) => {
            const status = statuses.find(
                (status) => status.value === row.getValue('status')
            );
            return (
                <div className="flex items-center space-x-2">
                    {status?.icon && (
                        <status.icon className={`${status.color}`} />
                    )}
                    {status ? (
                        <span className={`p-2`}>{status.label}</span>
                    ) : (
                        <span>{row.getValue('status')}</span>
                    )}
                </div>
            );
        },
        filterFn: (row: any, id: any, value: any) => {
            return value.includes(row.getValue(id));
        },
    },
];
