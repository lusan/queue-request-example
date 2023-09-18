import axios from 'axios';

import { getBaseURLFromFullURL } from '../../utils/getBaseURLFromFullURL';

const queueBaseURLs = [
    'https://jsonplaceholder.typicode.com',
    'https://hub.dummyapis.com'
];

let apiQueue = [];
let isRequestInProgress = false;

const processNextRequest = async () => {
    if (apiQueue.length === 0 || isRequestInProgress) {
        return;
    }

    isRequestInProgress = true;
    const { config, resolve, reject } = apiQueue.shift();

    try {
        const response = await axios(config);
        resolve(response);
    } catch (error) {
        reject(error);
    } finally {
        isRequestInProgress = false;
        processNextRequest();
    }
};

const enqueueRequest = (config) => {
    const currentBaseURL = config.baseURL || getBaseURLFromFullURL(config.url);
    if (queueBaseURLs.includes(currentBaseURL)) {
        return new Promise((resolve, reject) => {
            apiQueue.push({ config, resolve, reject });
            processNextRequest();
        });
    } else {
        return axios(config); // For other base URLs, don't queue
    }
};

export default enqueueRequest;
