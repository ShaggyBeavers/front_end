import requests from "../requests";

const RegionAPI = {
    createRegion: (name:string) =>
        requests.post("api/region/create",name),
};

export default RegionAPI;