import requests, { authAPi } from '../requests';
import { ReportStatusEnum } from '../../../../src/enums/reportstatus';

const ReportAPI = {
    createReport: (values: any) => authAPi.post('api/report/', values),
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
