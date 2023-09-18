import enqueueRequest from './apiQueue';

const apiCaller = {
    get: (url, config) => enqueueRequest({ ...config, method: 'get', url }),
    post: (url, data, config) => enqueueRequest({ ...config, method: 'post', url, data }),
    // Similarly, define other methods (put, delete, etc.)
};

export default apiCaller;
