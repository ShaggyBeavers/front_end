import requests, { authAPi } from '../../requests';

const UserAPI = {
    editUser: (
        userId: number,
        values: { email: string; firstName: string; lastName: string }
    ) => requests.put(`api/user/edit/${userId}`, values),
    resetPassword: (values: {
        token: string;
        password: string;
        passwordConfirmation: string;
    }) => requests.post('api/user/password/reset', values),
    recoveryRequest: (email: string) =>
        requests.post('api/user/password/request-reset', email),
    newPassword: (values: { password: string; passwordConfirmation: string }) =>
        requests.patch('api/user/password/change', values),
    banUnban: (userId: number) =>
        requests.post(`api/user/ban-unban/${userId}`, userId),
    getUserEmail: () => requests.get('api/user/email'),
    // getUserProfile: () => requests.get('api/user/current-profile'),
    getUserProfile: (accessToken: string | null) =>
        authAPi.get('api/user/current-profile', {
            headers: { Authorization: `Bearer ${accessToken}` },
        }),
};

export default UserAPI;
