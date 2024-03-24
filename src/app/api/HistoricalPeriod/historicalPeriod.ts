import requests from '../requests';

const HistoricalPeriodAPI = {
    createHistoricalPeriod: (name: string) =>
        requests.post('api/historical-periods/create', name),
    deleteHistoricalPeriod: (historicalPeriodId: number) =>
        requests.delete(`api/historical-periods/${historicalPeriodId}`),
    getHistoricalPeriods: () => requests.get('api/historical-periods/'),
};

export default HistoricalPeriodAPI;