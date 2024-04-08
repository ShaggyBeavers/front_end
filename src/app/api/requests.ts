import axios, { AxiosResponse } from 'axios';
import { access, stat } from 'fs';
import { get } from 'http';
import { config } from 'process';
import { useAuthStore } from '../../stores/AuthStore';
import { useNavigate } from 'react-router-dom';
import { object } from 'zod';

// const BASE_URL = 'http://localhost:8081/';
const BASE_URL = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = BASE_URL;
export const authAPi = axios.create({
    baseURL: BASE_URL,
});

export const setHeaderToken = (token: string) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeHeaderToken = () => {
    delete axios.defaults.headers.common.Authorization;
};

async function getNewAccessToken() {
    console.log('I wish you were normal');
}

authAPi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('ACCESS_TOKEN');
        console.log('Interceptor triggered request');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.log('Interceptor triggered request error');
        // navigate('/');
        window.location.reload();
        window.location = window.location;
        return Promise.reject(error);
    }
);

authAPi.interceptors.response.use(
    (response) => {
        console.log('Interceptor triggered response:');
        return response;
    },
    async (error) => {
        console.log('Interceptor triggered response error:');
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            localStorage.removeItem('auth-store');
            localStorage.removeItem('ACCESS_TOKEN');

            window.location.reload();
            // useAuthStore.setState({ user: null });
            // originalRequest._retry = true;

            // lmao, imagine having refresh tokens, couldn't be our project
            // const accessToken = await getNewAccessToken();
            // localStorage.setItem('ACCESS_TOKEN', accessToken);
            // axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
            console.log('Unauthorized');
            return axios(originalRequest);
        }
        return Promise.reject(error);
    }
);

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    getFile: (url: string) =>
        axios.get(url, { responseType: 'blob' }).then(responseBody),
    getFileIds: (url: string, body: {}) =>
        axios.post(url, body, { responseType: 'blob' }).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
    patch: (url: string, body: {}) => axios.patch(url, body).then(responseBody),
};

export default requests;
