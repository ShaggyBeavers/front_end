import requests from '../requests';

const RelicAPI = {
    updateRelicFile: (relicId: number) =>
        requests.put(`api/relics/file/update/${relicId}`, relicId),
    editRelic: (relicId: number) =>
        requests.put(`api/relics/edit/${relicId}`, relicId),
    //  api/relics/filter (should i create enum ?)
    uploadRelicFile: (relicId: number, file: string) =>
        requests.post(`api/relics/edit/${relicId}`, file),
    // api/relics/create (too many fields for today)
    // [POST] api/relics/change-favorite accepts no params??
    fetchDetails: (relicId: number) => requests.get(`api/relics/${relicId}`),
    searchRelics: (relicName: string, page: number, size: number) =>
        requests.get('api/relics/search'),
    relicsPage: ( page: number, size: number) =>
        requests.get('api/relics/page'),
    getRelicFile: (relicId: number) =>
        requests.get(`api/relics/file/download/${relicId}`),
    favorite: () => requests.get('api/relics/favorite'),
    // api/relics/count-by-statuses  still question about enum
    deleteRelicFile: (relicId: number) => requests.delete(`api/relics/file/delete/${relicId}`)
};

export default RelicAPI;
