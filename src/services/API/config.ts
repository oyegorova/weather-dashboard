import axios from "axios";

const apiClient = axios.create({
  baseURL: "" // TODO: add ENV variable
});
apiClient.interceptors.request.use(
  config => {
    return {
      ...config,
      headers: {
        // TODO: add headers
      }
    };
  },
  error => Promise.reject(error)
);

apiClient.interceptors.response.use(
  response => response,
  async error => {
    return Promise.reject(error.response.data);
  }
);

const { get, post, put, delete: destroy } = apiClient;
export { get, post, put, destroy };
