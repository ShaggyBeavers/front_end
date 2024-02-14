import requests from "../requests";

const PropertyAPI = {
    createProperty: (property:string) =>
        requests.post("api/properties/create",property),
};

export default PropertyAPI;