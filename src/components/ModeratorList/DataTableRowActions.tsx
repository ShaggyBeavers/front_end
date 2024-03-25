import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';

import { Ban, Trash2 } from 'lucide-react';

import { Button } from '../ui/button';

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '../ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import UserAPI from '../../app/api/Account/User/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
}

export function DataTableRowActions<TData>({
    row,
}: DataTableRowActionsProps<TData>) {
    const queryClient = useQueryClient();

    const banUnban = useMutation({
        mutationFn: (userId: number) => UserAPI.banUnban(userId),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['getMod'] });
            queryClient.invalidateQueries({ queryKey: ['getRegMod'] });
        },
    });

    // const task = taskSchema.parse(row.original);
    const handleBan = async (userId: number) => {
        await UserAPI.banUnban(userId);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                    <DotsHorizontalIcon className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem
                    onClick={() => {
                        // handleBan(row.getValue('id'));
                        banUnban.mutate(row.getValue('id'));
                    }}
                >
                    <Ban className="mr-1 max-w-4" />
                    {row.getValue('ban') ? 'Розблокувати' : 'Заблокувати'}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-200" />
                <DropdownMenuItem
                    onClick={() => {
                        console.log('Delete ', row.getValue('id'));
                    }}
                >
                    <Trash2 className="mr-1 max-w-4" />
                    Видалити
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
