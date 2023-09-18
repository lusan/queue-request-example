import axios from 'axios';
import setupInterceptors from './interceptors'; 

const apiCaller = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

const queueBaseURLs = [
    'https://jsonplaceholder.typicode.com'
];

setupInterceptors(apiCaller);

export default apiCaller;
