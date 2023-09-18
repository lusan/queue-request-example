let apiQueue = [];
let isRequestInProgress = false;

const queueBaseURLs = [
    'https://jsonplaceholder.typicode.com'
];

const processNextRequest = async (axiosInstance) => {
    if (apiQueue.length === 0 || isRequestInProgress) {
        return;
    }

    isRequestInProgress = true;
    console.log(isRequestInProgress)
    const { resolve, reject, config } = apiQueue.shift();
    
    try {
        console.log('try block')
        console.log(config)
        // Use the axios instance directly to make the API call
        const response = await axiosInstance.request(config);
        console.log('response', response)
        resolve(response);
    } catch (error) {
        console.error('Error during API call:', error);
        reject(error);
    } finally {
        isRequestInProgress = false;
        processNextRequest(axiosInstance);  // process the next request in the queue
    }
};

const setupInterceptors = (axiosInstance) => {
    axiosInstance.interceptors.request.use((config) => {
        if (queueBaseURLs.includes(config.baseURL)) {
            return new Promise((resolve, reject) => {
                apiQueue.push({ config, resolve, reject });
                processNextRequest(axiosInstance);  // trigger processing of the queue if not already in progress
            });
        }
        return config;
    });
}

export default setupInterceptors;
