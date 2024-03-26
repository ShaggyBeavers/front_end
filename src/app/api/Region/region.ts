import requests, { authAPi } from '../requests';

const RegionAPI = {
    createRegion: (value:{name: string}) =>  authAPi.post('api/region/create',value),
    deleteRegion: (regionId: number) =>
        authAPi.delete(`api/region/${regionId}`),
    getRegions: () => requests.get('api/region/'),
};

export default RegionAPI;
