import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://172.18.200.166:8080"
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
    return Promise.reject(error);
  }
);

const { get, post, put, delete: destroy } = apiClient;
export { get, post, put, destroy };
