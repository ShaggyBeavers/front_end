import requests from "../requests";

const TechniqueAPI = {
    createTechnique: (name:string) =>
        requests.post("api/techniques/create",name),
};

export default TechniqueAPI;