let apiQueue = [];
let isRequestInProgress = false;

const processNextRequest = async (axiosInstance) => {
    if (apiQueue.length === 0 || isRequestInProgress) {
        return;
    }

    isRequestInProgress = true;
    const nextRequest = apiQueue.shift();

    try {
        await axiosInstance(nextRequest.config);
    } catch (error) {
        console.error('Error during API call:', error);
    } finally {
        isRequestInProgress = false;
        processNextRequest(axiosInstance);
    }
};

const enqueueAndProcessRequest = (config, axiosInstance) => {
    apiQueue.push({ config });
    processNextRequest(axiosInstance);
};

export { enqueueAndProcessRequest };
