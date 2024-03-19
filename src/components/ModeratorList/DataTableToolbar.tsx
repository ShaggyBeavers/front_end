import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { DataTableViewOptions } from './DataTableViewOptions';

import { statuses, categories } from './data/reportData';
import { DataTableFacetedFilter } from './DataTableFacetedFilter';

import { options } from '../../types/filters'

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

// convert categories to options
const categoriesOptions: options[] = categories.map((category) => ({
    label: category.categoryName,
    value: category.categoryName,
}));

export function DataTableToolbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Пошук по імені..."
                    value={
                        (table
                            .getColumn('title')
                            ?.getFilterValue() as string) ?? ''
                    }
                    onChange={(event) =>
                        table
                            .getColumn('title')
                            ?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                {table.getColumn('region') && (
                    <DataTableFacetedFilter
                        column={table.getColumn('region')}
                        title="Регіон"
                        options={statuses}
                    />
                )}
                {table.getColumn('categoryList') && (
                    <DataTableFacetedFilter
                        column={table.getColumn('categoryList')}
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
            <DataTableViewOptions table={table} />
        </div>
    );
}
