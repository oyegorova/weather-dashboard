import axios from "axios";

let host;
if (process.env.NODE_ENV === 'development') {
  host = "172.18.200.95:8080";
} else {
  host = window.location.host;
}

const baseURL = `http://${host}`;
const WebSocket_ENDPOINT = `ws://${host}/sensors/v1/realtime`;

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
