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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '../ui/alert-dialog';
import AdminAPI from '../../../src/app/api/Admin/admin';

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

    const handleDelete = async (userId: number) => {
        await AdminAPI.deleteModerator(userId);
        queryClient.invalidateQueries({ queryKey: ['getMod'] });
        queryClient.invalidateQueries({ queryKey: ['getRegMod'] });
    };

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
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        {/* <DropdownMenuItem
                            onClick={() => {
                                handleDelete(row.getValue('id'));
                            }}
                        > */}
                        <div className="relative hover:bg-gray-100 flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                            <Trash2 className="mr-1 max-w-4" />
                            Видалити
                        </div>
                        {/* </DropdownMenuItem> */}
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                {`Видалити користувача?`}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                {`Ви впевнені, що хочете видалити модератора?`}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Відхилити</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => {
                                    handleDelete(row.getValue('id'));
                                    // console.log('delete');
                                }}
                                className="text-white hover:bg-red-500 "
                            >
                                Прийняти
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
