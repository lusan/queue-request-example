import apiCaller from "./api";

export const fetchPosts = async () => {
  return apiCaller({
    baseURL: "https://jsonplaceholder.typicode.com",
    method: "GET",
    endpoint: "/posts"
  });
};
