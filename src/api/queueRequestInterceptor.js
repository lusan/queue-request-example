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
    const nextRequest = apiQueue.shift();

    try {
        await nextRequest();  // execute the next request
    } catch (error) {
        console.error('Error during API call:', error);
    } finally {
        isRequestInProgress = false;
        processNextRequest(axiosInstance);  // process the next request in the queue
    }
};

const setupInterceptors = (axiosInstance) => {
    axiosInstance.interceptors.request.use((config) => {
        if (queueBaseURLs.includes(config.baseURL)) {
            // Create a function that represents the API call and add it to the queue
            const apiCall = () => axiosInstance.request(config);
            apiQueue.push(apiCall);
            
            processNextRequest(axiosInstance);  // trigger processing of the queue if not already in progress

            // Reject the original request to delay it, but this rejection will be caught by our queue and won't propagate to the user
            return Promise.reject("Request queued");
        }
        return config;
    });

    axiosInstance.interceptors.response.use(
        response => response,
        error => {
            // We ignore the error we ourselves threw to queue the request
            if (error.message === "Request queued") {
                return new Promise(() => {});  // Return a never-resolving promise to effectively delay the original request
            }
            return Promise.reject(error);  // If it's a genuine error, forward it
        }
    );
}

export default setupInterceptors;
