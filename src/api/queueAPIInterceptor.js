const apiQueue = [];
let inProgress = false;

const queueBaseURLs = [
  "https://api.example.com"
  // ... add more base URLs as needed
];

const processQueue = async () => {
  if (inProgress) return;
  if (apiQueue.length === 0) return;

  inProgress = true;

  try {
    await apiQueue.shift()();
  } catch (error) {
    console.error("Error processing API queue:", error);
  }

  inProgress = false;
  processQueue();
};

const queueAPIInterceptor = (axiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      if (queueBaseURLs.includes(config.baseURL)) {
        const apiCall = () => axiosInstance(config);
        apiQueue.push(apiCall);

        if (!inProgress) {
          processQueue();
        }

        return new Promise(() => {});
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
};

export default queueAPIInterceptor;
