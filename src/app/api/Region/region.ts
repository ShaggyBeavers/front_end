import requests from '../requests';

const RegionAPI = {
    createRegion: (name: string) => requests.post('api/region/create', name),
    getRegions: () => requests.get('api/region/'),
};

export default RegionAPI;
