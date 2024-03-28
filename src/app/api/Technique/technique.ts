import requests, { authAPi } from '../requests';

const TechniqueAPI = {
    createTechnique: (value:{name: string}) =>
        authAPi.post('api/techniques/create', value),
    deleteTechnique: (techniqueId: number) =>
        authAPi.delete(`api/techniques/${techniqueId}`),
    getTechniques: () => requests.get('api/techniques/'),
};

export default TechniqueAPI;
