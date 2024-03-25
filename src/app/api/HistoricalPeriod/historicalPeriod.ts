import requests,{authAPi} from '../requests';

const HistoricalPeriodAPI = {
    createHistoricalPeriod: (name: string) =>
        authAPi.post('api/historical-periods/create', name),
    deleteHistoricalPeriod: (historicalPeriodId: number) =>
        authAPi.delete(`api/historical-periods/${historicalPeriodId}`),
    getHistoricalPeriods: () => requests.get('api/historical-periods/'),
};

export default HistoricalPeriodAPI;