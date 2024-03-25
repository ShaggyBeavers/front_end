import requests, { authAPi } from '../requests';

const TechniqueAPI = {
    createTechnique: (name: string) =>
        authAPi.post('api/techniques/create', name),
    deleteTechnique: (techniqueId: number) =>
        authAPi.delete(`api/techniques/${techniqueId}`),
    getTechniques: () => requests.get('api/techniques/'),
};

export default TechniqueAPI;
