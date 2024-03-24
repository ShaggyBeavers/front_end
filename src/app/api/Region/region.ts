import requests from '../requests';

const RegionAPI = {
    createRegion: (name: string) => requests.post('api/region/create', name),
    deleteRegion: (regionId: number) =>
        requests.delete(`api/region/${regionId}`),
    getRegions: () => requests.get('api/region/'),
};

export default RegionAPI;
