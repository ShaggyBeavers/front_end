import requests, { authAPi } from '../requests';

const RegionAPI = {
    createRegion: (name: string) =>  authAPi.post('api/region/create', name),
    deleteRegion: (regionId: number) =>
        authAPi.delete(`api/region/${regionId}`),
    getRegions: () => requests.get('api/region/'),
};

export default RegionAPI;
