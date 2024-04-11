import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { DataTableViewOptions } from './DataTableViewOptions';

import { categories, statuses } from './data/reportData';
import { DataTableFacetedFilter } from './DataTableFacetedFilter';

import { options } from '../../types/filters';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import ProtectedItems from '../ProtectedItems';
import { RoleEnum } from '../../../src/enums/roles';

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    constants?: any;
}

// convert categories to options
const categoriesOptions: options[] = categories.map((category) => ({
    label: category.name,
    value: category.name,
}));

const statusesOptions: options[] = statuses.map((status) => ({
    label: status.name,
    value: status.name,
}));

export function DataTableToolbar<TData>({
    table,
    constants,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;
    const [isRegMod, setIsRegMod] = useState(false);

    const categories =
        constants?.categories.map((category: string) => ({
            label: category,
            value: category,
        })) || [];

    const regions =
        constants?.regions?.map((region: string) => ({
            label: region,
            value: region,
        })) || [];

    const handleRegModClick = () => {
        queryClient.invalidateQueries({ queryKey: ['getRegMod'] });
        // queryClient.invalidateQueries({ queryKey: ['getMod'] });
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('regMod', 'true');
        window.history.replaceState(
            {},
            '',
            `${window.location.pathname}?${urlParams}`
        );
        setIsRegMod(true);
    };

    const queryClient = useQueryClient();

    const handleModClick = () => {
        queryClient.invalidateQueries({ queryKey: ['getMod'] });
        // queryClient.invalidateQueries({ queryKey: ['getRegMod'] });
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.delete('regMod');
        window.history.replaceState(
            {},
            '',
            `${window.location.pathname}?${urlParams}`
        );
        setIsRegMod(false);
    };

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Пошук по імені..."
                    value={
                        (table
                            .getColumn('fullName')
                            ?.getFilterValue() as string) ?? ''
                    }
                    onChange={(event) =>
                        table
                            .getColumn('fullName')
                            ?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                <ProtectedItems role={[RoleEnum.ADMIN]}>
                    {isRegMod ? (
                        <Button
                            variant="default"
                            onClick={handleModClick}
                            className="h-8 px-2 lg:px-3"
                        >
                            Модератори
                        </Button>
                    ) : (
                        <Button
                            variant="default"
                            onClick={handleRegModClick}
                            className="h-8 px-2 lg:px-3"
                        >
                            Рег. Модератори
                        </Button>
                    )}
                </ProtectedItems>
                {table.getColumn('regions') && (
                    <DataTableFacetedFilter
                        column={table.getColumn('regions')}
                        title="Регіон"
                        // options={categoriesOptions}
                        options={regions}
                    />
                )}
                {table.getColumn('categories') && (
                    <DataTableFacetedFilter
                        column={table.getColumn('categories')}
                        title="Категорії"
                        // options={categoriesOptions}
                        options={categories}
                    />
                )}
                {/* {table.getColumn('status') && (
                    <DataTableFacetedFilter
                        column={table.getColumn('status')}
                        title="Статус"
                        // options={categoriesOptions}
                        options={statusesOptions}
                    />
                )} */}
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
