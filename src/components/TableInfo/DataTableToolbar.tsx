import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { DataTableViewOptions } from './DataTableViewOptions';

import { statuses } from './data/reportData';
import { DataTableFacetedFilter } from './DataTableFacetedFilter';

import { options } from '../../types/filters';
import { useQuery } from '@tanstack/react-query';
import CategoriesAPI from '../../app/api/Category/category';

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

export function DataTableToolbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    const getCategories = useQuery({
        queryKey: ['getCategories'],
        queryFn: async () => await CategoriesAPI.getCategories(),
    });

    let categories: any[] = [];
    if (getCategories.isSuccess) {
        categories = getCategories.data;
    }

    // convert categories to options
    const categoriesOptions: options[] = categories.map((category: any) => ({
        label: category.name,
        value: category.name,
    }));
    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Пошук по назві..."
                    value={
                        (table.getColumn('name')?.getFilterValue() as string) ??
                        ''
                    }
                    onChange={(event) =>
                        table
                            .getColumn('name')
                            ?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                {table.getColumn('status') && (
                    <DataTableFacetedFilter
                        column={table.getColumn('status')}
                        title="Статус"
                        options={statuses}
                    />
                )}
                {table.getColumn('categoriesDTO') && (
                    <DataTableFacetedFilter
                        column={table.getColumn('categoriesDTO')}
                        title="Категорії"
                        options={categoriesOptions}
                    />
                )}
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Очистити
                        <Cross2Icon className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            {/* <DataTableViewOptions table={table} /> */}
        </div>
    );
}
