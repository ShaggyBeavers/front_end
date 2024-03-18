import requests, { authAPi } from '../requests';
import { RelicStatusEnum } from '@/src/types/relic';

const ReportAPI = {
    createReport: (values: any) => authAPi.post('api/report', values),
    getAllReports: () => authAPi.get('api/report'),
    updateReportStatus: (values: {
        reportId: number;
        status: RelicStatusEnum;
    }) => authAPi.put('api/report/status', values),
    getReport: (reportId: number) => authAPi.get(`api/report/${reportId}`),
    deleteReport: (reportId: number) =>
        authAPi.delete(`api/report/delete/${reportId}`),
};

export default ReportAPI;
