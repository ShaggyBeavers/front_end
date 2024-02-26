import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL = 'http://localhost:8081';
const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
    patch: (url: string, body: {}) => axios.patch(url, body).then(responseBody),
};

export default requests;
