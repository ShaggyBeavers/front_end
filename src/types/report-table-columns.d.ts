import { statusType } from '@/src/types/status-type';

export interface categoryType {
    id: number;
    name: string;
}

export type ReportTableProps = {
    title: string;
    categoryList: categoryType[];
    status: statusType;
};
