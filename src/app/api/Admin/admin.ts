import requests from '../requests';

const AdminAPI = {
    getRegionalModerators: () => requests.get('api/admin/regional-moderators'),
    addRegionalModerator: (values: {
        userId: number;
        regionIds: string[];
        categoryIds: string[];
    }) => requests.post('api/admin/regional-moderators',values),
    getModerators: () => requests.get('api/admin/moderators'),
    addModerator: (values: {
        userId: number;
        regionIds: string[];
        categoryIds: string[];
    }) => requests.post('api/admin/moderators',values),
    changeModeratorsRegions: (values: {
        moderatorId: number;
        regionIds: string[];
    }) => requests.patch('api/admin/moderators/change-regions',values),
    changeModeratorsCategories: (values: {
        moderatorId: number;
        categoryIds: string[];
    }) => requests.patch('api/admin/moderators/change-categories',values),
    deleteModerator: (moderatorId: number) =>
        requests.delete(`api/admin/moderators/${moderatorId}`),
};

export default AdminAPI;
