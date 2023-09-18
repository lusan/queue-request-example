import axios from "axios";

import queueAPIInterceptor from "./queueAPIInterceptor";

const axiosInstance = axios.create();

const apiCaller = async ({
  baseURL,
  method = "GET",
  endpoint = "",
  data = null,
  params = null,
  headers = {}
}) => {
  try {
    const response = await axiosInstance({
      baseURL,
      method,
      url: endpoint,
      data,
      params,
      headers
    });
    return response.data;
  } catch (error) {
    console.error(`Error during API call to ${endpoint}:`, error);
    throw error;
  }
};

queueAPIInterceptor(axiosInstance);

export default apiCaller;
