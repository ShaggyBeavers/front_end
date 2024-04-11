import requests, { authAPi } from '../requests';
import { RelicFilterRequest, RelicDTO } from '../../../../src/types/relic';
import { RelicStatusEnum } from '../../../../src/enums/relicstatus';
import { number } from 'zod';

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
    uploadRelicFile: (relicId: number, file: any[]) =>
        authAPi.post(`api/relics/files/upload/${relicId}`, file),
    createRelic: (values: RelicDTO) =>
        authAPi.post('api/relics/create', values),
    changeFavorite: () => requests.post('api/relics/change-favorite', {}), //accepts no params currently
    fetchDetails: (relicId: number) => requests.get(`api/relics/${relicId}`),
    searchRelics: (relicName: string, page: number, size: number) =>
        requests.get(
            `api/relics/search?relicName=${relicName}&page=${page}&size=${size}`
        ),
    // is redundant relicsPage: (page: number, size: number) => requests.get(`api/relics/page?page=${page}&size=${size}`),
    getRelicFiles: (relicId: number) =>
        requests.getFile(`api/relics/files/download/${relicId}`),
    favorite: () => requests.get('api/relics/favorite'),
    countRelicsByStatuses: (statuses: RelicStatusEnum[]) =>
        requests.get(`api/relics/count-by-statuses?statuses=${statuses}`),
    deleteRelicFile: (relicId: number) =>
        authAPi.delete(`api/relics/file/delete/${relicId}`),
    deleteRelic: (relicId: number) =>
        authAPi.delete(`api/relics/delete/${relicId}`),
    getRelicFirstFile: (values: { entityIds: number[] }) =>
        requests.getFileIds('api/relics/files/download', values),
};

export default RelicAPI;
