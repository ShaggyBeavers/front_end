import { statusType } from '@/src/types/status-type';

export interface categoryType {
    id: number;
    categoryName: string;
}

export type ReportTableProps = {
    title: string;
    categoryList: categoryType[];
    status: statusType;
};
