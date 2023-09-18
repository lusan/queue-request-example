const apiQueue = [];
let inProgress = false;

const queueBaseURLs = [
    'https://api.example.com',
    'https://another-api.example.com',
    // ... add more base URLs as needed
];

const processQueue = async () => {
    if (inProgress || apiQueue.length === 0) return;

    inProgress = true;

    const { apiCall, resolver } = apiQueue.shift();

    try {
        const response = await apiCall();
        resolver(response);  // Resolve the promise for this API call
    } catch (error) {
        console.error('Error processing API queue:', error);
        resolver(Promise.reject(error)); // Reject the promise for this API call
    }

    inProgress = false;
    processQueue();
};

const setupInterceptors = (axiosInstance) => {
    axiosInstance.interceptors.request.use(
        (config) => {
            if (queueBaseURLs.includes(config.baseURL)) {
                // A mechanism to let each request know when it's its turn
                let resolver;
                const promise = new Promise((resolve) => {
                    resolver = resolve;
                });
                console.log(config.baseURL)
                apiQueue.push({
                    apiCall: () => axiosInstance(config),
                    resolver
                });

                if (!inProgress) {
                    processQueue();
                }

                return promise; 
            }

            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (response) => {
            processQueue();
            return response;
        },
        (error) => {
            processQueue();
            return Promise.reject(error);
        }
    );
}

export default setupInterceptors;
