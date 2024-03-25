import requests, { authAPi } from '../requests';

const PropertyAPI = {
    createProperty: (property: string) =>
        authAPi.post('api/properties/create', property),
    deleteProperty: (propertyId: number) =>
        authAPi.delete(`api/properties/${propertyId}`),
    getProperties: () => requests.get('api/properties/'),
};

export default PropertyAPI;
