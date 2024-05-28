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
import { statuses } from './data/reportData';
import { ReportStatusEnum } from '../../../src/enums/reportstatus';
import ReportAPI from '../../../src/app/api/Report/report';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import UserAPI from '../../../src/app/api/Account/User/user';
import { toast } from 'sonner';

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
    isUser:boolean;
}

export function DataTableRowActions<TData>({ row, isUser }: DataTableRowActionsProps<TData>) {
    const queryClient = useQueryClient();
    // const task = taskSchema.parse(row.original);
    const changeStatus = useMutation({
        mutationFn: async ({
            reportId,
            status,
        }: {
            reportId: number;
            status: ReportStatusEnum;
        }) => {
            // ReportAPI.updateReportStatus({ reportId: row.reportId, status: status });
            await ReportAPI.updateReportStatus({
                reportId: reportId,
                status: status,
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['reports'] });
        },
        onError: (error) => {
            console.error(error);
        },
    });

    const banUnban = useMutation({
        mutationFn: (userId: number) => UserAPI.banUnban(userId),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['getMod'] });
            queryClient.invalidateQueries({ queryKey: ['getRegMod'] });
        },
    });
    const deleteReportFiles = useMutation({
        mutationKey: ['deleteReportFiles'],
        mutationFn: (reportId: number) => ReportAPI.deleteReportFiles(reportId),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['reports'] });
        },
    });
    const deleteReport = useMutation({
        mutationKey: ['deleteReport'],
        mutationFn: (reportId: number) => ReportAPI.deleteReport(reportId),
        onMutate: (reportId: number) => {
            deleteReportFiles.mutate(reportId);
        },
        onSuccess: () => {
            toast.success('Звістка успішно видалено');
        },
        onError: (error) => {
            toast.error('Помилка видалення звістки');
            console.error(error);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['reports'] });
        },
    });

    const handleDeleteReport = async (reportId: number) => {
        deleteReport.mutate(reportId);
        queryClient.invalidateQueries({ queryKey: ['reports'] });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                    <DotsHorizontalIcon className="h-4 w-4" />
                    <span className="sr-only">Відкрити меню</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
            {!isUser && statuses.map((status) => (
                    <DropdownMenuItem
                        key={status.value}
                        onClick={() => {
                            changeStatus.mutate({
                                reportId: row.getValue('reportId'),
                                status: status.value,
                            });
                        }}
                    >
                        <status.icon
                            className={`${status.color} ${status.label === 'Опрацьовується' ? 'h-8 w-8' : 'h-6 w-6'}`}
                        />
                        <span className="ml-2">Змінити на {status.label}</span>
                    </DropdownMenuItem>
                ))}
                 {!isUser && <DropdownMenuSeparator className="bg-gray-200" />}
                 {!isUser && (
                    <DropdownMenuItem
                        onClick={() => {
                            banUnban.mutate(row.getValue('userId'));
                        }}
                    >
                        <Ban className="mr-1 max-w-4" />
                        Блок автора
                    </DropdownMenuItem>
                )}
                {/* <DropdownMenuItem
                    onClick={() => {
                        handleDeleteReport(row.getValue('reportId'));
                    }}
                >
                    <Trash2 className="mr-1 max-w-4" />
                    Видалити
                </DropdownMenuItem> */}
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
                                {`Видалити звістку?`}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                {`Ви впевнені, що хочете видалити цю звістку?`}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Відхилити</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => {
                                    handleDeleteReport(
                                        row.getValue('reportId')
                                    );
                                    // handleDelete(row.getValue('id'));
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
