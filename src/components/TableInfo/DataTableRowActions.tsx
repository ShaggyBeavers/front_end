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

import { statuses } from './data/reportData';
import { ReportStatusEnum } from '../../../src/enums/reportstatus';
import ReportAPI from '../../../src/app/api/Report/report';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import UserAPI from '../../../src/app/api/Account/User/user';

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
}

export function DataTableRowActions<TData>({
    row,
}: DataTableRowActionsProps<TData>) {
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
            // queryClient.invalidateQueries({ queryKey: ['getMod'] });
            // queryClient.invalidateQueries({ queryKey: ['getRegMod'] });
        },
    });

    const deleteReport = useMutation({
        mutationFn: (reportId: number) => ReportAPI.deleteReport(reportId),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['reports'] });
        },
    });

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
                {statuses.map((status) => (
                    <DropdownMenuItem
                        key={status.value}
                        onClick={() => {
                            changeStatus.mutate({
                                reportId: 32,
                                status: status.value,
                            });
                        }}
                    >
                        <status.icon
                            className={`${status.color} ${status.label === 'Опрацьовується' ? 'h-8 w-8' : 'h-6 w-6'}`}
                        />
                        <span className="ml-2">Змінити на {status.label}</span>
                        {/* <span className="ml-1">{status.label}</span> */}
                    </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator className="bg-gray-200" />
                <DropdownMenuItem
                    onClick={() => {
                        console.log('Ban ', row.id);
                    }}
                >
                    <Ban className="mr-1 max-w-4" />
                    Блок автора
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => {
                        // deleteReport.mutate(row.reportId);
                    }}
                >
                    <Trash2 className="mr-1 max-w-4" />
                    Видалити
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
