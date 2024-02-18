import requests from '../requests';
import { RelicStatusEnum,RelicFilterRequest } from '@/src/types/relic';

const RelicAPI = {
    updateRelicFile: (relicId: number) =>
        requests.put(`api/relics/file/update/${relicId}`, relicId),
    editRelic: (relicId: number) =>
        requests.put(`api/relics/edit/${relicId}`, relicId),
    filterRelics:(filterRequest: RelicFilterRequest)=>requests.post('api/relics/filter',filterRequest),//created interface for that
    uploadRelicFile: (relicId: number, file: string) =>
        requests.post(`api/relics/edit/${relicId}`, file),
    createRelic: (values: any) => requests.post('api/relics/create', values),
    changeFavorite: () => requests.post('api/relics/change-favorite', {}), //accepts no params currently
    fetchDetails: (relicId: number) => requests.get(`api/relics/${relicId}`),
    searchRelics: (relicName: string, page: number, size: number) =>
        requests.get('api/relics/search'),
    relicsPage: (page: number, size: number) => requests.get('api/relics/page'),
    getRelicFile: (relicId: number) =>
        requests.get(`api/relics/file/download/${relicId}`),
    favorite: () => requests.get('api/relics/favorite'),
    countRelicsByStatuses: (statuses: RelicStatusEnum[]) =>
        requests.get('api/relics/count-by-statuses'),
    deleteRelicFile: (relicId: number) =>
        requests.delete(`api/relics/file/delete/${relicId}`),
};

export default RelicAPI;
