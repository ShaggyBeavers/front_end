import requests from '../requests';
import { RelicStatusEnum,RelicFilterRequest,Relic } from '@/src/types/relic';

const RelicAPI = {
    updateRelicFile: (relicId: number,file:string) =>
        requests.put(`api/relics/file/update/${relicId}`, file),
    editRelic: (relicId: number,relicInfo:Relic) => 
        requests.put(`api/relics/edit/${relicId}`, relicInfo), 
    filterRelics:(page: number, size: number,filterRequest: RelicFilterRequest)=>requests.post(`api/relics/filter?page=${page}&size=${size}`,filterRequest),
    uploadRelicFile: (relicId: number, file: string) =>
        requests.post(`api/relics/edit/${relicId}`, file),
    createRelic: (values: any) => requests.post('api/relics/create', values),
    changeFavorite: () => requests.post('api/relics/change-favorite', {}), //accepts no params currently
    fetchDetails: (relicId: number) => requests.get(`api/relics/${relicId}`),
    searchRelics: (relicName: string, page: number, size: number) =>
        requests.get('api/relics/search'),
    // is redundant relicsPage: (page: number, size: number) => requests.get(`api/relics/page?page=${page}&size=${size}`),
    getRelicFile: (relicId: number) =>
        requests.get(`api/relics/file/download/${relicId}`),
    favorite: () => requests.get('api/relics/favorite'),
    countRelicsByStatuses: (statuses: RelicStatusEnum[]) =>
        requests.get(`api/relics/count-by-statuses?statuses=${statuses}`),
    deleteRelicFile: (relicId: number) =>
        requests.delete(`api/relics/file/delete/${relicId}`),
};

export default RelicAPI;
