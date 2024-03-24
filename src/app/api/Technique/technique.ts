import requests from '../requests';

const TechniqueAPI = {
    createTechnique: (name: string) =>
        requests.post('api/techniques/create', name),
    deleteTechnique: (techniqueId: number) =>
        requests.delete(`api/techniques/${techniqueId}`),
    getTechniques: () => requests.get('api/techniques/'),
};

export default TechniqueAPI;
