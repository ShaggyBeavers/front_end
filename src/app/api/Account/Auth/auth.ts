import requests from '../../requests';

const AuthAPI = {
    login: (values: { email: string; password: string }) =>
        requests.post('api/auth/sign-in', values),
    register: (values: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }) => requests.post('api/auth/sign-up', values),
    googleLogin: (values: any) =>
        requests.post('api/auth/google_login', values), //non existing yet
};

export default AuthAPI;
