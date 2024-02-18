import requests from "../requests";

const ReportAPI = {
    createReport: (values:any) => requests.post("api/report",values),
    getAllReports: () => requests.get("api/report"),
    updateReportStatus:(values: {reportId:number,status:string}) => requests.put("api/report/status",values),
    getReport: (reportId: number) => requests.get(`api/report/${reportId}`),
    deleteReport: (reportId: number) => requests.delete(`api/report/delete/${reportId}`),
  }; 

export default ReportAPI;