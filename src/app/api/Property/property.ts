import requests, { authAPi } from '../requests';

const PropertyAPI = {
    createProperty: (value:{name: string}) =>
        authAPi.post('api/properties/create', value),
    deleteProperty: (propertyId: number) =>
        authAPi.delete(`api/properties/${propertyId}`),
    getProperties: () => requests.get('api/properties/'),
};

export default PropertyAPI;
