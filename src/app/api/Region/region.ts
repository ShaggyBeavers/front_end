import { get } from 'http';
import requests, { authAPi } from '../requests';

const RegionAPI = {
    createRegion: (value: { name: string }) =>
        authAPi.post('api/region/create', value),
    deleteRegion: (regionId: number) =>
        authAPi.delete(`api/region/${regionId}`),
    getRegions: () => requests.get('api/region/'),
    getRegionById: (regionId: number) => requests.get(`api/region/${regionId}`),
};

export default RegionAPI;
