import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL = 'http://localhost:8081';
const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
};

const Account = {
    login: (values: { email: string; password: string }) =>
        requests.post('api/auth/sign-in', values),
    register: (values: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }) => requests.post('api/auth/sign-up', values),
    currentUser: () => requests.get('account/currentUser'), //prototype
    passwodRecovery: (values: any) =>
        requests.post('api/auth/passwordRecovery', values), //prototype
    googleLogin: (values: any) =>
        requests.post('api/auth/google_login', values), //prototype
    report: (values: any) => requests.post('api/report', values), //idk real one yet
};

const Catalogue = {
    fetchItems: (page: number, size: number) =>
        requests.get(`api/relics/page?page=${page}&size=${size}`),
};

const Relic = {
    fetchDetails: (relicId: number) => requests.get(`api/relics/${relicId}`),
};

const agent = {
    Account,
    Catalogue,
    Relic,
};

export default agent;
