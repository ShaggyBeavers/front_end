import requests,{authAPi} from '../requests';

const HistoricalPeriodAPI = {
    createHistoricalPeriod: (value:{name: string}) =>
        authAPi.post('api/historical-periods/create', value),
    deleteHistoricalPeriod: (historicalPeriodId: number) =>
        authAPi.delete(`api/historical-periods/${historicalPeriodId}`),
    getHistoricalPeriods: () => requests.get('api/historical-periods/'),
};

export default HistoricalPeriodAPI;