import requests from '../requests';

const MuseumAPI = {
    createMuseum: (values: {
        name: string;
        nameOld?: string;
        isDestroyed?: boolean;
    }) => requests.post('api/museums/create', values),
    deleteMuseum: (museumId: number) =>
        requests.delete(`api/museums/${museumId}`),
    getMuseums: () => requests.get('api/museums/'),
};

export default MuseumAPI;
