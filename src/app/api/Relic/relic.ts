import requests, { authAPi } from '../requests';
import { RelicFilterRequest, RelicDTO } from '../../../../src/types/relic';
import { RelicStatusEnum } from '../../../../src/enums/relicstatus';

const RelicAPI = {
    updateRelicFile: (relicId: number, file: string) =>
        authAPi.put(`api/relics/file/update/${relicId}`, file),
    editRelic: (relicId: number, relicInfo: RelicDTO) =>
        authAPi.put(`api/relics/edit/${relicId}`, relicInfo),
    filterRelics: (
        page: number,
        size: number,
        filterRequest: RelicFilterRequest
    ) =>
        requests.post(
            `api/relics/filter?page=${page}&size=${size}`,
            filterRequest
        ),
    uploadRelicFile: (relicId: number, file: string) =>
        authAPi.post(`api/relics/edit/${relicId}`, file),
    createRelic: (values: RelicDTO) =>
        authAPi.post('api/relics/create', values),
    changeFavorite: () => requests.post('api/relics/change-favorite', {}), //accepts no params currently
    fetchDetails: (relicId: number) => requests.get(`api/relics/${relicId}`),
    searchRelics: (relicName: string, page: number, size: number) =>
        requests.get(
            `api/relics/search?relicName=${relicName}&page=${page}&size=${size}`
        ),
    // is redundant relicsPage: (page: number, size: number) => requests.get(`api/relics/page?page=${page}&size=${size}`),
    getRelicFile: (relicId: number) =>
        requests.get(`api/relics/file/download/${relicId}`),
    favorite: () => requests.get('api/relics/favorite'),
    countRelicsByStatuses: (statuses: RelicStatusEnum[]) =>
        requests.get(`api/relics/count-by-statuses?statuses=${statuses}`),
    deleteRelicFile: (relicId: number) =>
        authAPi.delete(`api/relics/file/delete/${relicId}`),
};

export default RelicAPI;
