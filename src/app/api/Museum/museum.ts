import requests, { authAPi } from '../requests';

const MuseumAPI = {
    createMuseum: (values: {
        name: string;
        nameOld?: string;
        isDestroyed?: boolean;
    }) => authAPi.post('api/museums/create', values),
    deleteMuseum: (museumId: number) =>
        authAPi.delete(`api/museums/${museumId}`),
    getMuseums: () => requests.get('api/museums/'),
};

export default MuseumAPI;
