import axios from 'axios';
import { getBaseURLFromFullURL } from '../../utils/getBaseURLFromFullURL';
import { enqueueAndProcessRequest } from './apiQueue';

const queueBaseURLs = [
    'https://jsonplaceholder.typicode.com',
    'https://hub.dummyapis.com'
];

const axiosInstance = axios.create();

const setupInterceptors = () => {
    axiosInstance.interceptors.request.use((config) => {
        const currentBaseURL = config.baseURL || getBaseURLFromFullURL(config.url);
        if (queueBaseURLs.includes(currentBaseURL)) {
            enqueueAndProcessRequest(config, axiosInstance);
            return new Promise(() => {}); // Return a never-resolving promise to prevent the original request from proceeding
        }
        return config;
    });
}

setupInterceptors();

export default axiosInstance;
