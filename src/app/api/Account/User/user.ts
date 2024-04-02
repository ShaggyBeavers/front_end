import requests, { authAPi } from '../../requests';

const UserAPI = {
    editUser: (values: {
        email: string;
        firstName: string;
        lastName: string;
    }) => authAPi.put(`api/user/edit/`, values),
    resetPassword: (values: {
        token: string;
        password: string;
        passwordConfirmation: string;
    }) => requests.post('api/user/password/reset', values),
    recoveryRequest: (values: { email: string }) =>
        requests.post('api/user/password/request-reset', values),
    newPassword: (values: { password: string; passwordConfirmation: string }) =>
        requests.patch('api/user/password/change', values),
    banUnban: (userId: number) =>
        authAPi.post(`api/user/ban-unban/${userId}`, userId),
    getUserEmail: () => requests.get('api/user/email'),
    // getUserProfile: () => requests.get('api/user/current-profile'),
    getUserProfile: () => authAPi.get('api/user/current-profile'),
    getUsers: () => authAPi.get('api/user/'),
};

export default UserAPI;
