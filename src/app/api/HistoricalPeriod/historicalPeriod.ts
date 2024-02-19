import requests from "../requests";

const HistoricalPeriodAPI = {
    createHistoricalPeriod: (name:string) =>
        requests.post("api/historical-periods/create",name),
};

export default HistoricalPeriodAPI;