import { RoleEnum } from '@/src/enums/roles';
import requests, { authAPi } from '../requests';


const AdminAPI = {
    getRegionalModerators: () => authAPi.get('api/admin/regional-moderators'),
    addRegionalModerator: (values: {
        userId: number;
        regionIds: string[];
        categoryIds: string[];
    }) => authAPi.post('api/admin/regional-moderators', values),
    getModerators: () => authAPi.get('api/admin/moderators'),
    addModerator: (values: {
        userId: number;
        regionIds: string[];
        categoryIds: string[];
    }) => authAPi.post('api/admin/moderators', values),
    changeModeratorsRegions: (values: {
        moderatorId: number;
        regionIds: string[];
    }) => authAPi.patch('api/admin/moderators/change-regions', values),
    changeModeratorsCategories: (values: {
        moderatorId: number;
        categoryIds: string[];
    }) => authAPi.patch('api/admin/moderators/change-categories', values),
    deleteModerator: (moderatorId: number) =>
        authAPi.delete(`api/admin/moderators/${moderatorId}`),
    changeModerator: (values: {
        userId: number;
        regionIds: string[];
        categoryIds: string[];
        role: RoleEnum;
    }) => authAPi.patch('api/admin/moderators', values),
    changeRegModerator: (values: {
        userId: number;
        regionIds: string[];
        categoryIds: string[];
        role: RoleEnum;
    }) => authAPi.patch('api/admin/regional-moderators', values),
};

export default AdminAPI;
