import requests from "../requests";

const CatalogueAPI = {
    fetchItems: (page: number, size: number) =>
        requests.get(`api/relics/page?page=${page}&size=${size}`),
};

export default CatalogueAPI;