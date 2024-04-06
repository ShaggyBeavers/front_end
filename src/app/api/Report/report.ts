import { statusTypeEN } from '@/src/types/status-type-en';
import requests, { authAPi } from '../requests';
import { ReportStatusEnum } from '../../../../src/enums/reportstatus';

export interface reportData {
    name: string;
    description: string;
    mapLocation: string;
    categoryIds: string[];
    status: statusTypeEN;
    infoReferences: string;
    regionId: number;
}

const ReportAPI = {
    createReport: (values: {}) => authAPi.post('api/report/', values),
    getAllReports: (page: number, size: number) =>
        authAPi.get(`api/report/?page=${page}&size=${size}`),
    updateReportStatus: (values: {
        reportId: number;
        status: ReportStatusEnum;
    }) =>
        authAPi.put(
            `api/report/status?reportId=${values.reportId}&status=${values.status}`
        ),
    getReport: (reportId: number) => authAPi.get(`api/report/${reportId}`),
    deleteReport: (reportId: number) =>
        authAPi.delete(`api/report/delete/${reportId}`),
};

export default ReportAPI;
