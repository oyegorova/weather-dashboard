import axios from "axios";

const baseURL = "http://172.18.200.95:8080";
const WebSocket_ENDPOINT = "ws://172.18.200.95:8080/sensors/v1/realtime";

const apiClient = axios.create({ baseURL });
apiClient.interceptors.request.use(
  config => {
    return {
      ...config,
      headers: {
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

export { apiClient, WebSocket_ENDPOINT };
