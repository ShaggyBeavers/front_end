import requests from '../requests';

const PropertyAPI = {
    createProperty: (property: string) =>
        requests.post('api/properties/create', property),
    deleteProperty: (propertyId: number) =>
        requests.delete(`api/properties/${propertyId}`),
    getProperties: () => requests.get('api/properties/'),
};

export default PropertyAPI;
